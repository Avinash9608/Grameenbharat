"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

const galleryItems = {
  Images: [
    { src: 'https://placehold.co/600x800.png', alt: 'Village portrait', hint: 'village portrait' },
    { src: 'https://placehold.co/600x400.png', alt: 'Marketplace', hint: 'village market' },
    { src: 'https://placehold.co/600x400.png', alt: 'Children playing', hint: 'indian children' },
    { src: 'https://placehold.co/600x800.png', alt: 'Elderly woman', hint: 'elderly indian' },
    { src: 'https://placehold.co/600x400.png', alt: 'Handicrafts', hint: 'indian handicrafts' },
    { src: 'https://placehold.co/600x400.png', alt: 'Farmlands', hint: 'indian fields' },
  ],
  Videos: [
    { src: 'https://placehold.co/600x400.png', alt: 'Festival video still', hint: 'holi festival' },
    { src: 'https://placehold.co/600x400.png', alt: 'Artisan at work video still', hint: 'artisan working' },
  ],
  Festivals: [
    { src: 'https://placehold.co/600x400.png', alt: 'Diwali celebration', hint: 'diwali lights' },
    { src: 'https://placehold.co/600x400.png', alt: 'Holi colors', hint: 'holi colors' },
  ],
  People: [
    { src: 'https://placehold.co/600x800.png', alt: 'Farmer smiling', hint: 'smiling farmer' },
    { src: 'https://placehold.co/600x400.png', alt: 'Group of women', hint: 'indian women' },
  ],
  Lifestyle: [
    { src: 'https://placehold.co/600x400.png', alt: 'Cooking on open fire', hint: 'village cooking' },
    { src: 'https://placehold.co/600x800.png', alt: 'Carrying water pots', hint: 'village women' },
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
