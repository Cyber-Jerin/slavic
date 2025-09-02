import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import CinematicHero from '@/components/CinematicHero';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Force dark mode for the cinematic aesthetic
    document.documentElement.classList.add('dark');

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Navigate to collection when scrolled past the third section
      if (currentScrollY > 1200) {
        navigate('/collection');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate]);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <CinematicHero />
      
      {/* Content Section with Scroll Animations */}
      <section className="relative min-h-screen bg-background">
        {/* Introduction Block */}
        <div 
          className={`px-8 py-32 transition-all duration-1000 ease-out ${
            scrollY > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-cinematic-xl text-primary mb-8 font-light tracking-[0.2em]">
              REDEFINITION
            </h2>
            <p className="text-cinematic-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Where tradition meets rebellion. Our avant-garde approach to sustainable fashion 
              challenges conventional beauty while honoring the earth.
            </p>
          </div>
        </div>

        {/* Philosophy Block */}
        <div 
          className={`px-8 py-32 transition-all duration-1000 ease-out delay-200 ${
            scrollY > 600 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-cinematic-lg text-primary mb-6 font-light">
                  CONSCIOUS ARTISTRY
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Every piece is a statement against fast fashion, crafted with intention 
                  and respect for both creator and earth.
                </p>
                <div className="h-px w-24 bg-primary" />
              </div>
              <div className="aspect-square bg-gradient-subtle rounded-sm opacity-60" />
            </div>
          </div>
        </div>

        {/* Mission Block */}
        <div 
          className={`px-8 py-32 transition-all duration-1000 ease-out delay-400 ${
            scrollY > 900 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-cinematic-lg text-primary mb-8 font-light tracking-[0.2em]">
              FUTURE HERITAGE
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Creating tomorrow's heirlooms today. Each garment carries the weight of purpose, 
              designed to transcend trends and embody timeless rebellion.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
