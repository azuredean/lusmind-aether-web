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
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Corner CTAs */}
        <div className="absolute top-32 left-8 md:left-16 z-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <CTAButton href="#team">Talk to our Team</CTAButton>
        </div>
        
        <div className="absolute top-32 right-8 md:right-16 z-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <CTAButton href="#docs">Explore Documentation</CTAButton>
        </div>
        
        <div className="absolute bottom-32 right-8 md:right-16 z-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <CTAButton href="#community">Join our Community</CTAButton>
        </div>

        {/* Hero Orb - Centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <HeroOrb />
        </div>

        {/* Main Content - Left Aligned */}
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="max-w-3xl">
            {/* Hero Title with letter-by-letter animation */}
            <h1 className="text-5xl md:text-7xl font-light leading-[1.15] mb-8">
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
              <span className={`inline-block font-serif italic transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.3s' }}>
                {'{Web3}'}
              </span>
            </h1>

            {/* Tagline */}
            <p className={`text-lg md:text-xl text-[#666666] leading-relaxed mb-12 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.5s' }}>
              Prove with zero knowledge. Verify instantly. Build impossible applications.
            </p>

            {/* Stats */}
            <div className={`flex flex-wrap gap-8 md:gap-12 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.7s' }}>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-light mb-1">30+</span>
                <span className="text-sm text-[#666666]">Partners</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-light mb-1">94,701</span>
                <span className="text-sm text-[#666666]">Users</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-light mb-1">125,423,861</span>
                <span className="text-sm text-[#666666]">Proofs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#E0E0E0]/50" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-[#E0E0E0]/30" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-[#E0E0E0]/20" />
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
