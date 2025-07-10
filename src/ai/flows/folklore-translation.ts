// 'use server';
/**
 * @fileOverview This file contains a Genkit flow for translating folklore told by village elders from a local dialect into English.
 *
 * - translateFolklore - A function that handles the folklore translation process.
 * - TranslateFolkloreInput - The input type for the translateFolklore function.
 * - TranslateFolkloreOutput - The return type for the translateFolklore function.
 */

'use server';

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
  englishTranslation: z.string().describe('The English translation of the folklore.'),
  audioDataUri: z.string().describe('The audio data URI of the folklore in English.'),
});
export type TranslateFolkloreOutput = z.infer<typeof TranslateFolkloreOutputSchema>;

export async function translateFolklore(input: TranslateFolkloreInput): Promise<TranslateFolkloreOutput> {
  return translateFolkloreFlow(input);
}

const translateFolklorePrompt = ai.definePrompt({
  name: 'translateFolklorePrompt',
  input: {schema: TranslateFolkloreInputSchema},
  output: {schema: z.string()},
  prompt: `You are an expert translator specializing in translating folklore from various local dialects into English.

You will be provided with an audio recording of folklore told in the local dialect, along with the name of the dialect.
Your task is to translate the folklore into English.

Local Dialect: {{{localDialect}}}
Folklore Audio: {{media url=audioDataUri}}

Translation:`,
});

const ttsPrompt = ai.definePrompt({
  name: 'ttsPrompt',
  input: { schema: z.object({ text: z.string() }) },
  output: { schema: z.any() },
  prompt: `Convert the following text to speech:

{{{text}}}`
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
    const {output: englishTranslation} = await translateFolklorePrompt(input);

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
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const englishAudioDataUri = 'data:audio/wav;base64,' + (await toWav(audioBuffer));

    return {
      englishTranslation: englishTranslation!,
      audioDataUri: englishAudioDataUri,
    };
  }
);


