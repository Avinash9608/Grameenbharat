
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { CookingPot, Utensils, Shirt, Tent, Building2 } from 'lucide-react';
import Link from 'next/link';

const cultureItems = [
  { title: 'Local Festivals & Rituals', icon: <Tent className="h-12 w-12 text-white" />, image: 'https://images.unsplash.com/photo-1597131267491-b28fc433ea3c?q=80&w=1100&auto=format&fit=crop', hint: 'indian festival', href: '/festivals' },
  { title: 'Village Occupations', icon: <CookingPot className="h-12 w-12 text-white" />, image: 'https://images.unsplash.com/photo-1623211270166-bc232d744d6a?q=80&w=1170&auto=format&fit=crop', hint: 'village pottery', href: '/occupations' },
  { title: 'Clothing and Jewelry', icon: <Shirt className="h-12 w-12 text-white" />, image: 'https://images.unsplash.com/photo-1679004633953-2af98ed7eaf9?q=80&w=685&auto=format&fit=crop', hint: 'traditional clothing', href: '/clothing' },
  { title: 'Village Food & Recipes', icon: <Utensils className="h-12 w-12 text-white" />, image: 'https://images.unsplash.com/photo-1680359873864-43e89bf248ac?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', hint: 'indian food', href: '/food' },
  { title: 'Homes and Architecture', icon: <Building2 className="h-12 w-12 text-white" />, image: 'https://images.unsplash.com/photo-1736914319111-d54ada582633?q=80&w=1332&auto=format&fit=crop', hint: 'village house', href: '/architecture' },
  { title: 'Farming Lifestyle', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-white"><path d="M3 4h9l1 5"/><path d="M4 11V4"/><path d="M8 11V4"/><path d="m10 11 11 5.5"/><circle cx="7" cy="15" r="4"/><circle cx="18" cy="18" r="3"/></svg>, image: 'https://images.unsplash.com/photo-1662815094316-917f52876324?w=600&auto=format&fit=crop', hint: 'indian farmer' },
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
          {cultureItems.map((item) => {
            const cardContent = (
              <Card className="overflow-hidden border-0 shadow-lg group h-full">
                <CardHeader className="p-0">
                  <div className="relative h-64 w-full">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={item.hint} />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <div className="mb-4 text-primary-foreground/80 group-hover:text-primary-foreground transition-colors duration-300">
                        {item.icon}
                      </div>
                      <CardTitle className="font-headline text-2xl text-white drop-shadow-md">{item.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
            
            return item.href ? (
                <Link key={item.title} href={item.href} className="block h-full">{cardContent}</Link>
            ) : (
                <div key={item.title}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Culture;
