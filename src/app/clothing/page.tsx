
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Gem, Shirt, VenetianMask, MapPin } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Item {
    name: string;
    image: string;
    hint: string;
    description: string;
    type: 'Clothing' | 'Jewelry';
}

const culturalAttireData: { [state: string]: Item[] } = {
    "Rajasthan": [
        { name: 'Ghagra Choli', image: 'https://media.istockphoto.com/id/1415147616/photo/indian-woman-in-traditional-chaniya-choli-for-navratri.jpg?s=2048x2048&w=is&k=20&c=7MHi_Hqx-U9oMLctBAVlN6O-ilqvFaoI7qUBDGXlHhg=', hint: 'rajasthani woman', description: 'A long, embroidered skirt paired with a fitted blouse, known for its vibrant colors and mirror work.', type: 'Clothing' },
        { name: 'Bandhgala (Men)', image: 'https://plus.unsplash.com/premium_photo-1718570256549-702fc900db10?w=600&auto=format&fit=crop', hint: 'rajasthani man', description: 'A formal jacket with a high collar, often worn with a turban (pagdi) for a regal look.', type: 'Clothing' },
        { name: 'Borla (Maang Tikka)', image: 'https://silvermerc.com/cdn/shop/products/BMH_101MS.jpg?v=1671784754', hint: 'indian jewelry', description: 'A spherical head ornament worn on the forehead, symbolizing marital status.', type: 'Jewelry' },
        { name: 'Kundan Necklace', image: 'https://www.dazzlesjewellery.in/cdn/shop/files/IMG_6475_8183f98b-28b2-4282-8e97-ad5ca9b4dec1.jpg?v=1726904385', hint: 'kundan jewelry', description: 'Elaborate jewelry made by setting polished gemstones in a gold foil base.', type: 'Jewelry' },
    ],
    "Punjab": [
        { name: 'Salwar Kameez', image: 'https://www.parivarceremony.com/media/catalog/product/cache/62408a38a401bb86dbe3ed2f017b539f/f/2/f222301g.jpg', hint: 'punjabi woman', description: 'A comfortable and elegant outfit consisting of loose trousers (salwar) and a long tunic (kameez).', type: 'Clothing' },
        { name: 'Paranda (Hair Tassel)', image: 'https://i.pinimg.com/originals/2e/2f/dd/2e2fdd7c19186f2d45f3cdab2e30d085.jpg', hint: 'braided hair', description: 'A colorful tassel woven into a braid, often adorned with beads and threads.', type: 'Jewelry' },
        { name: 'Jutti (Footwear)', image: 'https://plus.unsplash.com/premium_photo-1682096103505-f3d52c81a34f?q=80&w=1331&auto=format&fit=crop', hint: 'traditional shoes', description: 'Handcrafted leather footwear with intricate embroidery, popular for both men and women.', type: 'Clothing' },
    ],
    "Kerala": [
        { name: 'Kasavu Saree', image: 'https://www.manthree.in/cdn/shop/files/ab999eeTES464-1.jpg?v=1724280926', hint: 'kerala saree', description: 'An elegant white or cream-colored saree with a golden border (zari), traditionally worn during festivals.', type: 'Clothing' },
        { name: 'Mundu (Men)', image: 'https://i.pinimg.com/1200x/4e/cc/0e/4ecc0e074d6488eddc3dea2b05cef317.jpg', hint: 'kerala man', description: 'A garment worn around the waist, similar to a sarong, often paired with a shirt or jubba.', type: 'Clothing' },
        { name: 'Temple Jewelry', image: 'https://cdn.prod.website-files.com/62445c7e184806f3e9ab9904/6390654cc2a6070ae821c3de_2D2A9075%203.jpg', hint: 'temple jewelry', description: 'Gold jewelry inspired by temple architecture and deities, often featuring intricate designs.', type: 'Jewelry' },
    ],
    "West Bengal": [
        { name: 'Tant Saree', image: 'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/500x/040ec09b1e35df139433887a97daa66f/h/a/handloom-cotton-tant-saree-in-red-v1-suua102.jpg', hint: 'bengali woman', description: 'A lightweight cotton saree with a decorative border, perfect for the humid climate.', type: 'Clothing' },
        { name: 'Shakha Pola', image: 'https://www.jiomart.com/images/product/original/rvlg4g1v34/bs-jewel-gold-plated-plastic-shakha-pola-bangle-set-of-4-product-images-rvlg4g1v34-0-202403111600.jpg?im=Resize=(420,420)', hint: 'bengali bride', description: 'Bangles made from conch shells (Shakha) and red coral (Pola), worn by married Bengali women.', type: 'Jewelry' },
    ],
};

type FilterType = 'All' | 'Clothing' | 'Jewelry';

interface SelectedItem extends Item {
    state: string;
}

const ClothingPage = () => {
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');
    const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
    
    const allItems = Object.entries(culturalAttireData).flatMap(([state, items]) => items.map(item => ({...item, state})));
    const filteredItems = allItems.filter(item => activeFilter === 'All' || item.type === activeFilter);
    
    return (
        <>
            <div className="flex flex-col min-h-screen bg-background">
                <Header />

                <section className="relative h-[50vh] w-full flex items-center justify-center text-center overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="https://plus.unsplash.com/premium_photo-1723809635838-d4c02e969f37?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjIxfHxJbmRpYSUyMERyYXBlZCUyMGluJTIwQ3VsdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
                            alt="A journey through threads and traditions"
                            fill
                            className="object-cover brightness-75"
                            priority
                            data-ai-hint="indian clothing"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-6 p-4">
                        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-lg">
                            India Draped in Culture
                        </h1>
                        <p className="max-w-3xl text-lg md:text-xl lg:text-2xl text-stone-100 drop-shadow-md">
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
                                        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${item.type === 'Clothing' ? 'bg-primary' : 'bg-accent'}`}>
                                            {item.type}
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="font-headline text-2xl flex items-start gap-2">
                                            {item.type === 'Clothing' ? <Shirt className="text-primary mt-1" /> : <Gem className="text-accent mt-1" />}
                                            {item.name}
                                        </CardTitle>
                                        <p className="flex items-center gap-1 text-sm font-semibold text-muted-foreground"><MapPin size={14}/> {item.state}</p>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <CardDescription>{item.description}</CardDescription>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="secondary" className="w-full" onClick={() => setSelectedItem(item as SelectedItem)}>Read More</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                    </div>
                </main>
                <Footer />
            </div>
            
            <Dialog open={!!selectedItem} onOpenChange={(isOpen) => !isOpen && setSelectedItem(null)}>
                <DialogContent className="sm:max-w-3xl p-0">
                    {selectedItem && (
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="relative h-64 md:h-full w-full">
                                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
                            </div>
                            <div className="p-6 flex flex-col justify-center">
                                <DialogHeader>
                                    <p className="font-bold text-primary flex items-center gap-2 mb-2"><MapPin size={16}/> {selectedItem.state}</p>
                                    <DialogTitle className="font-headline text-3xl mb-2 flex items-center gap-3">
                                        {selectedItem.type === 'Clothing' ? <Shirt className="text-primary" /> : <Gem className="text-accent" />}
                                        {selectedItem.name}
                                    </DialogTitle>
                                    <DialogDescription className="text-base text-muted-foreground">
                                        {selectedItem.description}
                                    </DialogDescription>
                                </DialogHeader>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ClothingPage;
