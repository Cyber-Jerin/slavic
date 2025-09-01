import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

const categories = ['All', 'Men', 'Women', 'Sneakers', 'Accessories'];
const sizeFilters = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const typeFilters = ['T-Shirts', 'Hoodies', 'Jackets', 'Pants', 'Accessories'];
const priceRanges = ['Under $50', '$50-$100', '$100-$150', 'Over $150'];

const products = [
  {
    id: 1,
    name: "Essential Tee",
    price: "$45",
    category: "Men",
    type: "T-Shirts",
    priceRange: "Under $50",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Classic Hoodie",
    price: "$75",
    category: "Women",
    type: "Hoodies",
    priceRange: "$50-$100",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop"
  },
  {
    id: 3,
    name: "Minimal Sneakers",
    price: "$120",
    category: "Sneakers",
    type: "Sneakers",
    priceRange: "$100-$150",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop"
  },
  {
    id: 4,
    name: "Structured Blazer",
    price: "$180",
    category: "Women",
    type: "Jackets",
    priceRange: "Over $150",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Canvas Bag",
    price: "$35",
    category: "Accessories",
    type: "Accessories",
    priceRange: "Under $50",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop"
  },
  {
    id: 6,
    name: "Relaxed Denim",
    price: "$90",
    category: "Men",
    type: "Pants",
    priceRange: "$50-$100",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop"
  }
];

const Collection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) return false;
    if (selectedPriceRanges.length > 0 && !selectedPriceRanges.includes(product.priceRange)) return false;
    return true;
  });

  const toggleFilter = (filterArray: string[], setFilterArray: (arr: string[]) => void, item: string) => {
    if (filterArray.includes(item)) {
      setFilterArray(filterArray.filter(f => f !== item));
    } else {
      setFilterArray([...filterArray, item]);
    }
  };

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
              COLLECTION
            </h1>
            <p className="text-cinematic-lg text-muted-foreground max-w-2xl mx-auto">
              Curated pieces for the modern minimalist
            </p>
            <div className="h-px w-24 bg-primary mx-auto mt-8" />
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Filters Sidebar */}
            <div
              className={`lg:w-1/4 space-y-8 transition-all duration-1000 delay-300 ease-out ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              {/* Categories */}
              <div>
                <h3 className="text-cinematic-base text-foreground font-medium mb-4 tracking-wide">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 text-cinematic-sm transition-elegant ${
                        selectedCategory === category
                          ? 'text-primary border-l-2 border-primary bg-primary/5'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h3 className="text-cinematic-base text-foreground font-medium mb-4 tracking-wide">
                  Size
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizeFilters.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleFilter(selectedSizes, setSelectedSizes, size)}
                      className={`px-3 py-2 text-cinematic-xs border transition-elegant ${
                        selectedSizes.includes(size)
                          ? 'border-primary text-primary bg-primary/5'
                          : 'border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h3 className="text-cinematic-base text-foreground font-medium mb-4 tracking-wide">
                  Type
                </h3>
                <div className="space-y-2">
                  {typeFilters.map(type => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                        className="w-4 h-4 text-primary bg-transparent border-border rounded focus:ring-primary/50"
                      />
                      <span className="text-cinematic-sm text-muted-foreground">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-cinematic-base text-foreground font-medium mb-4 tracking-wide">
                  Price Range
                </h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(range)}
                        onChange={() => toggleFilter(selectedPriceRanges, setSelectedPriceRanges, range)}
                        className="w-4 h-4 text-primary bg-transparent border-border rounded focus:ring-primary/50"
                      />
                      <span className="text-cinematic-sm text-muted-foreground">
                        {range}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`group cursor-pointer transition-all duration-700 ease-out ${
                      isLoaded 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: `${500 + index * 100}ms` }}
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
                        {product.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Collection;