import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled 
          ? 'backdrop-cinematic shadow-subtle' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-cinematic-base text-primary font-bold tracking-wider">
            SLAVIC
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#collection"
              className="text-cinematic-sm text-muted-foreground hover:text-primary transition-elegant cursor-pointer"
            >
              Collection
            </a>
            <a
              href="#philosophy"
              className="text-cinematic-sm text-muted-foreground hover:text-primary transition-elegant cursor-pointer"
            >
              Philosophy
            </a>
            <a
              href="#sustainability"
              className="text-cinematic-sm text-muted-foreground hover:text-primary transition-elegant cursor-pointer"
            >
              Sustainability
            </a>
            <a
              href="#contact"
              className="text-cinematic-sm text-muted-foreground hover:text-primary transition-elegant cursor-pointer"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;