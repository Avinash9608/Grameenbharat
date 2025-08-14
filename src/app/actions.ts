
'use server';

import { translateFolklore, type TranslateFolkloreInput, type TranslateFolkloreOutput } from "@/ai/flows/folklore-translation";
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export async function handleContactSubmit(formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        const dataToSave: ContactFormData = { name, email, subject, message };

        await addDoc(collection(db, "contacts"), {
            ...dataToSave,
            submittedAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error: "Failed to submit message. Please try again later." };
    }
}


export async function handleTranslateFolklore(input: TranslateFolkloreInput): Promise<TranslateFolkloreOutput> {
    try {
        const output = await translateFolklore(input);
        return output;
    } catch (error) {
        console.error("Error in translation flow:", error);
        throw new Error("Failed to translate folklore. Please try again.");
    }
}

export async function handleNewsletterSubscribe(email: string) {
    if (!email) {
        return { success: false, error: "Email is required." };
    }
    try {
        await addDoc(collection(db, "newsletter"), {
            email: email,
            subscribedAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error) {
        console.error("Error adding to newsletter: ", error);
        return { success: false, error: "Failed to subscribe. Please try again." };
    }
}
