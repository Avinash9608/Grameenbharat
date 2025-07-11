
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
import { Building, Home, Blocks, Leaf, Milestone, Wind, Shield, Users, Sun, Droplets, MapPin } from 'lucide-react';

const regionalHomesData = {
    North: [
        { 
            name: 'Mud & Thatch Huts (Jhopdi)', 
            state: 'Rajasthan',
            materials: ['Mud', 'Cow Dung', 'Straw'],
            adaptation: 'Thick walls keep interiors cool in extreme heat.',
            culture: 'Walls are often decorated with Mandana art.',
            image: 'https://images.unsplash.com/photo-1618767568559-2c0926a27483?w=600&auto=format&fit=crop',
            hint: 'rajasthani mud hut' 
        },
        { 
            name: 'Chang Ghar (Raised Huts)', 
            state: 'Assam',
            materials: ['Bamboo', 'Cane', 'Wood'],
            adaptation: 'Elevated on stilts to protect from floods in the Brahmaputra plains.',
            culture: 'Weaving looms are often kept underneath the house.',
            image: 'https://media.istockphoto.com/id/1324727198/photo/traditional-mishing-house-in-majuli-assam.webp?b=1&s=170667a&w=0&k=20&c=06KqHqi4Jj8_g-4aI4oNnqZqQG_Hq-V2f7yv-Xj-G_8=',
            hint: 'assam bamboo house' 
        },
    ],
    South: [
        { 
            name: 'Nalukettu Houses', 
            state: 'Kerala',
            materials: ['Laterite Stone', 'Wood', 'Clay Tiles'],
            adaptation: 'Sloping roofs handle heavy monsoon rains; a central courtyard provides ventilation.',
            culture: 'The design is based on Thachu Shastra, the ancient science of carpentry.',
            image: 'https://assets.architecturaldigest.in/photos/60084d33a28465a7f24057a1/16:9/w_2560%2Cc_limit/kerala-traditional-nalukettu-home-1366x768.jpg',
            hint: 'kerala nalukettu' 
        },
    ],
    East: [
       { 
            name: 'Lippan Mud Homes', 
            state: 'Bihar',
            materials: ['Clay', 'Cow Dung', 'Hay'],
            adaptation: 'Thick walls and small windows maintain a cool temperature indoors.',
            culture: 'Homes are decorated with intricate white paint patterns after monsoons.',
            image: 'https://i.pinimg.com/originals/9a/36/f1/9a36f1c435553e1a14bec938c558c44c.jpg',
            hint: 'bihar village house' 
        },
    ],
    West: [
        { 
            name: 'Bhunga Huts', 
            state: 'Kutch, Gujarat',
            materials: ['Mud', 'Bamboo', 'Mirrors'],
            adaptation: 'The circular structure is inherently stable and resistant to earthquakes.',
            culture: 'Famous for Lippan Kaam (mud and mirror work) on the interior walls.',
            image: 'https://images.unsplash.com/photo-1609692813904-a169b1586563?w=600&auto=format&fit=crop',
            hint: 'kutch bhunga hut' 
        },
    ]
};

const materialsData = [
    { title: 'Mud & Clay', description: 'Excellent natural insulator, keeping homes cool in summer and warm in winter. It is cheap, abundant, and easy to repair.', icon: <Blocks/>, image: 'https://media.istockphoto.com/id/1149451996/photo/clay-pot.webp?b=1&s=170667a&w=0&k=20&c=L_Jg9Ydo3_4XML2S-AyORsVT_JDErU_P2b-5LRv5lRg=', hint: 'mud clay' },
    { title: 'Bamboo & Cane', description: 'Highly sustainable and flexible, making it ideal for earthquake-prone regions. It is lightweight yet strong.', icon: <Milestone/>, image: 'https://images.unsplash.com/photo-1579583765365-a843f5213d22?w=600&auto=format&fit=crop', hint: 'bamboo craft' },
    { title: 'Laterite Stone', description: 'A porous, iron-rich rock found in coastal and humid areas. It hardens on exposure to air, making it a durable building material.', icon: <Home/>, image: 'https://media.istockphoto.com/id/1400235948/photo/brick-wall-texture-of-a-laterite-rock-stone.webp?b=1&s=170667a&w=0&k=20&c=wX_QfgQJ5kM4aX-fC07vYI2lCAbG9cO2V_q6oUu_Z_c=', hint: 'laterite stone' },
    { title: 'Cow Dung Plaster', description: 'A natural, anti-bacterial plaster that also acts as an insect repellent. It is used for both floors and walls.', icon: <Shield/>, image: 'https://media.istockphoto.com/id/1447094052/photo/indian-woman-plastering-the-floor-of-her-house-with-cow-dung.webp?b=1&s=170667a&w=0&k=20&c=t9C_j8eT7A5rWk180n3wG_m_J7dG2u0j2y0hD5j8l-I=', hint: 'cow dung' },
    { title: 'Thatch & Palm Leaves', description: 'Used for roofing in many tribal and coastal homes, providing excellent, breathable insulation.', icon: <Leaf/>, image: 'https://images.unsplash.com/photo-1629899380962-1323337f7422?w=600&auto=format&fit=crop', hint: 'thatched roof' },
];

const culturalElementsData = [
    { name: 'Tulsi Vrindavan', location: 'Nationwide', relevance: 'A sacred basil plant in a decorated pot, usually placed in the courtyard for worship.', image: 'https://media.istockphoto.com/id/1321118118/photo/decorated-pot-with-a-tulsi-plant-in-front-of-a-house-in-india.webp?b=1&s=170667a&w=0&k=20&c=r5p-x8kGQuP0xM-W1oPZ0J4gK_RBr_E61sE-V3qD0uU=', hint: 'tulsi plant' },
    { name: 'Aangan (Courtyard)', location: 'North India', relevance: 'An open central space for socializing, ceremonies, and household chores.', image: 'https://media.istockphoto.com/id/1498075342/photo/an-abandoned-haveli-in-a-village.webp?b=1&s=170667a&w=0&k=20&c=0eHl2D5i8JDW3F-a7a_65zR33T1qfEa2B2pY7xJ9m-Q=', hint: 'indian courtyard' },
    { name: 'Mandana Wall Art', location: 'Rajasthan', relevance: 'Folk art painted on walls and floors to welcome gods and mark celebrations.', image: 'https://media.istockphoto.com/id/1360010931/photo/mandana-painting-on-the-wall-of-a-village-house-in-rajasthan.webp?b=1&s=170667a&w=0&k=20&c=g-w6t2-aLh1E4K04pGj8k_nL0cQ2k1q0z-Z0jZ4jZ_A=', hint: 'mandana art' },
];

const ArchitecturePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                <section className="relative h-[60vh] w-full flex items-center justify-center text-center">
                    <div className="absolute inset-0 z-[-1]">
                        <Image
                            src="https://plus.unsplash.com/premium_photo-1721165941568-bc6813053bcd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="A beautiful village home in Rajasthan"
                            fill
                            className="object-cover brightness-75"
                            priority
                            data-ai-hint="rajasthan house"
                        />
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-6 p-4 text-white">
                        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
                           Where Culture Lives
                        </h1>
                        <p className="max-w-2xl text-lg md:text-xl drop-shadow-md">
                           Sustainable, Traditional, and Rooted in the Soil
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg">
                                <a href="#regional-homes">Explore Regional Homes</a>
                            </Button>
                        </div>
                    </div>
                </section>

                <section id="regional-homes" className="py-16 md:py-24 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">Homes by Region</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                Discover how climate, culture, and local materials shape the architecture of rural India.
                            </p>
                        </div>
                        <Tabs defaultValue="North" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                                <TabsTrigger value="North">North</TabsTrigger>
                                <TabsTrigger value="South">South</TabsTrigger>
                                <TabsTrigger value="East">East</TabsTrigger>
                                <TabsTrigger value="West">West</TabsTrigger>
                            </TabsList>

                            {Object.entries(regionalHomesData).map(([region, homes]) => (
                                <TabsContent key={region} value={region}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {homes.map((home, index) => (
                                            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                                                <div className="relative h-56 w-full">
                                                    <Image src={home.image} alt={home.name} fill className="object-cover" data-ai-hint={home.hint} />
                                                </div>
                                                <CardHeader>
                                                    <CardTitle className="font-headline text-2xl">{home.name}</CardTitle>
                                                    <CardDescription className="font-semibold text-primary flex items-center gap-1"><MapPin size={14}/> {home.state}</CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex-grow space-y-4">
                                                    <div>
                                                        <h4 className="font-bold mb-1">Materials:</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {home.materials.map(m => <Badge key={m} variant="secondary">{m}</Badge>)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold mb-1 flex items-center gap-1"><Sun className="text-amber-500"/> Climate Adaptation:</h4>
                                                        <p className="text-sm text-muted-foreground">{home.adaptation}</p>
                                                    </div>
                                                      <div>
                                                        <h4 className="font-bold mb-1 flex items-center gap-1"><Users className="text-blue-500"/> Cultural Notes:</h4>
                                                        <p className="text-sm text-muted-foreground">{home.culture}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </section>
                
                <section className="py-16 md:py-24 bg-primary/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">The Art of Sustainable Building</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                An exploration of the traditional, eco-friendly materials used in village construction.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                             {materialsData.map((material) => (
                                <Card key={material.title} className="text-center flex flex-col items-center p-6 bg-card">
                                    <div className="mb-4 text-primary bg-primary/10 p-4 rounded-full">
                                        {material.icon}
                                    </div>
                                    <CardHeader className="p-0">
                                        <CardTitle className="font-headline text-2xl mb-2">{material.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0 flex-grow">
                                        <CardDescription>{material.description}</CardDescription>
                                    </CardContent>
                                </Card>
                             ))}
                        </div>
                    </div>
                </section>
                
                 <section className="py-16 md:py-24 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">Where Home Meets Heart</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                Exploring the cultural and ritualistic elements that make a house a home.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {culturalElementsData.map((item) => (
                                <Card key={item.name} className="text-center overflow-hidden group">
                                     <CardContent className="p-0">
                                        <div className="relative h-56 w-full">
                                             <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.hint}/>
                                        </div>
                                     </CardContent>
                                     <CardHeader>
                                        <CardTitle className="font-headline text-2xl">{item.name}</CardTitle>
                                        <CardDescription className="font-bold text-primary">{item.relevance}</CardDescription>
                                     </CardHeader>
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

export default ArchitecturePage;

    