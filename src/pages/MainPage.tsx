import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, CheckCircle, Shield, Zap, Globe } from 'lucide-react';
import { AgeVerification } from '@/components/AgeVerification';
import { FlavorShowcase } from '@/components/FlavorShowcase';

interface CarouselSlideProps {
  slide: {
    image: string;
    title: string;
  };
  index: number;
}

const CarouselSlide = ({ slide, index }: CarouselSlideProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="min-w-full h-full shrink-0">
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-3 bg-gray-800/20 group/slide">
        {/* Loading/Error placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-3 flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl border border-white/10">
            <div className="text-center space-y-2">
              {imageError ? (
                <>
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-red-400 text-sm">✕</span>
                  </div>
                  <p className="text-red-400/80 text-sm">Image failed to load</p>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto"></div>
                  <p className="text-white/60 text-sm">Loading...</p>
                </>
              )}
            </div>
          </div>
        )}

        <img 
          src={slide.image} 
          alt={slide.title} 
          className={`w-full h-full max-w-full max-h-full object-contain rounded-2xl transition-all duration-500 group-hover/slide:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={index === 0 ? 'eager' : 'lazy'} 
          decoding="async" 
          fetchPriority={index === 0 ? 'high' : 'auto'} 
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }} 
        />

        {/* 轻量渐变叠层 */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

        {/* 文案覆盖 */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-white px-4">
          <h3 className="text-lg font-bold mb-1 drop-shadow-lg">{slide.title}</h3>
          <p className="text-sm text-white/80 drop-shadow-md">Premium E-liquid Collection</p>
        </div>
      </div>
    </div>
  );
};
export const MainPage = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slides = [{
    title: "Blueberry Raspberry",
    desc: "Rich berry symphony",
    image: "/lovable-uploads/f039a0fd-82f1-4eae-9d88-b830264a99a3.png"
  }, {
    title: "Niagara Grape",
    desc: "Elegant vine essence",
    image: "/lovable-uploads/959a431e-f709-4b2d-9a0f-9f905d19551d.png"
  }, {
    title: "Mixed Berry",
    desc: "Complex fruit blend",
    image: "/lovable-uploads/4f147d90-2fc6-4c41-9be9-2363c855074e.png"
  }, {
    title: "Niagara Grape Premium",
    desc: "Refined grape fusion",
    image: "/lovable-uploads/72278a75-20ef-4099-b2ba-bc8797a1925d.png"
  }, {
    title: "Orange Soda",
    desc: "Citrus laboratory creation",
    image: "/lovable-uploads/54bad1ca-7e85-4325-b562-62f84b384ea3.png"
  }];
  useEffect(() => {
    // 从首页进入时总是显示年龄验证
    setShowAgeVerification(true);
  }, []);
  useEffect(() => {
    const startCarousel = () => {
      timerRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 5000);
    };
    startCarousel();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  // 页面不可见时暂停自动播放
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [slides.length]);
  const handleAgeVerified = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setShowAgeVerification(false);
  };
  const handleAgeRejected = () => {
    sessionStorage.removeItem('ageVerified');
    window.location.href = 'https://www.google.com';
  };
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };
  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get('code') as string;
    if (code.length < 8) {
      alert('Please enter at least 8 characters.');
      return;
    }
    alert('Verifying: ' + code);
  };
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    const btn = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = 'SUBSCRIBING...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'SUBSCRIBE';
      e.currentTarget.reset();
      alert('Subscribed!');
    }, 700);
  };
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
    isDarkMode 
      ? 'bg-gradient-to-br from-black via-gray-950 to-black text-white' 
      : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-900'
  }`} style={{
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'
  }}>
      {/* Adaptive ambient background system */}
      <div className="fixed inset-0 pointer-events-none transition-all duration-700">
        <div className={`absolute inset-0 transition-all duration-700 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-black via-gray-950 to-black' 
            : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
        }`}></div>
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse transition-all duration-700 ${
          isDarkMode ? 'bg-purple-500/10' : 'bg-purple-500/5'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-700 ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/5'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl animate-pulse delay-2000 transition-all duration-700 ${
          isDarkMode ? 'bg-cyan-500/5' : 'bg-cyan-500/3'
        }`}></div>
      </div>

      {/* Age verification modal - Highest priority */}
      {showAgeVerification && <div style={{
      position: 'relative',
      zIndex: 10000
    }}>
          <AgeVerification onVerified={handleAgeVerified} onReject={handleAgeRejected} />
        </div>}

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          {/* Enhanced Vapor Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute opacity-40 animate-pulse" style={{
            inset: '-30%',
            filter: 'blur(60px)',
            background: `
                  radial-gradient(circle at 25% 20%, rgba(168,85,247,0.25), transparent 70%),
                  radial-gradient(circle at 80% 25%, rgba(56,189,248,0.25), transparent 70%),
                  radial-gradient(circle at 55% 85%, rgba(139,92,246,0.20), transparent 80%),
                  radial-gradient(circle at 10% 90%, rgba(236,72,153,0.15), transparent 60%)
                `
          }}></div>
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{
            backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
                  radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)
                `,
            backgroundSize: '40px 40px, 40px 40px, 20px 20px'
          }}></div>
            <div className="absolute inset-4 border border-white/5 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-white/[0.02] to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
            {/* Adaptive Navigation System */}
            <nav className="flex items-center justify-between py-6 mb-16">
              {/* Logo with adaptive branding */}
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <img src="/lovable-uploads/4ad7e2db-c2a3-419d-b306-0ccc3574d298.png" alt="LusMind Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110" />
                  <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDarkMode ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20' : 'bg-gradient-to-r from-purple-400/15 to-blue-400/15'
                  }`}></div>
                </div>
                <span className={`font-bold text-lg transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>LusMind</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <button onClick={() => scrollToSection('products')} className={`px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm border border-transparent ${
                  isDarkMode 
                    ? 'text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-200'
                }`}>Products</button>
                <button onClick={() => scrollToSection('verify')} className={`px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm border border-transparent ${
                  isDarkMode 
                    ? 'text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-200'
                }`}>Verify</button>
                <button onClick={() => scrollToSection('subscribe')} className={`px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm border border-transparent ${
                  isDarkMode 
                    ? 'text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-200'
                }`}>Subscribe</button>
                
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-all duration-300 backdrop-blur-sm border ${
                    isDarkMode 
                      ? 'text-white/70 hover:text-white hover:bg-white/10 border-white/20' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-gray-200'
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isDarkMode ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMobileMenu}
                  className={`p-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </nav>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && (
              <div className={`md:hidden absolute top-full left-0 right-0 z-50 transition-all duration-300 ${
                isDarkMode ? 'bg-black/95' : 'bg-white/95'
              } backdrop-blur-xl border-b ${
                isDarkMode ? 'border-white/10' : 'border-gray-200'
              }`}>
                <div className="px-4 py-6 space-y-4">
                  <button 
                    onClick={() => { scrollToSection('products'); setIsMobileMenuOpen(false); }}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'text-white/70 hover:text-white hover:bg-white/10' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Products
                  </button>
                  <button 
                    onClick={() => { scrollToSection('verify'); setIsMobileMenuOpen(false); }}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'text-white/70 hover:text-white hover:bg-white/10' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Verify
                  </button>
                  <button 
                    onClick={() => { scrollToSection('subscribe'); setIsMobileMenuOpen(false); }}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'text-white/70 hover:text-white hover:bg-white/10' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            )}

            {/* Adaptive Hero Content */}
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <p className={`text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.28em] uppercase animate-fade-in transition-colors duration-300 ${
                  isDarkMode ? 'text-white/60' : 'text-gray-500'
                }`}>
                  Digital Vapor • Future Flavors
                </p>
                <h1 className={`font-black leading-[0.9] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r bg-clip-text text-transparent animate-fade-in delay-300 transition-all duration-300 ${
                  isDarkMode 
                    ? 'from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd]' 
                    : 'from-[#8b5cf6] via-[#06b6d4] to-[#a855f7]'
                }`}>
                  Evolving Systems<br />for Taste
                </h1>
                <p className={`text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in delay-500 transition-colors duration-300 ${
                  isDarkMode ? 'text-white/80' : 'text-gray-600'
                }`}>
                  Building adaptive flavor systems that evolve with culture. Every drop designed for human connection in our accelerating world.
                </p>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium animate-fade-in delay-700 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-white/10 text-white/70 border border-white/20' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}>
                  <Globe className="w-4 h-4" />
                  <span>Globally Consistent • Culturally Adaptive</span>
                </div>
              </div>

              {/* Adaptive CTA System */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-in delay-900">
                <button 
                  onClick={() => scrollToSection('products')} 
                  className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 group-hover:from-purple-500 group-hover:to-blue-400' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-400 group-hover:from-purple-400 group-hover:to-blue-300'
                  }`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700`}></div>
                  <div className={`absolute inset-0 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-600/50 to-blue-500/50' 
                      : 'bg-gradient-to-r from-purple-500/30 to-blue-400/30'
                  }`}></div>
                  <span className="relative z-10 text-white">Explore Living Collection</span>
                </button>
                <button 
                  onClick={() => scrollToSection('verify')} 
                  className={`group w-full sm:w-auto px-8 py-4 rounded-2xl font-bold backdrop-blur-sm border transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isDarkMode 
                      ? 'text-white bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30' 
                      : 'text-gray-900 bg-gray-100 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'group-hover:text-blue-300' : 'group-hover:text-blue-600'
                  }`}>
                    Verify Authenticity
                  </span>
                </button>
              </div>

              {/* Adaptive Metrics System */}
              <div className="mt-20 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto animate-fade-in delay-1000">
                {[
                  { icon: Zap, metric: "100+", label: "Living Flavors", gradient: "from-purple-400 to-blue-400", bg: "from-purple-500/10" },
                  { icon: Shield, metric: "50K+", label: "Trusted Users", gradient: "from-blue-400 to-cyan-400", bg: "from-blue-500/10" },
                  { icon: CheckCircle, metric: "24/7", label: "Quality Systems", gradient: "from-cyan-400 to-green-400", bg: "from-cyan-500/10" }
                ].map((item, index) => (
                  <div key={index} className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl backdrop-blur-md border transition-all duration-500 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:border-white/20' 
                      : 'bg-gradient-to-br from-gray-50 to-gray-100/50 border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className={`absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br ${item.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="relative z-10 text-center">
                      <item.icon className={`w-6 h-6 mx-auto mb-3 ${
                        isDarkMode ? 'text-white/60' : 'text-gray-500'
                      }`} />
                      <div className={`text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                        {item.metric}
                      </div>
                      <div className={`text-xs sm:text-sm mt-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-white/75' : 'text-gray-600'
                      }`}>
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Adaptive Products Section */}
        <section id="products" className="relative py-16 sm:py-24 lg:py-32">
          {/* Adaptive background system */}
          <div className={`absolute inset-0 transition-all duration-700 ${
            isDarkMode 
              ? 'bg-gradient-to-b from-black via-gray-950/80 to-black' 
              : 'bg-gradient-to-b from-white via-slate-50/80 to-white'
          }`}></div>
          <div className={`absolute inset-0 transition-all duration-700 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-900/5 via-transparent to-blue-900/5' 
              : 'bg-gradient-to-r from-purple-100/20 via-transparent to-blue-100/20'
          }`}></div>
          
          <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Adaptive Brand Story */}
              <div className="space-y-6 lg:space-y-8">
                <div className="space-y-4">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r bg-clip-text text-transparent leading-tight transition-all duration-300 ${
                    isDarkMode 
                      ? 'from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd]' 
                      : 'from-[#8b5cf6] via-[#06b6d4] to-[#a855f7]'
                  }`}>
                    Systems That Evolve
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                </div>
                
                <div className="space-y-6 text-base sm:text-lg">
                  <p className={`leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? 'text-white/90' : 'text-gray-700'
                  }`}>
                    We build adaptive flavor systems that evolve with culture. Our approach: test hundreds of iterations, ship working prototypes, and let the market guide our evolution.
                  </p>
                  <p className={`leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? 'text-white/70' : 'text-gray-600'
                  }`}>
                    Think like a builder. The most effective solutions are often the simplest—but simple is the hardest to achieve. We combine human intuition with systematic efficiency.
                  </p>
                  <blockquote className={`relative pl-6 border-l-2 transition-colors duration-300 ${
                    isDarkMode ? 'border-blue-400' : 'border-blue-500'
                  }`}>
                    <p className={`font-semibold italic text-lg transition-colors duration-300 ${
                      isDarkMode ? 'text-[#7dd3fc]' : 'text-blue-600'
                    }`}>
                      "Speed is strategy. We ship faster and learn continuously."
                    </p>
                  </blockquote>
                </div>

                {/* Adaptive Feature System */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    { label: "Living Prototypes", color: "purple" },
                    { label: "Human-Centered", color: "blue" },
                    { label: "Culturally Adaptive", color: "green" }
                  ].map((feature, index) => (
                    <span key={index} className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border transition-all duration-300 ${
                      isDarkMode 
                        ? `bg-gradient-to-r from-${feature.color}-500/20 to-${feature.color}-600/20 text-${feature.color}-300 border-${feature.color}-500/30` 
                        : `bg-gradient-to-r from-${feature.color}-100 to-${feature.color}-200/50 text-${feature.color}-700 border-${feature.color}-300`
                    }`}>
                      {feature.label}
                    </span>
                  ))}
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-sm font-medium backdrop-blur-sm border border-blue-500/30">Lab Tested</span>
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 text-sm font-medium backdrop-blur-sm border border-green-500/30">Authentic</span>
                </div>
              </div>

              {/* Enhanced Carousel */}
              <div className="relative group" onMouseEnter={() => {
              if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              }
            }} onMouseLeave={() => {
              if (!timerRef.current) {
                timerRef.current = setInterval(() => {
                  setCurrentSlide(p => (p + 1) % slides.length);
                }, 5000);
              }
            }}>
                <div className={`absolute -inset-4 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-75 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20' 
                    : 'bg-gradient-to-r from-purple-400/15 via-blue-400/15 to-cyan-400/15'
                }`}></div>
                
                <div className={`relative rounded-3xl p-3 backdrop-blur-md border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/20' 
                    : 'bg-gradient-to-br from-gray-50 via-gray-100/50 to-transparent border-gray-200'
                }`}>
                  <div className={`rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-800/30 to-gray-900/30' 
                      : 'bg-gradient-to-br from-gray-100/50 to-gray-200/30'
                  }`} style={{
                    aspectRatio: '4/5'
                  }}>
                    <div className="relative w-full h-full">
                      <div className="flex h-full transition-transform duration-700 ease-out will-change-transform" style={{
                      width: `${slides.length * 100}%`,
                      transform: `translate3d(-${currentSlide * 100}%, 0, 0)`
                    }}>
                        {slides.map((slide, index) => (
                          <CarouselSlide key={index} slide={slide} index={index} />
                        ))}
                      </div>

                      {/* Adaptive Navigation */}
                      <button onClick={prevSlide} className={`absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md border hover:scale-110 transition-all duration-300 flex items-center justify-center text-xl ${
                        isDarkMode 
                          ? 'bg-black/40 text-white border-white/30 hover:bg-black/60 hover:border-white/50' 
                          : 'bg-white/60 text-gray-800 border-gray-300 hover:bg-white/80 hover:border-gray-400'
                      }`}>
                        ‹
                      </button>
                      <button onClick={nextSlide} className={`absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md border hover:scale-110 transition-all duration-300 flex items-center justify-center text-xl ${
                        isDarkMode 
                          ? 'bg-black/40 text-white border-white/30 hover:bg-black/60 hover:border-white/50' 
                          : 'bg-white/60 text-gray-800 border-gray-300 hover:bg-white/80 hover:border-gray-400'
                      }`}>
                        ›
                      </button>

                      {/* Adaptive Dots */}
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
                        {slides.map((_, index) => (
                          <button 
                            key={index} 
                            onClick={() => goToSlide(index)} 
                            aria-label={`Go to slide ${index + 1}`} 
                            aria-current={index === currentSlide} 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              index === currentSlide 
                                ? 'w-8 bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg' 
                                : isDarkMode 
                                  ? 'w-6 bg-white/30 hover:bg-white/50' 
                                  : 'w-6 bg-gray-400/50 hover:bg-gray-500/70'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flavor Showcase Section */}
        <FlavorShowcase />

        {/* Verify Section */}
        <section id="verify" className="relative py-16 sm:py-24 lg:py-32">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10"></div>
          
          <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-cyan-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-60"></div>
              
              {/* Main card */}
              <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-purple-500/40 via-blue-500/40 to-cyan-500/40">
                <div className="rounded-3xl backdrop-blur-xl bg-gradient-to-br from-black/80 via-gray-950/90 to-black/80 p-6 sm:p-8 lg:p-12">
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-4 text-center lg:text-left">
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent">
                        Product Verification
                      </h2>
                      <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto lg:mx-0"></div>
                      <p className="text-white/80 text-lg max-w-2xl mx-auto lg:mx-0">
                        Verify authenticity using the unique code on your packaging for guaranteed quality and safety.
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleVerify} className="space-y-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative group/input">
                          <input name="code" className="w-full rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-4 text-white text-lg placeholder-white/50 outline-none transition-all duration-300 focus:border-blue-400/50 focus:bg-white/10 focus:shadow-lg focus:shadow-blue-500/20" placeholder="Enter verification code" />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                        <button type="submit" className="group/btn relative px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover/btn:from-purple-500 group-hover/btn:to-blue-400"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/50 to-blue-500/50 blur-xl group-hover/btn:blur-2xl transition-all duration-300"></div>
                          <span className="relative z-10">Verify Product</span>
                        </button>
                      </div>
                    </form>

                    {/* Info cards */}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section id="subscribe" className="relative py-16 sm:py-24 lg:py-32">
          {/* Enhanced background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative z-10 max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent uppercase tracking-wide">
                  Subscribe for More Updates
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"></div>
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                  Stay updated with our latest products and exclusive promotions instantly!
                </p>
              </div>

              {/* Form */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60"></div>
                
                <form onSubmit={handleSubscribe} className="relative space-y-6 p-8 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20">
                  <div className="space-y-4">
                    <div className="relative group/input">
                      <input name="email" type="email" className="w-full rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-4 text-white text-lg text-center placeholder-white/50 outline-none transition-all duration-300 focus:border-blue-400/50 focus:bg-white/10 focus:shadow-lg focus:shadow-blue-500/20" placeholder="Enter your email address" />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    
                    <button type="submit" className="group/btn relative w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover/btn:from-purple-500 group-hover/btn:to-blue-400"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/50 to-blue-500/50 blur-xl group-hover/btn:blur-2xl transition-all duration-300"></div>
                      <span className="relative z-10">SUBSCRIBE NOW</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="relative py-16 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-950 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-transparent to-blue-950/20"></div>
          
          <div className="relative z-10 max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="space-y-8">
              {/* Warning */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
                <p className="text-center text-sm sm:text-base leading-relaxed text-white/75">
                  <strong className="text-white font-bold">WARNING:</strong> This product contains chemicals, including nicotine, which is known to the State of California to cause cancer and reproductive harm. For more information, visit{' '}
                  <a href="https://p65warnings.ca.gov" target="_blank" rel="noreferrer" className="text-[#7dd3fc] underline hover:text-blue-300 transition-colors duration-300">
                    p65warnings.ca.gov
                  </a>
                  . This product is not intended for sale or use by individuals under 21 years of age. Nicotine is an addictive chemical.
                </p>
              </div>

              {/* Copyright */}
              <div className="pt-8 border-t border-white/10 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/60">
                  <p className="text-sm">© {new Date().getFullYear()} LusMind. All rights reserved.</p>
                  <div className="hidden sm:block w-1 h-1 bg-white/30 rounded-full"></div>
                  <p className="text-sm">Digital Vapor Technology</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>;
};