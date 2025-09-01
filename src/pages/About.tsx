import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-cinematic-brand text-primary mb-4 font-bold tracking-[0.2em]">
              ABOUT
            </h1>
            <div className="h-px w-24 bg-primary mx-auto mt-8" />
          </div>

          <div className="space-y-12">
            <div
              className={`transition-all duration-1000 delay-300 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-cinematic-lg text-foreground mb-6 font-medium tracking-wide">
                Our Philosophy
              </h2>
              <p className="text-cinematic-base text-muted-foreground leading-relaxed">
                We built SLAVIC to challenge the conventional fashion industry. In a world overwhelmed 
                by fast fashion and overcomplicated designs, we believe in the power of simplicity 
                and accessibility.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-cinematic-base text-muted-foreground leading-relaxed">
                Our mission is to make minimalistic, high-quality fashion affordable and accessible 
                to everyone. We believe that great design doesn't need to be expensive or complicated. 
                Every piece in our collection is carefully curated to embody timeless elegance while 
                remaining within reach.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-700 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-cinematic-base text-muted-foreground leading-relaxed">
                We're not just selling clothes; we're advocating for a mindful approach to fashion. 
                By focusing on essential pieces that transcend seasonal trends, we encourage a more 
                conscious relationship with what we wear. Quality over quantity. Substance over spectacle. 
                This is the future of fashion we're building together.
              </p>
            </div>

            <div
              className={`text-center mt-16 transition-all duration-1000 delay-900 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-block border border-primary/20 px-8 py-4">
                <p className="text-cinematic-sm text-primary tracking-[0.15em] uppercase">
                  Making minimalism accessible
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;