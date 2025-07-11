import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Brush, Hand, Hammer } from 'lucide-react';

const artItems = [
  { name: 'Madhubani Paintings', description: "Vibrant and intricate paintings from the Mithila region of Bihar, traditionally done on freshly plastered mud walls.", image: 'https://plus.unsplash.com/premium_photo-1691030926024-4a5664b37ef8?w=600&auto=format&fit=crop', icon: <Brush/>, hint: 'madhubani painting' },
  { name: 'Bamboo Products', description: 'Eco-friendly and versatile crafts, from furniture to decorative items, showcasing exceptional skill.', image: 'https://media.istockphoto.com/id/121260897/photo/asian-market-of-bamboo-crafts.webp?a=1&b=1&s=612x612&w=0&k=20&c=uWjkpTtFe0O_Zq8-k1Aay_bv5JAVS9aqA-9zjgdPwdw=', icon: <Hand/>, hint: 'bamboo craft' },
  { name: 'Clay Pottery', description: "A timeless tradition of shaping earth into beautiful and functional pots, lamps, and idols.", image: 'https://images.unsplash.com/photo-1645401242461-ffdab88f6f99?w=600&auto=format&fit=crop', icon: <Hammer/>, hint: 'clay pottery' },
];

const ArtsCrafts = () => {
  return (
    <section id="arts" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Traditional Arts &amp; Crafts</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Witness the mastery of artisans who keep ancient traditions alive.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artItems.map((item) => (
            <Card key={item.name} className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col bg-card">
              <div className="relative h-56 w-full">
                <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.hint} />
              </div>
              <CardHeader>
                 <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <span className="text-primary">{item.icon}</span>
                  {item.name}
                 </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="secondary" className="w-full">
                    <a href={`https://www.flipkart.com/search?q=${encodeURIComponent(item.name)}`} target="_blank" rel="noopener noreferrer">
                        Request Order
                    </a>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtsCrafts;
