
'use server';
/**
 * @fileOverview A Genkit flow for fetching information about Indian festivals.
 *
 * - fetchFestivalInfo - A function that provides details about a given festival.
 * - FestivalInfoInput - The input type for the fetchFestivalInfo function.
 * - FestivalInfoOutput - The return type for the fetchFestivalInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FestivalInfoInputSchema = z.object({
  festivalName: z.string().describe('The name of the Indian festival.'),
  stateName: z.string().describe('The state in India where the festival is prominent.'),
});
export type FestivalInfoInput = z.infer<typeof FestivalInfoInputSchema>;

const FestivalInfoOutputSchema = z.object({
  description: z.string().describe("A brief description of the festival."),
  significance: z.string().describe("The historical and cultural significance of the festival."),
  celebration: z.string().describe("How the festival is typically celebrated."),
});
export type FestivalInfoOutput = z.infer<typeof FestivalInfoOutputSchema>;

export async function fetchFestivalInfo(input: FestivalInfoInput): Promise<FestivalInfoOutput> {
  return fetchFestivalInfoFlow(input);
}

const festivalInfoPrompt = ai.definePrompt({
  name: 'festivalInfoPrompt',
  input: {schema: FestivalInfoInputSchema},
  output: {schema: FestivalInfoOutputSchema},
  prompt: `You are a cultural expert on India. Provide detailed information about the following festival.

Festival Name: {{{festivalName}}}
State of Prominence: {{{stateName}}}

Please provide a description, its significance, and how it is celebrated in a concise and engaging manner suitable for a general audience.`,
});

const fetchFestivalInfoFlow = ai.defineFlow(
  {
    name: 'fetchFestivalInfoFlow',
    inputSchema: FestivalInfoInputSchema,
    outputSchema: FestivalInfoOutputSchema,
  },
  async (input) => {
    const {output} = await festivalInfoPrompt(input);
    return output!;
  }
);
    
