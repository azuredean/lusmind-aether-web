import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import eliquidImage from "@/assets/home/line-eliquid.jpg";
import disposableImage from "@/assets/home/line-disposable.jpg";
import ngImage from "@/assets/home/line-ng.jpg";

const lines = [
  {
    index: "01",
    title: "Premium E-Liquids",
    image: eliquidImage,
    body:
      "Pharmaceutical-grade ingredients and European flavor compounds, formulated for purity and depth. Available in multiple nicotine strengths and VG/PG ratios.",
    cta: "Browse E-Liquids",
    href: "/e-liquid",
  },
  {
    index: "02",
    title: "Disposable Vapes",
    image: disposableImage,
    body:
      "Pre-filled, ready out of the box, with mesh coil technology for consistent flavor and up to 40,000 puffs of long-lasting battery life.",
    cta: "Shop Disposables",
    href: "/disposable",
  },
  {
    index: "03",
    title: "NG-Cigarette",
    image: ngImage,
    body:
      "Engineered for smokers making the switch — precise extraction techniques restore the familiar classic tobacco profile with modern innovation.",
    cta: "Discover NG-Cigarette",
    href: "/e-cigarette",
  },
];

const ProductLines = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="lines" className="bg-cream">
      <div className="container mx-auto px-6 py-24 md:px-16 md:py-32">
        <div className="mb-16 text-center md:mb-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft">
            Three Lines
          </span>
          <h2 className="mt-5 font-display uppercase text-4xl leading-[0.95] text-ink md:text-6xl">
            One standard
            <br />
            of craft.
          </h2>
        </div>

        <div className="space-y-20 md:space-y-32">
          {lines.map((line, i) => (
            <div
              key={line.title}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-20 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={line.image}
                    alt={`${line.title} by LUSMIND`}
                    width={1536}
                    height={1152}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft">
                  {line.index}
                </span>
                <h3 className="mt-4 font-serif text-3xl uppercase leading-tight text-ink md:text-4xl">
                  {line.title}
                </h3>
                <p className="mt-6 max-w-md font-mono text-xs leading-relaxed tracking-[0.05em] text-ink-soft">
                  {line.body}
                </p>
                <a
                  href={line.href}
                  className="mt-8 inline-block bg-ink px-8 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-cream transition-colors hover:bg-ink/85"
                >
                  {line.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductLines;
