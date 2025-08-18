import { useState, useEffect, useRef } from 'react';
import { AgeVerification } from '@/components/AgeVerification';

export const MainPage = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const lastTsRef = useRef<number | null>(null);

  const slides = [
    { image: "/lovable-uploads/f039a0fd-82f1-4eae-9d88-b830264a99a3.png", title: "Blueberry Raspberry" },
    { image: "/lovable-uploads/959a431e-f709-4b2d-9a0f-9f905d19551d.png", title: "Niagara Grape" },
    { image: "/lovable-uploads/4f147d90-2fc6-4c41-9be9-2363c855074e.png", title: "Mixed Berry" },
    { image: "/lovable-uploads/72278a75-20ef-4099-b2ba-bc8797a1925d.png", title: "Niagara Grape Premium" },
    { image: "/lovable-uploads/54bad1ca-7e85-4325-b562-62f84b384ea3.png", title: "Orange Soda" }
  ];

  const flavorImages = [
    "/lovable-uploads/b77eaea8-ddab-4e36-bd72-00ad857c4593.png",
    "/lovable-uploads/79bd44ad-e23f-46d1-b082-b0650da3cded.png",
    "/lovable-uploads/23243cbf-2d86-466f-a3cf-87cca5b21ebd.png",
    "/lovable-uploads/74671bf2-71a5-47ae-9b1d-aa4a3112e105.png",
    "/lovable-uploads/578dd4b5-9ba4-4a5e-b999-0bfb42dd36c3.png",
    "/lovable-uploads/efcafea6-322e-4eb0-b4b0-31c3047723fd.png",
    "/lovable-uploads/20d95ca4-7758-49d4-947c-f60e57bf7649.png",
    "/lovable-uploads/a0e91021-c566-465f-b8ee-3199ed8babff.png",
    "/lovable-uploads/1bf097ab-a34c-4cba-aa4d-edd263ee34ad.png",
    "/lovable-uploads/ce14503d-968f-4db5-97a4-1fea5155b9b2.png",
    "/lovable-uploads/921b58a6-5387-4f1d-a623-7fff0bc97de1.png",
    "/lovable-uploads/53f5cf2a-ecac-48ad-8337-b8b3541ccfdf.png",
    "/lovable-uploads/3cb41497-2b9b-4df6-a1e4-c7f7a12be98a.png",
    "/lovable-uploads/9aae58b7-c0aa-4725-b4f7-37fbe4fea19b.png",
    "/lovable-uploads/4f592c06-ebfc-442c-8d15-4d8e4784322b.png",
    "/lovable-uploads/a897874d-dc7b-4680-8774-1140e6ce17a1.png",
    "/lovable-uploads/e9491a8b-aa43-417a-a791-55f8372600ec.png",
    "/lovable-uploads/73a6891b-a8cd-464b-be7c-15e6556a6aa2.png",
    "/lovable-uploads/01c651f5-7333-4759-97d0-e3a26c1d1c10.png",
    "/lovable-uploads/cb774285-138a-4080-aa60-2b38edad96e3.png",
    "/lovable-uploads/2c4da2f8-6c14-4223-8fca-aa7669b8aaaf.png",
    "/lovable-uploads/73b66ffd-7bd3-4323-a952-53d877270743.png",
    "/lovable-uploads/32b2624c-5528-43e0-b55d-9530d6790650.png",
    "/lovable-uploads/a728bdcf-b0f3-480c-b8e9-692732f20769.png",
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
    const el = scrollRef.current;
    if (!el) return;

    // 如果用户偏好减少动效，直接不滚动
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    posRef.current = 0;
    el.scrollLeft = 0;

    const SPEED_PX_PER_SEC = 40; // 调整你需要的速度(像素/秒)

    const tick = (ts: number) => {
      if (pausedRef.current) {
        lastTsRef.current = ts;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const last = lastTsRef.current ?? ts;
      const dt = Math.max(0, ts - last) / 1000; // 秒
      lastTsRef.current = ts;

      // 实时取 scrollWidth（图片加载后会变化，不会失准）
      const maxLoop = el.scrollWidth / 2; // 因为内容重复两份
      if (maxLoop <= 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // 位置推进
      let p = posRef.current + SPEED_PX_PER_SEC * dt;

      // 到一半回绕（无缝）
      if (p >= maxLoop) p -= maxLoop;

      posRef.current = p;
      el.scrollLeft = p;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame((ts) => {
      lastTsRef.current = ts;
      tick(ts);
    });

    // 悬停暂停
    const onEnter = () => (pausedRef.current = true);
    const onLeave = () => (pausedRef.current = false);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    // 标签页隐藏暂停
    const onVis = () => (pausedRef.current = document.hidden);
    document.addEventListener('visibilitychange', onVis);

    // 视口变化时，轻微校正 pos，避免跳（取模）
    const onResize = () => {
      const maxLoop = el.scrollWidth / 2;
      if (maxLoop > 0) {
        posRef.current = posRef.current % maxLoop;
        el.scrollLeft = posRef.current;
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
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
          <div className="carousel" id="heroCarousel">
            <div className="carousel-viewport">
              <div 
                ref={scrollRef}
                className="carousel-track" 
                id="cTrack" 
                style={{ 
                  display: 'flex',
                  overflowX: 'hidden',
                  scrollBehavior: 'auto'
                }}
              >
                {[...slides, ...slides].map((slide, index) => (
                  <div key={index} className="slide" style={{ flexShrink: 0 }}>
                    <img src={slide.image} alt={slide.title} />
                  </div>
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
              {[...flavorImages, ...flavorImages].map((image, index) => (
                <div key={index} className="chip">
                  <img src={image} alt={`Flavor ${index % flavorImages.length + 1}`} />
                </div>
              ))}
            </div>
          </div>
          {/* Second Flavor auto-scroll strip */}
          <div className="strip card">
            <div 
              className="strip-track reverse" 
              id="stripTrack2"
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              {/* Duplicate for seamless loop */}
              {[...flavorImages, ...flavorImages].map((image, index) => (
                <div key={index} className="chip">
                  <img src={image} alt={`Flavor ${index % flavorImages.length + 1}`} />
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