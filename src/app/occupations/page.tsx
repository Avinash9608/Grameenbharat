
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlayCircle, Wheat, Hammer, Sprout, PawPrint, ShoppingBasket, Construction, SwatchBook, Info, Target, Fish, Hexagon, Leaf } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Occupation {
    name: string;
    description: string;
    image: string;
    hint: string;
    region: string;
    icon: JSX.Element;
    details: {
        title: string;
        description: string;
        image: string;
        keyFacts: string[];
    };
}

const occupationsData: Occupation[] = [
    {
        name: 'Agriculture & Farming',
        description: 'The backbone of the rural economy, involving the cultivation of crops like rice, wheat, and sugarcane.',
        image: 'https://images.unsplash.com/photo-1620563202672-36d713a79f8d?w=600&auto=format&fit=crop',
        hint: 'indian farmer wheat',
        region: 'Punjab, Uttar Pradesh',
        icon: <Wheat className="h-8 w-8 text-primary" />,
        details: {
            title: 'The Heartbeat of India: Agriculture',
            description: "Farming is more than just an occupation in rural India; it's a way of life that has been passed down through generations. It dictates festivals, daily routines, and the economic health of the community. Farmers battle unpredictable weather, market fluctuations, and water shortages, yet their resilience forms the bedrock of the nation's food security.",
            image: 'https://images.unsplash.com/photo-1662815094316-917f52876324?w=600&auto=format&fit=crop',
            keyFacts: [
                "Contributes to about 17% of India's GDP.",
                "Employs over 50% of the Indian workforce.",
                "Major crops include rice, wheat, cotton, and sugarcane.",
                "Traditional methods are often blended with modern technology."
            ]
        }
    },
    {
        name: 'Handloom & Weaving',
        description: 'Ancient art of creating intricate textiles and fabrics, from sarees to shawls, by hand.',
        image: 'https://images.unsplash.com/photo-1583415303571-20185869c4bc?w=600&auto=format&fit=crop',
        hint: 'weaving loom',
        region: 'Varanasi, Kanchipuram',
        icon: <SwatchBook className="h-8 w-8 text-primary" />,
        details: {
            title: 'Threads of Tradition: The Art of Handloom',
            description: "In the quiet corners of many villages, the rhythmic clatter of the handloom tells a story of artistry and heritage. Weavers, with their exceptional skills, transform simple threads into masterpieces like the Banarasi Saree or the Pashmina Shawl. Each pattern and motif carries a piece of local culture and history.",
            image: 'https://media.istockphoto.com/id/535403936/photo/handloom-weaver-in-india.webp?b=1&s=170667a&w=0&k=20&c=6h8M-OYA9sJ3cZfl5aG7-Jz2Vd-JjwqfXf2A8_HlO5w=',
            keyFacts: [
                "India produces 95% of the world's hand-woven fabric.",
                "It is the second-largest employment provider for the rural population after agriculture.",
                "Techniques are often family secrets passed down through generations.",
                "Faces competition from power looms and fast fashion."
            ]
        }
    },
    {
        name: 'Carpentry & Bamboo Craft',
        description: 'Skilled artisans crafting furniture, tools, and decorative items from wood and versatile bamboo.',
        image: 'https://images.unsplash.com/photo-1614081781513-d0c6f10b0366?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        hint: 'bamboo craft',
        region: 'Assam, Tripura',
        icon: <Hammer className="h-8 w-8 text-primary" />,
        details: {
            title: 'Gifts of the Forest: Wood and Bamboo',
            description: "From the sturdy bullock cart to the delicate bamboo flute, carpenters and bamboo craftsmen are the architects of rural utility and art. Using simple tools, they create objects that are both functional and beautiful. Bamboo, in particular, is a sustainable resource used for everything from housing to household items in Northeast India.",
            image: 'https://images.unsplash.com/photo-1579583765365-a843f5213d22?w=600&auto=format&fit=crop',
            keyFacts: [
                "Bamboo is often called 'green gold' for its versatility.",
                "Craftsmanship is highly localized, with unique styles in different regions.",
                "Provides essential items for daily agricultural and domestic life.",
                "Sustainable and eco-friendly practices are inherent to the craft."
            ]
        }
    },
    {
        name: 'Animal Husbandry & Dairy',
        description: 'Rearing livestock like cows, goats, and buffaloes for milk, meat, and other dairy products.',
        image: 'https://images.unsplash.com/photo-1634966697712-c3c0d3db3fdc?w=600&auto=format&fit=crop',
        hint: 'woman cow',
        region: 'Gujarat, Rajasthan',
        icon: <PawPrint className="h-8 w-8 text-primary" />,
        details: {
            title: 'The Pastoral Life: Nurturing Livestock',
            description: "For many rural families, livestock is a living bank account. Cows, buffaloes, goats, and chickens provide a steady source of income and nutrition through milk, eggs, and meat. The relationship between the family and their animals is one of deep care and symbiosis, forming a crucial part of the rural socio-economic fabric.",
            image: 'https://images.unsplash.com/photo-1620206297-f55964893899?w=600&auto=format&fit=crop',
            keyFacts: [
                "India is the world's largest milk producer.",
                "The 'White Revolution' transformed India from a milk-deficient nation into a world leader.",
                "Livestock often provides draft power for farming and transport.",
                "Animal waste is used as organic fertilizer and fuel."
            ]
        }
    },
    {
        name: 'Pottery & Terracotta',
        description: 'The timeless craft of shaping clay into pots, lamps, and decorative items, baked for durability.',
        image: 'https://images.unsplash.com/photo-1604464543433-149fe779b779?q=80&w=626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        hint: 'pottery wheel',
        region: 'West Bengal, Rajasthan',
        icon: <Leaf className="h-8 w-8 text-primary" />,
        details: {
            title: 'Shaping Earth: The Potter\'s Wheel',
            description: "The potter's wheel has been spinning in India for millennia. With practiced hands, a potter transforms a simple lump of clay into functional pots for storing water, decorative diyas for festivals, and artistic terracotta idols. This eco-friendly craft is deeply connected to the earth and the daily needs of the community.",
            image: 'https://images.unsplash.com/photo-1578326457399-3b34a4a5f2a3?w=600&auto=format&fit=crop',
            keyFacts: [
                "One of the most ancient crafts in India, with evidence from the Indus Valley Civilization.",
                "The clay used is sourced locally from riverbeds or ponds.",
                "Items are biodegradable and environmentally friendly.",
                "The firing process in traditional kilns is a masterful skill."
            ]
        }
    },
    {
        name: 'Fishing & Poultry',
        description: 'A primary livelihood for coastal and riverside communities, depending on nets, boats, and traditional knowledge.',
        image: 'https://images.unsplash.com/photo-1624668431028-75dfeafd9b83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RmlzaGluZyUyMCUyNiUyMFBvdWx0cnl8ZW58MHx8MHx8fDA%3D',
        hint: 'indian fisherman',
        region: 'Kerala, West Bengal',
        icon: <Fish className="h-8 w-8 text-primary" />,
        details: {
            title: 'The Bounty of the Waters: Fishing Communities',
            description: "Life in coastal and riverside villages revolves around the rhythm of the tides and the flow of the river. Fishermen brave the waters with their traditional boats and nets, relying on ancestral knowledge of the currents and fish behavior. Their catch not only feeds their families but also supplies local markets, forming a vital part of the regional economy.",
            image: 'https://images.unsplash.com/photo-1621232851733-28955a8a6587?w=600&auto=format&fit=crop',
            keyFacts: [
                "India has a coastline of over 8,000 kilometers.",
                "Traditional fishing methods, like the use of Chinese fishing nets in Kerala, are major tourist attractions.",
                "Freshwater fishing in rivers and ponds is also a significant activity.",
                "Communities have a deep respect for the water bodies that sustain them."
            ]
        }
    },
     {
        name: 'Masonry & Construction',
        description: 'Building homes and community structures using traditional techniques and locally sourced materials.',
        image: 'https://plus.unsplash.com/premium_photo-1682366278685-73513e8be5cb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        hint: 'construction worker',
        region: 'Nationwide',
        icon: <Construction className="h-8 w-8 text-primary" />,
        details: {
            title: 'Building Foundations: The Village Mason',
            description: "Village masons are the builders of the community. They construct homes, schools, and temples using locally sourced materials like mud, brick, stone, and bamboo. Their techniques are often adapted to the local climate, creating structures that are naturally cool in summer and warm in winter. Their work is a blend of engineering and artistry.",
            image: 'https://media.istockphoto.com/id/175432321/photo/indian-workers.webp?b=1&s=170667a&w=0&k=20&c=0Kkpa5nCOZQyZqFzM0tmaGAoG8CAb23yLaxdwBQRHSo=',
            keyFacts: [
                "Traditional architecture often uses natural ventilation and cooling techniques.",
                "Locally sourced materials reduce the carbon footprint.",
                "Skills are typically passed on through apprenticeship.",
                "Masons play a crucial role in post-disaster rebuilding efforts."
            ]
        }
    },
    {
        name: 'Vegetable Selling / Market Trading',
        description: 'Selling fresh vegetables, fruits, and handmade goods in bustling local markets (haats).',
        image: 'https://images.unsplash.com/photo-1587535919292-301def3230a0?w=600&auto=format&fit=crop',
        hint: 'village market',
        region: 'Nationwide',
        icon: <ShoppingBasket className="h-8 w-8 text-primary" />,
        details: {
            title: 'The Colors of Commerce: The Local Haat',
            description: "The weekly market, or 'haat', is the vibrant commercial and social hub of the village. Traders, who are often farmers and artisans themselves, sell everything from fresh produce and spices to handmade crafts and clothing. It's a place of bustling energy, social exchange, and economic sustenance for the entire region.",
            image: 'https://images.unsplash.com/photo-1610730686196-1642e127e338?w=600&auto=format&fit=crop',
            keyFacts: [
                "Haats are a centuries-old tradition for rural commerce.",
                "They are crucial for the local economy, connecting producers directly with consumers.",
                "Bartering is still practiced in some remote village markets.",
                "The market day is often a social occasion for the community."
            ]
        }
    },
    {
        name: 'Honey Collection & Forest Produce',
        description: 'Gathering wild honey and other natural products from forests, a practice that requires deep ecological knowledge.',
        image: 'https://images.unsplash.com/photo-1652340183977-9e22fe41870c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        hint: 'honey collection',
        region: 'Sundarbans, Western Ghats',
        icon: <Hexagon className="h-8 w-8 text-primary" />,
        details: {
            title: 'The Sweetness of the Wild: Forest Gatherers',
            description: 'In forest-dwelling communities, life is intricately linked with the wild. Honey collectors, with immense courage and traditional wisdom, venture deep into the forests to gather wild honey. This occupation, along with collecting other produce like medicinal herbs and leaves, is a sustainable livelihood that depends on a harmonious relationship with nature.',
            image: 'https://images.unsplash.com/photo-1600806346714-dba2fde8f483?w=600&auto=format&fit=crop',
            keyFacts: [
                'Requires intimate knowledge of bee behavior and forest paths.',
                'Many communities perform rituals to ask for protection before entering the forest.',
                'Besides honey, they collect tendu leaves, sal seeds, and mahua flowers.',
                'Over-exploitation and climate change pose significant threats to this livelihood.',
            ],
        },
    },
    {
        name: 'Tribal Hunting & Occupations',
        description: 'Traditional hunting and gathering practices of indigenous communities, deeply rooted in their cultural identity.',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop',
        hint: 'tribal community',
        region: 'Central & Northeast India',
        icon: <Target className="h-8 w-8 text-primary" />,
        details: {
            title: 'Echoes of the Ancestors: Tribal Livelihoods',
            description: 'For many indigenous tribes in India, traditional occupations like hunting with bows and arrows, gathering, and shifting cultivation (jhum) are not just for sustenance but are central to their cultural and spiritual identity. These practices are governed by age-old community laws and a deep respect for the balance of nature.',
            image: 'https://images.unsplash.com/photo-1542385153-285d88dd2248?w=600&auto=format&fit=crop',
            keyFacts: [
                'Hunting is often a communal activity, followed by equitable distribution.',
                'These occupations are intertwined with folklore, rituals, and festivals.',
                'Knowledge of the forest, its flora, and fauna is passed down orally.',
                'Modern laws and deforestation have significantly impacted these traditional practices.',
            ],
        },
    },
];

const videoTestimonials = [
    { title: "A Farmer's Story", videoId: "Bhs7yXhJBdo", hint: "farmer working" },
    { title: "The Weaver's Art", videoId: "Yn2e5y7i4-E", hint: "weaving saree" },
    { title: "Crafting with Bamboo", videoId: "CsBmy8oJiLM", hint: "bamboo craft" },
];


const OccupationsPage = () => {
    const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
    const [selectedOccupation, setSelectedOccupation] = useState<Occupation | null>(null);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />

                <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
                    <div className="absolute inset-0 z-[-1]">
                        <Image
                            src="https://images.unsplash.com/photo-1642519898120-76e8d6038eda?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="A farmer working in a field"
                            fill
                            className="object-cover brightness-75"
                            priority
                            data-ai-hint="indian farmer"
                        />
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-6 p-4">
                        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-lg">
                            Rooted in Tradition, Driven by Labor
                        </h1>
                        <p className="max-w-3xl text-lg md:text-xl lg:text-2xl text-stone-100 drop-shadow-md">
                            Discover the soul of rural India through its diverse and timeless occupations.
                        </p>
                        <Button asChild size="lg" className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg">
                            <a href="#occupations-grid">Explore Occupations</a>
                        </Button>
                    </div>
                </section>
                
                <main id="occupations-grid" className="flex-1 py-16 md:py-24 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">A Tapestry of Livelihoods</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                From the fertile fields to the skilled hands of artisans, explore the occupations that sustain village life.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {occupationsData.map((occupation) => (
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
                                        <Button variant="secondary" className="w-full" onClick={() => setSelectedOccupation(occupation)}>Read More</Button>
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
                                    <div key={video.videoId}>
                                        <Card className="overflow-hidden group border-none shadow-lg">
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
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
                <Footer />
            </div>
            
            <Dialog open={!!selectedOccupation} onOpenChange={(isOpen) => !isOpen && setSelectedOccupation(null)}>
                <DialogContent className="sm:max-w-3xl p-0">
                    {selectedOccupation && (
                        <>
                            <div className="relative h-64 w-full">
                                <Image src={selectedOccupation.details.image} alt={selectedOccupation.details.title} fill className="object-cover rounded-t-lg" />
                            </div>
                            <DialogHeader className="p-6">
                                <DialogTitle className="font-headline text-3xl mb-2">{selectedOccupation.details.title}</DialogTitle>
                                <DialogDescription className="text-base text-muted-foreground">
                                    {selectedOccupation.details.description}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="px-6 pb-6">
                                <h4 className="font-bold text-lg mb-3 flex items-center gap-2"><Info className="text-primary"/> Key Facts</h4>
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    {selectedOccupation.details.keyFacts.map((fact, index) => (
                                        <li key={index}>{fact}</li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default OccupationsPage;
