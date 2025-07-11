
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
import { Flame, CookingPot, Leaf, Sun, Wind, Droplets, UtensilsCrossed, PlayCircle } from 'lucide-react';

const regionalFoodData = {
    North: [
        { name: 'Makki di Roti & Sarson da Saag', localName: 'Punjab', taste: ['Earthy', 'Spicy'], image: 'https://media.istockphoto.com/id/1193080110/photo/makki-ki-roti-sarson-ka-saag.webp?a=1&b=1&s=612x612&w=0&k=20&c=_LURo_jD2MzlSO-u-DzO2Yp_ISt_qmNAO7R7rnK37GY=', hint: 'sarson da saag' },
        { name: 'Litti Chokha', localName: 'Bihar', taste: ['Smoky', 'Tangy'], image: 'https://media.istockphoto.com/id/2189780938/photo/litti-chokha-with-raita-and-chutney.webp?a=1&b=1&s=612x612&w=0&k=20&c=e5n65xLN3dkwTZa9FH7JLtyMsGM_5QKIQcSSDvDOSWo=', hint: 'litti chokha' },
        { name: 'Bajra Roti & Ker Sangri', localName: 'Rajasthan', taste: ['Nutty', 'Spicy'], image: 'https://media.istockphoto.com/id/2201659127/photo/roti-and-sabzi-indian-vegetarian-thali-includes-bhindi-fry-yellow-daal-tadka-cucumber-raita.webp?a=1&b=1&s=612x612&w=0&k=20&c=QwIdA3ViJuxPslpCFFVs9SvThXXC8w1ivxZclnqWqGY=', hint: 'rajasthani food' },
    ],
    South: [
        { name: 'Ragi Kali', localName: 'Tamil Nadu', taste: ['Healthy', 'Mild'], image: 'https://media.istockphoto.com/id/1547633628/photo/poongar-rice-vattayappam-steamed-rice-cake-made-with-a-fermented-batter-of-poongar-rice-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=9_KNk05ecS8Iq3yYVXKir4lKdDgbdmukgF_YXN5YmUI=', hint: 'ragi kali' },
        { name: 'Tapioca with Fish Curry', localName: 'Kerala', taste: ['Spicy', 'Tangy'], image: 'https://media.istockphoto.com/id/2208406913/photo/boiled-and-mashed-tapioca-served-with-spicy-chicken-curry-and-crispy-fried-fish.webp?a=1&b=1&s=612x612&w=0&k=20&c=LmM_VhyA8RiMSRsZXm48gR-By6-zCjrq36wGTXEYtiM=', hint: 'kerala food' },
        { name: 'Payasam', localName: 'Kerala', taste: ['Sweet', 'Creamy'], image: 'https://media.istockphoto.com/id/980089086/photo/rice-pudding-or-kheer-from-india-called-also-called-firnee-served-in-a-bowl-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=Rw_oIvR4K1lu_m81T5UlZ38YnrhbvNB3R4GCCKTU78M=', hint: 'payasam' },
    ],
    East: [
        { name: 'Panta Bhaat', localName: 'West Bengal', taste: ['Fermented', 'Cooling'], image: 'https://media.istockphoto.com/id/2209475313/photo/panta-ilish-a-bengali-new-year-festive-dish-panta-bhat-served-with-aloo-bharta-green-chili.webp?a=1&b=1&s=612x612&w=0&k=20&c=x4_BN7oSXpDFk-zm2SdIC7laRaJBZkHkM8oukT1spao=', hint: 'bengali food' },
        { name: 'Thekua', localName: 'Bihar', taste: ['Sweet', 'Crunchy'], image: 'https://c.ndtvimg.com/2018-11/1ivb9hq_thekua_625x300_13_November_18.jpg', hint: 'thekua' },
        { name: 'Shorshe Ilish', localName: 'West Bengal', taste: ['Pungent', 'Spicy'], image: 'https://media.istockphoto.com/id/2209475301/photo/delicious-shorshe-ilish-on-silverware-on-a-light-wooden-surface-this-popular-bengali-dish.webp?a=1&b=1&s=612x612&w=0&k=20&c=oh8S4OklY-3ecAy3IwogsJ0i-vY6ROf-EtOkFQxM_s4=', hint: 'ilish fish' },
    ],
    West: [
        { name: 'Gatte ki Sabzi', localName: 'Rajasthan', taste: ['Savory', 'Spicy'], image: 'https://media.istockphoto.com/id/1513582138/photo/rajasthani-gatta-curry-or-besan-ke-gatte-ki-sabzi-gatte-are-gram-flour-roundels-or-chickpea.webp?a=1&b=1&s=612x612&w=0&k=20&c=vCYSMkz3ytMkbvGX5Od_C4dv4BHrXA5sNezEPD0tJV4=', hint: 'rajasthani curry' },
        { name: 'Chousela Roti', localName: 'Chhattisgarh', taste: ['Soft', 'Savory'], image: 'https://media.istockphoto.com/id/1002051148/photo/yozgat-turkey-fat-bread-on-a-black-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=cySKkD_2-sj9m-ARxTGQ3OpyTbWIz44l0saFdXMCS5E=', hint: 'chhattisgarh food' },
        { name: 'Smoked Pork with Bamboo Shoot', localName: 'Nagaland', taste: ['Smoky', 'Pungent'], image: 'https://media.istockphoto.com/id/884274458/photo/chinese-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=i5jAVdEu853MUOBiMhS1TBuOqgezT4PhZ3tvsy_9hbk=', hint: 'naga food' },
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
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                {/* 1. Hero Banner */}
                <section className="relative h-[60vh] w-full flex items-center justify-center text-center">
                    <div className="absolute inset-0 z-[-1]">
                        <Image
                            src="https://images.unsplash.com/photo-1742281257707-0c7f7e5ca9c6?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="A spread of delicious Indian food"
                            fill
                            className="object-cover brightness-75"
                            priority
                            data-ai-hint="indian food"
                        />
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-6 p-4 text-white">
                        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
                           From Chulhas to Charcoal
                        </h1>
                        <p className="max-w-2xl text-lg md:text-xl drop-shadow-md">
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
