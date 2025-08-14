
'use server';

import { translateFolklore, type TranslateFolkloreInput, type TranslateFolkloreOutput } from "@/ai/flows/folklore-translation";
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';


export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    fileUrl?: string;
}

export async function handleContactSubmit(data: { name: string; email: string; subject: string; message: string; fileDataUrl: string | null; }) {
    try {
        const { name, email, subject, message, fileDataUrl } = data;
        const dataToSave: ContactFormData = { name, email, subject, message };

        if (fileDataUrl) {
            const storageRef = ref(storage, `contact-uploads/${Date.now()}-${name.replace(/\s+/g, '-')}`);
            
            // Correctly upload the full data URL string.
            const snapshot = await uploadString(storageRef, fileDataUrl, 'data_url');
            
            const downloadURL = await getDownloadURL(snapshot.ref);
            dataToSave.fileUrl = downloadURL;
        }

        await addDoc(collection(db, "contacts"), {
            ...dataToSave,
            submittedAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error) {
        console.error("Error adding document: ", error);
        
        if (error instanceof Error) {
            if (error.message.includes('storage/unauthorized')) {
                 return { success: false, error: "You don't have permission to upload files. Please check your Firebase Storage rules." };
            }
             if (error.message.includes('storage/object-not-found')) {
                 return { success: false, error: "File could not be found after upload. Please try again." };
            }
        }
       
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
