import { useState, useEffect, useRef } from 'react';
import { AgeVerification } from '@/components/AgeVerification';
import { FlavorShowcase } from '@/components/FlavorShowcase';
export const MainPage = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
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
    const ageVerified = sessionStorage.getItem('ageVerified');
    if (!ageVerified) {
      setShowAgeVerification(true);
    } else {
      setShowAgeVerification(false);
    }
  }, []);
  useEffect(() => {
    const startCarousel = () => {
      timerRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 3600);
    };
    startCarousel();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);
  const handleAgeVerified = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setShowAgeVerification(false);
  };
  const handleAgeRejected = () => {
    window.location.href = '/';
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
  return <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white relative overflow-hidden" style={{
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'
  }}>
      {/* Global ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Age verification modal */}
      {showAgeVerification && <AgeVerification onVerified={handleAgeVerified} onReject={handleAgeRejected} />}

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
            {/* Navigation */}
            <nav className="flex items-center justify-between py-6 mb-16">
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <img src="/lovable-uploads/4ad7e2db-c2a3-419d-b306-0ccc3574d298.png" alt="LusMind Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <a href="#top" className="font-black tracking-[3px] sm:tracking-[4px] text-lg sm:text-xl bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent transition-all duration-300 hover:tracking-[5px]">
                  LUSMIND
                </a>
              </div>
              <div className="hidden md:flex gap-8">
                <button onClick={() => scrollToSection('products')} className="text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20">Products</button>
                <button onClick={() => scrollToSection('verify')} className="text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20">Verify</button>
                <button onClick={() => scrollToSection('subscribe')} className="text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20">Subscribe</button>
              </div>
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-white/70 hover:text-white p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </nav>

            <div className="text-center space-y-8">
              <div className="space-y-6">
                <p className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.28em] text-white/60 uppercase animate-fade-in">Digital Vapor • Future Flavors</p>
                <h1 className="font-black leading-[0.9] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent animate-fade-in delay-300">
                  A Soft‑Neon<br />Universe for Taste
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-500">
                  Where cyber aesthetics meet artisanal precision. Premium e‑liquid designed for an immersive, future‑forward journey.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-in delay-700">
                <button onClick={() => scrollToSection('products')} className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:from-purple-500 group-hover:to-blue-400"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/50 to-blue-500/50 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <span className="relative z-10">Explore Collection</span>
                </button>
                <button onClick={() => scrollToSection('verify')} className="group w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 active:scale-95">
                  <span className="group-hover:text-blue-300 transition-colors duration-300">Verify Product</span>
                </button>
              </div>

              {/* Enhanced Stats */}
              <div className="mt-20 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto animate-fade-in delay-1000">
                <div className="group relative p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">100+</div>
                    <div className="text-xs sm:text-sm text-white/75 mt-2">Premium Flavors</div>
                  </div>
                </div>
                <div className="group relative p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">50K+</div>
                    <div className="text-xs sm:text-sm text-white/75 mt-2">Happy Customers</div>
                  </div>
                </div>
                <div className="group relative p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">24/7</div>
                    <div className="text-xs sm:text-sm text-white/75 mt-2">Quality Control</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="relative py-16 sm:py-24 lg:py-32">
          {/* Ambient background for products section */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/80 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-blue-900/5"></div>
          
          <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="space-y-6 lg:space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent leading-tight">
                    Welcome to LusMind
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                </div>
                
                <div className="space-y-6 text-base sm:text-lg">
                  <p className="text-white/90 leading-relaxed">
                    We craft digital-forward flavors with artisanal precision, distilling complex ideas into simple, elegant sensations.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    Our living identity evolves with culture—surprising, adaptable, and globally consistent across physical and digital touchpoints.
                  </p>
                  <blockquote className="relative pl-6 border-l-2 border-blue-400">
                    <p className="text-[#7dd3fc] font-semibold italic text-lg">
                      "Innovation is our vapor, excellence is our essence."
                    </p>
                  </blockquote>
                </div>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 text-sm font-medium backdrop-blur-sm border border-purple-500/30">Premium Quality</span>
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-sm font-medium backdrop-blur-sm border border-blue-500/30">Lab Tested</span>
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 text-sm font-medium backdrop-blur-sm border border-green-500/30">Authentic</span>
                </div>
              </div>

              {/* Enhanced Carousel */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-75"></div>
                
                <div className="relative rounded-3xl p-3 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/20">
                  <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-black/50 to-gray-900/50 backdrop-blur-sm" style={{
                  aspectRatio: '4/5'
                }}>
                    <div className="relative w-full h-full">
                      <div ref={trackRef} className="flex h-full transition-transform duration-700 ease-out" style={{
                      width: `${slides.length * 100}%`
                    }}>
                        {slides.map((slide, index) => (
                          <div key={index} className="min-w-full h-full shrink-0">
                            <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-3 bg-black/20 group/slide">
                              <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-contain rounded-2xl"
                                loading={index === 0 ? 'eager' : 'lazy'}
                                decoding="async"
                              />

                              {/* 渐变叠层 */}
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10" />

                              {/* 文案覆盖 */}
                              <div className="absolute bottom-4 left-0 right-0 text-center text-white px-4">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-black drop-shadow-xl">
                                  {slide.title}
                                </h3>
                                <p className="text-xs sm:text-sm opacity-90 drop-shadow">
                                  {slide.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Enhanced Navigation */}
                      <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/30 hover:bg-black/60 hover:border-white/50 hover:scale-110 transition-all duration-300 flex items-center justify-center text-xl">
                        ‹
                      </button>
                      <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/30 hover:bg-black/60 hover:border-white/50 hover:scale-110 transition-all duration-300 flex items-center justify-center text-xl">
                        ›
                      </button>

                      {/* Enhanced Dots */}
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
                        {slides.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg' : 'w-6 bg-white/30 hover:bg-white/50'}`} />)}
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