
'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const MapComponentWithNoSSR = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-full bg-muted" />,
});

const MapSection = () => {
  return (
    <section id="map-section" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Find Us on the Map</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Explore the locations of our featured villages interactively.
          </p>
        </div>
        <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-xl border">
          <MapComponentWithNoSSR />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
