'use server';
/**
 * @fileOverview This file contains a Genkit flow for translating folklore told by village elders from a local dialect into English.
 *
 * - translateFolklore - A function that handles the folklore translation process.
 * - TranslateFolkloreInput - The input type for the translateFolklore function.
 * - TranslateFolkloreOutput - The return type for the translateFolklore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const TranslateFolkloreInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "The audio data URI of the folklore in the local dialect. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  localDialect: z.string().describe('The name of the local dialect.'),
});
export type TranslateFolkloreInput = z.infer<typeof TranslateFolkloreInputSchema>;

const TranslateFolkloreOutputSchema = z.object({
  englishTranslation: z.string().optional().describe('The English translation of the folklore.'),
  audioDataUri: z.string().optional().describe('The audio data URI of the folklore in English.'),
});
export type TranslateFolkloreOutput = z.infer<typeof TranslateFolkloreOutputSchema>;

export async function translateFolklore(input: TranslateFolkloreInput): Promise<TranslateFolkloreOutput> {
  return translateFolkloreFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const transcriptionPrompt = ai.definePrompt({
    name: 'transcriptionPrompt',
    input: { schema: TranslateFolkloreInputSchema },
    output: { schema: z.object({ englishTranslation: z.string().describe('The English transcription of the audio.') }) },
    prompt: `You are an expert linguist. Transcribe the following audio from the {{localDialect}} dialect into English text.

Audio: {{media url=audioDataUri}}
`,
});


const translateFolkloreFlow = ai.defineFlow(
  {
    name: 'translateFolkloreFlow',
    inputSchema: TranslateFolkloreInputSchema,
    outputSchema: TranslateFolkloreOutputSchema,
  },
  async input => {
    let englishTranslation: string | undefined = undefined;
    let audioDataUri: string | undefined = undefined;

    // 1. Transcribe audio to text reliably
    try {
      const { output } = await transcriptionPrompt(input);
      if (output?.englishTranslation) {
        englishTranslation = output.englishTranslation;
      } else {
         throw new Error("AI failed to transcribe the audio.");
      }
    } catch (e) {
      console.error("Error in transcription prompt:", e);
      throw new Error("Failed to transcribe the audio. Please check the file and try again.");
    }
    
    // 2. If transcription is successful, generate audio from the resulting text
    if (englishTranslation) {
        try {
            const ttsResponse = await ai.generate({
                model: 'googleai/gemini-2.5-flash-preview-tts',
                config: {
                    responseModalities: ['AUDIO'],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: 'Algenib' },
                        },
                    },
                },
                prompt: englishTranslation,
            });

            if (ttsResponse.media) {
                const audioBuffer = Buffer.from(
                    ttsResponse.media.url.substring(ttsResponse.media.url.indexOf(',') + 1),
                    'base64'
                );
                audioDataUri = 'data:audio/wav;base64,' + (await toWav(audioBuffer));
            }
        } catch(e) {
            console.error("Error in TTS generation:", e);
            // TTS failure is not critical. We can still return the text.
        }
    }
    
    // Final check: if even the text is missing, something went very wrong.
    if (!englishTranslation) {
        throw new Error("Failed to generate translation. The transcription step was unsuccessful.");
    }

    return { englishTranslation, audioDataUri };
  }
);
