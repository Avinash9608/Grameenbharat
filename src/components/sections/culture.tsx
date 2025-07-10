import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { CookingPot, Utensils, Shirt, Tent, Building2 } from 'lucide-react';

const cultureItems = [
  { title: 'Local Festivals & Rituals', icon: <Tent className="h-10 w-10 text-white" />, image: 'https://placehold.co/600x400.png', hint: 'indian festival' },
  { title: 'Village Occupations', icon: <CookingPot className="h-10 w-10 text-white" />, image: 'https://placehold.co/600x400.png', hint: 'village pottery' },
  { title: 'Clothing and Jewelry', icon: <Shirt className="h-10 w-10 text-white" />, image: 'https://placehold.co/600x400.png', hint: 'traditional clothing' },
  { title: 'Village Food & Recipes', icon: <Utensils className="h-10 w-10 text-white" />, image: 'https://placehold.co/600x400.png', hint: 'indian food' },
  { title: 'Homes and Architecture', icon: <Building2 className="h-10 w-10 text-white" />, image: 'https://placehold.co/600x400.png', hint: 'village house' },
  { title: 'Farming Lifestyle', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-white"><path d="M3 4h9l1 5"/><path d="M4 11V4"/><path d="M8 11V4"/><path d="M18 5c-.6 0-1 .4-1 1v5.6"/><path d="m10 11 11 5.5"/><circle cx="7" cy="15" r="4"/><circle cx="18" cy="18" r="3"/></svg>, image: 'https://placehold.co/600x400.png', hint: 'indian farmer' },
];

const Culture = () => {
  return (
    <section id="culture" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Culture and Lifestyle</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Dive into the rich tapestry of traditions that shape the lives of the villagers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cultureItems.map((item) => (
            <Card key={item.title} className="overflow-hidden border-2 border-primary/10 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="p-0">
                <div className="relative h-56 w-full">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={item.hint} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="p-3 bg-primary/80 rounded-full mb-2 inline-block">{item.icon}</div>
                    <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Culture;
