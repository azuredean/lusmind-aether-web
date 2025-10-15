import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlavorShowcaseProps {
  className?: string;
}

export const FlavorShowcase = ({ className = "" }: FlavorShowcaseProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const flavorImages = [
    "/lovable-uploads/b77eaea8-ddab-4e36-bd72-00ad857c4593.png", // Watermelon Strawberry
    "/lovable-uploads/bc1fc5de-0472-4e0b-99df-56017a874103.png", // Blueberry Raspberry  
    "/lovable-uploads/23243cbf-2d86-466f-a3cf-87cca5b21ebd.png", // Kiwi & Passion
    "/lovable-uploads/f2771975-4d08-4667-84d2-768cc835b7c4.png", // Peach Ice
    "/lovable-uploads/822f2f7d-7d53-4e3d-ae1d-58cd9bde0e71.png", // Mango Ice
    "/lovable-uploads/b4f62c5c-19f1-4a54-9493-2fc10fa9c157.png", // Watermelon Ice
    "/lovable-uploads/20d95ca4-7758-49d4-947c-f60e57bf7649.png", // Green Coconut
    "/lovable-uploads/a0e91021-c566-465f-b8ee-3199ed8babff.png", // Green Coconut alt
    "/lovable-uploads/e038dd85-abb1-4f83-a740-67ad5ddd3e05.png", // Niagara Grape
    "/lovable-uploads/175a9edd-1618-4c0e-9274-bd02344d1215.png", // Pineapple Coconut Ice
    "/lovable-uploads/921b58a6-5387-4f1d-a623-7fff0bc97de1.png", // Cool Yuzu Cedar
    "/lovable-uploads/e9ceb65c-4181-4594-93ba-05d6c587459e.png", // Melon Yogurt Ice
    "/lovable-uploads/abbd21c8-208e-4b40-97f2-9255fea9c770.png", // Green Apple
    "/lovable-uploads/9aae58b7-c0aa-4725-b4f7-37fbe4fea19b.png", // Arctic Ice
    "/lovable-uploads/ea4cfe6b-b1b0-448a-889e-768ca1c65908.png", // Cool Peppermint
    "/lovable-uploads/a897874d-dc7b-4680-8774-1140e6ce17a1.png", // Double Apple Shisha
    "/lovable-uploads/5018366c-93d6-45d8-9b6c-3a38dd9f4f73.png", // Coffee Tobacco
    "/lovable-uploads/73a6891b-a8cd-464b-be7c-15e6556a6aa2.png", // Tobacco & Nut
    "/lovable-uploads/91c3186a-70e4-42e6-bf1e-406deac7ce00.png", // Monster Drink
    "/lovable-uploads/8e9f2418-eb1b-4b3c-ae84-cff7bb4703d4.png", // Orange Soda
    "/lovable-uploads/a464032b-a094-456e-aea8-80e539a970c7.png", // Banana Nut
    "/lovable-uploads/2c4da2f8-6c14-4223-8fca-aa7669b8aaaf.png", // Creamy Rainbow Candy
    "/lovable-uploads/73b66ffd-7bd3-4323-a952-53d877270743.png", // Caramel Custard
    "/lovable-uploads/32b2624c-5528-43e0-b55d-9530d6790650.png", // Strawberry Cake
    "/lovable-uploads/a728bdcf-b0f3-480c-b8e9-692732f20769.png", // Cinnamon Apple Pie
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.clientWidth;
    
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed as needed

    const animate = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed;
        
        // Reset when we've scrolled past half the content (since we duplicate)
        if (scrollPosition >= scrollWidth / 2) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const scrollLeft = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className={`relative py-16 sm:py-20 lg:py-24 group ${className}`}>
      {/* Distinguished Flavor Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep purple to cyan gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-cyan-950"></div>
        
        {/* Multiple layered radial gradients for depth */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `
            radial-gradient(ellipse at 10% 30%, rgba(147,51,234,0.4) 0%, transparent 45%),
            radial-gradient(ellipse at 90% 70%, rgba(6,182,212,0.4) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 0%, rgba(14,165,233,0.3) 0%, transparent 40%)
          `
        }}></div>
        
        {/* Dynamic hexagonal pattern */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }}></div>
        
        {/* Flowing wave pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(147,51,234,0.1) 35px,
              rgba(147,51,234,0.1) 70px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 35px,
              rgba(6,182,212,0.1) 35px,
              rgba(6,182,212,0.1) 70px
            )
          `
        }}></div>
        
        {/* Enhanced floating particles with varied sizes */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/30 rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                filter: `hue-rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
        
        {/* Subtle moving light rays */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-purple-400 via-transparent to-transparent transform -skew-x-12 animate-pulse"></div>
          <div className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-cyan-400 via-transparent to-transparent transform skew-x-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#f0abfc] via-[#7dd3fc] to-[#c4b5fd] bg-clip-text text-transparent mb-4">
            Flavor Universe
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover our premium collection of artisanal flavors, each crafted with precision and innovation
          </p>
        </div>

        {/* Scrolling Flavor Images */}
        <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          {/* Gradient overlays for seamless edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
          
          {/* Navigation buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all hover:scale-110 shadow-lg border border-white/30 opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all hover:scale-110 shadow-lg border border-white/30 opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* Duplicate images for seamless loop */}
            {[...flavorImages, ...flavorImages].map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 relative group w-48 md:w-56"
              >
                <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/20">
                  <img
                    src={image}
                    alt={`Flavor ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};