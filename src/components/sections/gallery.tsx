"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

const galleryItems = {
  Images: [
    { src: 'https://images.unsplash.com/photo-1717820775574-bc200d22ce40?w=600&auto=format&fit=crop', alt: 'Village portrait', hint: 'village portrait' },
    { src: 'https://images.unsplash.com/photo-1587535919292-301def3230a0?w=600&auto=format&fit=crop', alt: 'Marketplace', hint: 'village market' },
    { src: 'https://images.unsplash.com/photo-1669288985566-b9b58fde9f90?w=600&auto=format&fit=crop', alt: 'Children playing', hint: 'indian children' },
    { src: 'https://images.unsplash.com/photo-1610730686196-1642e127e338?w=600&auto=format&fit=crop', alt: 'Elderly woman', hint: 'elderly indian' },
    { src: 'https://images.unsplash.com/photo-1530878902700-5ad4f9e4c318?w=600&auto=format&fit=crop', alt: 'Handicrafts', hint: 'indian handicrafts' },
    { src: 'https://images.unsplash.com/photo-1605272058466-5988743ff1db?w=600&auto=format&fit=crop', alt: 'Farmlands', hint: 'indian fields' },
  ],
  Videos: [
    { src: 'https://placehold.co/600x400.png', alt: 'Festival video still', hint: 'holi festival' },
    { src: 'https://placehold.co/600x400.png', alt: 'Artisan at work video still', hint: 'artisan working' },
  ],
  Festivals: [
    { src: 'https://images.unsplash.com/photo-1741877520432-6dafacb83656?w=600&auto=format&fit=crop', alt: 'Indian festival', hint: 'indian festival' },
    { src: 'https://images.unsplash.com/photo-1629649213060-4874f8f6bce3?w=600&auto=format&fit=crop', alt: 'Indian festival performers', hint: 'festival performers' },
    { src: 'https://plus.unsplash.com/premium_photo-1698500035179-edd84b64f527?w=600&auto=format&fit=crop', alt: 'Diwali celebration', hint: 'diwali lights' },
    { src: 'https://images.unsplash.com/photo-1731056994556-2f0660647908?w=600&auto=format&fit=crop', alt: 'Chhath Puja', hint: 'chhath puja' },
    { src: 'https://images.unsplash.com/photo-1616074385287-67f6fb9e9eb8?w=600&auto=format&fit=crop', alt: 'Durga Puja', hint: 'durga puja' },
    { src: 'https://media.istockphoto.com/id/1500853989/photo/happy-senior-punjabi-sikh-couple-wearing-colorful-cloths-standing-together-at-agriculture.webp?a=1&b=1&s=612x612&w=0&k=20&c=w6tLfkaKK7V3Ogu19X3exrkiKifG8QauXFSM_PsjzQg=', alt: 'Sikh couple', hint: 'sikh couple' },
    { src: 'https://plus.unsplash.com/premium_photo-1697729460658-6a831a518d2a?w=600&auto=format&fit=crop', alt: 'Pushkar Camel Fair', hint: 'pushkar fair' },
  ],
  People: [
    { src: 'https://plus.unsplash.com/premium_photo-1682092121090-5f3e89c7aa3c?w=600&auto=format&fit=crop', alt: 'Smiling man', hint: 'indian man' },
    { src: 'https://plus.unsplash.com/premium_photo-1682090811844-e0a89fb2c780?w=600&auto=format&fit=crop', alt: 'Woman in traditional dress', hint: 'indian woman' },
    { src: 'https://plus.unsplash.com/premium_photo-1682089846950-974c7c7d5e91?w=600&auto=format&fit=crop', alt: 'Portrait of a woman', hint: 'woman portrait' },
    { src: 'https://images.unsplash.com/photo-1646801696575-488269802fca?w=600&auto=format&fit=crop', alt: 'Elderly man', hint: 'elderly man' },
    { src: 'https://images.unsplash.com/photo-1711446731860-bf565f08e1d3?w=600&auto=format&fit=crop', alt: 'Woman in a field', hint: 'woman field' },
    { src: 'https://images.unsplash.com/photo-1631513497662-ea3733fda344?w=600&auto=format&fit=crop', alt: 'Group of people', hint: 'indian people' },
    { src: 'https://images.unsplash.com/photo-1729012766607-16533c858292?w=600&auto=format&fit=crop', alt: 'Woman with child', hint: 'woman child' },
  ],
  Lifestyle: [
    { src: 'https://images.unsplash.com/photo-1620563202672-36d713a79f8d?w=600&auto=format&fit=crop', alt: 'Woman working in field', hint: 'village work' },
    { src: 'https://images.unsplash.com/photo-1583415303571-20185869c4bc?w=600&auto=format&fit=crop', alt: 'Man weaving', hint: 'village craft' },
    { src: 'https://images.unsplash.com/photo-1573366461298-29cc79bf6345?w=600&auto=format&fit=crop', alt: 'Village road', hint: 'village road' },
    { src: 'https://images.unsplash.com/photo-1723648722809-65f1e11e5060?w=600&auto=format&fit=crop', alt: 'Women in sarees', hint: 'village women' },
    { src: 'https://plus.unsplash.com/premium_photo-1691030256235-47d75d5890b9?w=600&auto=format&fit=crop', alt: 'Farmer with bullocks', hint: 'farmer bullocks' },
    { src: 'https://images.unsplash.com/photo-1634966697712-c3c0d3db3fdc?w=600&auto=format&fit=crop', alt: 'Woman with cow', hint: 'woman cow' },
  ],
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-background/70">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Media Gallery</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            A visual journey through the heart of rural India.
          </p>
        </div>
        <Tabs defaultValue="Images" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-8">
            {Object.keys(galleryItems).map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(galleryItems).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="overflow-hidden rounded-lg shadow-lg break-inside-avoid">
                     <Image
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={item.src.includes('800') ? 800 : 400}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      data-ai-hint={item.hint}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Gallery;
