
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Flame, CookingPot, Utensils, Leaf, Sun, Wind, Droplets, UtensilsCrossed, Clock, Users, BookOpen, PlayCircle, Sprout } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const regionalFoodData = {
    North: [
        { name: 'Makki di Roti & Sarson da Saag', localName: 'Punjab', taste: ['Earthy', 'Spicy'], image: 'https://plus.unsplash.com/premium_photo-1669680785169-d95f2e604732?w=600&auto=format&fit=crop', hint: 'sarson da saag' },
        { name: 'Litti Chokha', localName: 'Bihar', taste: ['Smoky', 'Tangy'], image: 'https://media.istockphoto.com/id/1305459336/photo/litti-chokha-or-bati-chokha.webp?s=612x612&w=is&k=20&c=i3HkG3TCDLqgVn2w0BS3pEwOYq0ANIVKj23z-szq9V0=', hint: 'litti chokha' },
        { name: 'Bajra Roti & Ker Sangri', localName: 'Rajasthan', taste: ['Nutty', 'Spicy'], image: 'https://media.istockphoto.com/id/1323363353/photo/ker-sangri-popular-rajasthani-vegetable-served-in-a-bowl.webp?s=612x612&w=is&k=20&c=g-w6hU19a-9k-e2T9fL10915lFw6bLhZ3s01o8l2W8g=', hint: 'rajasthani food' },
    ],
    South: [
        { name: 'Ragi Kali', localName: 'Tamil Nadu', taste: ['Healthy', 'Mild'], image: 'https://media.istockphoto.com/id/1441604230/photo/ragi-mudde-or-ragi-sankati-and-sambar-close-up-selective-focus.webp?s=612x612&w=is&k=20&c=F-h-vN7lV3J-PmVUu2Qj3n0vN51cZ3_13_S8B8C_U0I=', hint: 'ragi kali' },
        { name: 'Tapioca with Fish Curry', localName: 'Kerala', taste: ['Spicy', 'Tangy'], image: 'https://media.istockphoto.com/id/1399318999/photo/kappa-and-meen-curry-or-tapioca-with-fish-curry-which-is-a-popular-and-traditional-food-in.webp?s=612x612&w=is&k=20&c=uT6XFfXjbf6P7_41YcM-j2-L09gL1lJgqX_t41-y2Y4=', hint: 'kerala food' },
        { name: 'Payasam', localName: 'Kerala', taste: ['Sweet', 'Creamy'], image: 'https://media.istockphoto.com/id/1183182104/photo/rice-payasam-or-kheer-pudding-in-a-golden-bowl.webp?s=612x612&w=is&k=20&c=q4M37BqA7p33hYyqQ8I8r1k3Y5b-YdOqWzP4w7Z_J5Y=', hint: 'payasam' },
    ],
    East: [
        { name: 'Panta Bhaat', localName: 'West Bengal', taste: ['Fermented', 'Cooling'], image: 'https://media.istockphoto.com/id/1494548480/photo/panta-bhat-is-a-bengali-comfort-food-it-is-a-fermented-rice-gruel-and-is-eaten-with-fried.webp?s=612x612&w=is&k=20&c=1m1dY4Q8_A0jX8z1Q8jZ3l4a2-Z8a3wJ9f-l4iY6q5Y=', hint: 'bengali food' },
        { name: 'Thekua', localName: 'Bihar', taste: ['Sweet', 'Crunchy'], image: 'https://media.istockphoto.com/id/1435222533/photo/thekua.webp?s=612x612&w=is&k=20&c=7Y12_hP_9rT5a3dG6rK1bFwW8_k6l8B8q-8wX-u3l6g=', hint: 'thekua' },
        { name: 'Shorshe Ilish', localName: 'West Bengal', taste: ['Pungent', 'Spicy'], image: 'https://media.istockphoto.com/id/1324749323/photo/shorshe-ilish-hilsa-herring-fish-curry-with-mustard-seeds.webp?s=612x612&w=is&k=20&c=V6CqYf-M7z9g_fE8s_G4h5D8_Y-n9b-L8x7l0-j8r7o=', hint: 'ilish fish' },
    ],
    West: [
        { name: 'Gatte ki Sabzi', localName: 'Rajasthan', taste: ['Savory', 'Spicy'], image: 'https://media.istockphoto.com/id/1282121658/photo/gatte-ki-sabji-or-gatta-curry-is-a-yogurt-based-curry-from-the-indian-state-of-rajasthan-and.webp?s=612x612&w=is&k=20&c=QoG3A52o_B0wA62g29E4lY8b-jL5U3-y_B2z5V7v8c4=', hint: 'rajasthani curry' },
        { name: 'Chousela Roti', localName: 'Chhattisgarh', taste: ['Soft', 'Savory'], image: 'https://media.istockphoto.com/id/1451528620/photo/chhattisgarh-special-thali.webp?s=612x612&w=is&k=20&c=XU7d6u6Z-3r9Z-r0j0p_x4q_Z8m6Q_r2Z-Q8r7ZlX-k=', hint: 'chhattisgarh food' },
        { name: 'Smoked Pork with Bamboo Shoot', localName: 'Nagaland', taste: ['Smoky', 'Pungent'], image: 'https://media.istockphoto.com/id/1324143455/photo/smoked-pork-curry-with-bamboo-shoots-and-vegetables.webp?s=612x612&w=is&k=20&c=mC2n6i_p8m9Q-r9-g5_f9wZ-z5B_c3l8l1i8o5I7j0Q=', hint: 'naga food' },
    ],
};

const cookingTechniques = [
    { title: 'Chulha Cooking', description: 'Cooking on an open clay stove with wood or cow-dung fire, imparting a unique smoky flavor. Ideal for slow-cooking dishes like dals and vegetable curries.', icon: <Flame /> },
    { title: 'Hand Grinding (Sil Batta)', description: 'Using a flat stone (sil) and a grinding stone (batta) to make fresh spice pastes and chutneys. This method retains the oils and flavors of the spices.', icon: <UtensilsCrossed /> },
    { title: 'Sun Drying & Fermenting', description: 'A natural preservation method for making papads, pickles, and preserving vegetables like bamboo shoots. It enhances flavor and shelf life.', icon: <Sun /> },
    { title: 'Earthen Pot Cooking (Matka)', description: 'Slow-cooking in clay pots helps retain moisture and nutrients while balancing the pH of the food, resulting in aromatic and flavorful dishes.', icon: <CookingPot /> },
    { title: 'Banana Leaf Serving', description: 'An eco-friendly and traditional way of serving food, especially in South India. The leaf imparts a subtle aroma and is considered hygienic.', icon: <Leaf /> },
];

const videoData = [
    { videoId: 'ErSL2EkQocs', title: 'The Art of Pottery', hint: 'pottery making' },
    { videoId: 'RPassbDKT4s', title: 'Monsoon Cooking', hint: 'monsoon food' },
    { videoId: 'w0gamtoWxnE', title: 'Folk Feasts', hint: 'folk food' },
]

const culturalPairings = [
    { dish: 'Pitha', festival: 'Makar Sankranti', location: 'Assam', image: 'https://media.istockphoto.com/id/1364344464/photo/traditional-assamese-sweets-and-snacks.webp?s=612x612&w=is&k=20&c=3j5w8r_i8f_D3n-l5k_x_Y7p_Z2h_c2p_r9e_Y_x_f_Q=', hint: 'assamese food' },
    { dish: 'Khichdi', festival: 'Pongal', location: 'Tamil Nadu', image: 'https://media.istockphoto.com/id/1299943615/photo/pongal.webp?s=612x612&w=is&k=20&c=4F1-vR8f_mR7P-z8_i3i_x_j_q5l_Z_gX-q4_h_v4c=', hint: 'pongal festival' },
    { dish: 'Tilkut', festival: 'Makar Sankranti', location: 'Bihar', image: 'https://media.istockphoto.com/id/1454471536/photo/tilkut-a-sweet-made-of-sesame-seeds-and-jaggery-famous-in-bihar-jharkhand-in-india.webp?s=612x612&w=is&k=20&c=q5V8N_X_g8f_d8Z_l5k_x_Y7p_Z2h_c2p_r9e_Y_x_f_Q=', hint: 'bihar sweet' },
]

const FoodPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            <main className="flex-1">
                {/* 1. Hero Banner */}
                <section className="relative h-[60vh] w-full flex items-center justify-center text-center">
                    <div className="absolute inset-0 z-[-1]">
                        <Image
                            src="https://images.unsplash.com/photo-1541557436894-328302355d04?q=80&w=1470&auto=format&fit=crop"
                            alt="A village woman cooking on a traditional clay stove (chulha)"
                            fill
                            className="object-cover brightness-75"
                            priority
                            data-ai-hint="village cooking"
                        />
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-6 p-4">
                        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
                           From Chulhas to Charcoal
                        </h1>
                        <p className="max-w-2xl text-lg md:text-xl text-stone-100 drop-shadow-md">
                           Discover India’s Rustic Flavours
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg">
                                <a href="#recipes-by-region">Explore Recipes</a>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 font-bold px-8 py-6 text-lg bg-black/20 backdrop-blur-sm">
                                <a href="#cooking-videos">Watch Cooking Videos</a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* 2. Food by Region */}
                <section id="recipes-by-region" className="py-16 md:py-24 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">A Culinary Map of Rural India</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                Explore the diverse and authentic food traditions from different regions of the country.
                            </p>
                        </div>
                        <Tabs defaultValue="North" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                                <TabsTrigger value="North">North India</TabsTrigger>
                                <TabsTrigger value="South">South India</TabsTrigger>
                                <TabsTrigger value="East">East India</TabsTrigger>
                                <TabsTrigger value="West">West & Central</TabsTrigger>
                            </TabsList>

                            {Object.entries(regionalFoodData).map(([region, foods]) => (
                                <TabsContent key={region} value={region}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {foods.map((food, index) => (
                                            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                                                <div className="relative h-56 w-full">
                                                    <Image src={food.image} alt={food.name} fill className="object-cover group-hover:scale-105 transition-transform" data-ai-hint={food.hint} />
                                                </div>
                                                <CardHeader>
                                                    <CardTitle className="font-headline text-2xl">{food.name}</CardTitle>
                                                    <CardDescription className="font-semibold text-primary">{food.localName}</CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex-grow space-y-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {food.taste.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="secondary" className="w-full">View Recipe</Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-2xl">
                                                            <DialogHeader>
                                                                <DialogTitle className="font-headline text-3xl">{food.name}</DialogTitle>
                                                                <DialogDescription>A traditional delicacy from {food.localName}.</DialogDescription>
                                                            </DialogHeader>
                                                            <div className="py-4 text-sm text-muted-foreground">
                                                                <p>Recipe details for {food.name} would appear here, including ingredients, step-by-step instructions, and cultural significance.</p>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </section>
                
                 {/* 4. Traditional Cooking Techniques */}
                <section className="py-16 md:py-24 bg-primary/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">The Art of Rustic Cooking</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                Discover the time-honored techniques that give village food its unique taste and character.
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <Accordion type="single" collapsible className="w-full">
                                {cookingTechniques.map((tech, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                                            <span className="flex items-center gap-3 text-primary">{tech.icon}</span> {tech.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-base text-muted-foreground pl-10">
                                            {tech.description}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </section>
                
                {/* 5. Video Section */}
                <section id="cooking-videos" className="py-16 md:py-24 bg-background">
                     <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                          <h2 className="font-headline text-4xl md:text-5xl font-bold">Flavours in Motion</h2>
                          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                            Watch the magic of village cooking unfold in these short, authentic videos.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {videoData.map((video) => (
                                    <div key={video.videoId}>
                                        <Card className="overflow-hidden group border-none shadow-lg">
                                            <CardContent className="relative aspect-video p-0 bg-black">
                                                <div className="w-full h-full cursor-pointer">
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
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                     </div>
                </section>

                 {/* 6. Cultural Pairings */}
                <section className="py-16 md:py-24 bg-primary/5">
                    <div className="container mx-auto px-4 md:px-6">
                         <div className="text-center mb-12">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold">Food, Festivals, and Folklore</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                In rural India, food is deeply connected to culture, seasons, and celebrations.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {culturalPairings.map((pairing) => (
                                <Card key={pairing.dish} className="text-center overflow-hidden group">
                                     <CardContent className="p-0">
                                        <div className="relative h-56 w-full">
                                             <Image src={pairing.image} alt={pairing.dish} fill className="object-cover" data-ai-hint={pairing.hint}/>
                                        </div>
                                     </CardContent>
                                     <CardHeader>
                                        <CardTitle className="font-headline text-2xl">{pairing.dish}</CardTitle>
                                        <CardDescription className="font-bold text-primary">{pairing.festival} in {pairing.location}</CardDescription>
                                     </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* 7. Seasonal & Ayurvedic Food Wisdom */}
                <section className="py-16 md:py-24 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                           <h2 className="font-headline text-4xl md:text-5xl font-bold">Eating with the Seasons</h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                                Villagers have long known the secret to health: eating fresh, seasonal, and local food.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <Card className="p-6">
                                <CardHeader>
                                    <div className="mx-auto bg-amber-100 p-4 rounded-full w-fit text-amber-600">
                                        <Sun className="h-8 w-8"/>
                                    </div>
                                    <CardTitle className="font-headline text-2xl mt-4">Summer Coolers</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Cooling foods like buttermilk, raw mango chutneys, and barley water are consumed to beat the heat and stay hydrated.</p>
                                </CardContent>
                            </Card>
                             <Card className="p-6">
                                <CardHeader>
                                    <div className="mx-auto bg-green-100 p-4 rounded-full w-fit text-green-600">
                                        <Droplets className="h-8 w-8"/>
                                    </div>
                                    <CardTitle className="font-headline text-2xl mt-4">Monsoon Immunity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Herbal concoctions (kadha) with ginger and tulsi, along with warm soups, help boost immunity during the rainy season.</p>
                                </CardContent>
                            </Card>
                            <Card className="p-6">
                                <CardHeader>
                                    <div className="mx-auto bg-sky-100 p-4 rounded-full w-fit text-sky-600">
                                        <Wind className="h-8 w-8"/>
                                    </div>
                                    <CardTitle className="font-headline text-2xl mt-4">Winter Warmers</CardTitle>
                                </CardHeader>
                                <CardContent>
                                     <p className="text-muted-foreground">Warming foods like millet rotis (bajra), jaggery, ghee, and sesame seeds provide energy and warmth during the cold months.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                 {/* 8. CTA Footer */}
                <section className="py-16 md:py-24 bg-primary/10">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="font-headline text-4xl font-bold">Preserve the Taste of the Soil</h2>
                            <p className="text-lg text-muted-foreground mt-4 mb-8">
                                Help us keep these timeless recipes alive. Share your family's village recipe or support local cooks.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" variant="secondary">Submit Your Recipe</Button>
                                <Button size="lg">Support Local Cooks</Button>
                            </div>
                        </div>
                    </div>
                </section>


            </main>
            <Footer />
        </div>
    );
};

export default FoodPage;
