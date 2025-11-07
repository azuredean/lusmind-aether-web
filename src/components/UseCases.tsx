import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import iconDailyRelaxation from "@/assets/icon-daily-relaxation.png";
import iconProfessional from "@/assets/icon-professional.png";
import iconTravel from "@/assets/icon-travel.png";
import iconSocial from "@/assets/icon-social.png";

const useCases = [{
  icon: iconDailyRelaxation,
  title: "Daily Relaxation",
  description: "Perfect for your morning coffee, lunch breaks, or winding down after work with smooth, consistent satisfaction",
  link: "#daily"
}, {
  icon: iconProfessional,
  title: "Professional Settings",
  description: "Discreet, odorless options ideal for busy professionals who need quick, convenient vaping on the go",
  link: "#professional"
}, {
  icon: iconTravel,
  title: "Travel Companion",
  description: "TSA-friendly disposables and compact designs perfect for vacations, business trips, and adventures",
  link: "#travel"
}, {
  icon: iconSocial,
  title: "Social Experiences",
  description: "Share premium flavors with friends at gatherings, parties, or outdoor events with our variety packs",
  link: "#social"
}];
const UseCases = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation({
    threshold: 0.2
  });
  return <section id="use-cases" className="py-24 md:py-32 px-6 md:px-16 bg-background" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <div className={`mb-12 md:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl md:text-6xl font-light leading-[1.2]">
            Vaping Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => {
          return <div key={index} className={`group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{
            transitionDelay: `${index * 150}ms`
          }}>
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  <img src={useCase.icon} alt={useCase.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground mb-4">{useCase.description}</p>
                
              </div>;
        })}
        </div>
      </div>
    </section>;
};
export default UseCases;