import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-[-1] brightness-50">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1631513497662-ea3733fda344?w=600&auto=format&fit=crop&q=60"
        >
          {/* Using a placeholder video, you can replace this with your own */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-people-walking-on-a-dirt-path-in-a-village-50587-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6 p-4 text-white">
        <div className="[animation-delay:200ms] animate-fade-in-up">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight drop-shadow-2xl">
              The Unseen Heartbeat of <span className="text-green-300">Rural India</span>
            </h1>
        </div>
        <div className="[animation-delay:400ms] animate-fade-in-up">
            <p className="mt-4 max-w-3xl text-lg md:text-xl text-stone-100 drop-shadow-xl">
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
    </section>
  );
};

export default Hero;
