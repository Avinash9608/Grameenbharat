import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const villageItems = [
  { name: 'Mawlynnong, Meghalaya', description: "Asia's cleanest village, known for its matriarchal society and living root bridges.", image: 'https://media.istockphoto.com/id/840514260/photo/living-roots-bridge-over-river-shillong-meghalaya-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=h_-pk3D9SDE0W790im1B7bJY6XHKrC-pLj1KRffQoac=', hint: 'meghalaya village', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mawlynnong,Meghalaya' },
  { name: 'Punsari, Gujarat', description: 'A model village with Wi-Fi, CCTVs, and solar-powered street lights.', image: 'https://media.istockphoto.com/id/2179925134/photo/front-view-of-the-ruined-panchayatan-temple-13th-century-group-of-monuments-parabadi.webp?a=1&b=1&s=612x612&w=0&k=20&c=TVIu79MOnhC2nPFRO9LLj9aTkqZCEFrpDB4YghgyK7c=', hint: 'gujarat village', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Punsari,Gujarat' },
  { name: 'Malana, Himachal Pradesh', description: 'An ancient village with a unique democratic system and distinct culture.', image: 'https://media.istockphoto.com/id/1492067960/photo/colorful-local-houses-in-manikaran-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=5pDakoWtEI9o2lSXhLa1k5t1XEYKNNCHdt9yRAM2FuE=', hint: 'himachal village', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Malana,Himachal+Pradesh' },
];

const ExploreVillages = () => {
  return (
    <section id="villages" className="py-16 md:py-24 bg-background/70">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Explore Our Villages</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Discover the unique character and history of each community. Click a card to see the location.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villageItems.map((item) => (
            <a key={item.name} href={item.mapUrl} target="_blank" rel="noopener noreferrer" className="block group">
                <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 flex flex-col">
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreVillages;
