import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { MainPage } from './MainPage';
import { VaporBackground } from '@/components/VaporBackground';
import { MouseVaporTrail } from '@/components/MouseVaporTrail';

const Index = () => {
  const [showMainPage, setShowMainPage] = useState(false);

  const handleEnterMainPage = () => {
    // 清除之前的年龄验证状态，确保每次进入都重新验证
    sessionStorage.removeItem('ageVerified');
    setShowMainPage(true);
  };

  if (showMainPage) {
    return <MainPage />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Background effects */}
      <VaporBackground />
      <MouseVaporTrail />
      
      {/* Hero Section */}
      <HeroSection onEnter={handleEnterMainPage} />
    </div>
  );
};

export default Index;
