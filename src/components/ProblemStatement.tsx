import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProblemStatement = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 bg-white">
      <div className={`container mx-auto max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Problem */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-light mb-8 text-[#2D2D2D] leading-[1.15]">
              Every advanced dApp faces an impossible trade-off
            </h2>
            <p className="text-base md:text-lg text-[#666666] leading-relaxed">
              Keep computations on-chain: trustless but severely limited. Move them off-chain: powerful but unverifiable.
            </p>
            <p className="text-base md:text-lg text-[#666666] leading-relaxed">
              Every complex application is forced to choose: stay simple enough to verify, or run it in the dark and ask users to trust you.
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-light mb-8 text-[#2D2D2D] leading-[1.15]">
              What if you didn't have to choose?
            </h2>
            <p className="text-base md:text-lg text-[#666666] leading-relaxed">
              Brevis allows you to run any computation off-chain with unlimited complexity, then prove it happened correctly with a tiny proof anyone can verify in milliseconds.
            </p>
            <p className="text-base md:text-lg text-[#666666] leading-relaxed">
              Advanced applications become both powerful and transparent. The impossible choice disappears.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemStatement;
