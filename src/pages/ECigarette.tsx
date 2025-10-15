import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/ecigarette-hero.png";

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
      <header className={cn("sticky top-0 z-30 border-b transition-colors backdrop-blur bg-[rgba(11,16,42,0.6)] border-white/10")}>
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/lovable-uploads/6a3cad97-68cc-4600-9c35-7d92e2c90d4b.png" alt="LM Logo" className="h-8 w-8" />
            <img src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png" alt="LUSMIND" className="h-8 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn("text-white/80 hover:text-white bg-transparent hover:bg-white/10 border-none px-3 py-2 rounded-lg text-sm font-normal", "data-[state=open]:bg-white/10 data-[state=open]:text-white")}>
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[200px] backdrop-blur bg-[rgba(11,16,42,0.6)] border border-white/10 rounded-xl p-2">
                    <div className="flex flex-col gap-1">
                      <a href="/#eliquid" className="px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        E-Liquid
                      </a>
                      <Link to="/e-cigarette" className="px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        E-cigarette
                      </Link>
                      <span className="px-3 py-2 text-sm text-white/50 cursor-not-allowed rounded-lg">
                        Coming soon
                      </span>
                      <span className="px-3 py-2 text-sm text-white/50 cursor-not-allowed rounded-lg">
                        Coming soon
                      </span>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <a className={cn("text-white/80 hover:text-white")} href="/#story">Story</a>
            <a className={cn("text-white/80 hover:text-white")} href="/#safety">Compliance</a>
            <a className={cn("text-white/80 hover:text-white")} href="/#contact">Contact</a>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button className="rounded-xl" style={{
              background: theme.brand.secondary,
              color: "#0B102A"
            }}>
              Explore Flavors
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="E-cigarette products" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#741016]/80 to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'Playfair Display, Lora, serif', letterSpacing: '0.02em' }}>
              Timeless Flavor,<br />
              Everlasting Legacy
            </h1>
            <p className="text-xl md:text-2xl text-white/85 mb-8" style={{ fontFamily: 'Playfair Display, Lora, serif', letterSpacing: '0.03em' }}>
              Experience the perfect blend of tradition and innovation
            </p>
            <Button 
              className="bg-[#AD5246] hover:bg-[#931B21] text-white px-8 py-6 text-lg rounded-md transition-all"
              style={{ borderRadius: '6px' }}
            >
              Explore Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-[#D1B893]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3A2A25] mb-6 text-center" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
              Our Heritage
            </h2>
            <p className="text-lg text-[#3A2A25] mb-8 leading-relaxed text-center font-sans">
              For generations, we've crafted experiences that transcend time. Each product is a testament to our commitment to quality, authenticity, and the art of refined taste.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
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
      <section className="py-20 bg-gradient-to-b from-[#D1B893] to-[#C8A882]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3A2A25] mb-12 text-center" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
            Distinguished Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#741016] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#3A2A25] mb-2" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
                  Authentic Craftsmanship
                </h3>
                <p className="text-[#3A2A25]/80 font-sans">
                  Each piece represents decades of knowledge passed down through master craftsmen.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#741016] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#3A2A25] mb-2" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
                  Refined Experience
                </h3>
                <p className="text-[#3A2A25]/80 font-sans">
                  Carefully balanced flavors that deliver sophistication in every moment.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#741016] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#3A2A25] mb-2" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
                  Sustainable Practices
                </h3>
                <p className="text-[#3A2A25]/80 font-sans">
                  Committed to environmental responsibility without compromising quality.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#741016] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#3A2A25] mb-2" style={{ fontFamily: 'Playfair Display, Lora, serif' }}>
                  Legacy of Trust
                </h3>
                <p className="text-[#3A2A25]/80 font-sans">
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
                <li><a href="/#eliquid" className="text-white/60 hover:text-white">E-Liquid</a></li>
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
