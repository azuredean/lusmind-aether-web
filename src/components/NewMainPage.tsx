import { useState, useEffect } from 'react';
import { NewHeroSection } from '@/components/NewHeroSection';
import { ProductCarousel } from '@/components/ProductCarousel';
import { ProductVerificationSection } from '@/components/ProductVerificationSection';
import { SubscribeSection } from '@/components/SubscribeSection';
import { Footer } from '@/components/Footer';
import { AgeVerification } from '@/components/AgeVerification';

export const NewMainPage = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(false);

  useEffect(() => {
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
    window.location.href = '/';
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Age verification modal */}
      {showAgeVerification && (
        <AgeVerification
          onVerified={handleAgeVerified}
          onReject={handleAgeRejected}
        />
      )}

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <NewHeroSection 
          onExploreProducts={() => scrollToSection('products')}
          onVerifyProduct={() => scrollToSection('verify')}
        />

        {/* Brand Introduction + Carousel */}
        <section id="products" className="section py-20 bg-black">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-300 bg-clip-text mb-6">
                  Welcome to LusMind
                </h2>
                <p className="text-lg text-white/85 mb-4">
                  We craft digital-forward flavors with artisanal precision, distilling complex ideas into simple, elegant sensations.
                </p>
                <p className="text-white/70 mb-4">
                  Our living identity evolves with culture—surprising, adaptable, and globally consistent across physical and digital touchpoints.
                </p>
                <p className="text-cyan-300 font-semibold">
                  "Innovation is our vapor, excellence is our essence."
                </p>
              </div>

              <div>
                <ProductCarousel />
              </div>
            </div>
          </div>
        </section>

        {/* Product Verification */}
        <ProductVerificationSection />

        {/* Subscribe */}
        <SubscribeSection />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};