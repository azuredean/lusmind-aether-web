import { useState, useEffect, useRef } from 'react';
import { AgeVerification } from '@/components/AgeVerification';
import { useDragScroll } from '@/hooks/useDragScroll';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const MainPage = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const lastTsRef = useRef<number | null>(null);
  
  // Auto-play refs for strips
  const firstStripRafRef = useRef<number | null>(null);
  const secondStripRafRef = useRef<number | null>(null);
  const firstStripPosRef = useRef(0);
  const secondStripPosRef = useRef(0);
  const firstStripPausedRef = useRef(false);
  const secondStripPausedRef = useRef(false);
  const firstStripLastTsRef = useRef<number | null>(null);
  const secondStripLastTsRef = useRef<number | null>(null);
  
  const firstStripRef = useDragScroll({
    onDragStart: () => { firstStripPausedRef.current = true; },
    onDragEnd: () => { 
      firstStripPausedRef.current = false;
      // Resume auto-play after drag ends
      setTimeout(() => {
        if (firstStripRef.current && !firstStripPausedRef.current) {
          startFirstStripAnimation();
        }
      }, 100);
    }
  });
  
  const secondStripRef = useDragScroll({
    onDragStart: () => { secondStripPausedRef.current = true; },
    onDragEnd: () => { 
      secondStripPausedRef.current = false;
      // Resume auto-play after drag ends
      setTimeout(() => {
        if (secondStripRef.current && !secondStripPausedRef.current) {
          startSecondStripAnimation();
        }
      }, 100);
    }
  });

  const slides = [
    { image: "/lovable-uploads/f039a0fd-82f1-4eae-9d88-b830264a99a3.png", title: "Blueberry Raspberry" },
    { image: "/lovable-uploads/959a431e-f709-4b2d-9a0f-9f905d19551d.png", title: "Niagara Grape" },
    { image: "/lovable-uploads/4f147d90-2fc6-4c41-9be9-2363c855074e.png", title: "Mixed Berry" },
    { image: "/lovable-uploads/72278a75-20ef-4099-b2ba-bc8797a1925d.png", title: "Niagara Grape Premium" },
    { image: "/lovable-uploads/54bad1ca-7e85-4325-b562-62f84b384ea3.png", title: "Orange Soda" }
  ];

  // Auto-slide effect for hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Navigation functions for hero carousel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const ageVerified = sessionStorage.getItem('ageVerified');
    if (ageVerified === 'true') {
      setShowAgeVerification(false);
    }
  }, []);

  useEffect(() => {
    // Theme initialization
    const THEME_KEY = 'lusmind-theme';
    const saved = localStorage.getItem(THEME_KEY);
    const initialTheme = saved || 'dark';
    document.documentElement.setAttribute('data-theme', initialTheme);
    
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.textContent = initialTheme === 'dark' ? '🌙' : '☀️';
    }
  }, []);

  // Auto-play animation for first strip
  const startFirstStripAnimation = () => {
    const el = firstStripRef.current;
    if (!el || firstStripPausedRef.current) return;

    if (firstStripRafRef.current) {
      cancelAnimationFrame(firstStripRafRef.current);
    }

    const SPEED = 30; // pixels per second

    const animate = (ts: number) => {
      if (firstStripPausedRef.current) {
        firstStripLastTsRef.current = ts;
        firstStripRafRef.current = requestAnimationFrame(animate);
        return;
      }

      const last = firstStripLastTsRef.current ?? ts;
      const dt = Math.max(0, ts - last) / 1000;
      firstStripLastTsRef.current = ts;

      const maxScroll = el.scrollWidth / 2;
      if (maxScroll <= 0) {
        firstStripRafRef.current = requestAnimationFrame(animate);
        return;
      }

      let pos = firstStripPosRef.current + SPEED * dt;
      if (pos >= maxScroll) pos -= maxScroll;

      firstStripPosRef.current = pos;
      el.scrollLeft = pos;

      firstStripRafRef.current = requestAnimationFrame(animate);
    };

    firstStripRafRef.current = requestAnimationFrame((ts) => {
      firstStripLastTsRef.current = ts;
      animate(ts);
    });
  };

  // Auto-play animation for second strip (reverse direction)
  const startSecondStripAnimation = () => {
    const el = secondStripRef.current;
    if (!el || secondStripPausedRef.current) return;

    if (secondStripRafRef.current) {
      cancelAnimationFrame(secondStripRafRef.current);
    }

    const SPEED = 30; // pixels per second

    const animate = (ts: number) => {
      if (secondStripPausedRef.current) {
        secondStripLastTsRef.current = ts;
        secondStripRafRef.current = requestAnimationFrame(animate);
        return;
      }

      const last = secondStripLastTsRef.current ?? ts;
      const dt = Math.max(0, ts - last) / 1000;
      secondStripLastTsRef.current = ts;

      const maxScroll = el.scrollWidth / 2;
      if (maxScroll <= 0) {
        secondStripRafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Reverse direction
      let pos = secondStripPosRef.current - SPEED * dt;
      if (pos <= 0) pos += maxScroll;

      secondStripPosRef.current = pos;
      el.scrollLeft = pos;

      secondStripRafRef.current = requestAnimationFrame(animate);
    };

    // Start from the end for reverse direction
    if (el.scrollWidth > 0) {
      secondStripPosRef.current = el.scrollWidth / 2;
      el.scrollLeft = secondStripPosRef.current;
    }

    secondStripRafRef.current = requestAnimationFrame((ts) => {
      secondStripLastTsRef.current = ts;
      animate(ts);
    });
  };

  // Initialize strip animations
  useEffect(() => {
    const timer1 = setTimeout(() => startFirstStripAnimation(), 500);
    const timer2 = setTimeout(() => startSecondStripAnimation(), 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (firstStripRafRef.current) cancelAnimationFrame(firstStripRafRef.current);
      if (secondStripRafRef.current) cancelAnimationFrame(secondStripRafRef.current);
    };
  }, []);

  const handleAgeVerified = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setShowAgeVerification(false);
  };

  const handleAgeRejected = () => {
    sessionStorage.removeItem('ageVerified');
    window.location.href = 'https://www.google.com';
  };

  const toggleTheme = () => {
    const THEME_KEY = 'lusmind-theme';
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    }
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
    <>
      {/* NAV */}
      <header className="container">
      <nav className="nav">
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/lovable-uploads/d4cf886b-b75b-4211-9d38-f7c407b49c2d.png" 
            alt="LusMind Logo" 
            style={{ width: '32px', height: '32px', objectFit: 'contain' }}
          />
          <img 
            src="/lovable-uploads/8023d7ff-2b60-4640-aeeb-9b8bc17eadf9.png" 
            alt="LUSMIND" 
            style={{ height: '32px', objectFit: 'contain' }}
          />
        </a>
          <div className="nav-links">
            <a href="#products" onClick={(e) => { e.preventDefault(); scrollToSection('products'); }}>Products</a>
            <a href="#verify" onClick={(e) => { e.preventDefault(); scrollToSection('verify'); }}>Verify</a>
            <a href="#subscribe" onClick={(e) => { e.preventDefault(); scrollToSection('subscribe'); }}>Subscribe</a>
          </div>
          <button id="themeToggle" className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
            🌙
          </button>
        </nav>
      </header>

      {/* HERO + CAROUSEL */}
      <section className="hero section">
        <div className="container grid">
          <div>
            <p className="tag">DIGITAL VAPOR • FUTURE FLAVORS</p>
            <h1 className="gradient-text" style={{ marginTop: '10px' }}>
              A Soft-Neon Universe for Taste
            </h1>
            <p style={{ marginTop: '16px', maxWidth: '56ch' }}>
              Where cyber aesthetics meet artisanal precision. Premium e-liquid crafted for an immersive, future-forward journey.
            </p>
            <div style={{ marginTop: '22px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#products" className="btn" onClick={(e) => { e.preventDefault(); scrollToSection('products'); }}>
                Explore Collection
              </a>
              <a href="#verify" className="btn ghost" onClick={(e) => { e.preventDefault(); scrollToSection('verify'); }}>
                Verify Product
              </a>
            </div>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', maxWidth: '720px', marginTop: '26px' }}>
              <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
                <div className="gradient-text" style={{ fontSize: '22px', fontWeight: 900 }}>100+</div>
                <p style={{ marginTop: '6px' }}>Premium Flavors</p>
              </div>
              <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
                <div className="gradient-text" style={{ fontSize: '22px', fontWeight: 900 }}>50K+</div>
                <p style={{ marginTop: '6px' }}>Happy Customers</p>
              </div>
              <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
                <div className="gradient-text" style={{ fontSize: '22px', fontWeight: 900 }}>24/7</div>
                <p style={{ marginTop: '6px' }}>Quality Control</p>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="carousel" id="heroCarousel" style={{ position: 'relative' }}>
            <div className="carousel-viewport">
              <div 
                className="carousel-track" 
                style={{ 
                  display: 'flex',
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="slide" style={{ flexShrink: 0 }}>
                    <img src={slide.image} alt={slide.title} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="carousel-nav carousel-nav-prev"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.5)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronLeft size={20} />
            </button>
            
            <button 
              onClick={nextSlide}
              className="carousel-nav carousel-nav-next"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.5)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Dots Indicator */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              zIndex: 10
            }}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS INTRO */}
      <section id="products" className="section">
        <div className="container" style={{ display: 'grid', gap: '28px', gridTemplateColumns: '1fr' }}>
          <div style={{ display: 'grid', gap: '12px', maxWidth: '800px' }}>
            <h2 className="gradient-text">Welcome to LusMind</h2>
            <p>We craft digital-forward flavors with artisanal precision, distilling complex ideas into elegant sensations.</p>
            <p style={{ opacity: .85 }}>Our living identity evolves with culture—surprising, adaptable, and globally consistent.</p>
            <p style={{ color: '#7dd3fc', fontWeight: 700 }}>"Innovation is our vapor, excellence is our essence."</p>
          </div>
          {/* Flavor auto-scroll strip */}
          <div className="strip card">
            <div 
              ref={firstStripRef}
              className="strip-track" 
              id="stripTrack"
              style={{ 
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              onMouseEnter={() => {
                firstStripPausedRef.current = true;
              }}
              onMouseLeave={() => {
                firstStripPausedRef.current = false;
                startFirstStripAnimation();
              }}
            >
              {/* Duplicate for seamless loop */}
              {[...slides, ...slides].map((slide, index) => (
                <div key={index} className="chip">
                  <img src={slide.image} alt={slide.title} />
                </div>
              ))}
            </div>
          </div>
          {/* Second Flavor auto-scroll strip */}
          <div className="strip card">
            <div 
              ref={secondStripRef}
              className="strip-track reverse" 
              id="stripTrack2"
              style={{ 
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              onMouseEnter={() => {
                secondStripPausedRef.current = true;
              }}
              onMouseLeave={() => {
                secondStripPausedRef.current = false;
                startSecondStripAnimation();
              }}
            >
              {/* All flavor images combined */}
              {[
                "/lovable-uploads/9b576f2c-6211-4eb3-b2f6-fbc4b79461d8.png",
                "/lovable-uploads/b9f726db-7379-4bee-a551-24113eef1fb5.png", 
                "/lovable-uploads/c5854406-3bff-4457-84af-d3a687123914.png",
                "/lovable-uploads/a9bf2e15-d1f5-42e0-82d5-36098e4ad78d.png",
                "/lovable-uploads/7ba19d29-5ed4-4eb8-8116-f4f4c260e387.png",
                "/lovable-uploads/069bd4db-c9ad-4223-a687-7948f930d02b.png",
                "/lovable-uploads/b41146f5-0461-4eae-b292-7ec1d5a39003.png",
                "/lovable-uploads/de35654b-b3bf-4024-89a4-13f3d4e7c6e9.png",
                "/lovable-uploads/00a3ec32-a36b-4188-a91f-d62cce56ce7d.png",
                "/lovable-uploads/97c22665-7d50-4f47-ae7d-fb319e6c8df7.png",
                "/lovable-uploads/66a398c3-9d0f-4014-8057-d62df52e659f.png",
                "/lovable-uploads/927722b0-7472-4214-89c1-e085f79caf57.png",
                "/lovable-uploads/cded7454-3cef-41dd-8a86-866cf3f4f7ba.png",
                "/lovable-uploads/d64ab660-b26c-4321-85fc-82b5f65d8a4d.png",
                "/lovable-uploads/45a143ac-b65d-4587-b968-15a50d11cdcd.png",
                "/lovable-uploads/0707774e-9786-4144-b8eb-cf95434309bd.png",
                "/lovable-uploads/687e1c0b-e986-4c17-abbd-f2f021e1b93e.png",
                "/lovable-uploads/a8122a31-2a0c-4427-8ace-5a19848ecc1b.png",
                "/lovable-uploads/3c30f767-fd61-4af0-88dd-9dc19d7cd139.png",
                "/lovable-uploads/db1bd122-976c-4cc1-ae7f-232f69cd1b0c.png",
                "/lovable-uploads/8b762a1a-a6f1-4510-88db-9db5247e230d.png",
                "/lovable-uploads/d8407800-8b7c-43f1-b981-e9e0789e370b.png",
                "/lovable-uploads/77669a7e-a98d-4c08-a69d-13a07fc23723.png"
              ].concat([
                "/lovable-uploads/9b576f2c-6211-4eb3-b2f6-fbc4b79461d8.png",
                "/lovable-uploads/b9f726db-7379-4bee-a551-24113eef1fb5.png", 
                "/lovable-uploads/c5854406-3bff-4457-84af-d3a687123914.png",
                "/lovable-uploads/a9bf2e15-d1f5-42e0-82d5-36098e4ad78d.png",
                "/lovable-uploads/7ba19d29-5ed4-4eb8-8116-f4f4c260e387.png",
                "/lovable-uploads/069bd4db-c9ad-4223-a687-7948f930d02b.png",
                "/lovable-uploads/b41146f5-0461-4eae-b292-7ec1d5a39003.png",
                "/lovable-uploads/de35654b-b3bf-4024-89a4-13f3d4e7c6e9.png",
                "/lovable-uploads/00a3ec32-a36b-4188-a91f-d62cce56ce7d.png",
                "/lovable-uploads/97c22665-7d50-4f47-ae7d-fb319e6c8df7.png",
                "/lovable-uploads/66a398c3-9d0f-4014-8057-d62df52e659f.png",
                "/lovable-uploads/927722b0-7472-4214-89c1-e085f79caf57.png",
                "/lovable-uploads/cded7454-3cef-41dd-8a86-866cf3f4f7ba.png",
                "/lovable-uploads/d64ab660-b26c-4321-85fc-82b5f65d8a4d.png",
                "/lovable-uploads/45a143ac-b65d-4587-b968-15a50d11cdcd.png",
                "/lovable-uploads/0707774e-9786-4144-b8eb-cf95434309bd.png",
                "/lovable-uploads/687e1c0b-e986-4c17-abbd-f2f021e1b93e.png",
                "/lovable-uploads/a8122a31-2a0c-4427-8ace-5a19848ecc1b.png",
                "/lovable-uploads/3c30f767-fd61-4af0-88dd-9dc19d7cd139.png",
                "/lovable-uploads/db1bd122-976c-4cc1-ae7f-232f69cd1b0c.png",
                "/lovable-uploads/8b762a1a-a6f1-4510-88db-9db5247e230d.png",
                "/lovable-uploads/d8407800-8b7c-43f1-b981-e9e0789e370b.png",
                "/lovable-uploads/77669a7e-a98d-4c08-a69d-13a07fc23723.png"
              ]).map((image, index) => (
                <div key={index} className="chip">
                  <img src={image} alt={`Flavor ${index % 10 + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VERIFY */}
      <section id="verify" className="section">
        <div className="container card" style={{ padding: 'clamp(18px,3.5vw,28px)' }}>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr', alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: '8px', maxWidth: '800px' }}>
              <h2 className="gradient-text">Product Verification</h2>
              <p>Verify authenticity using the unique code on your packaging for guaranteed quality and safety.</p>
            </div>
            <form onSubmit={handleVerify} className="form-row">
              <input
                name="code"
                className="input"
                placeholder="Enter verification code (8-12 chars)"
                minLength={8}
                maxLength={12}
                required
              />
              <button className="btn" type="submit">Verify</button>
            </form>
            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(3,1fr)' }}>
              <div className="card" style={{ padding: '12px', textAlign: 'center' }}>Find QR/text code on package</div>
              <div className="card" style={{ padding: '12px', textAlign: 'center' }}>Code length: 8–12 chars</div>
              <div className="card" style={{ padding: '12px', textAlign: 'center' }}>Each product has a unique code</div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section 
        id="subscribe" 
        className="section" 
        style={{
          background: `
            radial-gradient(50vw 50vw at 20% 0%, rgba(124,58,237,.15), transparent 60%),
            radial-gradient(50vw 50vw at 80% 60%, rgba(14,165,233,.15), transparent 60%),
            var(--bg)
          `
        }}
      >
        <div className="container">
          <div className="card" style={{ padding: 'clamp(18px,3.5vw,28px)', textAlign: 'center' }}>
            <h3 className="gradient-text" style={{ letterSpacing: '.2em' }}>SUBSCRIBE FOR MORE UPDATES</h3>
            <p style={{ marginTop: '8px' }}>Stay updated with our latest products and exclusive promotions instantly!</p>
            <form onSubmit={handleSubscribe} className="form-row" style={{ marginTop: '14px' }}>
              <input
                name="email"
                className="input"
                type="email"
                placeholder="Enter your email address"
                required
              />
              <button className="btn" type="submit">SUBSCRIBE</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section" style={{ paddingTop: '36px' }}>
        <div className="container">
          <p className="footer-note" style={{ textAlign: 'center' }}>
            <strong style={{ color: '#fff' }}>WARNING:</strong> This product contains chemicals, including nicotine, which is known to the State of California to cause cancer and reproductive harm. Visit{' '}
            <a href="https://p65warnings.ca.gov" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>
              p65warnings.ca.gov
            </a>
            . Not for sale to persons under 21. Nicotine is addictive.
          </p>
          <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid var(--ring)', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
            © {new Date().getFullYear()} LusMind. All rights reserved. | Digital Vapor Technology
          </div>
        </div>
      </footer>
    </>
  );
};