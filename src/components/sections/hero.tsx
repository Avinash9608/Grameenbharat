
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="w-full bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-green-950 flex items-center min-h-screen pt-20 md:pt-0">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Text Content */}
                    <div className="text-center md:text-left">
                        <div className="animate-fade-in-up">
                            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                                Experience the Heartbeat of Rural India
                            </h1>
                        </div>
                        <div className="[animation-delay:400ms] animate-fade-in-up">
                            <p className="mt-6 max-w-xl text-lg text-muted-foreground mx-auto md:mx-0">
                                Journey into a world where tradition breathes, culture flourishes, and life is painted with the simple joys of the earth.
                            </p>
                        </div>
                        <div className="[animation-delay:600ms] animate-fade-in-up">
                            <Button asChild size="lg" className="mt-8 px-8 py-6 text-lg bg-primary hover:bg-primary/90 shadow-lg transition-transform hover:scale-105">
                                <a href="#culture">
                                    Start Exploring
                                    <ChevronRight className="ml-2" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Right Side: Image Frame */}
                    <div className="relative h-[300px] md:h-[500px] w-full [animation-delay:800ms] animate-fade-in-up">
                        <div className="absolute w-full h-full rounded-lg shadow-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm p-4">
                            <div className="relative w-full h-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1620563202672-36d713a79f8d?w=600&auto=format&fit=crop"
                                    alt="Woman working in a field"
                                    fill
                                    className="object-cover rounded-lg shadow-lg"
                                    data-ai-hint="village work"
                                />
                                <div className="absolute -bottom-10 -left-16 w-48 h-32 hidden lg:block">
                                    <Image
                                        src="https://plus.unsplash.com/premium_photo-1682092121090-5f3e89c7aa3c?w=600&auto=format&fit=crop"
                                        alt="Smiling man"
                                        fill
                                        className="object-cover rounded-lg shadow-xl border-4 border-background"
                                        data-ai-hint="indian man"
                                    />
                                </div>
                                <div className="absolute -top-10 -right-16 w-56 h-40 hidden lg:block">
                                     <Image
                                        src="https://images.unsplash.com/photo-1629649213060-4874f8f6bce3?w=600&auto=format&fit=crop"
                                        alt="Indian festival performers"
                                        fill
                                        className="object-cover rounded-lg shadow-xl border-4 border-background"
                                        data-ai-hint="festival performers"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
