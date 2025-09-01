import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

const Sustainability = () => {
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
              SUSTAINABILITY
            </h1>
            <p className="text-cinematic-lg text-muted-foreground max-w-2xl mx-auto">
              Our commitment to ethical fashion and environmental responsibility
            </p>
            <div className="h-px w-24 bg-primary mx-auto mt-8" />
          </div>

          <div className="space-y-12">
            <div
              className={`transition-all duration-1000 delay-300 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-cinematic-lg text-foreground mb-6 font-medium tracking-wide">
                Sustainable Materials
              </h2>
              <p className="text-cinematic-base text-muted-foreground leading-relaxed">
                We source only organic and recycled materials, working directly with certified 
                suppliers who share our commitment to environmental stewardship. Every fabric 
                in our collection meets strict sustainability standards.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-cinematic-lg text-foreground mb-6 font-medium tracking-wide">
                Ethical Production
              </h2>
              <p className="text-cinematic-base text-muted-foreground leading-relaxed">
                Our garments are produced in fair-trade certified facilities where workers 
                receive living wages and operate in safe, dignified conditions. We maintain 
                long-term partnerships with our manufacturers to ensure consistent ethical standards.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-700 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-cinematic-lg text-foreground mb-6 font-medium tracking-wide">
                Carbon Neutral Shipping
              </h2>
              <p className="text-cinematic-base text-muted-foreground leading-relaxed">
                We offset 100% of our shipping emissions through verified carbon reduction 
                projects. Our packaging is made from recycled materials and is fully biodegradable, 
                minimizing our environmental footprint from production to delivery.
              </p>
            </div>

            <div
              className={`text-center mt-16 transition-all duration-1000 delay-900 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-block border border-primary/20 px-8 py-4">
                <p className="text-cinematic-sm text-primary tracking-[0.15em] uppercase">
                  Fashion with conscience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Sustainability;