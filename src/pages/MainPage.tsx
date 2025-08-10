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
import { USPHighlights } from '@/components/USPHighlights';
import { AuthenticityCTA } from '@/components/AuthenticityCTA';
export const MainPage = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(false);

  useEffect(() => {
    // Check if user has already verified age in this session
    const ageVerified = sessionStorage.getItem('ageVerified');
    if (!ageVerified) {
      setShowAgeVerification(true);
    }
  }, []);

  // SEO: title, meta description, canonical
  useEffect(() => {
    document.title = 'LusMind Premium E-Liquids | Neon Glassmorphism';
    const desc = 'LusMind premium e-liquids with minimal neon aesthetics, gradient glassmorphism, and authenticity verification.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    // Structured Data: Organization
    const scriptId = 'ld-json-org';
    let ld = document.getElementById(scriptId) as HTMLScriptElement | null;
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'LusMind',
      url: window.location.origin,
      logo: `${window.location.origin}/favicon.ico`,
      sameAs: [] as string[],
    };
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = scriptId;
      document.head.appendChild(ld);
    }
    ld.text = JSON.stringify(data);
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
          <h1 className="sr-only">LusMind Premium E-Liquids – Minimal Neon Glassmorphism</h1>
          {/* Hero Carousel */}
          <section className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-500/10">
            <div className="max-w-7xl mx-auto">
              <Carousel />
            </div>
          </section>

          {/* Brand Introduction */}
          <BrandIntroduction />

          {/* Highlights */}
          <USPHighlights />

          {/* Authenticity CTA */}
          <AuthenticityCTA />

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