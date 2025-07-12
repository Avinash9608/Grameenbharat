import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Wheat, Tractor, CloudRain, Sun, Droplets, MapPin, Leaf } from 'lucide-react';

const farmingRegionsData = [
    {
        region: 'Punjab',
        description: 'Known as the "Granary of India," its fertile plains and canal irrigation support vast fields of wheat and rice.',
        image: 'https://images.unsplash.com/photo-1710170909047-135c7a010e41?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fFB1bmphYiUyMGZhcm1pbmd8ZW58MHx8MHx8fDA%3D',
        hint: 'punjab fields'
    },
    {
        region: 'Kerala',
        description: 'Lush backwaters and heavy monsoons create the perfect environment for spices, coconuts, and rice paddies.',
        image: 'https://plus.unsplash.com/premium_photo-1664303828953-3e8ef4ac44e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2VybGElMjBmYXJtaW5nfGVufDB8fDB8fHww',
        hint: 'kerala backwaters farming'
    },
    {
        region: 'Rajasthan',
        description: 'Hardy farmers practice dry farming techniques to grow drought-resistant crops like millet and mustard in the arid landscape.',
        image: 'https://media.istockphoto.com/id/533314469/photo/mustard-flower.webp?a=1&b=1&s=612x612&w=0&k=20&c=t70FNee9KGEf5axbeExEPMmS5OfPYfnA_7C0UaRz0wk=',
        hint: 'mustard fields rajasthan'
    },
];

const FarmingLifestyle = () => {
    return (
        <section id="farming" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">The Rhythm of the Land</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                        Exploring the lives, challenges, and resilience of the farmers who feed a nation.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {farmingRegionsData.map((item) => (
                        <Card key={item.region} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                             <div className="relative h-56 w-full">
                                <Image src={item.image} alt={item.region} fill className="object-cover" data-ai-hint={item.hint}/>
                            </div>
                             <CardHeader>
                                <CardTitle className="font-headline text-2xl flex items-center gap-2"><MapPin className="text-primary"/>{item.region}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{item.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FarmingLifestyle;
