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
    "/lovable-uploads/921b58a6-5387-4f1d-a623-7fff0bc97de1.png", // Cool Yuzu Cedar
    "/lovable-uploads/53f5cf2a-ecac-48ad-8337-b8b3541ccfdf.png", // Melon Yogurt Ice
    "/lovable-uploads/3cb41497-2b9b-4df6-a1e4-c7f7a12be98a.png", // Green Apple
    "/lovable-uploads/9aae58b7-c0aa-4725-b4f7-37fbe4fea19b.png", // Arctic Ice
    "/lovable-uploads/4f592c06-ebfc-442c-8d15-4d8e4784322b.png", // Cool Peppermint
    "/lovable-uploads/a897874d-dc7b-4680-8774-1140e6ce17a1.png", // Double Apple Shisha
    "/lovable-uploads/e9491a8b-aa43-417a-a791-55f8372600ec.png", // Coffee Tobacco
    "/lovable-uploads/73a6891b-a8cd-464b-be7c-15e6556a6aa2.png", // Tobacco & Nut
    "/lovable-uploads/01c651f5-7333-4759-97d0-e3a26c1d1c10.png", // Monster Drink
    "/lovable-uploads/cb774285-138a-4080-aa60-2b38edad96e3.png", // Orange Soda
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