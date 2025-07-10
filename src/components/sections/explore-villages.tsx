import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const villageItems = [
  { name: 'Mawlynnong, Meghalaya', description: "Asia's cleanest village, known for its matriarchal society and living root bridges.", image: 'https://placehold.co/600x400.png', hint: 'meghalaya village' },
  { name: 'Punsari, Gujarat', description: 'A model village with Wi-Fi, CCTVs, and solar-powered street lights.', image: 'https://placehold.co/600x400.png', hint: 'gujarat village' },
  { name: 'Malana, Himachal Pradesh', description: 'An ancient village with a unique democratic system and distinct culture.', image: 'https://placehold.co/600x400.png', hint: 'himachal village' },
];

const ExploreVillages = () => {
  return (
    <section id="villages" className="py-16 md:py-24 bg-background/70">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Explore Our Villages</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Discover the unique character and history of each community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villageItems.map((item) => (
            <Card key={item.name} className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="relative h-56 w-full">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={item.hint} />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><MapPin className="h-6 w-6 text-primary" /> {item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreVillages;
