import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CinematicHero from '@/components/CinematicHero';

const Index = () => {
  useEffect(() => {
    // Force dark mode for the cinematic aesthetic
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <CinematicHero />
    </main>
  );
};

export default Index;
