
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlayCircle, Wheat, Hammer, Sprout, PawPrint, ShipWheel, ShoppingBasket, Construction, SwatchBook } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const occupations = [
    {
        name: 'Agriculture & Farming',
        description: 'The backbone of the rural economy, involving the cultivation of crops like rice, wheat, and sugarcane.',
        image: 'https://images.unsplash.com/photo-1620563202672-36d713a79f8d?w=600&auto=format&fit=crop',
        hint: 'indian farmer wheat',
        region: 'Punjab, Uttar Pradesh',
        icon: <Wheat className="h-8 w-8 text-primary" />,
    },
    {
        name: 'Handloom & Weaving',
        description: 'Ancient art of creating intricate textiles and fabrics, from sarees to shawls, by hand.',
        image: 'https://images.unsplash.com/photo-1583415303571-20185869c4bc?w=600&auto=format&fit=crop',
        hint: 'weaving loom',
        region: 'Varanasi, Kanchipuram',
        icon: <SwatchBook className="h-8 w-8 text-primary" />,
    },
    {
        name: 'Carpentry & Bamboo Craft',
        description: 'Skilled artisans crafting furniture, tools, and decorative items from wood and versatile bamboo.',
        image: 'https://media.istockphoto.com/id/121260897/photo/asian-market-of-bamboo-crafts.webp?b=1&s=170667a&w=0&k=20&c=L28BCz_2Y-9aZk1cE-VT3LgKGl_j1XkGkBHu6u2d3aU=',
        hint: 'bamboo craft',
        region: 'Assam, Tripura',
        icon: <Hammer className="h-8 w-8 text-primary" />,
    },
    {
        name: 'Animal Husbandry & Dairy',
        description: 'Rearing livestock like cows, goats, and buffaloes for milk, meat, and other dairy products.',
        image: 'https://images.unsplash.com/photo-1634966697712-c3c0d3db3fdc?w=600&auto=format&fit=crop',
        hint: 'woman cow',
        region: 'Gujarat, Rajasthan',
        icon: <PawPrint className="h-8 w-8 text-primary" />,
    },
    {
        name: 'Pottery & Terracotta',
        description: 'The timeless craft of shaping clay into pots, lamps, and decorative items, baked for durability.',
        image: 'https://images.unsplash.com/photo-1557996552-873f22f7b168?w=600&auto=format&fit=crop',
        hint: 'pottery wheel',
        region: 'West Bengal, Rajasthan',
        icon: <Sprout className="h-8 w-8 text-primary" />,
    },
    {
        name: 'Fishing',
        description: 'A primary livelihood for coastal and riverside communities, depending on nets, boats, and traditional knowledge.',
        image: 'https://images.unsplash.com/photo-1541552382-9a3976345999?w=600&auto=format&fit=crop',
        hint: 'indian fisherman',
        region: 'Kerala, West Bengal',
        icon: <ShipWheel className="h-8 w-8 text-primary" />,
    },
     {
        name: 'Masonry & Construction',
        description: 'Building homes and community structures using traditional techniques and locally sourced materials.',
        image: 'https://images.unsplash.com/photo-1581094376366-3d22e0399333?w=600&auto=format&fit=crop',
        hint: 'construction worker',
        region: 'Nationwide',
        icon: <Construction className="h-8 w-8 text-primary" />,
    },
    {
        name: 'Market Trading',
        description: 'Selling fresh vegetables, fruits, and handmade goods in bustling local markets (haats).',
        image: 'https://images.unsplash.com/photo-1587535919292-301def3230a0?w=600&auto=format&fit=crop',
        hint: 'village market',
        region: 'Nationwide',
        icon: <ShoppingBasket className="h-8 w-8 text-primary" />,
    },
];

const videoTestimonials = [
    { title: "A Farmer's Story", videoId: "Bhs7yXhJBdo", hint: "farmer working" },
    { title: "The Weaver's Art", videoId: "Yn2e5y7i4-E", hint: "weaving saree" },
    { title: "Crafting with Bamboo", videoId: "CsBmy8oJiLM", hint: "bamboo craft" },
];


const OccupationsPage = () => {
    const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            <section className="relative h-[60vh] w-full flex items-start justify-center text-center overflow-hidden pt-24 md:pt-32">
                <div className="absolute inset-0 z-[-1]">
                    <Image
                        src="https://images.unsplash.com/photo-1594759438498-234271c45d3a?w=1920&h=1080&auto=format&fit=crop"
                        alt="A farmer working in a field"
                        fill
                        className="object-cover"
                        priority
                        data-ai-hint="indian farmer"
                    />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-6 p-4">
                    <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground drop-shadow-lg">
                        Rooted in Tradition, Driven by Labor
                    </h1>
                    <p className="max-w-3xl text-lg md:text-xl lg:text-2xl text-foreground/80 drop-shadow-md">
                        Discover the soul of rural India through its diverse and timeless occupations.
                    </p>
                    <Button asChild size="lg" className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg">
                        <a href="#occupations-grid">Explore Occupations</a>
                    </Button>
                </div>
            </section>
            
            <main id="occupations-grid" className="flex-1 py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="font-headline text-4xl md:text-5xl font-bold">A Tapestry of Livelihoods</h2>
                        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                            From the fertile fields to the skilled hands of artisans, explore the occupations that sustain village life.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {occupations.map((occupation) => (
                            <Card key={occupation.name} className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col bg-card">
                                <div className="relative h-56 w-full">
                                    <Image src={occupation.image} alt={occupation.name} fill className="object-cover" data-ai-hint={occupation.hint} />
                                </div>
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl flex items-center gap-3">
                                        {occupation.icon} {occupation.name}
                                    </CardTitle>
                                    <CardDescription className="font-semibold text-primary">{occupation.region}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground">{occupation.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="secondary" className="w-full">Read More</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                     <section id="videos" className="py-16 md:py-24">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">Voices from the Village</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                Watch short stories and testimonials from the people behind the craft.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {videoTestimonials.map((video) => (
                                <Card key={video.videoId} className="overflow-hidden group border-none shadow-lg">
                                    <CardContent className="relative aspect-video p-0 bg-black">
                                        {playingVideoId === video.videoId ? (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                                                title={video.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                                className="w-full h-full"
                                            ></iframe>
                                        ) : (
                                            <div className="w-full h-full cursor-pointer" onClick={() => setPlayingVideoId(video.videoId)}>
                                                <Image
                                                    src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                                                    alt={video.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    data-ai-hint={video.hint}
                                                />
                                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50">
                                                    <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                                                </div>
                                                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
                                                    <h3 className="font-headline text-xl text-white font-semibold">{video.title}</h3>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OccupationsPage;
