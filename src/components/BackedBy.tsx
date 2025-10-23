import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const BackedBy = () => {
  const { ref, isVisible } = useScrollAnimation();

  const leadInvestors = [
    { name: "Horizon Ventures", position: "01" },
    { name: "Summit Partners", position: "02" },
  ];

  const moreInvestors = [
    "Atlantic Capital",
    "Pacific Growth",
    "Vertex Holdings",
    "Redwood Ventures",
    "Pinnacle Group",
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className={`mb-16 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-light leading-[1.2]">
            Trusted By Industry Leaders
          </h2>
        </div>

        {/* Lead Investors */}
        <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl md:text-2xl font-light mb-8 text-muted-foreground">Lead Partners</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadInvestors.map((investor) => (
              <div
                key={investor.name}
                className="p-12 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="text-5xl md:text-6xl font-light text-muted-foreground/20 mb-4 group-hover:text-accent/30 transition-colors">
                  {investor.position}
                </div>
                <h4 className="text-xl md:text-2xl font-light">{investor.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* More Investors */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl md:text-2xl font-light mb-8 text-muted-foreground">Strategic Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {moreInvestors.map((investor, index) => (
              <div
                key={investor}
                className="p-8 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 hover:shadow-xl group flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-muted-foreground/20 mb-2 group-hover:text-accent/30 transition-colors">
                    {String(index + 3).padStart(2, '0')}
                  </div>
                  <h4 className="text-sm font-light">{investor}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackedBy;
