
'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const slides = [
    {
        image: "https://images.unsplash.com/photo-1623211270166-bc232d744d6a?q=80&w=1170&auto=format&fit=crop",
        hint: "village pottery",
        title: "The Soul of India, Unscripted.",
        description: "Journey into a world where tradition breathes, culture flourishes, and life is painted with the simple joys of the earth."
    },
    {
        image: "https://images.unsplash.com/photo-1662815094316-917f52876324?w=600&auto=format&fit=crop",
        hint: "indian farmer",
        title: "The Rhythm of the Land.",
        description: "Celebrating the farmers who feed a nation, following the rhythm of the sun and seasons with resilience and hope."
    },
    {
        image: "https://images.unsplash.com/photo-1583415303571-20185869c4bc?w=600&auto=format&fit=crop",
        hint: "weaving loom",
        title: "Threads of Tradition.",
        description: "Discover the ancient art of handloom, where skilled artisans transform simple threads into timeless masterpieces."
    }
];

const Hero = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    return (
        <section className="h-screen w-full relative">
            <Carousel
                plugins={[plugin.current]}
                className="w-full h-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {slides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <div className="w-full h-screen relative">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                    data-ai-hint={slide.hint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />

                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <div className="max-w-2xl text-center text-white">
                                        <div className="animate-fade-in-up">
                                            <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-lg">
                                                {slide.title}
                                            </h1>
                                        </div>
                                        <div className="[animation-delay:400ms] animate-fade-in-up">
                                            <p className="mt-6 max-w-xl text-lg text-stone-100 mx-auto drop-shadow-md">
                                                {slide.description}
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
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
};

export default Hero;
