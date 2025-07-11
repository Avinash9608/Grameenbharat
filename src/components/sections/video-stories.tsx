
'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { PlayCircle } from "lucide-react";

const videoItems = [
    { title: "A Day in a Farmer's Life", src: "https://placehold.co/1600x900.png", hint: "farmer working", videoId: "Bhs7yXhJBdo" },
    { title: "Celebrating Holi in Villages", src: "https://placehold.co/1600x900.png", hint: "holi festival", videoId: "AbFIkJ8KFZ8" },
    { title: "Folk Songs &amp; Dance", src: "https://placehold.co/1600x900.png", hint: "folk dance", videoId: "w0gamtoWxnE" },
    { title: "The Art of Pottery", src: "https://placehold.co/1600x900.png", hint: "pottery making", videoId: "ErSL2EkQocs" },
    { title: "Monsoon Arrival", src: "https://placehold.co/1600x900.png", hint: "monsoon rain", videoId: "RPassbDKT4s" },
];

const VideoStories = () => {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  return (
    <section id="stories" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Video Stories &amp; Documentaries</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Watch captivating short films that bring the village stories to life.
          </p>
        </div>
        <Carousel 
          opts={{ align: "start", loop: true }} 
          className="w-full"
          onSelect={() => setPlayingVideoId(null)} // Stop video when sliding
        >
          <CarouselContent>
            {videoItems.map((video, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden group border-none shadow-lg">
                    <CardContent className="relative aspect-video p-0 bg-black">
                      {playingVideoId === video.videoId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      ) : (
                        <>
                          <Image src={video.src} alt={video.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={video.hint} />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 group-hover:bg-black/40">
                            {video.videoId ? (
                              <button onClick={() => setPlayingVideoId(video.videoId)} className="appearance-none bg-transparent border-none cursor-pointer">
                                <PlayCircle className="h-20 w-20 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300 cursor-pointer" />
                              </button>
                            ) : (
                              <PlayCircle className="h-20 w-20 text-white/70" />
                            )}
                          </div>
                          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
                            <h3 className="font-headline text-xl text-white font-semibold">{video.title}</h3>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16 hidden md:flex" />
          <CarouselNext className="mr-16 hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default VideoStories;
