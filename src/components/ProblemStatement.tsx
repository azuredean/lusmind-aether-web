import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProblemStatement = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-32 md:py-40 px-6 md:px-16 bg-white relative">
      <div className={`container mx-auto max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        {/* Centered Content */}
        <div className="text-center space-y-12">
          {/* Problem */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-normal text-[#2D2D2D] leading-[1.4] max-w-2xl mx-auto">
              Every advanced dApp faces an impossible trade-off
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#666666] leading-relaxed max-w-xl mx-auto">
              Keep computations on-chain: trustless but severely limited. Move them off-chain: powerful but unverifiable.
            </p>
            <p className="text-[15px] md:text-[16px] text-[#666666] leading-relaxed max-w-xl mx-auto">
              Every complex application is forced to choose: stay simple enough to verify, or run it in the dark and ask users to trust you.
            </p>
          </div>

          {/* Visual Divider - Hexagon shape placeholder */}
          <div className="py-16 flex justify-center">
            <div className="w-48 h-48 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 opacity-30 blur-2xl rounded-full"></div>
              <div className="absolute inset-8 bg-blue-500/20 backdrop-blur-sm" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
            </div>
          </div>

          {/* Solution */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-normal text-[#2D2D2D] leading-[1.4] max-w-2xl mx-auto">
              What if you didn't have to choose?
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#666666] leading-relaxed max-w-xl mx-auto">
              Brevis allows you to run any computation off-chain with unlimited complexity, then prove it happened correctly with a tiny proof anyone can verify in milliseconds.
            </p>
            <p className="text-[15px] md:text-[16px] text-[#666666] leading-relaxed max-w-xl mx-auto">
              Advanced applications become both powerful and transparent. The impossible choice disappears.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemStatement;
