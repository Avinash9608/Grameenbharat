import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Village scenery at sunset"
          fill
          className="object-cover brightness-50"
          data-ai-hint="village sunset"
          priority
        />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6 p-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight drop-shadow-lg">
          Experience the Soul of Rural India
        </h1>
        <p className="max-w-3xl text-lg md:text-xl lg:text-2xl text-stone-200 drop-shadow-md">
          Traditions, Culture, Lifestyle, and Stories from the Heart of the Village
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg">
            <a href="#culture">Explore Culture</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 font-bold px-8 py-6 text-lg bg-black/20 backdrop-blur-sm">
            <a href="#stories">Watch Stories</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
