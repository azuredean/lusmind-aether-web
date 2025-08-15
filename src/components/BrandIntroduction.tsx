// 顶部导入部分
import { useEffect, useState } from "react";

// 组件开始
export const BrandIntroduction = () => {
  const images = [
    "/lovable-uploads/270ea3d8-ed1d-4c0b-a551-522272098985.png",
    "/lovable-uploads/aab56795-13f6-4155-8918-13711e3072bf.png",
    "/lovable-uploads/d62f5e8b-c6a5-420f-bff2-00fb812524a5.png",
    "/lovable-uploads/3e6c4ccd-f656-4d22-96a4-12959d0b82a4.png",
    "/lovable-uploads/4e1450c1-8ee9-419d-b123-c06ef28ef2f1.png",
    "/lovable-uploads/d14bbf72-adf3-4672-b5aa-191e8d24802e.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // 自动播放逻辑
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="py-20 relative overflow-hidden bg-[hsl(var(--brand-dark))]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="cyber-title text-4xl md:text-5xl neon-text animate-float">
                Welcome to LusMind
              </h2>
              <p className="text-xl text-white/80">
                Where digital vapor meets unparalleled craftsmanship
              </p>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-white/90">
              <p>
                At LusMind, we transcend the boundaries between reality and dreams, 
                crafting premium e-liquid experiences that transport you to a world 
                of pure sensory bliss.
              </p>
              <p>
                Our vision is to create not just flavors, but entire digital universes 
                where every puff becomes a journey through carefully curated taste 
                landscapes, enhanced by cutting-edge technology and artisanal precision.
              </p>
              <p className="text-primary font-medium">
                "Innovation is our vapor, excellence is our essence."
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="cyber-title text-3xl neon-text mb-2">100+</div>
                <div className="text-sm text-white/60">Premium Flavors</div>
              </div>
              <div className="text-center">
                <div className="cyber-title text-3xl neon-text mb-2">50K+</div>
                <div className="text-sm text-white/60">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="cyber-title text-3xl neon-text mb-2">24/7</div>
                <div className="text-sm text-white/60">Quality Control</div>
              </div>
            </div>
          </div>

          {/* Product Carousel */}
          <div className="relative">
            <div className="aspect-[4/5] glass-panel rounded-3xl p-3 overflow-hidden">
              <div className="relative w-full h-full bg-black/20 rounded-2xl overflow-hidden flex items-center justify-center">
                <div
                  className="flex transition-transform duration-700 ease-in-out w-full h-full"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    width: `${images.length * 100}%`,
                  }}
                >
                  {images.map((src, i) => (
                    <div
                      key={i}
                      className="w-full h-full flex-shrink-0 flex items-center justify-center"
                    >
                      <img
                        src={src}
                        alt={`LusMind Slide ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 opacity-20">
        <div
          className="w-32 h-32 rounded-full bg-gradient-primary animate-drift"
          style={{ animationDuration: "12s" }}
        />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20">
        <div
          className="w-24 h-24 rounded-full bg-gradient-secondary animate-drift"
          style={{
            animationDuration: "15s",
            animationDirection: "reverse",
          }}
        />
      </div>
    </section>
  );
};
