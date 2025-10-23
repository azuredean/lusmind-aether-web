import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProblemStatement = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 bg-background">
      <div className={`container mx-auto max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Problem */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-light mb-6 text-foreground leading-[1.2]">
              Every vaper faces an impossible choice
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Choose disposables: convenient but wasteful. Choose refillables: economical but complicated.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Every vaping experience forces you to compromise: embrace simplicity with guilt, or juggle complexity for sustainability.
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-light mb-6 text-foreground leading-[1.2]">
              What if you could have both?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              LUSMIND delivers premium vaping with zero compromises. Pure flavors, lasting satisfaction, and elegant design that fits seamlessly into your lifestyle.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Advanced technology meets sustainable practices. The impossible choice disappears.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemStatement;
