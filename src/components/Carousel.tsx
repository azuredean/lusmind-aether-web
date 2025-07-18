import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import lunbo1 from '@/assets/lunbo1.jpg';
import lunbo2 from '@/assets/lunbo2.jpg';

const slides = [
  {
    id: 1,
    image: lunbo1,
    title: 'Tropical Paradise',
    subtitle: 'Experience the exotic blend of tropical fruits',
    description: 'Premium e-liquid with mango, pineapple, and passion fruit flavors',
  },
  {
    id: 2,
    image: lunbo2,
    title: 'Berry Fusion',
    subtitle: 'Rich and vibrant berry symphony',
    description: 'Luxurious blend of strawberry, blueberry, and raspberry essences',
  },
];

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-vapor">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'transform translate-x-0' : 
            index < currentSlide ? 'transform -translate-x-full' : 'transform translate-x-full'
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-start p-8 md:p-12">
              <div className="max-w-lg text-white">
                <h3 className="cyber-title text-3xl md:text-4xl mb-4 neon-text animate-float">
                  {slide.title}
                </h3>
                <p className="text-xl md:text-2xl mb-4 font-medium">
                  {slide.subtitle}
                </p>
                <p className="text-lg mb-6 text-white/90">
                  {slide.description}
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-primary text-white glow-hover"
                >
                  Explore Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};