import { useState, useEffect, useRef } from 'react';
import { AgeVerification } from '@/components/AgeVerification';

export const MainPage = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = [
    { image: "/lovable-uploads/f039a0fd-82f1-4eae-9d88-b830264a99a3.png", title: "Blueberry Raspberry" },
    { image: "/lovable-uploads/959a431e-f709-4b2d-9a0f-9f905d19551d.png", title: "Niagara Grape" },
    { image: "/lovable-uploads/4f147d90-2fc6-4c41-9be9-2363c855074e.png", title: "Mixed Berry" },
    { image: "/lovable-uploads/72278a75-20ef-4099-b2ba-bc8797a1925d.png", title: "Niagara Grape Premium" },
    { image: "/lovable-uploads/54bad1ca-7e85-4325-b562-62f84b384ea3.png", title: "Orange Soda" }
  ];

  useEffect(() => {
    setShowAgeVerification(true);
  }, []);

  useEffect(() => {
    // Theme persistence
    const savedTheme = localStorage.getItem('lusmind-theme');
    const initialTheme = savedTheme || 'dark';
    setIsDarkMode(initialTheme === 'dark');
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  useEffect(() => {
    // Carousel auto-play
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

  const handleAgeVerified = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setShowAgeVerification(false);
  };

  const handleAgeRejected = () => {
    sessionStorage.removeItem('ageVerified');
    window.location.href = 'https://www.google.com';
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('lusmind-theme', newTheme);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Restart auto-play
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
  };

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get('code') as string;
    if (code.length < 8 || code.length > 12) {
      alert('Please enter 8–12 characters.');
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
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'SUBSCRIBING...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
      e.currentTarget.reset();
      alert('Subscribed!');
    }, 800);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (showAgeVerification) {
    return (
      <div style={{ position: 'relative', zIndex: 10000 }}>
        <AgeVerification onVerified={handleAgeVerified} onReject={handleAgeRejected} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--txt)',
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'
      }}
    >
      {/* Navigation */}
      <header className="max-w-6xl mx-auto px-5">
        <nav className="flex items-center justify-between gap-4 py-4">
          <a 
            href="#" 
            className="font-black text-lg tracking-wider"
            style={{
              background: 'linear-gradient(90deg, var(--grad1), var(--grad2), var(--grad3))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            LUSMIND
          </a>
          <div className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('products')} className="text-current">Products</button>
            <button onClick={() => scrollToSection('verify')} className="text-current">Verify</button>
            <button onClick={() => scrollToSection('subscribe')} className="text-current">Subscribe</button>
          </div>
          <button
            onClick={toggleTheme}
            className="px-2 py-2 rounded-xl border text-current"
            style={{
              border: '1px solid var(--ring)',
              backgroundColor: 'var(--panel)'
            }}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section 
        className="py-12 md:py-24 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(60vw 60vw at 20% 10%, rgba(139,92,246,.12), transparent 60%),
            radial-gradient(60vw 60vw at 85% 25%, rgba(56,189,248,.12), transparent 60%),
            radial-gradient(60vw 60vw at 60% 90%, rgba(192,132,252,.10), transparent 70%),
            var(--bg)
          `
        }}
      >
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-7 items-center">
            <div>
              <p 
                className="text-xs tracking-[0.28em] mb-2"
                style={{ color: 'var(--muted)' }}
              >
                DIGITAL VAPOR • FUTURE FLAVORS
              </p>
              <h1 
                className="text-4xl md:text-6xl font-black leading-tight mb-4"
                style={{
                  background: 'linear-gradient(90deg, var(--grad1), var(--grad2), var(--grad3))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                A Soft-Neon Universe for Taste
              </h1>
              <p className="mb-6 max-w-md" style={{ color: 'var(--muted)' }}>
                Where cyber aesthetics meet artisanal precision. Premium e-liquid crafted for an immersive, future-forward journey.
              </p>
              <div className="flex gap-3 flex-wrap mb-7">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-white transition-transform hover:-translate-y-px"
                  style={{
                    background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                    boxShadow: '0 10px 30px -12px rgba(56,189,248,.5)'
                  }}
                >
                  Explore Collection
                </button>
                <button 
                  onClick={() => scrollToSection('verify')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold transition-transform hover:-translate-y-px"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--ring)',
                    color: 'var(--txt)'
                  }}
                >
                  Verify Product
                </button>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 max-w-2xl">
                {[
                  { number: '100+', label: 'Premium Flavors' },
                  { number: '50K+', label: 'Happy Customers' },
                  { number: '24/7', label: 'Quality Control' }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-2xl text-center backdrop-blur-sm"
                    style={{
                      background: 'var(--panel)',
                      border: '1px solid var(--ring)'
                    }}
                  >
                    <div 
                      className="text-xl font-black"
                      style={{
                        background: 'linear-gradient(90deg, var(--grad1), var(--grad2))',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent'
                      }}
                    >
                      {stat.number}
                    </div>
                    <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel */}
            <div 
              className="relative w-full p-3 rounded-3xl"
              style={{
                aspectRatio: '4/5',
                background: 'var(--panel)',
                border: '1px solid var(--ring)'
              }}
              onMouseEnter={() => timerRef.current && clearInterval(timerRef.current)}
              onMouseLeave={() => {
                timerRef.current = setInterval(() => {
                  setCurrentSlide(prev => (prev + 1) % slides.length);
                }, 5000);
              }}
            >
              <div 
                className="relative w-full h-full overflow-hidden rounded-2xl"
                style={{ backgroundColor: 'rgba(0,0,0,.22)' }}
              >
                <div 
                  className="flex h-full w-full transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <div key={index} className="min-w-full h-full flex items-center justify-center p-2">
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Controls */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full grid place-items-center transition-colors hover:bg-black/60"
                  style={{
                    border: '1px solid var(--ring)',
                    backgroundColor: 'rgba(0,0,0,.4)',
                    color: '#fff'
                  }}
                  aria-label="Previous slide"
                >
                  ‹
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full grid place-items-center transition-colors hover:bg-black/60"
                  style={{
                    border: '1px solid var(--ring)',
                    backgroundColor: 'rgba(0,0,0,.4)',
                    color: '#fff'
                  }}
                  aria-label="Next slide"
                >
                  ›
                </button>

                {/* Dots */}
                <div className="absolute left-0 right-0 bottom-3 flex gap-2 justify-center">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-6 h-1.5 rounded-full transition-all cursor-pointer ${
                        index === currentSlide 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                          : 'bg-white/30 border border-white/20'
                      }`}
                      style={index === currentSlide ? {
                        boxShadow: '0 0 0 3px rgba(56,189,248,.15) inset'
                      } : {}}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 md:py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid gap-7">
            <div className="grid gap-3 max-w-3xl">
              <h2 
                className="text-3xl md:text-5xl font-black"
                style={{
                  background: 'linear-gradient(90deg, var(--grad1), var(--grad2), var(--grad3))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Welcome to LusMind
              </h2>
              <p style={{ color: 'var(--muted)' }}>
                We craft digital-forward flavors with artisanal precision, distilling complex ideas into elegant sensations.
              </p>
              <p style={{ color: 'var(--muted)', opacity: 0.85 }}>
                Our living identity evolves with culture—surprising, adaptable, and globally consistent.
              </p>
              <p className="font-bold" style={{ color: '#7dd3fc' }}>
                "Innovation is our vapor, excellence is our essence."
              </p>
            </div>
            
            {/* Flavor Strip */}
            <div 
              className="overflow-hidden rounded-2xl p-2"
              style={{
                background: 'var(--panel)',
                border: '1px solid var(--ring)'
              }}
            >
              <div 
                className="flex gap-4 p-2"
                style={{
                  animation: 'marquee 24s linear infinite'
                }}
                onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
              >
                {/* Duplicate for seamless loop */}
                {[...slides, ...slides].map((slide, index) => (
                  <div 
                    key={index}
                    className="flex-none w-40 aspect-square rounded-2xl p-2 grid place-items-center"
                    style={{
                      background: 'var(--panel)',
                      border: '1px solid var(--ring)'
                    }}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verify Section */}
      <section id="verify" className="py-12 md:py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div 
            className="p-5 md:p-7 rounded-2xl backdrop-blur-sm"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--ring)'
            }}
          >
            <div className="grid gap-4 items-center">
              <div className="grid gap-2 max-w-3xl">
                <h2 
                  className="text-2xl md:text-4xl font-black"
                  style={{
                    background: 'linear-gradient(90deg, var(--grad1), var(--grad2), var(--grad3))',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  Product Verification
                </h2>
                <p style={{ color: 'var(--muted)' }}>
                  Verify authenticity using the unique code on your packaging for guaranteed quality and safety.
                </p>
              </div>
              <form onSubmit={handleVerify} className="flex gap-3 flex-wrap">
                <input
                  name="code"
                  className="flex-1 min-w-60 min-h-11 px-3 py-3 rounded-2xl outline-none focus:shadow-lg transition-shadow"
                  style={{
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid var(--ring)',
                    color: 'var(--txt)'
                  }}
                  placeholder="Enter verification code (8-12 chars)"
                  minLength={8}
                  maxLength={12}
                  required
                />
                <button 
                  type="submit"
                  className="px-4 py-3 rounded-2xl font-bold text-white transition-transform hover:-translate-y-px"
                  style={{
                    background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                    boxShadow: '0 10px 30px -12px rgba(56,189,248,.5)'
                  }}
                >
                  Verify
                </button>
              </form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {[
                  'Find QR/text code on package',
                  'Code length: 8–12 chars',
                  'Each product has a unique code'
                ].map((text, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-2xl text-center text-sm"
                    style={{
                      background: 'var(--panel)',
                      border: '1px solid var(--ring)'
                    }}
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section 
        id="subscribe" 
        className="py-12 md:py-24"
        style={{
          background: `
            radial-gradient(50vw 50vw at 20% 0%, rgba(124,58,237,.15), transparent 60%),
            radial-gradient(50vw 50vw at 80% 60%, rgba(14,165,233,.15), transparent 60%),
            var(--bg)
          `
        }}
      >
        <div className="max-w-6xl mx-auto px-5">
          <div 
            className="p-5 md:p-7 rounded-2xl text-center backdrop-blur-sm"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--ring)'
            }}
          >
            <h3 
              className="text-xl md:text-2xl font-black tracking-wider mb-2"
              style={{
                background: 'linear-gradient(90deg, var(--grad1), var(--grad2), var(--grad3))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              SUBSCRIBE FOR MORE UPDATES
            </h3>
            <p className="mb-4" style={{ color: 'var(--muted)' }}>
              Stay updated with our latest products and exclusive promotions instantly!
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 flex-wrap justify-center">
              <input
                name="email"
                type="email"
                className="flex-1 min-w-60 min-h-11 px-3 py-3 rounded-2xl outline-none focus:shadow-lg transition-shadow"
                style={{
                  background: 'rgba(255,255,255,.08)',
                  border: '1px solid var(--ring)',
                  color: 'var(--txt)'
                }}
                placeholder="Enter your email address"
                required
              />
              <button 
                type="submit"
                className="px-4 py-3 rounded-2xl font-bold text-white transition-transform hover:-translate-y-px"
                style={{
                  background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                  boxShadow: '0 10px 30px -12px rgba(56,189,248,.5)'
                }}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-9">
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-xs leading-relaxed text-center" style={{ color: 'var(--muted)' }}>
            <strong style={{ color: '#fff' }}>WARNING:</strong> This product contains chemicals, including nicotine, which is known to the State of California to cause cancer and reproductive harm. Visit{' '}
            <a 
              href="https://p65warnings.ca.gov" 
              className="underline"
              style={{ color: '#7dd3fc' }}
            >
              p65warnings.ca.gov
            </a>
            . Not for sale to persons under 21. Nicotine is addictive.
          </p>
          <div 
            className="mt-6 pt-4 text-center text-xs"
            style={{ 
              borderTop: '1px solid var(--ring)',
              color: 'var(--muted)'
            }}
          >
            © {new Date().getFullYear()} LusMind. All rights reserved. | Digital Vapor Technology
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `
      }} />
    </div>
  );
};