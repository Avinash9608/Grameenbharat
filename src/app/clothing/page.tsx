
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Gem, Shirt, VenetianMask, MapPin } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Item {
    name: string;
    image: string;
    hint: string;
    description: string;
    type: 'Clothing' | 'Jewelry';
}

const culturalAttireData: { [state: string]: Item[] } = {
    "Rajasthan": [
        { name: 'Ghagra Choli', image: 'https://images.unsplash.com/photo-1617543134934-6e1b0928a34b?w=600&auto=format&fit=crop', hint: 'rajasthani woman', description: 'A long, embroidered skirt paired with a fitted blouse, known for its vibrant colors and mirror work.', type: 'Clothing' },
        { name: 'Bandhgala (Men)', image: 'https://media.istockphoto.com/id/1349383827/photo/portrait-of-a-confident-indian-man-in-a-turban.webp?b=1&s=170667a&w=0&k=20&c=a2XlH5qHtuXN4t7WkOfgG25hH7JCzP2jY-3q0m42cMA=', hint: 'rajasthani man', description: 'A formal jacket with a high collar, often worn with a turban (pagdi) for a regal look.', type: 'Clothing' },
        { name: 'Borla (Maang Tikka)', image: 'https://media.istockphoto.com/id/1186759798/photo/beautiful-indian-bride.webp?b=1&s=170667a&w=0&k=20&c=qls9k84jOf0hMClnS8tQe4tTf-qrgY2l2yqcrqQ2sf8=', hint: 'indian jewelry', description: 'A spherical head ornament worn on the forehead, symbolizing marital status.', type: 'Jewelry' },
        { name: 'Kundan Necklace', image: 'https://media.istockphoto.com/id/1218128384/photo/beautiful-indian-bride-in-traditional-costume.webp?b=1&s=170667a&w=0&k=20&c=nL3L04jKQSq8tEM3mJ5aH6hS5Qcpa-bSleAszCH8aAs=', hint: 'kundan jewelry', description: 'Elaborate jewelry made by setting polished gemstones in a gold foil base.', type: 'Jewelry' },
    ],
    "Punjab": [
        { name: 'Salwar Kameez', image: 'https://media.istockphoto.com/id/1321443429/photo/indian-woman-in-traditional-clothing-in-a-mustard-field.webp?b=1&s=170667a&w=0&k=20&c=qXkI1mC2A8PqT5W3obnB6yqGXYB8iSo8a-HqOaMmFkQ=', hint: 'punjabi woman', description: 'A comfortable and elegant outfit consisting of loose trousers (salwar) and a long tunic (kameez).', type: 'Clothing' },
        { name: 'Paranda (Hair Tassel)', image: 'https://media.istockphoto.com/id/1413812231/photo/beautiful-indian-woman-with-long-braid-and-parandi-standing-in-mustard-field.webp?b=1&s=170667a&w=0&k=20&c=c-iM-q4t7YhM3yAbltqYc0M9vTqKXA9FkL7vQ1sC0-k=', hint: 'braided hair', description: 'A colorful tassel woven into a braid, often adorned with beads and threads.', type: 'Jewelry' },
        { name: 'Jutti (Footwear)', image: 'https://media.istockphoto.com/id/1284300796/photo/traditional-indian-jutti-or-shoes-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=6c70iNlE8p-5hqsB9GqB0g9JChgA8FAGDlnBeJm2o_I=', hint: 'traditional shoes', description: 'Handcrafted leather footwear with intricate embroidery, popular for both men and women.', type: 'Clothing' },
    ],
    "Kerala": [
        { name: 'Kasavu Saree', image: 'https://images.unsplash.com/photo-1621758835263-8a1924558a18?w=600&auto=format&fit=crop', hint: 'kerala saree', description: 'An elegant white or cream-colored saree with a golden border (zari), traditionally worn during festivals.', type: 'Clothing' },
        { name: 'Mundu (Men)', image: 'https://media.istockphoto.com/id/520894752/photo/indian-man-in-a-white-traditional-attire.webp?b=1&s=170667a&w=0&k=20&c=0cRRTF8MfjLq9v7H6OgqF_y-c5qGgAyI79s_9uT2iL4=', hint: 'kerala man', description: 'A garment worn around the waist, similar to a sarong, often paired with a shirt or jubba.', type: 'Clothing' },
        { name: 'Temple Jewelry', image: 'https://media.istockphoto.com/id/1301479815/photo/close-up-of-a-kathakali-dancers-face.webp?b=1&s=170667a&w=0&k=20&c=NNS9gYtqTPhsMv0-U1rvz0yX_I3I1m6HhM4gI5u-sDk=', hint: 'temple jewelry', description: 'Gold jewelry inspired by temple architecture and deities, often featuring intricate designs.', type: 'Jewelry' },
    ],
    "West Bengal": [
        { name: 'Tant Saree', image: 'https://media.istockphoto.com/id/1328994799/photo/a-beautiful-indian-woman-in-a-white-and-red-sari.webp?b=1&s=170667a&w=0&k=20&c=sA5_GND-vG_QpS-kKx4wA6yG_G-mBfW96p5uGkS1O2w=', hint: 'bengali woman', description: 'A lightweight cotton saree with a decorative border, perfect for the humid climate.', type: 'Clothing' },
        { name: 'Shakha Pola', image: 'https://media.istockphoto.com/id/1332851221/photo/beautiful-indian-hindu-bride-dressed-in-traditional-attire-preparing-for-her-wedding-day.webp?b=1&s=170667a&w=0&k=20&c=5_hGvG-rLXZfFvyvjTj_RkLVyvO-I3t-l9a_l8tX3lY=', hint: 'bengali bride', description: 'Bangles made from conch shells (Shakha) and red coral (Pola), worn by married Bengali women.', type: 'Jewelry' },
    ],
};

type FilterType = 'All' | 'Clothing' | 'Jewelry';

const ClothingPage = () => {
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');
    
    const allItems = Object.entries(culturalAttireData).flatMap(([state, items]) => items.map(item => ({...item, state})));
    const filteredItems = allItems.filter(item => activeFilter === 'All' || item.type === activeFilter);
    
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            <section className="relative h-[50vh] w-full flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 z-[-1]">
                    <Image
                        src="https://images.unsplash.com/photo-1594236941676-c6415a7a7a37?w=1920&h=1080&auto=format&fit=crop"
                        alt="A journey through threads and traditions"
                        fill
                        className="object-cover"
                        priority
                        data-ai-hint="indian clothing"
                    />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-6 p-4">
                    <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground drop-shadow-lg">
                        India Draped in Culture
                    </h1>
                    <p className="max-w-3xl text-lg md:text-xl lg:text-2xl text-foreground/80 drop-shadow-md">
                        A Journey Through Threads and Traditions.
                    </p>
                </div>
            </section>

            <main className="flex-1 py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-headline text-4xl md:text-5xl font-bold">The Wardrobe of India</h2>
                        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                            Explore the vibrant and diverse traditional attire and jewelry from across the Indian subcontinent.
                        </p>
                    </div>

                    <Tabs defaultValue="All" onValueChange={(value) => setActiveFilter(value as FilterType)} className="w-full flex flex-col items-center mb-12">
                        <TabsList className="grid grid-cols-3 w-full max-w-md">
                            <TabsTrigger value="All"><VenetianMask className="mr-2" /> All</TabsTrigger>
                            <TabsTrigger value="Clothing"><Shirt className="mr-2" /> Clothing</TabsTrigger>
                            <TabsTrigger value="Jewelry"><Gem className="mr-2" /> Jewelry</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredItems.map((item, index) => (
                             <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col bg-card">
                                <div className="relative h-64 w-full">
                                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform" data-ai-hint={item.hint} />
                                    <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold text-white ${item.type === 'Clothing' ? 'bg-primary' : 'bg-accent-foreground'}`}>
                                        {item.type}
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl flex items-start gap-2">
                                        {item.type === 'Clothing' ? <Shirt className="text-primary mt-1" /> : <Gem className="text-primary mt-1" />}
                                        {item.name}
                                    </CardTitle>
                                    <p className="flex items-center gap-1 text-sm font-semibold text-muted-foreground"><MapPin size={14}/> {item.state}</p>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ClothingPage;

    