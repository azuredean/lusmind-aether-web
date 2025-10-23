import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    image: '/lovable-uploads/594f8c11-f444-45a5-8876-10bfc7569773.png',
    title: 'Blueberry Raspberry',
    subtitle: 'LUSMIND Premium Collection',
    description: 'Rich and vibrant berry symphony with luxurious blend of flavors',
    objectPosition: 'center 35%',
  },
  {
    id: 2,
    image: '/lovable-uploads/8d9f00ee-a2e7-47ae-80f5-d43c5ab0e4f2.png',
    title: 'Strawberry Watermelon',
    subtitle: 'LUSMIND Fruit Fusion',
    description: 'Premium e-liquid with tropical fruit and berry essences',
    objectPosition: 'center 40%',
  },
  {
    id: 3,
    image: '/lovable-uploads/classic-flavor.png',
    title: '经典风味永流传',
    subtitle: 'LUSMIND Classic Heritage',
    description: '传承经典口味，品味永恒魅力，每一口都是对经典的致敬',
    objectPosition: 'center 45%',
  },
  {
    id: 4,
    image: '/lovable-uploads/coffee-tobacco.png',
    title: 'Coffee Tobacco',
    subtitle: 'LUSMIND Premium Flavor',
    description: 'Rich coffee blend with smooth tobacco notes for sophisticated taste',
    objectPosition: 'center 40%',
  },
  {
    id: 5,
    image: '/lovable-uploads/tobacco-nut.png',
    title: 'Tobacco & Nut',
    subtitle: 'LUSMIND Premium Flavor',
    description: 'Smooth tobacco enhanced with roasted nut undertones',
    objectPosition: 'center 38%',
  },
  {
    id: 6,
    image: '/lovable-uploads/blueberry-raspberry.png',
    title: 'Blueberry Raspberry',
    subtitle: 'LUSMIND Cosmic Collection',
    description: 'Celestial berry fusion with cosmic flavor experience',
    objectPosition: 'center 42%',
  },
  {
    id: 7,
    image: '/lovable-uploads/niagra-grape.png',
    title: 'Niagra Grape',
    subtitle: 'LUSMIND Premium Flavor',
    description: 'Luscious grape essence inspired by nature\'s majesty',
    objectPosition: 'center 40%',
  },
  {
    id: 8,
    image: '/lovable-uploads/double-apple-shisha.png',
    title: 'Double Apple Shisha',
    subtitle: 'LUSMIND Shisha Collection',
    description: 'Authentic shisha flavor with dual apple harmony',
    objectPosition: 'center 40%',
  },
  {
    id: 9,
    image: '/lovable-uploads/lusmind-mountain-adventure.png',
    title: 'Adventure Awaits',
    subtitle: 'LUSMIND Outdoor Collection',
    description: 'Your perfect companion for mountain adventures and outdoor exploration',
    objectPosition: 'center',
  },
  {
    id: 10,
    image: '/lovable-uploads/lusmind-indoor-elegance.png',
    title: 'Indoor Elegance',
    subtitle: 'LUSMIND Premium Lifestyle',
    description: 'Sophisticated design that complements your modern living space',
    objectPosition: 'center',
  },
  {
    id: 11,
    image: '/lovable-uploads/lusmind-city-night.png',
    title: 'Urban Lifestyle',
    subtitle: 'LUSMIND City Collection',
    description: 'Experience premium vaping in the heart of the metropolitan night',
    objectPosition: 'center',
  },
  {
    id: 12,
    image: '/lovable-uploads/lusmind-yacht-sunset.png',
    title: 'Luxury Moments',
    subtitle: 'LUSMIND Exclusive Collection',
    description: 'Elevate your experience with luxury vaping at sunset on the sea',
    objectPosition: 'center',
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
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl shadow-vapor">

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
              style={{ objectPosition: slide.objectPosition || 'center' }}
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-start px-4 md:px-8 lg:px-12 py-6 md:py-8">
              <div className="max-w-lg text-white">
                <h3 className="cyber-title text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-4 neon-text animate-float">
                  {slide.title}
                </h3>
                <p className="text-base md:text-xl lg:text-2xl mb-2 md:mb-4 font-medium">
                  {slide.subtitle}
                </p>
                <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6 text-white/90">
                  {slide.description}
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-primary text-white glow-hover h-11 md:h-12 px-6 md:px-8 text-sm md:text-base"
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
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors min-w-[44px] min-h-[44px]"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors min-w-[44px] min-h-[44px]"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>


      {/* Dots indicator */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-white/40'
            }`} />
          </button>
        ))}
      </div>

    </div>
  );
};