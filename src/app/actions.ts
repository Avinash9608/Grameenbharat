
'use server';

import { translateFolklore, type TranslateFolkloreInput, type TranslateFolkloreOutput } from "@/ai/flows/folklore-translation";
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    fileUrl?: string;
}

export async function handleContactSubmit(formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;
        const file = formData.get('file') as File | null;

        const dataToSave: Omit<ContactFormData, 'fileUrl'> & { fileUrl?: string } = { name, email, subject, message };

        if (file && file.size > 0) {
            try {
                const storageRef = ref(storage, `contact-uploads/${Date.now()}-${file.name}`);
                const arrayBuffer = await file.arrayBuffer();
                const snapshot = await uploadBytes(storageRef, arrayBuffer, { contentType: file.type });
                const downloadURL = await getDownloadURL(snapshot.ref);
                dataToSave.fileUrl = downloadURL;
            } catch (error) {
                console.error("Error uploading to Firebase Storage: ", error);
                 if (error instanceof Error && 'code' in error) {
                    const firebaseError = error as { code: string; message: string };
                    if (firebaseError.code === 'storage/unauthorized') {
                        return { success: false, error: "You don't have permission to upload files. Please check your Firebase Storage rules." };
                    }
                 }
                return { success: false, error: "Failed to upload file. Please try again." };
            }
        }

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

