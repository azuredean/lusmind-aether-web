import iconDailyRelaxation from "@/assets/icon-daily-relaxation.png";
import iconProfessional from "@/assets/icon-professional.png";
import iconTravel from "@/assets/icon-travel.png";
import iconSocial from "@/assets/icon-social.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const experiences = [
  {
    icon: iconDailyRelaxation,
    title: "Daily Relaxation",
    description:
      "For morning coffee, lunch breaks and winding down after work with smooth, consistent satisfaction.",
  },
  {
    icon: iconProfessional,
    title: "Professional Settings",
    description:
      "Discreet, odorless options for busy professionals who need quick, convenient vaping on the go.",
  },
  {
    icon: iconTravel,
    title: "Travel Companion",
    description:
      "TSA-friendly disposables and compact designs made for vacations, business trips and adventures.",
  },
  {
    icon: iconSocial,
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

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-px bg-ink/10 md:grid-cols-2">
          {experiences.map((item, i) => (
            <div
              key={item.title}
              className={`bg-cream p-10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img src={item.icon} alt="" className="h-12 w-12 object-contain" />
              <h3 className="mt-6 font-serif text-xl uppercase tracking-[0.06em] text-ink">
                {item.title}
              </h3>
              <p className="mt-4 font-mono text-xs leading-relaxed tracking-[0.05em] text-ink-soft">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
