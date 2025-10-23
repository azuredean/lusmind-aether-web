import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const BackedBy = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 bg-white border-t border-[#E0E0E0]">
      <div className="container mx-auto max-w-7xl">
        <h2 className={`text-3xl md:text-4xl font-normal text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-[#2D2D2D]`}>
          Backed By
        </h2>
        
        {/* Lead Investors */}
        <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
          <div className="border-b border-[#E0E0E0] pb-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-sm italic text-[#999999]">Lead Investors</span>
              <div className="flex gap-8">
                <span className="text-sm text-[#999999]">01</span>
                <span className="text-sm text-[#999999]">02</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex items-center justify-center py-12 hover:opacity-80 transition-opacity cursor-pointer">
              <span className="text-xl md:text-2xl font-bold tracking-wider text-[#2D2D2D]">POLYCHAIN<br/>CAPITAL</span>
            </div>
            <div className="flex items-center justify-center py-12 hover:opacity-80 transition-opacity cursor-pointer">
              <span className="text-xl md:text-2xl font-bold tracking-wider" style={{ color: '#F4A522' }}>Y2LABS</span>
            </div>
          </div>
        </div>

        {/* More Investors */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
          <div className="border-b border-[#E0E0E0] pb-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-sm italic text-[#999999]">More Investors</span>
              <div className="flex gap-8">
                <span className="text-sm text-[#999999]">03</span>
                <span className="text-sm text-[#999999]">04</span>
                <span className="text-sm text-[#999999]">05</span>
                <span className="text-sm text-[#999999]">06</span>
                <span className="text-sm text-[#999999]">07</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {['NOMAD\nCAPITAL', '1955', 'BANKLESS\nVENTURES', 'HASHKEY', 'SEMICLABEL'].map((name, index) => (
              <div key={index} className="flex items-center justify-center py-8 hover:opacity-80 transition-opacity cursor-pointer">
                <span className="text-sm md:text-base font-bold tracking-wide text-[#2D2D2D] whitespace-pre-line text-center">
                  {name}
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
