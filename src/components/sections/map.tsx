
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

const villagePoints = [
  { 
    name: 'Mawlynnong, Meghalaya', 
    description: "Asia's cleanest village, known for its matriarchal society and living root bridges.", 
    image: 'https://media.istockphoto.com/id/840514260/photo/living-roots-bridge-over-river-shillong-meghalaya-india.webp', 
    hint: 'meghalaya village', 
    position: [25.2010, 91.9150] as LatLngExpression
  },
  { 
    name: 'Punsari, Gujarat', 
    description: 'A model village with Wi-Fi, CCTVs, and solar-powered street lights.', 
    image: 'https://media.istockphoto.com/id/2179925134/photo/front-view-of-the-ruined-panchayatan-temple-13th-century-group-of-monuments-parabadi.webp', 
    hint: 'gujarat village', 
    position: [23.3639, 72.5427] as LatLngExpression
  },
  { 
    name: 'Malana, Himachal Pradesh', 
    description: 'An ancient village with a unique democratic system and distinct culture.', 
    image: 'https://media.istockphoto.com/id/1492067960/photo/colorful-local-houses-in-manikaran-india.webp', 
    hint: 'himachal village', 
    position: [32.0653, 77.2539] as LatLngExpression
  },
  { 
    name: 'Khonoma, Nagaland', 
    description: 'A green village recognized for its pioneering conservation efforts and terrace farming.', 
    image: 'https://images.unsplash.com/photo-1628288126789-f1996d3b9e1a?w=600&auto=format&fit=crop', 
    hint: 'nagaland village', 
    position: [25.6333, 94.0333] as LatLngExpression
  },
  { 
    name: 'Litti Chokha heartland, Bihar', 
    description: 'Experience the rustic heartland of Bihar, famous for its smoky, delicious Litti Chokha.', 
    image: 'https://media.istockphoto.com/id/2189780938/photo/litti-chokha-with-raita-and-chutney.webp', 
    hint: 'bihar village', 
    position: [25.0961, 85.3131] as LatLngExpression
  },
];

const MapSection = () => {
  const indiaCenter: LatLngExpression = [22.5726, 82.9739];

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
                <MapContainer center={indiaCenter} zoom={5} scrollWheelZoom={false} className="h-full w-full">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {villagePoints.map(village => (
                        <Marker key={village.name} position={village.position}>
                            <Popup>
                                <div className="w-60">
                                    <div className="relative h-28 w-full mb-2 rounded-md overflow-hidden">
                                        <Image src={village.image} alt={village.name} fill className="object-cover" data-ai-hint={village.hint} />
                                    </div>
                                    <h3 className="font-bold font-headline text-lg">{village.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-2">{village.description}</p>
                                     <Button asChild size="sm" className="w-full">
                                        <a 
                                            href={`https://www.google.com/maps/search/?api=1&query=${village.position[0]},${village.position[1]}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            <MapPin className="mr-2 h-4 w-4"/> View on Google Maps
                                        </a>
                                    </Button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    </section>
  );
};

export default MapSection;
