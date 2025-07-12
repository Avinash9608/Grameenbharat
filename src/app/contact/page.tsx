
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const ContactPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setFormSubmitted(true);
        }, 1500);
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                <section className="relative h-[50vh] w-full flex items-center justify-center text-center">
                    <div className="absolute inset-0 z-[-1]">
                        <Image
                            src="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Contact us background"
                            fill
                            className="object-cover brightness-75"
                            priority
                            data-ai-hint="contact form"
                        />
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-6 p-4 text-white">
                        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
                           Get in Touch
                        </h1>
                        <p className="max-w-2xl text-lg md:text-xl drop-shadow-md">
                           We'd love to hear from you. Whether you have a question, a story to share, or a suggestion, please reach out.
                        </p>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-5">
                                <Card className="h-full bg-primary/5">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-3xl">Contact Information</CardTitle>
                                        <CardDescription>Our lines are always open for stories from the heart of India.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6 text-lg">
                                        <div className="flex items-start gap-4">
                                            <MapPin className="h-8 w-8 text-primary mt-1"/>
                                            <div>
                                                <h4 className="font-semibold">Our Village Office</h4>
                                                <p className="text-muted-foreground">123, Gramin Sadak, Near Banyan Tree,<br/>Panchayat Nagar, Bharat - 123456</p>
                                            </div>
                                        </div>
                                         <div className="flex items-start gap-4">
                                            <Mail className="h-8 w-8 text-primary mt-1"/>
                                            <div>
                                                <h4 className="font-semibold">Email Us</h4>
                                                <a href="mailto:stories@grameenbharat.com" className="text-muted-foreground hover:text-primary transition-colors">stories@grameenbharat.com</a>
                                            </div>
                                        </div>
                                         <div className="flex items-start gap-4">
                                            <Phone className="h-8 w-8 text-primary mt-1"/>
                                            <div>
                                                <h4 className="font-semibold">Call Us</h4>
                                                <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary transition-colors">+91 123 456 7890</a>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="lg:col-span-7">
                                 <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline text-3xl">Send Us a Message</CardTitle>
                                        <CardDescription>Your feedback and stories are valuable to us.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {formSubmitted ? (
                                            <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg bg-green-100 dark:bg-green-900/30 h-full min-h-[300px]">
                                                 <div className="p-4 bg-green-200 dark:bg-green-800 rounded-full mb-4">
                                                    <Send className="h-10 w-10 text-green-700 dark:text-green-300"/>
                                                 </div>
                                                 <h3 className="font-headline text-2xl font-bold text-green-800 dark:text-green-200">Thank you!</h3>
                                                 <p className="text-green-700 dark:text-green-300 mt-2">Your message has been sent successfully. We will get back to you soon.</p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name">Your Name</Label>
                                                        <Input id="name" placeholder="Ramesh Kumar" required />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Your Email</Label>
                                                        <Input id="email" type="email" placeholder="ramesh@example.com" required />
                                                    </div>
                                                </div>
                                                 <div className="space-y-2">
                                                    <Label htmlFor="subject">Subject</Label>
                                                    <Input id="subject" placeholder="A story about my village festival" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="message">Your Message</Label>
                                                    <Textarea id="message" placeholder="Share your story or question here..." rows={6} required />
                                                </div>
                                                <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isLoading}>
                                                    {isLoading ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send className="mr-2" />
                                                            Send Message
                                                        </>
                                                    )}
                                                </Button>
                                            </form>
                                        )}
                                    </CardContent>
                                 </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;

    