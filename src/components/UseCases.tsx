import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const UseCases = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 bg-white">
      <div className="container mx-auto max-w-7xl">
        <h2 className={`text-4xl md:text-6xl font-light text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-[#2D2D2D]`}>
          Use Cases
        </h2>
        
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <div
              key={index}
              className="aspect-square border border-[#E0E0E0] rounded-2xl bg-white hover:border-[#2D2D2D]/20 hover:shadow-lg transition-all duration-300 flex items-center justify-center group cursor-pointer"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F5F5F5] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl md:text-3xl font-light text-[#999999] group-hover:text-[#2D2D2D] transition-colors">
                  {String(item).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
