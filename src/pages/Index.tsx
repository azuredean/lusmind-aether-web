import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { MainPage } from './MainPage';
import { VaporBackground } from '@/components/VaporBackground';
import { MouseVaporTrail } from '@/components/MouseVaporTrail';

const Index = () => {
  const [showMainPage, setShowMainPage] = useState(false);

  if (showMainPage) {
    return <MainPage />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Background effects */}
      <VaporBackground />
      <MouseVaporTrail />
      
      {/* Hero Section */}
      <HeroSection onEnter={() => setShowMainPage(true)} />
    </div>
  );
};

export default Index;
