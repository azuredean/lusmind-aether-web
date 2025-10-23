import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";

const ProductFeatures = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 bg-[#F5F5F5]">
      <div className="container mx-auto max-w-7xl">
        <h2 className={`text-4xl md:text-6xl font-light text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-[#2D2D2D]`}>
          Two Solutions for<br />
          <span className="font-serif italic">{'{Verifiable Computing}'}</span>
        </h2>
        
        <div className="space-y-16">
          {/* Feature 01 */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="flex items-start gap-6 mb-6">
              <span className="text-lg font-light text-[#999999]">01</span>
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-light mb-6 text-[#2D2D2D]">
                  For Universal Computation: Pico zkVM
                </h3>
                <p className="text-sm md:text-base text-[#666666] mb-4 leading-relaxed">
                  The only modular zkVM achieving 99% real-time proving for current Ethereum blocks
                </p>
                <p className="text-base md:text-lg text-[#2D2D2D] leading-relaxed mb-8">
                  From financial calculations to blockchain validation, Pico's modular architecture integrates specialized coprocessors that deliver breakthrough performance. Our distributed multi-GPU clusters prove 45M gas Ethereum blocks in 6.9 seconds on average. With just 64 GPUs, we offer 3.4x better performance efficiency than any competing solution.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="inline-flex items-center gap-2 text-sm text-[#2D2D2D] hover:text-[#666666] transition-colors group">
                    [ Explore Pico ]
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 text-sm text-[#2D2D2D] hover:text-[#666666] transition-colors group">
                    [ View on Ethproofs ]
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 02 */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
            <div className="flex items-start gap-6 mb-6">
              <span className="text-lg font-light text-[#999999]">02</span>
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-light mb-6 text-[#2D2D2D]">
                  For Blockchain Intelligence: ZK Data Coprocessor
                </h3>
                <p className="text-base md:text-lg text-[#2D2D2D] leading-relaxed mb-8">
                  Query, aggregate, and analyze any historical blockchain data with cryptographic proofs. Turn the entire blockchain history into a verifiable database for your smart contracts.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="inline-flex items-center gap-2 text-sm text-[#2D2D2D] hover:text-[#666666] transition-colors group">
                    [ Learn More ]
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
