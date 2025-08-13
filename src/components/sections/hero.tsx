import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="h-screen w-full bg-background flex flex-col md:flex-row">
      {/* Text Content Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 order-2 md:order-1">
        <div className="max-w-md text-center md:text-left">
          <div className="[animation-delay:200ms] animate-fade-in-up">
            <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              The Soul of India,
              <span className="text-primary"> Unscripted.</span>
            </h1>
          </div>
          <div className="[animation-delay:400ms] animate-fade-in-up">
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Journey into a world where tradition breathes, culture flourishes, and life is painted with the simple joys of the earth.
            </p>
          </div>
          <div className="[animation-delay:600ms] animate-fade-in-up">
            <Button asChild size="lg" className="mt-8 px-8 py-6 text-lg bg-primary hover:bg-primary/90 shadow-lg transition-transform hover:scale-105">
              <a href="#culture">
                Start Exploring
                <ChevronRight className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative order-1 md:order-2">
        <Image
          src="https://images.unsplash.com/photo-1623211270166-bc232d744d6a?q=80&w=1170&auto=format&fit=crop"
          alt="A potter shaping clay on a wheel in a rural Indian village"
          fill
          className="object-cover"
          priority
          data-ai-hint="village pottery"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r"></div>
      </div>
    </section>
  );
};

export default Hero;
