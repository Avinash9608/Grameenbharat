
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const villagePoints = [
  { name: 'Mawlynnong, Meghalaya', description: "Asia's cleanest village, known for its matriarchal society and living root bridges.", image: 'https://media.istockphoto.com/id/840514260/photo/living-roots-bridge-over-river-shillong-meghalaya-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=h_-pk3D9SDE0W790im1B7bJY6XHKrC-pLj1KRffQoac=', hint: 'meghalaya village', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mawlynnong,Meghalaya', coords: { top: '48%', left: '86%' } },
  { name: 'Punsari, Gujarat', description: 'A model village with Wi-Fi, CCTVs, and solar-powered street lights.', image: 'https://media.istockphoto.com/id/2179925134/photo/front-view-of-the-ruined-panchayatan-temple-13th-century-group-of-monuments-parabadi.webp?a=1&b=1&s=612x612&w=0&k=20&c=TVIu79MOnhC2nPFRO9LLj9aTkqZCEFrpDB4YghgyK7c=', hint: 'gujarat village', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Punsari,Gujarat', coords: { top: '53%', left: '38%' } },
  { name: 'Malana, Himachal Pradesh', description: 'An ancient village with a unique democratic system and distinct culture.', image: 'https://media.istockphoto.com/id/1492067960/photo/colorful-local-houses-in-manikaran-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=5pDakoWtEI9o2lSXhLa1k5t1XEYKNNCHdt9yRAM2FuE=', hint: 'himachal village', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Malana,Himachal+Pradesh', coords: { top: '34%', left: '50%' } },
  { name: 'Khonoma, Nagaland', description: 'A green village recognized for its pioneering conservation efforts and terrace farming.', image: 'https://images.unsplash.com/photo-1628288126789-f1996d3b9e1a?w=600&auto=format&fit=crop', hint: 'nagaland village', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Khonoma,Nagaland', coords: { top: '46%', left: '88%' } },
  { name: 'Litti Chokha heartland, Bihar', description: 'Experience the rustic heartland of Bihar, famous for its smoky, delicious Litti Chokha.', image: 'https://media.istockphoto.com/id/2189780938/photo/litti-chokha-with-raita-and-chutney.webp?a=1&b=1&s=612x612&w=0&k=20&c=e5n65xLN3dkwTZa9FH7JLtyMsGM_5QKIQcSSDvDOSWo=', hint: 'bihar village', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bihar', coords: { top: '48%', left: '70%' } },
];

type Village = typeof villagePoints[0];

const MapSection = () => {
    const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);

    return (
        <section id="map" className="py-16 md:py-24 bg-primary/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Explore on the Map</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                        Click on the pulsing points to discover stories from across the subcontinent.
                    </p>
                </div>
                <div className="relative w-full max-w-5xl mx-auto aspect-video">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/2/23/Blank_Map_of_India.svg"
                        alt="Map of India"
                        fill
                        className="object-contain opacity-40"
                        data-ai-hint="india map"
                    />

                    {villagePoints.map((village) => (
                        <div
                            key={village.name}
                            className="map-point"
                            style={{ top: village.coords.top, left: village.coords.left }}
                            onClick={() => setSelectedVillage(village)}
                            title={village.name}
                        />
                    ))}

                    {selectedVillage && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20 animate-fade-in-up">
                            <Card className="w-full max-w-sm md:max-w-md shadow-2xl relative">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 rounded-full"
                                    onClick={() => setSelectedVillage(null)}
                                >
                                    <X className="h-5 w-5"/>
                                </Button>
                                <CardHeader className="flex-row gap-4 items-start">
                                    <div className="relative h-24 w-24 rounded-lg overflow-hidden shrink-0">
                                         <Image src={selectedVillage.image} alt={selectedVillage.name} fill className="object-cover" data-ai-hint={selectedVillage.hint}/>
                                    </div>
                                    <div>
                                        <CardTitle className="font-headline text-2xl">{selectedVillage.name}</CardTitle>
                                        <CardDescription>{selectedVillage.description}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild className="w-full">
                                        <a href={selectedVillage.mapUrl} target="_blank" rel="noopener noreferrer">
                                            <MapPin className="mr-2"/> View on Google Maps
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MapSection;
