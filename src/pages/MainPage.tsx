import { useEffect, useMemo, useRef, useState } from "react";
import { AgeVerification } from "@/components/AgeVerification";
import { FlavorShowcase } from "@/components/FlavorShowcase";

/** ---------------------------
 *  Carousel (fade) with preload
 *  --------------------------- */
type Slide = { title: string; desc: string; image: string };

const SLIDES: Slide[] = [
  {
    title: "Blueberry Raspberry",
    desc: "Rich berry symphony",
    image: "/lovable-uploads/f039a0fd-82f1-4eae-9d88-b830264a99a3.png",
  },
  {
    title: "Niagara Grape",
    desc: "Elegant vine essence",
    image: "/lovable-uploads/959a431e-f709-4b2d-9a0f-9f905d19551d.png",
  },
  {
    title: "Mixed Berry",
    desc: "Complex fruit blend",
    image: "/lovable-uploads/4f147d90-2fc6-4c41-9be9-2363c855074e.png",
  },
  {
    title: "Niagara Grape Premium",
    desc: "Refined grape fusion",
    image: "/lovable-uploads/72278a75-20ef-4099-b2ba-bc8797a1925d.png",
  },
  {
    title: "Orange Soda",
    desc: "Citrus laboratory creation",
    image: "/lovable-uploads/54bad1ca-7e85-4325-b562-62f84b384ea3.png",
  },
];

/** 预加载指定 url，返回 Promise，成功/失败都 resolve，避免阻塞 */
function preload(url: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

/** 单个 slide：absolute 层，淡入淡出 */
function FadeSlide({
  slide,
  active,
  index,
  onImageError,
}: {
  slide: Slide;
  active: boolean;
  index: number;
  onImageError?: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-600 ease-out will-change-opacity
                  ${active ? "opacity-100 z-20" : "opacity-0 z-10"}`}
      aria-hidden={!active}
    >
      {/* 背景容器（保证尺寸稳定） */}
      <div className="w-full h-full relative flex items-center justify-center bg-black/25">
        {/* 占位（加载/错误） */}
        {!loaded && (
          <div className="absolute inset-6 rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 grid place-items-center">
            <div className="text-center space-y-2">
              {errored ? (
                <>
                  <div className="w-8 h-8 bg-red-500/20 rounded-full grid place-items-center mx-auto">
                    <span className="text-red-400 text-sm">✕</span>
                  </div>
                  <p className="text-red-400/80 text-sm">Image failed to load</p>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto" />
                  <p className="text-white/70 text-sm">Loading...</p>
                </>
              )}
            </div>
          </div>
        )}

        <img
          src={slide.image}
          alt={slide.title}
          className={`max-w-full max-h-full object-contain rounded-2xl transition-opacity duration-300
                      ${loaded ? "opacity-100" : "opacity-0"}`}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={index === 0 ? ("high" as any) : "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setErrored(true);
            setLoaded(true);
            onImageError?.();
          }}
        />

        {/* 轻量叠层与文字 */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/0" />
        <div className="absolute bottom-4 left-0 right-0 text-center px-4 select-none">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold drop-shadow-xl">
            {slide.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/85 drop-shadow">{slide.desc}</p>
        </div>
      </div>
    </div>
  );
}

export const MainPage = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);

  // --- Carousel state ---
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;
  const intervalMs = 5000;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 预加载：首屏 + 前后相邻，避免切换闪烁
  const preloadQueue = useMemo(() => {
    const prev = (current - 1 + total) % total;
    const next = (current + 1) % total;
    return [SLIDES[current].image, SLIDES[next].image, SLIDES[prev].image];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, total]);

  useEffect(() => {
    let alive = true;
    (async () => {
      for (const url of preloadQueue) {
        if (!alive) break;
        await preload(url);
      }
    })();
    return () => {
      alive = false;
    };
  }, [preloadQueue]);

  // 自动播放（可见性/悬停暂停）
  const start = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(
      () => setCurrent((i) => (i + 1) % total),
      intervalMs
    );
  };
  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  useEffect(() => {
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // 悬停暂停
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const enter = () => stop();
    const leave = () => start();
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  const go = (i: number) => setCurrent(i);
  const prev = () => setCurrent((n) => (n - 1 + total) % total);
  const next = () => setCurrent((n) => (n + 1) % total);

  // 年龄验证：从首页进入总是显示
  useEffect(() => {
    setShowAgeVerification(true);
  }, []);
  const handleAgeVerified = () => {
    sessionStorage.setItem("ageVerified", "true");
    setShowAgeVerification(false);
  };
  const handleAgeRejected = () => {
    sessionStorage.removeItem("ageVerified");
    window.location.href = "https://www.google.com";
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white relative overflow-hidden"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      {/* 背景 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* 年龄验证（最高层） */}
      {showAgeVerification && (
        <div style={{ position: "relative", zIndex: 10000 }}>
          <AgeVerification
            onVerified={handleAgeVerified}
            onReject={handleAgeRejected}
          />
        </div>
      )}

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute opacity-40 animate-pulse"
              style={{
                inset: "-30%",
                filter: "blur(60px)",
                background: `
                  radial-gradient(circle at 25% 20%, rgba(168,85,247,0.25), transparent 70%),
                  radial-gradient(circle at 80% 25%, rgba(56,189,248,0.25), transparent 70%),
                  radial-gradient(circle at 55% 85%, rgba(139,92,246,0.20), transparent 80%),
                  radial-gradient(circle at 10% 90%, rgba(236,72,153,0.15), transparent 60%)
                `,
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
                  radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px, 40px 40px, 20px 20px",
              }}
            />
            <div className="absolute inset-4 border border-white/5 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-white/[0.02] to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
            {/* 简化导航 */}
            <nav className="flex items-center justify-between py-6 mb-12">
              <a
                href="#top"
                className="font-black tracking-[4px] text-xl bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent"
              >
                LUSMIND
              </a>
              <div className="hidden md:flex gap-6 text-white/80">
                <button onClick={() => scrollTo("products")} className="hover:text-white">
                  Products
                </button>
                <button onClick={() => scrollTo("verify")} className="hover:text-white">
                  Verify
                </button>
                <button onClick={() => scrollTo("subscribe")} className="hover:text-white">
                  Subscribe
                </button>
              </div>
            </nav>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* 文案 */}
              <div className="text-left space-y-6">
                <p className="text-xs sm:text-sm tracking-[0.28em] text-white/60 uppercase">
                  Digital Vapor • Future Flavors
                </p>
                <h1 className="font-black leading-[0.9] text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent">
                  Welcome to <br className="hidden sm:block" />
                  LusMind
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-xl">
                  We craft digital-forward flavors with artisanal precision, distilling
                  complex ideas into simple, elegant sensations.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="px-4 py-2 rounded-full bg-purple-500/15 text-purple-200 text-sm border border-purple-400/30">
                    Premium Quality
                  </span>
                  <span className="px-4 py-2 rounded-full bg-sky-500/15 text-sky-200 text-sm border border-sky-400/30">
                    Lab Tested
                  </span>
                  <span className="px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-200 text-sm border border-emerald-400/30">
                    Authentic
                  </span>
                </div>
              </div>

              {/* 轮播（fade） */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-75" />

                <div className="relative rounded-3xl p-3 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/20">
                  <div
                    ref={containerRef}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/50 to-gray-900/50"
                    style={{ aspectRatio: "4 / 5" }}
                    aria-roledescription="carousel"
                  >
                    {/* 所有 slides 绝对定位叠放，切换只改透明度 */}
                    {SLIDES.map((s, i) => (
                      <FadeSlide
                        key={i}
                        slide={s}
                        index={i}
                        active={i === current}
                      />
                    ))}

                    {/* 导航 */}
                    <button
                      onClick={prev}
                      aria-label="Previous slide"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/30 grid place-items-center"
                    >
                      ‹
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next slide"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/30 grid place-items-center"
                    >
                      ›
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                      {SLIDES.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => go(i)}
                          aria-label={`Go to slide ${i + 1}`}
                          aria-current={i === current}
                          className={`h-2 rounded-full transition-all ${
                            i === current
                              ? "w-8 bg-gradient-to-r from-purple-400 to-blue-400 shadow"
                              : "w-6 bg-white/35 hover:bg-white/60"
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

        {/* 产品/介绍区（保持不动） */}
        <section id="products" className="relative py-16 sm:py-24 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/80 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-blue-900/5" />
          <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
            {/* 这里可继续你的内容… */}
          </div>
        </section>

        {/* 展示区 */}
        <FlavorShowcase />

        {/* 验证/订阅/页脚保持原有结构或按需精简… */}
        <section id="subscribe" className="relative py-16 sm:py-24 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20" />
          <div className="relative z-10 max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent uppercase tracking-wide">
              Subscribe for More Updates
            </h2>
            <p className="text-white/80 text-lg mt-3">
              Stay updated with our latest products and exclusive promotions instantly!
            </p>
            <form
              className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto]"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const email = String(fd.get("email") || "");
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  alert("Please enter a valid email address.");
                  return;
                }
                alert("Subscribed!");
                (e.currentTarget as HTMLFormElement).reset();
              }}
            >
              <input
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-white placeholder-white/60 outline-none"
              />
              <button className="rounded-2xl px-8 py-4 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-500">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </section>

        <footer className="relative py-14">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-950 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-transparent to-blue-950/20" />
          <div className="relative z-10 max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-white">WARNING:</strong> This product contains chemicals, including nicotine…
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 text-white/60 text-sm">
              © {new Date().getFullYear()} LusMind. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};