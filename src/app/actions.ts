
'use server';

import { translateFolklore, type TranslateFolkloreInput, type TranslateFolkloreOutput } from "@/ai/flows/folklore-translation";
import { fetchFestivalInfo, type FestivalInfoInput, type FestivalInfoOutput } from "@/ai/flows/festival-info-flow";

export async function handleTranslateFolklore(input: TranslateFolkloreInput): Promise<TranslateFolkloreOutput> {
    try {
        const output = await translateFolklore(input);
        return output;
    } catch (error) {
        console.error("Error in translation flow:", error);
        throw new Error("Failed to translate folklore. Please try again.");
    }
}

export async function handleFetchFestivalInfo(input: FestivalInfoInput): Promise<FestivalInfoOutput> {
    try {
        const output = await fetchFestivalInfo(input);
        return output;
    } catch (error) {
        console.error("Error in festival info flow:", error);
        throw new Error("Failed to fetch festival information. Please try again.");
    }
}

    