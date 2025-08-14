
'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const MapSection = () => {
  const MapComponent = useMemo(() => dynamic(
    () => import('@/components/MapComponent'),
    { 
      loading: () => <div className="w-full h-full bg-muted flex items-center justify-center"><p>A map is loading...</p></div>,
      ssr: false 
    }
  ), []);

  return (
    <section id="map" className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Explore on the Map</h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                    Click on the markers to discover stories from across the subcontinent.
                </p>
            </div>
            <div className="w-full max-w-6xl mx-auto aspect-video rounded-xl overflow-hidden shadow-xl border">
                <MapComponent />
            </div>
        </div>
    </section>
  );
};

export default MapSection;
