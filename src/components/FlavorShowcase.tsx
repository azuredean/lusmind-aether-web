import { useEffect, useRef } from 'react';

interface FlavorShowcaseProps {
  className?: string;
}

export const FlavorShowcase = ({ className = "" }: FlavorShowcaseProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const flavorImages = [
    "/lovable-uploads/b77eaea8-ddab-4e36-bd72-00ad857c4593.png", // Watermelon Strawberry
    "/lovable-uploads/79bd44ad-e23f-46d1-b082-b0650da3cded.png", // Blueberry Raspberry  
    "/lovable-uploads/23243cbf-2d86-466f-a3cf-87cca5b21ebd.png", // Kiwi & Passion
    "/lovable-uploads/74671bf2-71a5-47ae-9b1d-aa4a3112e105.png", // Peach Ice
    "/lovable-uploads/578dd4b5-9ba4-4a5e-b999-0bfb42dd36c3.png", // Mango Ice
    "/lovable-uploads/efcafea6-322e-4eb0-b4b0-31c3047723fd.png", // Watermelon Ice
    "/lovable-uploads/20d95ca4-7758-49d4-947c-f60e57bf7649.png", // Green Coconut
    "/lovable-uploads/a0e91021-c566-465f-b8ee-3199ed8babff.png", // Green Coconut alt
    "/lovable-uploads/1bf097ab-a34c-4cba-aa4d-edd263ee34ad.png", // Niagara Grape
    "/lovable-uploads/ce14503d-968f-4db5-97a4-1fea5155b9b2.png", // Pineapple Coconut Ice
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.clientWidth;
    
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed as needed

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset when we've scrolled past half the content (since we duplicate)
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className={`relative py-16 sm:py-20 lg:py-24 ${className}`}>
      {/* 3D Mesh Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950"></div>
        
        {/* 3D Curved Mesh Effect */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(168,85,247,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(56,189,248,0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 70%, rgba(139,92,246,0.2) 0%, transparent 60%)
          `
        }}></div>
        
        {/* Animated mesh grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center bottom'
        }}></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
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
        <div className="relative">
          {/* Gradient overlays for seamless edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
          
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* Duplicate images for seamless loop */}
            {[...flavorImages, ...flavorImages].map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 relative group"
                style={{ width: '300px', height: '200px' }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/20">
                  <img
                    src={image}
                    alt={`Flavor ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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