import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

const products = [
  {
    id: 1,
    name: "Oversized Cotton Tee",
    price: "$45",
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Minimalist Shacket",
    price: "$120",
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop"
  },
  {
    id: 3,
    name: "Urban Hoodie",
    price: "$75",
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop"
  },
  {
    id: 4,
    name: "Essential Beanie",
    price: "$25",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop"
  },
  {
    id: 5,
    name: "Relaxed Denim",
    price: "$90",
    category: "Pants",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop"
  },
  {
    id: 6,
    name: "Structured Blazer",
    price: "$180",
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
  }
];

const Explore = () => {
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
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-cinematic-brand text-primary mb-4 font-bold tracking-[0.2em]">
              EXPLORE
            </h1>
            <p className="text-cinematic-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of minimalistic fashion essentials
            </p>
            <div className="h-px w-24 bg-primary mx-auto mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`group cursor-pointer transition-all duration-700 ease-out ${
                  isLoaded 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="relative overflow-hidden bg-muted rounded-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-all duration-500" />
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-cinematic-base text-foreground font-medium tracking-wide">
                      {product.name}
                    </h3>
                    <span className="text-cinematic-base text-primary font-bold">
                      {product.price}
                    </span>
                  </div>
                  <p className="text-cinematic-sm text-muted-foreground uppercase tracking-wider">
                    {product.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Explore;