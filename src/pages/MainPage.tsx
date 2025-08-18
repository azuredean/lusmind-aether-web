import { useState, useEffect, useRef } from 'react';
import { AgeVerification } from '@/components/AgeVerification';

export const MainPage = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    { image: "/lovable-uploads/f039a0fd-82f1-4eae-9d88-b830264a99a3.png", title: "Blueberry Raspberry" },
    { image: "/lovable-uploads/959a431e-f709-4b2d-9a0f-9f905d19551d.png", title: "Niagara Grape" },
    { image: "/lovable-uploads/4f147d90-2fc6-4c41-9be9-2363c855074e.png", title: "Mixed Berry" },
    { image: "/lovable-uploads/72278a75-20ef-4099-b2ba-bc8797a1925d.png", title: "Niagara Grape Premium" },
    { image: "/lovable-uploads/54bad1ca-7e85-4325-b562-62f84b384ea3.png", title: "Orange Soda" }
  ];

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

  useEffect(() => {
    // Update carousel transform
    const track = document.getElementById('cTrack');
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }, [currentSlide]);

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

  const pauseCarousel = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resumeCarousel = () => {
    timerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
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
          <div 
            className="carousel" 
            id="heroCarousel"
            onMouseEnter={pauseCarousel}
            onMouseLeave={resumeCarousel}
          >
            <div className="carousel-viewport">
              <div className="carousel-track" id="cTrack" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                  <div key={index} className="slide">
                    <img src={slide.image} alt={slide.title} />
                  </div>
                ))}
              </div>
              <button className="ctrl prev" id="prevBtn" aria-label="Previous slide" onClick={prevSlide}>
                ‹
              </button>
              <button className="ctrl next" id="nextBtn" aria-label="Next slide" onClick={nextSlide}>
                ›
              </button>
              <div className="dots" id="dots">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
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
              className="strip-track" 
              id="stripTrack"
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              {/* Duplicate for seamless loop */}
              {[...slides, ...slides].map((slide, index) => (
                <div key={index} className="chip">
                  <img src={slide.image} alt={slide.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FLAVOR SHOWCASE */}
      <section className="section" style={{
        position: 'relative',
        background: `
          radial-gradient(40vw 40vw at 30% 20%, rgba(139,92,246,.08), transparent 70%),
          radial-gradient(40vw 40vw at 70% 80%, rgba(56,189,248,.08), transparent 70%),
          var(--bg)
        `,
        overflow: 'hidden'
      }}>
        {/* 3D Mesh Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.1) 50%, transparent 100%),
            linear-gradient(0deg, transparent 0%, rgba(56,189,248,0.05) 50%, transparent 100%)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.3
        }} />
        
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 className="gradient-text" style={{ marginBottom: '12px' }}>Premium Flavor Collection</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Experience our signature flavors crafted with precision and innovation
            </p>
          </div>
          
          {/* Flowing Flavor Strip */}
          <div style={{
            overflow: 'hidden',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              padding: '8px',
              animation: 'flowRight 35s linear infinite',
              width: 'max-content'
            }}
            onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}>
              {/* First set */}
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/93168de7-3a2f-4db1-ab76-dc654be26b6f.png" alt="Watermelon Strawberry" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/f55f7ba5-526e-4238-9fde-d0c3e8d613d0.png" alt="Blueberry Raspberry" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/c8bad9e1-51d8-457f-b243-3fac5a10ff64.png" alt="Kiwi Passion" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/950ad15f-ca56-46a9-b3ac-ce39a95c6339.png" alt="Peach Ice" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/347ca50f-849a-43d7-88a0-3767230905b0.png" alt="Mango Ice" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/588000a0-5227-469d-aa74-7bc3daae0570.png" alt="Watermelon Ice" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/8c6e021f-647f-4728-a92d-1c844914ddd4.png" alt="Green Coconut" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/47e5c6a9-393a-448a-9e87-ac91ac1ac90b.png" alt="Niagara Grape" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/60fcfa98-7404-442b-bb33-52fa9379a93d.png" alt="Pineapple Coconut Ice" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/6747eef8-572e-4f90-a650-acba5ef46b7a.png" alt="Cool Yuzu Cedar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/93168de7-3a2f-4db1-ab76-dc654be26b6f.png" alt="Watermelon Strawberry" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/f55f7ba5-526e-4238-9fde-d0c3e8d613d0.png" alt="Blueberry Raspberry" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/c8bad9e1-51d8-457f-b243-3fac5a10ff64.png" alt="Kiwi Passion" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/950ad15f-ca56-46a9-b3ac-ce39a95c6339.png" alt="Peach Ice" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/347ca50f-849a-43d7-88a0-3767230905b0.png" alt="Mango Ice" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/588000a0-5227-469d-aa74-7bc3daae0570.png" alt="Watermelon Ice" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/8c6e021f-647f-4728-a92d-1c844914ddd4.png" alt="Green Coconut" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/47e5c6a9-393a-448a-9e87-ac91ac1ac90b.png" alt="Niagara Grape" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/60fcfa98-7404-442b-bb33-52fa9379a93d.png" alt="Pineapple Coconut Ice" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: '72px', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <img src="/lovable-uploads/6747eef8-572e-4f90-a650-acba5ef46b7a.png" alt="Cool Yuzu Cedar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
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