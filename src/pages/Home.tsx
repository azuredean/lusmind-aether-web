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
import heroProductsSide from "@/assets/hero-products-side.png";
const Index = () => {
  return <div className="min-h-screen bg-background text-foreground">
      {/* Warning Bar */}
      <div className="fixed top-0 left-0 right-0 w-full border-b bg-black text-white border-white/20 z-[60]">
        <div className="max-w-6xl mx-auto px-4 py-2 text-center text-xs md:text-sm tracking-wide">
          WARNING: This product contains nicotine. Nicotine is an addictive chemical.
        </div>
      </div>
      
      <Navbar theme="light" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-32 bg-[#F5F5F5]">
        {/* Corner CTAs */}
        <div className="absolute top-32 left-8 md:left-16 z-20 animate-fade-in-up" style={{
        animationDelay: '0.2s'
      }}>
          <CTAButton href="#team">Contact Our Team</CTAButton>
        </div>
        
        <div className="absolute top-32 right-8 md:right-16 z-20 animate-fade-in-up" style={{
        animationDelay: '0.4s'
      }}>
          <CTAButton href="#docs">Browse Catalog</CTAButton>
        </div>
        
        <div className="absolute bottom-32 right-8 md:right-16 z-20 animate-fade-in-up" style={{
        animationDelay: '0.6s'
      }}>
          <CTAButton href="#community">Join VIP Club</CTAButton>
        </div>

        {/* Hero Orb - Centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-in-up" style={{
        animationDelay: '0.3s'
      }}>
          
        </div>

        {/* Main Content - Left Aligned */}
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="max-w-2xl">
            {/* Hero Title */}
            <h1 className="text-5xl md:text-7xl font-normal leading-[1.2] animate-fade-in-up mb-6 text-[#2D2D2D]">
              Premium Vaping Experience<br />
              <span className="italic font-serif bg-gradient-to-r from-[#8FF5FF] to-[#FFA4F3] bg-clip-text text-transparent">LUSMIND</span>
            </h1>

            {/* Tagline */}
            <p className="text-base md:text-lg text-[#666666] animate-fade-in-up leading-relaxed mb-12" style={{
            animationDelay: '0.2s'
          }}>
              Pure flavor. Perfect satisfaction. Elevate your vaping journey.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-12 animate-fade-in-up" style={{
            animationDelay: '0.4s'
          }}>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">50+</span>
                <span className="text-sm text-[#666666]">Flavors</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">100,000+</span>
                <span className="text-sm text-[#666666]">Happy Customers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">5M+</span>
                <span className="text-sm text-[#666666]">Devices Sold</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{
            animationDelay: '0.6s'
          }}>
              <CTAButton href="#use-cases">Shop Our Products</CTAButton>
              <CTAButton href="#ecosystem">Find Retailers</CTAButton>
            </div>
          </div>
        </div>

        {/* Background decoration - Subtle circular grid */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#E0E0E0]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-[#E8E8E8]" />
          {/* Product Image on the right */}
          <img 
            src={heroProductsSide} 
            alt="LUSMIND Products" 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-auto opacity-90 animate-fade-in"
          />
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
    </div>;
};
export default Index;