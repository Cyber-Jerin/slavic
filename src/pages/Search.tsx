import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

const recentSearches = ['oversized hoodie', 'minimal blazer', 'urban sneakers'];
const popularSearches = ['essential tee', 'denim jacket', 'canvas bag', 'wool coat', 'leather boots'];

const Search = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert('Voice recognition not supported in this browser');
    }
  };

  const handleSearchClick = (query: string) => {
    setSearchQuery(query);
  };

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
              SEARCH
            </h1>
            <div className="h-px w-24 bg-primary mx-auto mt-8" />
          </div>

          {/* Search Bar */}
          <div
            className={`mb-16 transition-all duration-1000 delay-300 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-transparent border-2 border-border focus:border-primary rounded-none px-6 py-4 text-cinematic-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-elegant"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-3">
                <button
                  onClick={handleVoiceSearch}
                  disabled={isListening}
                  className={`p-2 transition-elegant ${
                    isListening 
                      ? 'text-primary animate-pulse' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                    <path d="M19 10v1a7 7 0 0 1-14 0v-1"/>
                    <line x1="12" y1="19" x2="12" y2="22"/>
                    <line x1="8" y1="22" x2="16" y2="22"/>
                  </svg>
                </button>
                <button className="text-muted-foreground hover:text-primary transition-elegant">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </div>
            </div>
            {isListening && (
              <p className="text-center mt-4 text-cinematic-sm text-primary animate-pulse">
                Listening...
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Recent Searches */}
            <div
              className={`transition-all duration-1000 delay-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-cinematic-lg text-foreground mb-6 font-medium tracking-wide">
                Recent Searches
              </h2>
              <div className="space-y-3">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchClick(search)}
                    className="block w-full text-left px-4 py-3 text-cinematic-sm text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-elegant"
                  >
                    <div className="flex items-center space-x-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 12h18"/>
                        <path d="M3 6h18"/>
                        <path d="M3 18h18"/>
                      </svg>
                      <span>{search}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div
              className={`transition-all duration-1000 delay-700 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-cinematic-lg text-foreground mb-6 font-medium tracking-wide">
                Popular Searches
              </h2>
              <div className="space-y-3">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchClick(search)}
                    className="block w-full text-left px-4 py-3 text-cinematic-sm text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-elegant"
                  >
                    <div className="flex items-center space-x-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M16 6l2 14l-4-4l-4 4z"/>
                      </svg>
                      <span>{search}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Tips */}
          <div
            className={`mt-16 text-center transition-all duration-1000 delay-900 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-block border border-primary/20 px-8 py-4">
              <p className="text-cinematic-sm text-muted-foreground">
                Try searching for categories, colors, or specific items
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Search;