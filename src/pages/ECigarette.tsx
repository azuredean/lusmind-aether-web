import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileMenuECig } from "@/components/MobileMenuECig";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/ecigarette-hero-new.png";
import distinguishedFeaturesBg from "@/assets/distinguished-features-bg.png";

const theme = {
  bg: {
    canvas: "#F7F5F2",
    oatmeal: "#EDE6DD",
    beige: "#F4EFE9"
  },
  text: {
    base: "#1F2937",
    mute: "#6B7280"
  },
  pastel: {
    blue: "#CFE8FF",
    mint: "#D8F3E1",
    coral: "#FFD6D6"
  },
  accent: {
    softOrange: "#FFCFA3",
    softYellow: "#FFE8A3"
  },
  brand: {
    primary: "#353995",
    secondary: "#E6FE7F"
  }
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function TopWarningBar() {
  return (
    <div className={cn("w-full border-b bg-black text-white border-white/20")}>
      <div className="max-w-6xl mx-auto px-4 py-2 text-center text-xs md:text-sm tracking-wide">
        WARNING: This product contains nicotine. Nicotine is an addictive chemical.
      </div>
    </div>
  );
}

export default function ECigarette() {
  return (
    <div className="min-h-screen bg-[#D1B893]">
      {/* Warning Bar */}
      <TopWarningBar />
      
      {/* Navigation */}
      <Navbar theme="light" />

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-12 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="E-cigarette products" 
            className="w-full h-full object-cover object-center"
            style={{ 
              objectFit: 'cover',
              maxWidth: '100%',
              height: '100%',
              transform: 'scale(0.95) translateY(-8%)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#741016]/80 to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight" style={{ fontFamily: 'Playfair Display, Lora, serif', letterSpacing: '0.02em' }}>
              Timeless Flavor,<br />
              Everlasting Legacy
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 mb-6 md:mb-8" style={{ fontFamily: 'Playfair Display, Lora, serif', letterSpacing: '0.03em' }}>
              Experience the perfect blend of tradition and innovation
            </p>
            <Button 
              className="bg-[#AD5246] hover:bg-[#931B21] text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg rounded-md transition-all min-h-[44px]"
              style={{ borderRadius: '6px' }}
            >
              Explore Collection
            </Button>

          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-12 md:py-20 bg-[#D1B893]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3A2A25] mb-4 md:mb-6 text-center" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
              Our Heritage
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-[#3A2A25] mb-6 md:mb-8 leading-relaxed text-center font-sans">
              For generations, we've crafted experiences that transcend time. Each product is a testament to our commitment to quality, authenticity, and the art of refined taste.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">

              <Card className="bg-white/50 backdrop-blur border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#3A2A25]" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
                    Premium Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#3A2A25]/80 font-sans">
                    Meticulously selected ingredients for an unparalleled experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/50 backdrop-blur border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#3A2A25]" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
                    Crafted Excellence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#3A2A25]/80 font-sans">
                    Every detail refined through years of expertise and dedication.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/50 backdrop-blur border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#3A2A25]" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
                    Timeless Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#3A2A25]/80 font-sans">
                    Elegant aesthetics that honor tradition while embracing modernity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features Section */}
      <section 
        className="py-20 bg-cover bg-bottom bg-no-repeat relative"
        style={{ backgroundImage: `url(${distinguishedFeaturesBg})` }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
            Distinguished Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#741016] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
                  Authentic Craftsmanship
                </h3>
                <p className="text-white/90 font-sans">
                  Each piece represents decades of knowledge passed down through master craftsmen.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#741016] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
                  Refined Experience
                </h3>
                <p className="text-white/90 font-sans">
                  Carefully balanced flavors that deliver sophistication in every moment.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#741016] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
                  Sustainable Practices
                </h3>
                <p className="text-white/90 font-sans">
                  Committed to environmental responsibility without compromising quality.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#741016] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
                  Legacy of Trust
                </h3>
                <p className="text-white/90 font-sans">
                  Built on a foundation of integrity and customer satisfaction spanning generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B102A] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 font-sans">LUSMIND</h3>
              <p className="text-white/60 text-sm font-sans">
                Timeless quality, everlasting excellence.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-sans">Quick Links</h4>
              <ul className="space-y-2 text-sm font-sans">
                <li><a href="/#story" className="text-white/60 hover:text-white">Story</a></li>
                <li><a href="/#safety" className="text-white/60 hover:text-white">Compliance</a></li>
                <li><a href="/#verify" className="text-white/60 hover:text-white">Product Verification</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-sans">Products</h4>
              <ul className="space-y-2 text-sm font-sans">
                <li><Link to="/e-liquid" className="text-white/60 hover:text-white">E-Liquid</Link></li>
                <li><Link to="/e-cigarette" className="text-white/60 hover:text-white">E-cigarette</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-sans">Contact</h4>
              <ul className="space-y-2 text-sm font-sans">
                <li><a href="/#contact" className="text-white/60 hover:text-white">Get in Touch</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60 font-sans">
            <p>© 2025 LUSMIND. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Fixed Warning Badge */}
      <div className="fixed top-1/2 -right-12 md:right-2 md:top-auto md:bottom-6 rotate-90 md:rotate-0 z-40">
        <div className="rounded-full bg-white/10 backdrop-blur border border-white/10 px-3 py-1 text-[11px] text-white">
          * WARNING: Nicotine is an addictive chemical · Adults only
        </div>
      </div>
    </div>
  );
}
