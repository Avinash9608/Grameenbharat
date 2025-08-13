import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center min-h-screen pt-20 md:pt-0">
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left animate-fade-in-up">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            The Unseen Heartbeat of <span className="text-primary">Rural India</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground [animation-delay:200ms] animate-fade-in-up">
            Journey into a world where tradition breathes, culture flourishes, and life is painted with the simple joys of the earth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 [animation-delay:400ms] animate-fade-in-up">
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <a href="#culture">
                Start Exploring
                <ChevronRight className="ml-2" />
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="px-8 py-6 text-lg">
              <a href="#stories">Watch Stories</a>
            </Button>
          </div>
        </div>
        
        {/* Right Column: Image */}
        <div className="relative h-80 md:h-[60vh] w-full [animation-delay:200ms] animate-fade-in-up">
           <Image
              src="https://images.unsplash.com/photo-1631513497662-ea3733fda344?w=600&auto=format&fit=crop&q=60"
              alt="A group of vibrant women in a village in India"
              fill
              className="object-cover rounded-2xl shadow-2xl"
              priority
              data-ai-hint="indian women village"
            />
        </div>
      </div>
    </section>
  );
};

export default Hero;
