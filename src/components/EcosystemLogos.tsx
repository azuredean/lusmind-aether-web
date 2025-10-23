const ecosystemPartners = [
  "PancakeSwap",
  "Algebra",
  "QuickSwap",
  "THENA",
  "OpenEden",
  "Usual",
  "Kernel",
  "Bedrock",
  "Polygon",
  "Avalanche",
  "BNB Chain",
  "Ethereum",
  "Arbitrum",
  "Optimism",
];

const EcosystemLogos = () => {
  return (
    <section className="py-20 md:py-24 px-6 bg-[#F5F5F5] relative overflow-hidden border-t border-[#E0E0E0]">
      <div className="container mx-auto max-w-7xl">
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#F5F5F5] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#F5F5F5] to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="flex gap-8 md:gap-12 animate-scroll">
            {[...ecosystemPartners, ...ecosystemPartners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-5 border border-[#E0E0E0]/60 bg-white/50 rounded-xl hover:border-[#2D2D2D]/20 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-sm group"
              >
                <span className="text-sm md:text-base font-normal whitespace-nowrap text-[#666666] group-hover:text-[#2D2D2D] transition-colors">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemLogos;
