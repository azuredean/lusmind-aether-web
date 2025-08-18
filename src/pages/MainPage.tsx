import { useState, useEffect, useMemo, useRef } from 'react';
import { AgeVerification } from '@/components/AgeVerification';

export const MainPage = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);

  // ====== Slides (保持你的数据不变) ======
  const slides = [
    { image: "/lovable-uploads/f039a0fd-82f1-4eae-9d88-b830264a99a3.png", title: "Blueberry Raspberry" },
    { image: "/lovable-uploads/959a431e-f709-4b2d-9a0f-9f905d19551d.png", title: "Niagara Grape" },
    { image: "/lovable-uploads/4f147d90-2fc6-4c41-9be9-2363c855074e.png", title: "Mixed Berry" },
    { image: "/lovable-uploads/72278a75-20ef-4099-b2ba-bc8797a1925d.png", title: "Niagara Grape Premium" },
    { image: "/lovable-uploads/54bad1ca-7e85-4325-b562-62f84b384ea3.png", title: "Orange Soda" }
  ];

  const newFlavorSlides = [
    { image: "/lovable-uploads/3b192fb7-a906-4dab-b90f-0cce1a5c18d5.png", title: "Watermelon Strawberry" },
    { image: "/lovable-uploads/f118b54f-fa91-48ed-a6c9-010fe485899c.png", title: "Blueberry Raspberry" },
    { image: "/lovable-uploads/96387b6f-3691-44e5-b29b-23fd56d487f0.png", title: "Kiwi & Passion" },
    { image: "/lovable-uploads/f40e1940-0c12-4acd-a346-e7b44a74fc42.png", title: "Peach Ice" },
    { image: "/lovable-uploads/169aa4fc-d5d3-41b9-a7a1-8daec2038b13.png", title: "Mango Ice" },
    { image: "/lovable-uploads/8d672039-0c37-43c1-80e9-20a6a4eaad2a.png", title: "Watermelon Ice" },
    { image: "/lovable-uploads/7db6a3cb-e2b7-4f2c-a7aa-23ecf0e3829e.png", title: "Green Coconut" },
    { image: "/lovable-uploads/2c98da6a-68bc-43d7-891e-127d9a0fd050.png", title: "Niagara Grape" },
    { image: "/lovable-uploads/43b1aa6d-f01a-44eb-8578-05233fd3666d.png", title: "Pineapple Coconut Ice" },
    { image: "/lovable-uploads/0a4d82b0-95b3-4c6f-a5f6-24be6b66b2a2.png", title: "Cool Yuzu Cedar" },
    { image: "/lovable-uploads/b2b117b3-1902-49f4-bf29-a93a115b2f05.png", title: "Melon Yogurt Ice" },
    { image: "/lovable-uploads/075be852-ac76-414d-a6d0-3150767d0b4a.png", title: "Green Apple" },
    { image: "/lovable-uploads/1ae56160-ec8c-4b3b-a92a-8d7c5cbdb017.png", title: "Arctic Ice" },
    { image: "/lovable-uploads/e4a87b2b-97eb-4bde-a637-d9a0711b6209.png", title: "Cool Peppermint" },
    { image: "/lovable-uploads/866ba477-2838-4667-85e3-3939d2a7df0e.png", title: "Double Apple Shisha" },
    { image: "/lovable-uploads/b7879772-48b8-4625-a08d-3c02fb1db806.png", title: "Coffee Tobacco" },
    { image: "/lovable-uploads/782b7512-24b4-4c60-a293-ca12ff874267.png", title: "Tobacco & Nut" },
    { image: "/lovable-uploads/9fd32e86-a519-443e-be78-4709f6c0f60c.png", title: "Monster Drink" },
    { image: "/lovable-uploads/904423dd-6612-4503-86c3-d48aee2e72a6.png", title: "Orange Soda" },
    { image: "/lovable-uploads/0ecb9600-104b-4749-bde2-a4ac6fd57a8d.png", title: "Creamy Rainbow Candy" }
  ];

  // ========== 年龄验证 ==========
  useEffect(() => {
    const ageVerified = sessionStorage.getItem('ageVerified');
    if (ageVerified === 'true') setShowAgeVerification(false);
  }, []);

  // ========== 主题（保持你原逻辑不变） ==========
  useEffect(() => {
    const THEME_KEY = 'lusmind-theme';
    const saved = localStorage.getItem(THEME_KEY);
    const initialTheme = saved || 'dark';
    document.documentElement.setAttribute('data-theme', initialTheme);
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) toggleBtn.textContent = initialTheme === 'dark' ? '🌙' : '☀️';
  }, []);
  const toggleTheme = () => {
    const THEME_KEY = 'lusmind-theme';
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) toggleBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  };

  // ========== HERO 轮播（全新稳定逻辑） ==========
  const trackRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 带首尾克隆的列表，避免跳变
  const extendedSlides = useMemo(() => {
    if (slides.length === 0) return [];
    return [slides[slides.length - 1], ...slides, slides[0]];
  }, [slides]);

  // 当前“扩展索引”，从 1 开始（0 是克隆的最后一张）
  const [xIndex, setXIndex] = useState(1);
  // 是否暂停（悬停/不可见时）
  const [isPaused, setIsPaused] = useState(false);

  // 归一化索引（用于点点高亮）
  const normIndex = ((xIndex - 1 + slides.length) % slides.length);

  // 同步 transform
  const applyTransform = (instant = false) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = instant ? 'none' : 'transform 700ms cubic-bezier(.22,.8,.2,1)';
    el.style.transform = `translate3d(-${xIndex * 100}%,0,0)`;
  };

  useEffect(() => { applyTransform(); }, [xIndex]); // 每次变更时过渡

  // 过渡结束后做“无动画回正”
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onEnd = () => {
      if (xIndex === 0) {
        // 从克隆的“最后一张”跳到真最后
        setTimeout(() => {
          setXIndex(slides.length);
          // 下一帧“瞬移”
          requestAnimationFrame(() => applyTransform(true));
        }, 0);
      } else if (xIndex === slides.length + 1) {
        // 从克隆“第一张”跳到真第一
        setTimeout(() => {
          setXIndex(1);
          requestAnimationFrame(() => applyTransform(true));
        }, 0);
      }
    };
    el.addEventListener('transitionend', onEnd);
    return () => el.removeEventListener('transitionend', onEnd);
  }, [xIndex, slides.length]);

  // 自动播放（仅一个计时器）
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    autoplayRef.current && clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setXIndex((i) => i + 1);
    }, 5000);
    return () => {
      autoplayRef.current && clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
  }, [isPaused, slides.length]);

  // 可见性控制
  useEffect(() => {
    const onVis = () => setIsPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const pauseCarousel = () => setIsPaused(true);
  const resumeCarousel = () => setIsPaused(false);

  // 控制与点点跳转（跳到扩展索引）
  const nextSlide = () => setXIndex((i) => i + 1);
  const prevSlide = () => setXIndex((i) => i - 1);
  const goToSlide = (idx: number) => setXIndex(idx + 1); // 因为扩展从1开始

  // ========== 验证/订阅/跳转 保持你的逻辑 ==========
  const handleAgeVerified = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setShowAgeVerification(false);
  };
  const handleAgeRejected = () => {
    sessionStorage.removeItem('ageVerified');
    window.location.href = 'https://www.google.com';
  };
  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = (formData.get('code') as string) || '';
    if (code.length < 8 || code.length > 12) {
      alert('Please enter 8–12 characters.');
      return;
    }
    alert('Verifying: ' + code);
  };
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string) || '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    const btn = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = btn.textContent;
    btn.disabled = true; btn.textContent = 'SUBSCRIBING...';
    setTimeout(() => {
      btn.disabled = false; btn.textContent = originalText || 'SUBSCRIBE';
      (e.currentTarget as HTMLFormElement).reset();
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
          <div
            className="carousel"
            id="heroCarousel"
            onMouseEnter={pauseCarousel}
            onMouseLeave={resumeCarousel}
            aria-roledescription="carousel"
          >
            <div className="carousel-viewport" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
              <div
                className="carousel-track"
                ref={trackRef}
                style={{
                  display: 'flex',
                  width: `${extendedSlides.length * 100}%`,
                  height: '100%',
                  transform: `translate3d(-${xIndex * 100}%,0,0)`,
                }}
              >
                {extendedSlides.map((s, i) => (
                  <div key={i} className="slide" style={{ flex: '0 0 100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px' }}>
                    <img
                      src={s.image}
                      alt={s.title}
                      draggable={false}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 16 }}
                      loading={i === 1 ? 'eager' : 'lazy'}
                      fetchPriority={i === 1 ? 'high' as any : 'auto'}
                      decoding="async"
                    />
                  </div>
                ))}
              </div>

              {/* controls */}
              <button className="ctrl prev" aria-label="Previous slide" onClick={prevSlide}>‹</button>
              <button className="ctrl next" aria-label="Next slide" onClick={nextSlide}>›</button>

              {/* dots */}
              <div className="dots" style={{ position: 'absolute', left: 0, right: 0, bottom: 14, display: 'flex', justifyContent: 'center', gap: 8 }}>
                {slides.map((_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === normIndex ? 'active' : ''}`}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === normIndex}
                    onClick={() => goToSlide(i)}
                    style={{
                      width: i === normIndex ? 24 : 18,
                      height: 8,
                      borderRadius: 999,
                      border: 0,
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS INTRO（你的内容保持不变） */}
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
              className="strip-track linear-scroll"
              id="stripTrack"
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              {slides.map((slide, index) => (
                <div key={index} className="chip">
                  <img src={slide.image} alt={slide.title} />
                </div>
              ))}
            </div>
          </div>

          {/* Second Flavor auto-scroll strip */}
          <div className="strip card">
            <div
              className="strip-track reverse linear-scroll"
              id="stripTrack2"
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              {newFlavorSlides.map((slide, index) => (
                <div key={index} className="chip">
                  <img src={slide.image} alt={slide.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VERIFY（保持不变） */}
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

      {/* SUBSCRIBE（保持不变） */}
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

      {/* FOOTER（保持不变） */}
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