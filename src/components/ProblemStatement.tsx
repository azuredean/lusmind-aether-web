import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProblemStatement = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 lg:py-40 px-4 md:px-6 lg:px-16 bg-white relative">
      <div className={`container mx-auto max-w-5xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        {/* Centered Content */}
        <div className="text-center space-y-10 md:space-y-12 lg:space-y-16">
          {/* Problem */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-[#2D2D2D] leading-[1.4] max-w-3xl mx-auto px-4">
              Every advanced dApp faces an impossible trade-off
            </h2>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] text-[#666666] leading-relaxed max-w-2xl mx-auto px-4">
              Keep computations on-chain: trustless but severely limited. Move them off-chain: powerful but unverifiable.
            </p>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] text-[#666666] leading-relaxed max-w-2xl mx-auto px-4">
              Every complex application is forced to choose: stay simple enough to verify, or run it in the dark and ask users to trust you.
            </p>
          </div>

          {/* Visual Divider - Better responsive sizing */}
          <div className="py-12 md:py-16 lg:py-20 flex justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 opacity-30 blur-2xl rounded-full"></div>
              <div className="absolute inset-6 md:inset-8 bg-blue-500/20 backdrop-blur-sm" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
            </div>
          </div>

          {/* Solution */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-[#2D2D2D] leading-[1.4] max-w-3xl mx-auto px-4">
              What if you didn't have to choose?
            </h2>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] text-[#666666] leading-relaxed max-w-2xl mx-auto px-4">
              Brevis allows you to run any computation off-chain with unlimited complexity, then prove it happened correctly with a tiny proof anyone can verify in milliseconds.
            </p>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] text-[#666666] leading-relaxed max-w-2xl mx-auto px-4">
              Advanced applications become both powerful and transparent. The impossible choice disappears.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemStatement;
