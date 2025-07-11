
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

Please provide a description, its significance, and how it is celebrated in a concise and engaging manner suitable for a general audience.
`,
});

const fetchFestivalInfoFlow = ai.defineFlow(
  {
    name: 'fetchFestivalInfoFlow',
    inputSchema: FestivalInfoInputSchema,
    outputSchema: FestivalInfoOutputSchema,
  },
  async (input) => {
    if (input.festivalName === "Chhath Puja") {
      return {
        description: "Chhath Puja is an ancient Hindu Vedic festival dedicated to Surya Dev (the Sun God) and Chhathi Maiya, considered the Goddess of purity, protection, and childbearing. It’s one of the most spiritually rigorous and environmentally conscious festivals in India, involving strict fasting, holy bathing, and ritual offerings. Chhath Puja is unique because it is one of the few Hindu festivals dedicated solely to the Sun God and celebrates nature, discipline, and gratitude.",
        significance: "Worshiping the Sun God, the ultimate source of energy, ensures health, prosperity, and progress. Chhathi Maiya is believed to protect children and grant fertility, so women especially pray for the well-being of their offspring. The festival reflects spiritual purity, environmental awareness, and community bonding.",
        celebration: "The festival spans four days. Day 1: Nahay Khay - Devotees bathe in a holy river and prepare a pure vegetarian meal, usually lauki-bhaat (bottle gourd with rice). The house is thoroughly cleaned. Day 2: Kharna (Lohanda) - A strict fast is observed all day without water. In the evening, a sweet dish called Rasaio-Kheer (jaggery rice pudding) is made and offered. After this, a 36-hour waterless fast begins. Day 3: Sandhya Arghya (Evening Offering) - Devotees offer 'arghya' (water and fruits) to the setting sun at a riverbank or pond. Women wear traditional sarees and carry bamboo baskets filled with thekua, fruits, and sugarcane. Day 4: Usha Arghya (Morning Offering) - The final day begins before sunrise. Devotees offer prayers to the rising sun, after which the fast is broken. Prasad is then distributed."
      };
    }
    
    const {output} = await festivalInfoPrompt(input);
    return output!;
  }
);
    