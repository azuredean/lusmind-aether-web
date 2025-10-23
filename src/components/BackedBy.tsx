import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const BackedBy = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 bg-[#F5F5F5]">
      <div className="container mx-auto max-w-7xl">
        <h2 className={`text-4xl md:text-6xl font-light text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-[#2D2D2D]`}>
          Backed By
        </h2>
        
        {/* Lead Investors */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
          <h3 className="text-lg font-light text-[#999999] mb-8">Lead Investors</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((item, index) => (
              <div
                key={index}
                className="aspect-[2/1] border border-[#E0E0E0] rounded-2xl bg-white hover:border-[#2D2D2D]/20 hover:shadow-lg transition-all duration-300 flex items-center justify-center group cursor-pointer"
              >
                <span className="text-2xl font-light text-[#999999] group-hover:text-[#2D2D2D] transition-colors">
                  {String(item).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* More Investors */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
          <h3 className="text-lg font-light text-[#999999] mb-8">More Investors</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[3, 4, 5, 6, 7].map((item, index) => (
              <div
                key={index}
                className="aspect-square border border-[#E0E0E0] rounded-2xl bg-white hover:border-[#2D2D2D]/20 hover:shadow-lg transition-all duration-300 flex items-center justify-center group cursor-pointer"
              >
                <span className="text-xl font-light text-[#999999] group-hover:text-[#2D2D2D] transition-colors">
                  {String(item).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackedBy;
