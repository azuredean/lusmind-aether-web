import Navbar from "@/components/Navbar";
import HeroOrb from "@/components/HeroOrb";
import CTAButton from "@/components/CTAButton";
import EcosystemLogos from "@/components/EcosystemLogos";
import ProblemStatement from "@/components/ProblemStatement";
import ProductFeatures from "@/components/ProductFeatures";
import UseCases from "@/components/UseCases";
import BackedBy from "@/components/BackedBy";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const Home = () => {
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    setTitleVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#2D2D2D]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 md:pt-20">
        {/* Corner CTAs - Better positioning */}
        <div className="absolute top-24 md:top-32 left-6 md:left-12 lg:left-16 z-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <CTAButton href="#team">Talk to our Team</CTAButton>
        </div>
        
        <div className="absolute top-24 md:top-32 right-6 md:right-12 lg:right-16 z-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <CTAButton href="#docs">Explore Documentation</CTAButton>
        </div>
        
        <div className="absolute bottom-24 md:bottom-32 right-6 md:right-12 lg:right-16 z-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <CTAButton href="#community">Join our Community</CTAButton>
        </div>

        {/* Hero Orb - Centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <HeroOrb />
        </div>

        {/* Main Content - Left Aligned with better spacing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="max-w-3xl">
            {/* Hero Title - Optimized sizing */}
            <h1 className="text-[48px] md:text-[72px] lg:text-[88px] xl:text-[96px] font-extralight leading-[1.1] mb-4 md:mb-6">
              <span className={`inline-block transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.1s' }}>
                Infinite
              </span>
              {' '}
              <span className={`inline-block transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.15s' }}>
                Compute
              </span>
              {' '}
              <span className={`inline-block transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.2s' }}>
                Layer
              </span>
              {' '}
              <span className={`inline-block transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.25s' }}>
                for
              </span>
              <br />
              <span className={`inline-block font-serif italic text-[44px] md:text-[66px] lg:text-[80px] xl:text-[88px] transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.3s' }}>
                {'{E}'}
              </span>
            </h1>

            {/* Tagline - Better responsive sizing */}
            <p className={`text-[14px] md:text-[16px] lg:text-[17px] text-[#666666] leading-relaxed max-w-xl transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.5s' }}>
              Prove with zero knowledge. Verify instantly. Build impossible applications.
            </p>
          </div>
        </div>

        {/* Stats Section - Bottom Center with optimized spacing */}
        <div className="absolute bottom-16 md:bottom-20 lg:bottom-24 left-0 right-0 z-10">
          <div className="container mx-auto px-6">
            {/* Trusted by title */}
            <h3 className={`text-center text-[#4A90E2] text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.9s' }}>
              Trusted by the <span className="italic font-serif">{'{best}'}</span>
            </h3>
            
            {/* Stats - Better responsive layout */}
            <div className={`flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-20 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1s' }}>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl lg:text-5xl font-light mb-1 md:mb-2">30+</span>
                <span className="text-xs md:text-sm text-[#666666]">Partners</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl lg:text-5xl font-light mb-1 md:mb-2">94,701</span>
                <span className="text-xs md:text-sm text-[#666666]">Users</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl lg:text-5xl font-light mb-1 md:mb-2">125,423,861</span>
                <span className="text-xs md:text-sm text-[#666666]">Proofs</span>
              </div>
            </div>

            {/* Bottom CTAs - Better mobile layout */}
            <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-8 md:mt-10 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1.1s' }}>
              <a href="#cases" className="text-xs md:text-sm text-[#2D2D2D] hover:text-[#666666] transition-colors flex items-center gap-2 whitespace-nowrap">
                [ See All Use Cases ] <span>→</span>
              </a>
              <a href="#built" className="text-xs md:text-sm text-[#2D2D2D] hover:text-[#666666] transition-colors flex items-center gap-2 whitespace-nowrap">
                [ Explore What They Built ] <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Background decoration - More rings for depth */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-[#E0E0E0]/50" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] rounded-full border border-[#E0E0E0]/30" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] md:w-[1200px] md:h-[1200px] rounded-full border border-[#E0E0E0]/20" />
        </div>
      </section>

      {/* Ecosystem Partners */}
      <EcosystemLogos />

      {/* Problem Statement */}
      <ProblemStatement />

      {/* Product Features */}
      <ProductFeatures />

      {/* Use Cases */}
      <UseCases />

      {/* Backed By */}
      <BackedBy />

      {/* Pre-Footer CTA */}
      <PreFooterCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
