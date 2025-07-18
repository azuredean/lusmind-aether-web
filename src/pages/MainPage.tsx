import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Carousel } from '@/components/Carousel';
import { BrandIntroduction } from '@/components/BrandIntroduction';
import { ProductVerification } from '@/components/ProductVerification';
import { Footer } from '@/components/Footer';
import { VaporBackground } from '@/components/VaporBackground';
import { MouseVaporTrail } from '@/components/MouseVaporTrail';
import { AgeVerification } from '@/components/AgeVerification';
import { BrandElements } from '@/components/BrandElements';

export const MainPage = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(false);

  useEffect(() => {
    // Check if user has already verified age in this session
    const ageVerified = sessionStorage.getItem('ageVerified');
    if (!ageVerified) {
      setShowAgeVerification(true);
    }
  }, []);

  const handleAgeVerified = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setShowAgeVerification(false);
  };

  const handleAgeRejected = () => {
    // Redirect to hero section or exit page
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen relative">
      {/* Background effects */}
      <VaporBackground />
      <MouseVaporTrail />
      <BrandElements />

      {/* Age verification modal */}
      {showAgeVerification && (
        <AgeVerification
          onVerified={handleAgeVerified}
          onReject={handleAgeRejected}
        />
      )}

      {/* Main content */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navigation />

        {/* Main content sections */}
        <main>
          {/* Hero Carousel */}
          <section className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <Carousel />
            </div>
          </section>

          {/* Brand Introduction */}
          <BrandIntroduction />

          {/* Product Verification */}
          <div id="verification">
            <ProductVerification />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};