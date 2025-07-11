
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Wheat, Tractor, CloudRain, Shield, Coins, Sparkles, Sun, Moon, Clock, TractorIcon, Wind, Leaf, Droplets, MapPin } from 'lucide-react';

const farmingRegionsData = {
    Punjab: {
        crops: ['Wheat', 'Rice'],
        patterns: ['Rabi', 'Kharif'],
        irrigation: 'Tube Well System',
        image: 'https://images.unsplash.com/photo-1710170909047-135c7a010e41?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fFB1bmphYiUyMGZhcm1pbmd8ZW58MHx8MHx8fDA%3D',
        hint: 'punjab fields'
    },
    Bihar: {
        crops: ['Paddy', 'Maize', 'Litchi'],
        patterns: ['Kharif', 'Rabi'],
        irrigation: 'Flood-fed, Canal',
        image: 'https://plus.unsplash.com/premium_photo-1682092663122-725ebb4592c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fFB1bmphYiUyMGZhcm1pbmd8ZW58MHx8MHx8fDA%3D',
        hint: 'bihar farming'
    },
    Maharashtra: {
        crops: ['Cotton', 'Sugarcane'],
        patterns: ['Kharif'],
        irrigation: 'Drip Irrigation, Canals',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop',
        hint: 'sugarcane field'
    },
    Kerala: {
        crops: ['Coconut', 'Banana', 'Rice'],
        patterns: ['Kharif', 'Rabi'],
        irrigation: 'Backwater & Rain-fed',
        image: 'https://plus.unsplash.com/premium_photo-1664303828953-3e8ef4ac44e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2VybGElMjBmYXJtaW5nfGVufDB8fDB8fHww',
        hint: 'kerala backwaters farming'
    },
    Rajasthan: {
        crops: ['Bajra', 'Mustard'],
        patterns: ['Kharif'],
        irrigation: 'Dry Farming, Tank Irrigation',
        image: 'https://media.istockphoto.com/id/533314469/photo/mustard-flower.webp?a=1&b=1&s=612x612&w=0&k=20&c=t70FNee9KGEf5axbeExEPMmS5OfPYfnA_7C0UaRz0wk=',
        hint: 'mustard fields rajasthan'
    },
};

const dailyRoutineData = [
    { time: '4:30 AM', task: 'Wake Up & Prepare', description: 'Begin the day before sunrise, tending to cattle and preparing tools.', icon: <Moon /> },
    { time: '6:00 AM', task: 'Head to the Fields', description: 'Walk to the fields, often with oxen, as the sun rises.', icon: <Sun /> },
    { time: '10:00 AM', task: 'Cultivation & Sowing', description: 'Engage in plowing, sowing seeds, or irrigating the land depending on the season.', icon: <TractorIcon /> },
    { time: '1:00 PM', task: 'Midday Meal', description: 'A simple, hearty lunch is often brought to the fields by family members.', icon: <Clock /> },
    { time: '4:00 PM', task: 'Harvesting & Storing', description: 'Gathering crops, feeding livestock, and ensuring the produce is stored safely.', icon: <Wheat /> },
];

const farmingToolsData = [
    { name: 'Wooden Plough (Hal)', description: 'A traditional tool pulled by oxen to prepare the soil for sowing.', image: 'https://plus.unsplash.com/premium_photo-1691030256235-47d75d5890b9?w=600&auto=format&fit=crop', hint: 'farmer ploughing' },
    { name: 'Sickle (Hasiya)', description: 'A curved blade used for harvesting crops like rice and wheat with precision.', image: 'https://images.unsplash.com/photo-1523348887715-d54d0525754b?w=600&auto=format&fit=crop', hint: 'harvesting wheat' },
    { name: 'Modern Tractor', description: 'Mechanization is slowly replacing traditional methods, increasing efficiency.', image: 'https://images.unsplash.com/photo-1590422282247-51a1a36080ce?w=600&auto=format&fit=crop', hint: 'farm tractor' },
];

const farmingChallengesData = [
    { title: 'Weather Dependency', description: 'Unpredictable monsoons, droughts, or floods can ruin a season\'s hard work.', icon: <CloudRain className="text-blue-500" /> },
    { title: 'Low Income', description: 'Farmers often receive low prices for their produce due to middlemen and market fluctuations.', icon: <Coins className="text-amber-500" /> },
    { title: 'Pest & Crop Loss', description: 'Pests and diseases can destroy crops, leading to significant financial losses.', icon: <Shield className="text-red-500" /> },
];

const farmerVoicesData = [
    { quote: '“Hamaari zameen hi hamari jaan hai.” (Our land is our life.)', name: 'Ramesh Kumar', region: 'Uttar Pradesh', image: 'https://plus.unsplash.com/premium_photo-1682092121090-5f3e89c7aa3c?w=600&auto=format&fit=crop', hint: 'indian farmer portrait' },
    { quote: '“Baarish achhi ho toh dil khush ho jaata hai.” (The heart rejoices when the rain is good.)', name: 'Lakshmi Devi', region: 'Bihar', image: 'https://images.unsplash.com/photo-1646801696575-488269802fca?w=600&auto=format&fit=crop', hint: 'indian woman smiling' },
];

const FarmingLifestylePage = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                <section className="relative h-[60vh] w-full flex items-center justify-center text-center">
                    <div className="absolute inset-0 z-[-1]">
                        <Image
                            src="https://media.istockphoto.com/id/506164764/photo/tractor-spraying-soybean-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=FziHcky7PA62LyCW15cUEva70DhfXUbdeNIZBi_zQlk="
                            alt="A farmer plowing a field with oxen"
                            fill
                            className="object-cover brightness-75"
                            priority
                            data-ai-hint="tractor spraying field"
                        />
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-6 p-4 text-white mt-12">
                        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
                            The Soul of India Lives in its Soil
                        </h1>
                        <p className="max-w-2xl text-lg md:text-xl drop-shadow-md">
                            Celebrating the Farmers Who Feed a Nation
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg">
                                <a href="#farming-regions">Explore Farming Regions</a>
                            </Button>
                        </div>
                    </div>
                </section>

                <section id="daily-routine" className="py-16 md:py-24 bg-primary/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">A Day in the Field</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                Following the rhythm of the sun and seasons, a farmer's day is a testament to hard work and resilience.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                            {dailyRoutineData.map((item) => (
                                <Card key={item.task} className="text-center flex flex-col items-center p-6 bg-card">
                                     <div className="mb-4 text-primary bg-primary/10 p-4 rounded-full">
                                        {item.icon}
                                    </div>
                                    <CardHeader className="p-0">
                                        <CardTitle className="font-bold text-xl">{item.time}</CardTitle>
                                        <CardDescription className="font-headline text-lg">{item.task}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="farming-regions" className="py-16 md:py-24 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">Farming Across Regions</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                From the wheat fields of Punjab to the coconut groves of Kerala, discover India's agricultural diversity.
                            </p>
                        </div>
                        <Tabs defaultValue="Punjab" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-8">
                                {Object.keys(farmingRegionsData).map(region => (
                                    <TabsTrigger key={region} value={region}>{region}</TabsTrigger>
                                ))}
                            </TabsList>
                            {Object.entries(farmingRegionsData).map(([region, data]) => (
                                <TabsContent key={region} value={region}>
                                    <Card className="overflow-hidden">
                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            <div className="relative h-64 md:h-full w-full">
                                                <Image src={data.image} alt={`${region} farming`} fill className="object-cover" data-ai-hint={data.hint} />
                                            </div>
                                            <div className="p-6 md:p-8">
                                                <CardHeader className="p-0 mb-4">
                                                    <CardTitle className="font-headline text-3xl flex items-center gap-2"><MapPin size={24} className="text-primary"/> {region}</CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-0 space-y-4">
                                                    <div>
                                                        <h4 className="font-bold text-lg flex items-center gap-2 mb-2"><Leaf className="text-green-600"/>Major Crops</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {data.crops.map(crop => <Badge key={crop} variant="secondary">{crop}</Badge>)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lg flex items-center gap-2 mb-2"><Sun className="text-amber-500"/>Seasonal Patterns</h4>
                                                         <div className="flex flex-wrap gap-2">
                                                            {data.patterns.map(pattern => <Badge key={pattern} variant="outline">{pattern}</Badge>)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lg flex items-center gap-2 mb-2"><Droplets className="text-blue-500"/>Irrigation</h4>
                                                        <p className="text-muted-foreground">{data.irrigation}</p>
                                                    </div>
                                                </CardContent>
                                            </div>
                                        </div>
                                    </Card>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-primary/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">Tools of the Trade</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                Exploring the traditional and modern implements that help cultivate the land.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {farmingToolsData.map((tool) => (
                                <Card key={tool.name} className="overflow-hidden group">
                                     <CardContent className="p-0">
                                        <div className="relative h-56 w-full">
                                             <Image src={tool.image} alt={tool.name} fill className="object-cover" data-ai-hint={tool.hint}/>
                                        </div>
                                     </CardContent>
                                     <CardHeader>
                                        <CardTitle className="font-headline text-2xl">{tool.name}</CardTitle>
                                        <CardDescription>{tool.description}</CardDescription>
                                     </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">Challenges on the Field</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                A look at the real-world struggles faced by India's farming communities with resilience and hope.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            {farmingChallengesData.map((challenge) => (
                                <Card key={challenge.title} className="p-6 flex flex-col items-center">
                                    <CardHeader className="items-center">
                                        <div className="bg-primary/10 p-4 rounded-full w-fit">
                                            {challenge.icon}
                                        </div>
                                        <CardTitle className="font-headline text-2xl mt-4">{challenge.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{challenge.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-primary/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">Voices of the Soil</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                Listen to the wisdom and stories directly from the farmers.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {farmerVoicesData.map((voice) => (
                                <Card key={voice.name} className="flex flex-col md:flex-row items-center gap-6 p-6">
                                    <Image src={voice.image} alt={voice.name} width={100} height={100} className="rounded-full object-cover w-24 h-24 md:w-32 md:h-32 border-4 border-primary/20" data-ai-hint={voice.hint} />
                                    <div className="text-center md:text-left">
                                        <blockquote className="text-lg italic text-foreground">"{voice.quote}"</blockquote>
                                        <p className="font-bold text-primary mt-2">{voice.name}</p>
                                        <p className="text-sm text-muted-foreground">{voice.region}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
            </main>
            <Footer />
        </div>
    );
};

export default FarmingLifestylePage;
