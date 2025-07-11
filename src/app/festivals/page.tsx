
'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Loader2, Sparkles } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { handleFetchFestivalInfo } from '@/app/actions';
import type { FestivalInfoOutput } from '@/ai/flows/festival-info-flow';

const festivalsByState = {
    "Bihar": [
        { name: "Chhath Puja", image: "https://images.unsplash.com/photo-1731056994556-2f0660647908?w=600&auto=format&fit=crop", hint: "chhath puja" },
        { name: "Karam Festival", image: "https://placehold.co/600x400.png", hint: "karam festival" },
    ],
    "West Bengal": [
        { name: "Durga Puja", image: "https://images.unsplash.com/photo-1616074385287-67f6fb9e9eb8?w=600&auto=format&fit=crop", hint: "durga puja" },
        { name: "Karam Festival", image: "https://placehold.co/600x400.png", hint: "karam festival" },
        { name: "Gajan", image: "https://placehold.co/600x400.png", hint: "shiva devotee" },
    ],
    "Maharashtra": [
        { name: "Ganesh Chaturthi", image: "https://images.unsplash.com/photo-1596423924829-544a83c5c9e2?w=600&auto=format&fit=crop", hint: "ganesh chaturthi" },
        { name: "Gudi Padwa", image: "https://placehold.co/600x400.png", hint: "gudi padwa" },
    ],
    "Rajasthan": [
        { name: "Pushkar Camel Fair", image: "https://plus.unsplash.com/premium_photo-1697729460658-6a831a518d2a?w=600&auto=format&fit=crop", hint: "pushkar fair" },
        { name: "Teej", image: "https://placehold.co/600x400.png", hint: "teej festival" }
    ],
     "Punjab": [
        { name: "Baisakhi", image: "https://media.istockphoto.com/id/1500853989/photo/happy-senior-punjabi-sikh-couple-wearing-colorful-cloths-standing-together-at-agriculture.webp?a=1&b=1&s=612x612", hint: "baisakhi festival" },
        { name: "Lohri", image: "https://placehold.co/600x400.png", hint: "lohri festival" }
    ],
    "Kerala": [
        { name: "Onam", image: "https://images.unsplash.com/photo-1632839088691-3bc8c9629e46?w=600&auto=format&fit=crop", hint: "onam festival" },
        { name: "Vishu", image: "https://placehold.co/600x400.png", hint: "vishu festival" },
        { name: "Vallam Kali", image: "https://placehold.co/600x400.png", hint: "snake boat race" },
        { name: "Garudan Thookam", image: "https://placehold.co/600x400.png", hint: "temple ritual" },
    ],
    "Tamil Nadu": [
        { name: "Thaipusam", image: "https://placehold.co/600x400.png", hint: "thaipusam festival" },
        { name: "Jallikattu", image: "https://placehold.co/600x400.png", hint: "bull taming" },
    ],
    "Uttarakhand": [
        { name: "Ghughutiya", image: "https://placehold.co/600x400.png", hint: "indian festival" },
        { name: "Bagwal Mela", image: "https://placehold.co/600x400.png", hint: "stone festival" },
    ],
    "Odisha": [
        { name: "Boita Bandana", image: "https://placehold.co/600x400.png", hint: "boat festival" },
        { name: "Karam Festival", image: "https://placehold.co/600x400.png", hint: "karam festival" },
        { name: "Samba Dashami", image: "https://placehold.co/600x400.png", hint: "sun god" },
        { name: "Dola Jatra", image: "https://placehold.co/600x400.png", hint: "swinging deities" },
    ],
    "Assam": [
        { name: "Bohag Bihu", image: "https://images.unsplash.com/photo-1629649213060-4874f8f6bce3?w=600&auto=format&fit=crop", hint: "bihu dance" },
        { name: "Kherai Puja", image: "https://placehold.co/600x400.png", hint: "bodo tribe" },
        { name: "Rongker", image: "https://placehold.co/600x400.png", hint: "karbi tribe" },
    ],
    "Manipur": [
        { name: "Yaosang", image: "https://placehold.co/600x400.png", hint: "manipur festival" },
    ],
    "Meghalaya": [
        { name: "Wangala", image: "https://placehold.co/600x400.png", hint: "hundred drums" },
    ],
    "Nagaland": [
        { name: "Tuluni", image: "https://placehold.co/600x400.png", hint: "naga tribe" },
    ],
    "Andhra Pradesh": [
        { name: "Bani Festival", image: "https://placehold.co/600x400.png", hint: "stick fighting" },
        { name: "Bonalu", image: "https://placehold.co/600x400.png", hint: "bonalu festival" },
    ],
    "Karnataka": [
        { name: "Made Snana", image: "https://placehold.co/600x400.png", hint: "temple ritual" },
    ],
    "Gujarat": [
        { name: "Uttarayan", image: "https://images.unsplash.com/photo-1550697943-463e26458155?w=600&auto=format&fit=crop", hint: "kite festival" },
    ],
    "Jammu and Kashmir": [
        { name: "Wanvun", image: "https://placehold.co/600x400.png", hint: "kashmiri wedding" },
    ]
};

type FestivalDetails = {
    [key: string]: FestivalInfoOutput | null;
};

const FestivalsPage = () => {
    const [selectedFestival, setSelectedFestival] = useState<{name: string; state: string} | null>(null);
    const [festivalDetails, setFestivalDetails] = useState<FestivalDetails>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleFestivalClick = async (festivalName: string, stateName: string) => {
        const key = `${festivalName}-${stateName}`;
        if (selectedFestival?.name === festivalName && selectedFestival?.state === stateName) {
            // Toggle off if clicking the same festival
            setSelectedFestival(null);
            return;
        }

        setSelectedFestival({name: festivalName, state: stateName});

        if (!festivalDetails[key]) {
            setIsLoading(true);
            try {
                const details = await handleFetchFestivalInfo({ festivalName, stateName });
                setFestivalDetails(prev => ({...prev, [key]: details}));
            } catch (error) {
                console.error("Failed to fetch festival info:", error);
                setFestivalDetails(prev => ({...prev, [key]: {
                    description: "Could not load details for this festival.",
                    significance: "Please try again later.",
                    celebration: ""
                }}));
            } finally {
                setIsLoading(false);
            }
        }
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 py-24 pt-32 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h1 className="font-headline text-5xl md:text-7xl font-bold">Festivals of India</h1>
                        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                            Explore the vibrant tapestry of rituals and celebrations from across the states of India.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-5 lg:col-span-4">
                            <h2 className="font-headline text-3xl font-bold mb-6">Festivals by State</h2>
                             <Accordion type="single" collapsible className="w-full">
                                {Object.entries(festivalsByState).map(([state, festivals]) => (
                                    <AccordionItem key={state} value={state}>
                                        <AccordionTrigger className="text-xl font-semibold">{state}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col gap-4 pl-2">
                                                {festivals.map(festival => (
                                                    <Button
                                                        key={festival.name}
                                                        variant={selectedFestival?.name === festival.name ? 'secondary' : 'ghost'}
                                                        className="justify-start"
                                                        onClick={() => handleFestivalClick(festival.name, state)}
                                                    >
                                                        {festival.name}
                                                    </Button>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        <div className="md:col-span-7 lg:col-span-8">
                           <Card className="sticky top-24 shadow-xl">
                               <CardHeader>
                                   <CardTitle className="font-headline text-4xl">
                                      {selectedFestival ? selectedFestival.name : "Select a Festival"}
                                   </CardTitle>
                                   <CardDescription>
                                        {selectedFestival ? `A prominent festival from ${selectedFestival.state}` : "Click on a festival from the list to learn more about it."}
                                   </CardDescription>
                               </CardHeader>
                               <CardContent>
                                   {isLoading ? (
                                       <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-lg bg-secondary/30 h-96">
                                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                            <p className="text-muted-foreground font-semibold">Gathering ancient stories...</p>
                                        </div>
                                   ) : selectedFestival && festivalDetails[`${selectedFestival.name}-${selectedFestival.state}`] ? (
                                       <div className="space-y-6">
                                           {Object.values(festivalsByState).flat().find(f => f.name === selectedFestival.name && festivalsByState[selectedFestival.state].includes(f))?.image &&
                                               <div className="relative h-64 w-full rounded-lg overflow-hidden">
                                                   <Image src={Object.values(festivalsByState).flat().find(f => f.name === selectedFestival.name && festivalsByState[selectedFestival.state].includes(f))!.image} alt={selectedFestival.name} fill className="object-cover" data-ai-hint={Object.values(festivalsByState).flat().find(f => f.name === selectedFestival.name && festivalsByState[selectedFestival.state].includes(f))!.hint} />
                                               </div>
                                           }
                                           <div className="prose prose-lg max-w-none text-foreground">
                                                <h3 className="font-headline text-2xl font-semibold flex items-center gap-2"><Sparkles className="text-primary"/> Description</h3>
                                                <p>{festivalDetails[`${selectedFestival.name}-${selectedFestival.state}`]?.description}</p>
                                                <h3 className="font-headline text-2xl font-semibold flex items-center gap-2"><Sparkles className="text-primary"/> Significance</h3>
                                                <p>{festivalDetails[`${selectedFestival.name}-${selectedFestival.state}`]?.significance}</p>
                                                <h3 className="font-headline text-2xl font-semibold flex items-center gap-2"><Sparkles className="text-primary"/> How It's Celebrated</h3>
                                                <p>{festivalDetails[`${selectedFestival.name}-${selectedFestival.state}`]?.celebration}</p>
                                           </div>
                                       </div>
                                   ) : (
                                       <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg bg-secondary/30 h-96">
                                            <Image src="https://placehold.co/600x400.png" data-ai-hint="indian culture" width={200} height={200} alt="A collage of Indian culture" className="rounded-lg mb-4 opacity-70"/>
                                            <p className="text-muted-foreground font-semibold max-w-xs">The stories and traditions of India's festivals are waiting to be explored.</p>
                                       </div>
                                   )}
                               </CardContent>
                           </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FestivalsPage;
