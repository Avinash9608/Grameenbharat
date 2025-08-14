'use client';

import Image from 'next/image';

const allGalleryItems = [
    { src: 'https://images.unsplash.com/photo-1717820775574-bc200d22ce40?w=600&auto=format&fit=crop', alt: 'Village portrait', hint: 'village portrait', className: 'slower' },
    { src: 'https://images.unsplash.com/photo-1587535919292-301def3230a0?w=600&auto=format&fit=crop', alt: 'Marketplace', hint: 'village market', className: 'faster' },
    { src: 'https://images.unsplash.com/photo-1669288985566-b9b58fde9f90?w=600&auto=format&fit=crop', alt: 'Children playing', hint: 'indian children', className: 'slower vertical' },
    { src: 'https://images.unsplash.com/photo-1629649213060-4874f8f6bce3?w=600&auto=format&fit=crop', alt: 'Indian festival performers', hint: 'festival performers', className: 'slower slower-down' },
    { src: 'https://plus.unsplash.com/premium_photo-1682092121090-5f3e89c7aa3c?w=600&auto=format&fit=crop', alt: 'Smiling man', hint: 'indian man', className: '' },
    { src: 'https://images.unsplash.com/photo-1620563202672-36d713a79f8d?w=600&auto=format&fit=crop', alt: 'Woman working in field', hint: 'village work', className: 'slower' },
    { src: 'https://images.unsplash.com/photo-1741877520432-6dafacb83656?w=600&auto=format&fit=crop', alt: 'Indian festival', hint: 'indian festival', className: 'faster1' },
    { src: 'https://plus.unsplash.com/premium_photo-1698500035179-edd84b64f527?w=600&auto=format&fit=crop', alt: 'Diwali celebration', hint: 'diwali lights', className: 'slower slower2' },
    { src: 'https://images.unsplash.com/photo-1731056994556-2f0660647908?w=600&auto=format&fit=crop', alt: 'Chhath Puja', hint: 'chhath puja', className: '' },
    { src: 'https://images.unsplash.com/photo-1616074385287-67f6fb9e9eb8?w=600&auto=format&fit=crop', alt: 'Durga Puja', hint: 'durga puja', className: 'slower' },
    { src: 'https://media.istockphoto.com/id/1500853989/photo/happy-senior-punjabi-sikh-couple-wearing-colorful-cloths-standing-together-at-agriculture.webp?a=1&b=1&s=612x612&w=0&k=20&c=w6tLfkaKK7V3Ogu19X3exrkiKifG8QauXFSM_PsjzQg=', alt: 'Sikh couple', hint: 'sikh couple', className: 'slower last' },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-background/70">
      <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Media Gallery</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            A visual journey through the heart of rural India.
          </p>
      </div>

      <div className="external">
        <div className="horizontal-scroll-wrapper">
          {allGalleryItems.map((item, index) => (
             <div key={index} className={`img-wrapper ${item.className}`}>
                <a href={item.src} target="_blank" rel="noopener noreferrer">
                  <Image
                      src={item.src}
                      alt={item.alt}
                      width={500}
                      height={500}
                      data-ai-hint={item.hint}
                  />
                </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;