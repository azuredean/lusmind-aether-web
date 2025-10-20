import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ChevronDown, Droplet, Shield, Leaf, Award, Search, User, BatteryCharging, Cigarette, Sparkles, Globe, Info, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import futureVapingBg from "@/assets/future-vaping-bg.png";
const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }
  const productLines = [{
    title: "Premium E-Liquids",
    description: "Expertly crafted e-liquids with rich, authentic flavors. Made from the highest quality ingredients for an exceptional vaping experience.",
    features: ["30+ unique flavors", "USP-grade ingredients", "Multiple nicotine strengths"],
    icon: Droplet,
    gradient: "from-cyan-500/20 to-blue-500/20",
    link: "/e-liquid"
  }, {
    title: "Disposable Vapes",
    description: "Convenient, ready-to-use devices with no maintenance required. Perfect for on-the-go use or trying signature flavors.",
    features: ["Up to 5000 puffs", "Rechargeable battery", "Sleek, pocket-friendly design"],
    icon: BatteryCharging,
    gradient: "from-purple-500/20 to-pink-500/20",
    link: "/e-cigarette"
  }, {
    title: "Cigarette-Like Vapes",
    description: "Traditional cigarette form factor with advanced vaping technology. Familiar experience with none of the combustion.",
    features: ["Authentic cigarette feel", "Draw-activated firing", "Tobacco-inspired flavors"],
    icon: Cigarette,
    gradient: "from-orange-500/20 to-red-500/20",
    link: "/e-cigarette"
  }, {
    title: "Flavor Masters",
    description: "Specialized devices engineered to deliver authentic tobacco flavors with enhanced taste and satisfaction.",
    features: ["Advanced flavor technology", "Customizable settings", "Premium tobacco blends"],
    icon: Sparkles,
    gradient: "from-green-500/20 to-emerald-500/20",
    link: "/e-cigarette"
  }];
  const qualityFeatures = [{
    icon: Droplet,
    title: "Lab Tested",
    description: "Every batch undergoes rigorous testing to ensure compliance and purity."
  }, {
    icon: Shield,
    title: "Safety Certified",
    description: "Our products meet or exceed all safety standards and regulations."
  }, {
    icon: Leaf,
    title: "Sustainable",
    description: "Eco-friendly packaging and responsible manufacturing processes."
  }, {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for innovation and excellence in the industry."
  }];
  const theme = {
    brand: {
      primary: "#353995",
      secondary: "#E6FE7F"
    }
  };
  const palette = ["#CFE8FF", "#D8F3E1", "#FFD6D6"];
  const colors = useMemo(() => [theme.brand.secondary, ...palette], []);
  const rows = [50, 90, 130, 170, 210, 250];
  const [region, setRegion] = useState<"US" | "CA">("US");
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'checking' | 'ok' | 'fail'>("idle");
  const [verifyMsg, setVerifyMsg] = useState("");
  const REGION_INFO = {
    US: {
      name: "United States (21+)",
      warnings: ["WARNING: This product may contain nicotine. Nicotine is an addictive chemical.", "For adults of legal age only (21+). Keep out of reach of children and pets.", "No therapeutic or cessation claims. Not intended for use by pregnant or nursing individuals."]
    },
    CA: {
      name: "California (Prop 65)",
      warnings: ["⚠︎ WARNING: This product can expose you to chemicals including nicotine, which is known to the State of California to cause birth defects or other reproductive harm.", "For adults of legal age only (21+). Keep out of reach of children and pets."]
    }
  };
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = verifyCode.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (raw.length < 8 || raw.length > 24) {
      setVerifyStatus("fail");
      setVerifyMsg("Invalid code format. Enter 8–24 letters/numbers.");
      return;
    }
    setVerifyStatus("checking");
    setVerifyMsg("");
    setTimeout(() => {
      const sum = raw.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      if (sum % 97 === 1) {
        setVerifyStatus("ok");
        setVerifyMsg("Code valid. Product is authentic.");
      } else {
        setVerifyStatus("fail");
        setVerifyMsg("Code not found or already verified. Please check and try again.");
      }
    }, 700);
  };
  return <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] text-white">
      {/* Warning Bar */}
      <div className="w-full bg-black text-white border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-2 text-center text-xs md:text-sm">
          WARNING: This product contains nicotine. Nicotine is an addictive chemical.
        </div>
      </div>

      {/* Header */}
      <header className={cn("sticky top-0 z-50 transition-all duration-300", isScrolled ? "backdrop-blur-lg bg-[rgba(10,10,15,0.8)] border-b border-cyan-500/20" : "bg-transparent")}>
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
                      <Link to="/e-liquid" className="px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-cyan-500/10 rounded-lg">E-Liquid</Link>
                      <Link to="/e-cigarette" className="px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-cyan-500/10 rounded-lg">E-Cigarette</Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <a href="#story" className="text-white/90 hover:text-white transition-colors">Story</a>
            <a href="#compliance" className="text-white/90 hover:text-white transition-colors">Compliance</a>
            <a href="#contact" className="text-white/90 hover:text-white transition-colors">Contact</a>
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
      <section className="relative overflow-hidden h-[60vh] md:h-[72vh] lg:h-[80vh] pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <img src={futureVapingBg} alt="Future of Vaping" className="max-w-full max-h-full object-contain opacity-40" />
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          
          
          <div className="flex items-center justify-center gap-4">
            <a href="#products">
              
            </a>
            <a href="#quality">
              
            </a>
          </div>

          {/* Scroll indicator */}
          
        </div>
      </section>

      {/* Product Lines Section */}
      <section id="products" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Our Product Lines
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {productLines.map((product, index) => <Card key={index} className="relative overflow-hidden bg-gradient-to-r from-[#1a2332] via-[#0f1419] to-[#0f1419] border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group">
                <CardContent className="relative p-8">
                  {/* Radial cyan glow from right side */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
                  
                  <div className="relative flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#FEFFFF] to-[#CCFDFA] bg-clip-text text-transparent">{product.title}</h3>
                      
                    </div>
                    <div className="relative flex-shrink-0 p-4 bg-cyan-500/10 rounded-full ml-4">
                      <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl"></div>
                      <product.icon className="relative w-8 h-8 text-cyan-400" />
                    </div>
                  </div>
                  
                  <ul className="relative space-y-3 mb-6">
                    {product.features.map((feature, idx) => <li key={idx} className="flex items-center gap-3 text-sm text-white/50">
                        <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>)}
                  </ul>
                  
                  <Link to={product.link}>
                    <Button variant="outline" className="relative mt-2 bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 w-full rounded-full transition-all">
                      Explore Collection →
                    </Button>
                  </Link>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section id="quality" className="py-20 relative bg-gradient-to-b from-transparent via-white/5 to-transparent">
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
            {qualityFeatures.map((feature, index) => <Card key={index} className="bg-transparent border-none">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-4 bg-cyan-500/10 rounded-2xl mb-4">
                    <feature.icon className="w-10 h-10 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">{feature.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="story" className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Light & Harmony · Brand Story
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              LUSMIND pursues a light, contemporary feel. Soft colors, paper-like grain, and flowing lines build a soothing space between tech and nature.
            </p>
            <div className="mt-6 flex gap-3">
              <Button className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-90 text-black font-semibold rounded-full px-8">
                Read more
              </Button>
            </div>
          </div>
          <div className="relative h-72 md:h-80 rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur overflow-hidden">
            <div className="absolute inset-0 grid place-items-center">
              <motion.svg viewBox="0 0 600 300" className="w-[92%] h-[92%]" aria-hidden>
                <defs>
                  <filter id="blurSoft" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.2" />
                  </filter>
                </defs>
                <motion.g animate={{
                x: [-6, 6, -6]
              }} transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut"
              }}>
                  {rows.map((y, i) => {
                  const c = colors[i % colors.length];
                  const d = `M 20 ${y} C 180 ${y - 22}, 420 ${y + 22}, 580 ${y}`;
                  const dur = 9 + i * 1.2;
                  const delay = i * 0.35;
                  return <g key={i} filter="url(#blurSoft)">
                        <motion.path d={d} fill="none" stroke={c} strokeOpacity={0.6} strokeWidth={2.2} pathLength={1} strokeDasharray="0.2 1" initial={{
                      strokeDashoffset: 1
                    }} animate={{
                      strokeDashoffset: [1, 0, -1]
                    }} transition={{
                      duration: dur,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay
                    }} />
                        <motion.path d={d} fill="none" stroke={c} strokeOpacity={0.16} strokeWidth={6} pathLength={1} strokeDasharray="0.12 1" initial={{
                      strokeDashoffset: 1
                    }} animate={{
                      strokeDashoffset: [1, 0, -1]
                    }} transition={{
                      duration: dur * 1.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: delay + 0.2
                    }} />
                      </g>;
                })}
                </motion.g>
              </motion.svg>
            </div>
          </div>
        </div>
      </section>

      {/* Product Verification Section */}
      <section id="verify" className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Product Verification
            </h2>
            <p className="text-white/80 text-lg">Enter the security code from your package to verify authenticity.</p>
            <ul className="text-white/60 text-sm list-disc pl-5 space-y-1">
              <li>Letters and numbers only, 8–24 characters.</li>
              <li>The code is usually printed near the seal or QR label.</li>
            </ul>
          </div>
          <form onSubmit={handleVerifySubmit} className="rounded-2xl bg-white/10 backdrop-blur border border-cyan-500/20 p-6">
            <div className="flex gap-2">
              <input type="text" inputMode="text" value={verifyCode} onChange={e => setVerifyCode(e.target.value)} placeholder="Enter verification code" className="flex-1 rounded-xl border border-cyan-500/30 bg-white/5 text-white placeholder:text-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 uppercase tracking-widest" aria-label="Verification code" autoComplete="one-time-code" />
              <Button type="submit" className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-90 hover:scale-105 active:scale-95 text-black font-semibold rounded-xl px-6 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" disabled={!verifyCode || verifyStatus === 'checking'}>
                {verifyStatus === 'checking' ? 'Verifying…' : 'Verify'}
              </Button>
            </div>
            {verifyStatus !== 'idle' && <div className={cn("mt-3 text-sm rounded-xl px-4 py-3 border", verifyStatus === 'ok' ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20" : verifyStatus === 'fail' ? "bg-rose-500/10 text-rose-300 border-rose-400/20" : "bg-white/5 text-white/80 border-cyan-500/20")} aria-live="polite">
                <div className="flex items-center gap-2">
                  {verifyStatus === 'ok' ? <Check className="w-5 h-5" /> : verifyStatus === 'fail' ? <X className="w-5 h-5" /> : null}
                  <span>{verifyMsg || 'Checking…'}</span>
                </div>
              </div>}
            <div className="mt-3 text-xs text-white/40">Demo verification only. Server-side validation required for production.</div>
          </form>
        </div>
      </section>

      {/* Compliance & Safety Section */}
      <section id="compliance" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Compliance First · Safety by Default
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Compliance is integrated into the experience: age-gate on entry, persistent page warnings, region-specific notices, and cookie/privacy controls with restrained language and visuals to avoid appealing to minors.
            </p>
            <ul className="list-disc pl-5 text-white/70 space-y-2">
              <li>Age verification (21+ in the U.S.)</li>
              <li>Health/safety warnings and non-therapeutic statements</li>
              <li>Region-specific notices (e.g., U.S. general, California Prop 65)</li>
              <li>Cookie and privacy preference management</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur border border-cyan-500/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium text-white">Region:</span>
              <select className="text-sm bg-white/10 text-white border border-cyan-500/30 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/50" value={region} onChange={e => setRegion(e.target.value as "US" | "CA")}>
                {Object.entries(REGION_INFO).map(([k, v]) => <option value={k} key={k} className="bg-[#0a0a0f] text-white">{v.name}</option>)}
              </select>
            </div>
            <ul className="text-sm text-white/80 list-disc pl-5 space-y-2">
              {REGION_INFO[region].warnings.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
            <div className="mt-4 flex items-start gap-2 text-xs text-white/60">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>This page is not legal advice. Actual requirements vary and change over time. Consult local counsel for your selling/display region.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10 py-12 bg-gradient-to-b from-transparent to-black/50">
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
    </div>;
};
export default Home;