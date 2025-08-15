import { useState, useEffect, useRef } from 'react';
import { AgeVerification } from '@/components/AgeVerification';

export const MainPage = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const slides = [
    { title: "Aurora Grape", desc: "luminous, cool finish", bg: "linear-gradient(135deg, #a855f7, #7c3aed)" },
    { title: "Neon Berry", desc: "bright & layered", bg: "linear-gradient(135deg, #0ea5e9, #22d3ee)" },
    { title: "Cyber Citrus", desc: "zingy, clean fade", bg: "linear-gradient(135deg, #f59e0b, #ec4899)" },
    { title: "Midnight Mint", desc: "silky & crisp", bg: "linear-gradient(135deg, #10b981, #3b82f6)" }
  ];

  useEffect(() => {
    const ageVerified = sessionStorage.getItem('ageVerified');
    if (!ageVerified) {
      setShowAgeVerification(true);
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
      {/* Age verification modal */}
      {showAgeVerification && (
        <AgeVerification
          onVerified={handleAgeVerified}
          onReject={handleAgeRejected}
        />
      )}

      <main>
        {/* Hero Section */}
        <section className="relative py-20" style={{ paddingTop: '112px', paddingBottom: '96px' }}>
          {/* Vapor Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-black"></div>
            <div 
              className="absolute opacity-60 animate-pulse"
              style={{
                inset: '-20%',
                filter: 'blur(48px)',
                background: `
                  radial-gradient(60% 60% at 25% 20%, rgba(168,85,247,0.18), transparent 60%),
                  radial-gradient(50% 50% at 80% 25%, rgba(56,189,248,0.18), transparent 60%),
                  radial-gradient(50% 50% at 55% 85%, rgba(139,92,246,0.16), transparent 70%)
                `
              }}
            ></div>
            <div 
              className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
                backgroundSize: '36px 36px'
              }}
            ></div>
            <div className="absolute inset-0 mx-auto max-w-[1400px] rounded-[32px]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}></div>
          </div>

          <div className="relative z-10 max-w-[1120px] px-6 mx-auto text-center">
            {/* Navigation */}
            <nav className="flex items-center justify-between text-white/75 text-sm">
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/4ad7e2db-c2a3-419d-b306-0ccc3574d298.png" 
                  alt="LusMind Logo" 
                  className="w-8 h-8 object-contain"
                />
                <a href="#top" className="font-black tracking-[4px] bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent">
                  LUSMIND
                </a>
              </div>
              <div className="flex gap-6">
                <button onClick={() => scrollToSection('products')} className="hover:text-white transition-colors">Products</button>
                <button onClick={() => scrollToSection('verify')} className="hover:text-white transition-colors">Verify</button>
                <button onClick={() => scrollToSection('subscribe')} className="hover:text-white transition-colors">Subscribe</button>
              </div>
            </nav>

            <p className="mt-12 text-xs tracking-[0.28em] text-white/60">DIGITAL VAPOR • FUTURE FLAVORS</p>
            <h1 className="mt-3 font-black leading-none text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent">
              A Soft‑Neon Universe for Taste
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-[720px] mx-auto">
              Where cyber aesthetics meet artisanal precision. Premium e‑liquid designed for an immersive, future‑forward journey.
            </p>

            <div className="mt-8 flex gap-4 items-center justify-center flex-wrap">
              <button 
                onClick={() => scrollToSection('products')}
                className="inline-flex items-center justify-center gap-2 border-none rounded-xl px-5 py-3 font-bold text-white cursor-pointer transition-transform duration-150 ease-in-out active:scale-95"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #7c3aed, #0ea5e9)',
                  boxShadow: '0 10px 30px -10px rgba(99,102,241,0.6)'
                }}
              >
                Explore Collection
              </button>
              <button 
                onClick={() => scrollToSection('verify')}
                className="inline-flex items-center justify-center gap-2 border-none rounded-xl px-5 py-3 font-bold text-white cursor-pointer transition-transform duration-150 ease-in-out active:scale-95"
                style={{ background: 'rgba(255,255,255,0.12)' }}
              >
                Verify Product
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-[880px] mx-auto">
              <div className="rounded-2xl p-6 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}>
                <div className="text-2xl md:text-3xl font-black">100+</div>
                <div className="text-xs text-white/75 mt-1">Premium Flavors</div>
              </div>
              <div className="rounded-2xl p-6 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}>
                <div className="text-2xl md:text-3xl font-black">50K+</div>
                <div className="text-xs text-white/75 mt-1">Happy Customers</div>
              </div>
              <div className="rounded-2xl p-6 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}>
                <div className="text-2xl md:text-3xl font-black">24/7</div>
                <div className="text-xs text-white/75 mt-1">Quality Control</div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="relative py-20 bg-black">
          <div className="relative z-10 max-w-[1120px] px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent">
                  Welcome to LusMind
                </h2>
                <p className="text-lg text-white/85 mt-4">
                  We craft digital-forward flavors with artisanal precision, distilling complex ideas into simple, elegant sensations.
                </p>
                <p className="text-white/70 mt-3">
                  Our living identity evolves with culture—surprising, adaptable, and globally consistent across physical and digital touchpoints.
                </p>
                <p className="text-[#7dd3fc] font-semibold mt-3">
                  "Innovation is our vapor, excellence is our essence."
                </p>
              </div>

              {/* Carousel */}
              <div className="relative">
                <div 
                  className="rounded-3xl p-6 overflow-hidden backdrop-blur-sm"
                  style={{
                    aspectRatio: '4/5',
                    background: 'rgba(255,255,255,0.06)',
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
                  }}
                >
                  <div className="relative w-full h-full rounded-2xl p-3 flex items-center justify-center overflow-hidden">
                    <div 
                      ref={trackRef}
                      className="flex h-full transition-transform duration-700 ease-in-out"
                      style={{ width: `${slides.length * 100}%` }}
                    >
                      {slides.map((slide, index) => (
                        <div key={index} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                          <div 
                            className="relative w-full h-full rounded-2xl grid place-items-center text-center text-white"
                            style={{ 
                              background: slide.bg,
                              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.25)'
                            }}
                          >
                            <div className="absolute inset-0 opacity-[0.12] bg-gradient-radial from-white/30 via-transparent to-transparent"></div>
                            <div className="relative z-10">
                              <h3 className="text-2xl md:text-3xl font-black tracking-wide">{slide.title}</h3>
                              <p className="mt-2 opacity-90">{slide.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full text-white border border-white/20"
                      style={{ background: 'rgba(0,0,0,0.4)' }}
                    >
                      ‹
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full text-white border border-white/20"
                      style={{ background: 'rgba(0,0,0,0.4)' }}
                    >
                      ›
                    </button>

                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-1.5 rounded-lg transition-all duration-200 ${
                            index === currentSlide 
                              ? 'w-8 bg-white/85' 
                              : 'w-6 bg-white/25'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verify Section */}
        <section id="verify" className="relative py-20">
          <div className="max-w-[1120px] px-6 mx-auto">
            <div 
              className="relative rounded-2xl p-px"
              style={{ background: 'linear-gradient(135deg, rgba(217,70,239,0.6), rgba(139,92,246,0.6), rgba(56,189,248,0.6))' }}
            >
              <div 
                className="rounded-2xl backdrop-blur-sm p-7"
                style={{ background: 'rgba(0,0,0,0.7)' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent">
                      Product Verification
                    </div>
                    <p className="text-white/75 mt-2 max-w-[600px]">
                      Verify authenticity using the unique code on your packaging.
                    </p>
                  </div>
                  <form onSubmit={handleVerify} className="flex gap-3 w-full max-w-[520px]">
                    <input 
                      name="code"
                      className="flex-1 rounded-xl border border-white/15 px-4 py-3 text-white outline-none"
                      style={{ background: 'rgba(255,255,255,0.08)' }}
                      placeholder="Enter verification code"
                    />
                    <button 
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 border-none rounded-xl px-5 py-3 font-bold text-white cursor-pointer transition-transform duration-150 ease-in-out active:scale-95"
                      style={{
                        backgroundImage: 'linear-gradient(90deg, #7c3aed, #0ea5e9)',
                        boxShadow: '0 10px 30px -10px rgba(99,102,241,0.6)'
                      }}
                    >
                      Verify
                    </button>
                  </form>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-white/70">
                  <div className="rounded-xl p-3 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}>
                    Find QR/text code on package
                  </div>
                  <div className="rounded-xl p-3 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}>
                    Code length: 8–12 chars
                  </div>
                  <div className="rounded-xl p-3 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}>
                    Each product has a unique code
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section id="subscribe" className="py-20 text-center" style={{ background: 'linear-gradient(90deg, #141026, #0f1229, #0b132b)' }}>
          <div className="max-w-[1120px] px-6 mx-auto">
            <div className="text-lg font-black mb-2 bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent">
              SUBSCRIBE FOR MORE UPDATES
            </div>
            <p className="text-sm text-white/80">Stay updated with our latest products and exclusive promotions instantly!</p>
            <form onSubmit={handleSubscribe} className="mt-5 grid gap-3 max-w-[720px] mx-auto">
              <input 
                name="email"
                type="email"
                className="w-full rounded-xl border border-white/15 px-4 py-3 text-white text-center outline-none"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                placeholder="Enter your email address"
              />
              <button 
                type="submit"
                className="inline-flex items-center justify-center gap-2 border-none rounded-xl px-5 py-3 font-bold text-white cursor-pointer transition-transform duration-150 ease-in-out active:scale-95"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #7c3aed, #0ea5e9)',
                  boxShadow: '0 10px 30px -10px rgba(99,102,241,0.6)'
                }}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10">
          <div className="max-w-[1120px] px-6 mx-auto">
            <p className="text-center text-xs leading-relaxed text-white/75">
              <strong className="text-white">WARNING:</strong> This product contains chemicals, including nicotine, which is known to the State of California to cause cancer and reproductive harm. For more information, visit{' '}
              <a href="https://p65warnings.ca.gov" target="_blank" rel="noreferrer" className="text-[#7dd3fc] underline">
                p65warnings.ca.gov
              </a>
              . This product is not intended for sale or use by individuals under 21 years of age. Nicotine is an addictive chemical.
            </p>
            <div className="mt-6 pt-6 border-t border-white/12 text-center text-xs text-white/60">
              © {new Date().getFullYear()} LusMind. All rights reserved. | Digital Vapor Technology
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};