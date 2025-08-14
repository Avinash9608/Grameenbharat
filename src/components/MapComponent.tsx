
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

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
    image: 'https://images.unsplash.com/photo-1542385153-285d88dd2248?w=600&auto=format&fit=crop', 
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

const MapComponent = () => {
    const [isMounted, setIsMounted] = useState(false);
    const indiaCenter: LatLngExpression = [22.5726, 82.9739];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <Skeleton className="w-full h-full bg-muted" />;
    }

    return (
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
    );
};

export default MapComponent;
