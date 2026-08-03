import exp1 from "@/assets/home/exp-1.jpg";
import exp2 from "@/assets/home/exp-2.jpg";
import exp3 from "@/assets/home/exp-3.jpg";
import exp4 from "@/assets/home/exp-4.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const experiences = [
  {
    image: exp1,
    title: "Daily Relaxation",
    description:
      "For morning coffee, lunch breaks and winding down after work with smooth, consistent satisfaction.",
  },
  {
    image: exp2,
    title: "Professional Settings",
    description:
      "Discreet, odorless options for busy professionals who need quick, convenient vaping on the go.",
  },
  {
    image: exp3,
    title: "Travel Companion",
    description:
      "TSA-friendly disposables and compact designs made for vacations, business trips and adventures.",
  },
  {
    image: exp4,
    title: "Social Experiences",
    description:
      "Share premium flavors with friends at gatherings, parties and outdoor events with variety packs.",
  },
];

const Experiences = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section ref={ref} id="use-cases" className="bg-cream">
      <div className="container mx-auto px-6 py-24 md:px-16 md:py-32">
        <div className="mb-14 text-center md:mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft">
            Occasions
          </span>
          <h2 className="mt-5 font-display uppercase text-4xl leading-[0.95] text-ink md:text-6xl">
            Vaping experiences
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {experiences.map((item, i) => (
            <article
              key={item.title}
              className={`group relative aspect-square overflow-hidden transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={item.image}
                alt={`${item.title} — LUSMIND vaping occasion`}
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="font-serif text-xl uppercase tracking-[0.06em] text-cream md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm font-mono text-[11px] leading-relaxed tracking-[0.05em] text-cream/75">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
