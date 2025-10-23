import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";

const ProductFeatures = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 md:py-24 lg:py-32 px-4 md:px-6 lg:px-16 bg-[#F5F5F5] relative">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 md:mb-20 lg:mb-24">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-light text-left mb-1 md:mb-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-[#2D2D2D]`}>
            Two Solutions for
          </h2>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-light text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-[#2D2D2D]`} style={{ transitionDelay: '0.1s' }}>
            <span className="font-serif italic">{'{Verifiable Computing}'}</span>
          </h2>
        </div>

        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {/* Feature 01 - Better responsive grid */}
          <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#2D2D2D] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs md:text-sm font-normal text-[#2D2D2D]">01</span>
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-normal text-[#2D2D2D]">
                  For Universal Computation: <span className="italic font-serif">Pico zkVM</span>
                </h3>
              </div>
              <p className="text-[12px] md:text-[13px] lg:text-[14px] text-[#999999] mb-3 md:mb-4 leading-relaxed">
                The only modular zkVM achieving 99% real-time proving for current Ethereum blocks
              </p>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] text-[#2D2D2D] leading-relaxed mb-4 md:mb-6">
                From financial calculations to blockchain validation, Pico's modular architecture integrates specialized coprocessors that deliver breakthrough performance. Our distributed multi-GPU clusters prove 45M gas Ethereum blocks in 6.9 seconds on average. With just 64 GPUs, we offer 3.4x better performance efficiency than any competing solution.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <a href="#" className="inline-flex items-center gap-2 text-[12px] md:text-[13px] text-[#2D2D2D] hover:text-[#666666] transition-colors group">
                  [ Explore Pico ]
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#" className="inline-flex items-center gap-2 text-[12px] md:text-[13px] text-[#2D2D2D] hover:text-[#666666] transition-colors group">
                  [ View on Ethproofs ]
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            {/* Right side - Illustration placeholder */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-56 h-56 xl:w-64 xl:h-64">
                <div className="absolute inset-0 grid grid-cols-3 gap-3 md:gap-4">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="relative" style={{ gridColumn: i === 6 ? '2' : 'auto' }}>
                      <div className="w-full aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg transform hover:scale-105 transition-transform"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature 02 */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#2D2D2D] flex items-center justify-center flex-shrink-0">
                <span className="text-xs md:text-sm font-normal text-[#2D2D2D]">02</span>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-normal text-[#2D2D2D]">
                For Blockchain Intelligence: <span className="italic font-serif">ZK Data Coprocessor</span>
              </h3>
            </div>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] text-[#2D2D2D] leading-relaxed mb-4 md:mb-6 max-w-4xl">
              Query, aggregate, and analyze any historical blockchain data with cryptographic proofs. Turn the entire blockchain history into a verifiable database for your smart contracts.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <a href="#" className="inline-flex items-center gap-2 text-[12px] md:text-[13px] text-[#2D2D2D] hover:text-[#666666] transition-colors group">
                [ Learn More ]
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
