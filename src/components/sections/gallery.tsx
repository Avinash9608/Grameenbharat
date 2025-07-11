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
