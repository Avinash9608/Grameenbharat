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
    fileUrl?: string; // We'll store the public URL of the file
}

export async function handleContactSubmit(formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;
        const fileDataUrl = formData.get('fileDataUrl') as string | null;

        const dataToSave: ContactFormData = { name, email, subject, message };

        if (fileDataUrl) {
            // Create a storage reference
            const storageRef = ref(storage, `contact-uploads/${Date.now()}`);
            
            // Upload the file
            const snapshot = await uploadString(storageRef, fileDataUrl, 'data_url');
            
            // Get the public URL
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
