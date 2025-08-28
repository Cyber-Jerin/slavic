import { useEffect, useState } from 'react';
import heroImage from '@/assets/hero-image.jpg';

const CinematicHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Model in charcoal tunic - avant-garde fashion photography"
          className={`h-full w-full object-cover object-center transition-all duration-[2s] ease-out ${
            isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 backdrop-cinematic opacity-40" />
        
        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60" />
      </div>

      {/* Brand Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          {/* Brand Name */}
          <h1
            className={`text-cinematic-brand text-primary mb-6 font-bold tracking-widest transition-all duration-[1.5s] delay-700 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            SLAVIC
          </h1>
          
          {/* Subtitle */}
          <p
            className={`text-cinematic-lg text-muted-foreground max-w-md mx-auto transition-all duration-[1.2s] delay-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Avant-garde sustainable fashion
          </p>
          
          {/* Minimal Line Accent */}
          <div
            className={`h-px w-16 bg-primary mx-auto mt-8 transition-all duration-1000 delay-1300 ease-out ${
              isLoaded ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1500 ease-out ${
          isLoaded ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="text-cinematic-xs text-muted-foreground">Explore</div>
          <div className="h-6 w-px bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;