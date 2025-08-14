import { useState, useEffect } from 'react';

interface ProductSlide {
  id: number;
  title: string;
  subtitle: string;
  gradient: string;
}

const slides: ProductSlide[] = [
  {
    id: 1,
    title: "Blueberry Raspberry",
    subtitle: "luminous, cool finish",
    gradient: "linear-gradient(135deg, #a855f7, #7c3aed)"
  },
  {
    id: 2,
    title: "Strawberry Watermelon", 
    subtitle: "bright & layered",
    gradient: "linear-gradient(135deg, #0ea5e9, #22d3ee)"
  },
  {
    id: 3,
    title: "Cyber Citrus",
    subtitle: "zingy, clean fade", 
    gradient: "linear-gradient(135deg, #f59e0b, #ec4899)"
  },
  {
    id: 4,
    title: "Midnight Mint",
    subtitle: "silky & crisp",
    gradient: "linear-gradient(135deg, #10b981, #3b82f6)"
  }
];

export const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3600);

    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative">
      <div className="bg-white/6 border border-white/10 rounded-3xl p-6 backdrop-blur-sm aspect-[4/5]">
        <div className="relative w-full h-full rounded-2xl p-3 flex items-center justify-center overflow-hidden">
          {/* Track */}
          <div 
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                <div 
                  className="relative w-full h-full rounded-2xl flex items-center justify-center text-white text-center shadow-inner"
                  style={{ 
                    background: slide.gradient,
                    boxShadow: 'inset 0 0 60px rgba(0,0,0,0.25)'
                  }}
                >
                  <div className="absolute inset-0 opacity-12 rounded-2xl"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 30% 30%, #fff 0, transparent 40%),
                        radial-gradient(circle at 70% 70%, #fff 0, transparent 45%)
                      `
                    }}
                  />
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black tracking-wider mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-sm opacity-90">{slide.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button 
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors"
            aria-label="Previous"
          >
            ‹
          </button>
          
          <button 
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors"
            aria-label="Next"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'w-8 bg-white/85' 
                    : 'w-6 bg-white/25'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};