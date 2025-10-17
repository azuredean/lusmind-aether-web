import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Droplet, Wind, Cigarette, Sparkles, TestTube, Shield, Leaf, Award } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const theme = {
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
    <div className="w-full border-b bg-black text-white border-white/20">
      <div className="max-w-7xl mx-auto px-4 py-2 text-center text-xs md:text-sm tracking-wide">
        WARNING: This product contains nicotine. Nicotine is an addictive chemical.
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1e] via-[#0d1428] to-[#0a0f1e]">
      {/* Warning Bar */}
      <TopWarningBar />
      
      {/* Navigation */}
      <header className="sticky top-0 z-30 border-b backdrop-blur bg-[rgba(10,15,30,0.8)] border-white/10">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-2">
            <img src="/lovable-uploads/6a3cad97-68cc-4600-9c35-7d92e2c90d4b.png" alt="LM Logo" className="h-8 w-8" />
            <img src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png" alt="LUSMIND" className="h-8 w-auto" />
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="text-white hover:text-[#E6FE7F] transition-colors">Home</Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white/80 hover:text-white bg-transparent hover:bg-white/10 border-none px-3 py-2 rounded-lg text-sm font-normal data-[state=open]:bg-white/10 data-[state=open]:text-white">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[200px] backdrop-blur bg-[rgba(10,15,30,0.95)] border border-white/10 rounded-xl p-2">
                    <div className="flex flex-col gap-1">
                      <Link to="/e-liquid" className="px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        E-Liquid
                      </Link>
                      <Link to="/e-cigarette" className="px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        E- Cigarette
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">About Us</a>
            <a href="#technology" className="text-white/80 hover:text-white transition-colors">Technology</a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">Support</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              className="rounded-lg px-6"
              style={{
                background: theme.brand.secondary,
                color: "#0B102A"
              }}
            >
              Shop Now
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1428]/50 to-[#0a0f1e]"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#5FB9FF] via-[#A8D5FF] to-[#5FB9FF] bg-clip-text text-transparent leading-tight">
            THE FUTURE OF VAPING
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-4 max-w-3xl mx-auto">
            Experience premium electronic cigarettes crafted with cutting-edge technology and superior materials.
          </p>
          <p className="text-sm text-white/50 mb-10">Made in USA.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="rounded-lg px-8 py-6 text-base"
              style={{
                background: theme.brand.secondary,
                color: "#0B102A"
              }}
            >
              Explore Products
            </Button>
            <Button 
              variant="outline"
              className="rounded-lg px-8 py-6 text-base bg-transparent border-white/20 text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
          
          <div className="mt-20 flex flex-col items-center gap-2 text-white/40">
            <span className="text-xs">Scroll Down</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Product Lines Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#5FB9FF] to-[#A8D5FF] bg-clip-text text-transparent">
            Our Product Lines
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Premium E-Liquids */}
            <Card className="bg-gradient-to-br from-[#1a2332] to-[#0f1620] border-white/10 hover:border-[#5FB9FF]/30 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl text-white mb-4">Premium E-Liquids</CardTitle>
                  <Droplet className="w-10 h-10 text-[#5FB9FF] group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-white/60 text-sm">
                  Expertly crafted e-liquids with rich, authentic flavors. Made from the highest quality ingredients for an exceptional vaping experience.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-[#5FB9FF]">✓</span> 30+ unique flavors
                  </li>
                  <li className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-[#5FB9FF]">✓</span> USP-grade ingredients
                  </li>
                  <li className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-[#5FB9FF]">✓</span> Multiple nicotine strengths
                  </li>
                </ul>
                <Link to="/e-liquid">
                  <Button 
                    variant="outline"
                    className="rounded-lg bg-transparent border-[#5FB9FF]/30 text-[#5FB9FF] hover:bg-[#5FB9FF]/10"
                  >
                    Explore Collection →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Disposable Vapes */}
            <Card className="bg-gradient-to-br from-[#1a2332] to-[#0f1620] border-white/10 hover:border-[#5FB9FF]/30 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl text-white mb-4">Disposable Vapes</CardTitle>
                  <Wind className="w-10 h-10 text-[#5FB9FF] group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-white/60 text-sm">
                  Convenient, ready-to-use devices with no maintenance required. Perfect for on-the-go vaping with our signature flavors.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-[#5FB9FF]">✓</span> Up to 5000 puffs
                  </li>
                  <li className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-[#5FB9FF]">✓</span> Rechargeable battery
                  </li>
                  <li className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-[#5FB9FF]">✓</span> Sleek, pocket-friendly design
                  </li>
                </ul>
                <Button 
                  variant="outline"
                  className="rounded-lg bg-transparent border-[#5FB9FF]/30 text-[#5FB9FF] hover:bg-[#5FB9FF]/10"
                >
                  Explore Collection →
                </Button>
              </CardContent>
            </Card>

            {/* Cigarette-Like Vapes */}
            <Card className="bg-gradient-to-br from-[#1a2332] to-[#0f1620] border-white/10 hover:border-[#5FB9FF]/30 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl text-white mb-4">Cigarette-Like Vapes</CardTitle>
                  <Cigarette className="w-10 h-10 text-[#5FB9FF] group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-white/60 text-sm">
                  Traditional cigarette form factor with advanced vaping technology. Familiar experience with none of the combustion.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-[#5FB9FF]">✓</span> Authentic cigarette feel
                  </li>
                  <li className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-[#5FB9FF]">✓</span> Draw-activated firing
                  </li>
                  <li className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-[#5FB9FF]">✓</span> Tobacco-inspired flavors
                  </li>
                </ul>
                <Link to="/e-cigarette">
                  <Button 
                    variant="outline"
                    className="rounded-lg bg-transparent border-[#5FB9FF]/30 text-[#5FB9FF] hover:bg-[#5FB9FF]/10"
                  >
                    Explore Collection →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Flavor Masters */}
            <Card className="bg-gradient-to-br from-[#1a2332] to-[#0f1620] border-white/10 hover:border-[#5FB9FF]/30 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl text-white mb-4">Flavor Masters</CardTitle>
                  <Sparkles className="w-10 h-10 text-[#5FB9FF] group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-white/60 text-sm">
                  Specialized devices engineered to deliver authentic tobacco flavors with enhanced taste and satisfaction.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-[#5FB9FF]">✓</span> Advanced flavor technology
                  </li>
                  <li className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-[#5FB9FF]">✓</span> Customizable settings
                  </li>
                  <li className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-[#5FB9FF]">✓</span> Premium tobacco blends
                  </li>
                </ul>
                <Button 
                  variant="outline"
                  className="rounded-lg bg-transparent border-[#5FB9FF]/30 text-[#5FB9FF] hover:bg-[#5FB9FF]/10"
                >
                  Explore Collection →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section id="about" className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8 text-white/60">
            <div className="w-8 h-[1px] bg-white/20"></div>
            <span className="text-sm">Proudly Made in the USA</span>
            <div className="w-8 h-[1px] bg-white/20"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-[#5FB9FF] to-[#A8D5FF] bg-clip-text text-transparent">
            Quality You Can Trust
          </h2>
          <p className="text-center text-white/60 max-w-3xl mx-auto mb-16">
            Our products are designed, engineered, and manufactured in state-of-the-art facilities in the United States, ensuring the highest standards of quality and safety.
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#5FB9FF]/10 flex items-center justify-center">
                <TestTube className="w-8 h-8 text-[#5FB9FF]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Lab Tested</h3>
              <p className="text-sm text-white/60">
                Every batch undergoes rigorous testing to ensure consistency and purity.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#5FB9FF]/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#5FB9FF]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Safety Certified</h3>
              <p className="text-sm text-white/60">
                Our products meet or exceed all safety standards and regulations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#5FB9FF]/10 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-[#5FB9FF]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Sustainable</h3>
              <p className="text-sm text-white/60">
                Eco-friendly packaging and responsible manufacturing processes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#5FB9FF]/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-[#5FB9FF]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Award Winning</h3>
              <p className="text-sm text-white/60">
                Recognized for innovation and excellence in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0a0f1e] border-t border-white/10 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/lovable-uploads/6a3cad97-68cc-4600-9c35-7d92e2c90d4b.png" alt="LM Logo" className="h-8 w-8" />
                <img src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png" alt="LUSMIND" className="h-8 w-auto" />
              </div>
              <p className="text-white/60 text-sm">
                Premium vaping products crafted with excellence.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/e-liquid" className="text-white/60 hover:text-white">E-Liquid</Link></li>
                <li><Link to="/e-cigarette" className="text-white/60 hover:text-white">E-Cigarette</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-white/60 hover:text-white">About Us</a></li>
                <li><a href="#technology" className="text-white/60 hover:text-white">Technology</a></li>
                <li><a href="#contact" className="text-white/60 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/60 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-white/60 hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="text-white/60 hover:text-white">Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60">
            <p>© 2025 LUSMIND. All rights reserved. | WARNING: This product contains nicotine. Nicotine is an addictive chemical.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
