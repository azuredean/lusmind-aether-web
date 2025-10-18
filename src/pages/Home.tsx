import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ChevronDown, Droplet, Shield, Leaf, Award, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  const productLines = [
    {
      title: "Premium E-Liquids",
      description: "Expertly crafted e-liquids with rich, authentic flavors. Made from the highest quality ingredients for an exceptional vaping experience.",
      features: ["30+ unique flavors", "USP-grade ingredients", "Multiple nicotine strengths"],
      icon: Droplet,
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      title: "Disposable Vapes",
      description: "Convenient, ready-to-use devices with no maintenance required. Perfect for on-the-go use or trying signature flavors.",
      features: ["Up to 5000 puffs", "Rechargeable battery", "Sleek, pocket-friendly design"],
      icon: Droplet,
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Cigarette-Like Vapes",
      description: "Traditional cigarette form factor with advanced vaping technology. Familiar experience with none of the combustion.",
      features: ["Authentic cigarette feel", "Draw-activated firing", "Tobacco-inspired flavors"],
      icon: Droplet,
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Flavor Masters",
      description: "Specialized devices engineered to deliver authentic tobacco flavors with enhanced taste and satisfaction.",
      features: ["Advanced flavor technology", "Customizable settings", "Premium tobacco blends"],
      icon: Droplet,
      gradient: "from-green-500/20 to-emerald-500/20"
    }
  ];

  const qualityFeatures = [
    {
      icon: Droplet,
      title: "Lab Tested",
      description: "Every batch undergoes rigorous testing to ensure compliance and purity."
    },
    {
      icon: Shield,
      title: "Safety Certified",
      description: "Our products meet or exceed all safety standards and regulations."
    },
    {
      icon: Leaf,
      title: "Sustainable",
      description: "Eco-friendly packaging and responsible manufacturing processes."
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for innovation and excellence in the industry."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] text-white">
      {/* Warning Bar */}
      <div className="w-full bg-black text-white border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-2 text-center text-xs md:text-sm">
          WARNING: This product contains nicotine. Nicotine is an addictive chemical.
        </div>
      </div>

      {/* Header */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "backdrop-blur-lg bg-[rgba(10,10,15,0.8)] border-b border-cyan-500/20" : "bg-transparent"
      )}>
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/lovable-uploads/6a3cad97-68cc-4600-9c35-7d92e2c90d4b.png" alt="LM Logo" className="h-8 w-8" />
            <img src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png" alt="LUSMIND" className="h-8 w-auto" />
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="text-white hover:text-cyan-400 transition-colors">Home</Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white/90 hover:text-white bg-transparent hover:bg-white/10 data-[state=open]:bg-white/10">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[200px] backdrop-blur bg-[rgba(10,10,15,0.95)] border border-cyan-500/30 rounded-xl p-2">
                    <div className="flex flex-col gap-1">
                      <a href="/#eliquid" className="px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-cyan-500/10 rounded-lg">E-Liquid</a>
                      <Link to="/e-cigarette" className="px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-cyan-500/10 rounded-lg">E-Cigarette</Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <a href="#story" className="text-white/90 hover:text-white transition-colors">About Us</a>
            <a href="#contact" className="text-white/90 hover:text-white transition-colors">Support</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Account">
              <User className="w-5 h-5" />
            </button>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-full px-6">
              Shop Now
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            THE FUTURE OF VAPING
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Experience premium electronic cigarettes crafted with cutting-edge technology and superior materials.<br />
            Made in USA.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-90 text-black font-semibold rounded-full px-8 py-6 text-lg">
              Explore Products
            </Button>
            <Button variant="outline" className="bg-transparent border-2 border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 rounded-full px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 text-white/60 animate-bounce">
            <span className="text-sm">Scroll Down</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Product Lines Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Our Product Lines
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {productLines.map((product, index) => (
              <Card key={index} className="relative overflow-hidden bg-[#0f1419] border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group">
                <CardContent className="relative p-8">
                  {/* Diagonal gradient glow effect from bottom-left to top-right */}
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500/15 via-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
                  
                  <div className="relative flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-white">{product.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{product.description}</p>
                    </div>
                    <div className="relative flex-shrink-0 p-4 bg-cyan-500/10 rounded-full ml-4">
                      <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl"></div>
                      <product.icon className="relative w-8 h-8 text-cyan-400" />
                    </div>
                  </div>
                  
                  <ul className="relative space-y-3 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-white/50">
                        <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="outline" className="relative mt-2 bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 w-full rounded-full transition-all">
                    Explore Collection →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-20 relative bg-gradient-to-b from-transparent via-white/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white/80">Proudly Made in the USA</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Quality You Can Trust
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              Our products are designed, engineered, and manufactured in state-of-the-art facilities in the United States, 
              ensuring the highest standards of quality and safety.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {qualityFeatures.map((feature, index) => (
              <Card key={index} className="bg-transparent border-none">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-4 bg-cyan-500/10 rounded-2xl mb-4">
                    <feature.icon className="w-10 h-10 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">{feature.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png" alt="LUSMIND" className="h-6 w-auto" />
              </div>
              <p className="text-white/60 text-sm">Digital Vapor, Redefining Inspiration.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#story" className="text-white/60 hover:text-white transition-colors">Brand Story</a></li>
                <li><a href="#safety" className="text-white/60 hover:text-white transition-colors">Safety & Compliance</a></li>
                <li><a href="#verify" className="text-white/60 hover:text-white transition-colors">Product Verification</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/#eliquid" className="text-white/60 hover:text-white transition-colors">E-Liquid</a></li>
                <li><Link to="/e-cigarette" className="text-white/60 hover:text-white transition-colors">E-Cigarette</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#contact" className="text-white/60 hover:text-white transition-colors">Get in Touch</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm text-white/40">
            <p>© Copyright 2025, LUSMIND. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
