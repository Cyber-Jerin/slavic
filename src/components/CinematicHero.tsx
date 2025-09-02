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
            className={`text-cinematic-brand text-primary mb-6 font-bold tracking-[0.3em] transition-all duration-[1.5s] delay-700 ease-out ${
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
      <button
        onClick={() => {
          // Create overlay starting from the line position
          const overlay = document.createElement('div');
          overlay.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            width: 1px;
            height: 1.5rem;
            background: hsl(var(--primary));
            z-index: 9999;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          `;
          document.body.appendChild(overlay);
          
          // Delay then expand upward
          setTimeout(() => {
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.bottom = '0';
            overlay.style.left = '0';
            overlay.style.transform = 'none';
            overlay.style.background = 'hsl(var(--background))';
          }, 300);
          
          // Navigate after animation
          setTimeout(() => {
            window.location.href = '/explore';
          }, 1100);
        }}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1500 ease-out cursor-pointer hover:opacity-100 ${
          isLoaded ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="text-cinematic-xs text-muted-foreground">Explore</div>
          <div className="h-6 w-px bg-primary animate-pulse" />
        </div>
      </button>
    </section>
  );
};

export default CinematicHero;