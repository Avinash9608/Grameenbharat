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

const transcriptionPrompt = ai.definePrompt({
    name: 'transcriptionPrompt',
    input: { schema: TranslateFolkloreInputSchema },
    output: { schema: z.string() },
    prompt: `You are an expert linguist. Transcribe the following audio from the {{localDialect}} dialect into English text.
  
  Audio: {{media url=audioDataUri}}
  
  English Transcription:`,
  });

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

const translateFolkloreFlow = ai.defineFlow(
  {
    name: 'translateFolkloreFlow',
    inputSchema: TranslateFolkloreInputSchema,
    outputSchema: TranslateFolkloreOutputSchema,
  },
  async input => {
    let englishTranslation: string | undefined = undefined;
    let audioDataUri: string | undefined = undefined;

    try {
        const { output } = await transcriptionPrompt(input);
        englishTranslation = output;
    } catch (e) {
        console.error("Error in transcription:", e);
        // Allow to continue to TTS if transcription fails but we have some text
    }

    if (englishTranslation) {
        try {
            const { media } = await ai.generate({
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
            if (media) {
                const audioBuffer = Buffer.from(
                    media.url.substring(media.url.indexOf(',') + 1),
                    'base64'
                );
                audioDataUri = 'data:audio/wav;base64,' + (await toWav(audioBuffer));
            }
        } catch(e) {
            console.error("Error in TTS generation:", e);
            // If TTS fails, we can still return the text.
        }
    }
    
    if (!englishTranslation && !audioDataUri) {
        throw new Error("Failed to generate both text and audio translation.");
    }

    return { englishTranslation, audioDataUri };
  }
);
