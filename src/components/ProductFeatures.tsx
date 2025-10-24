import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductFeatures = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-light leading-[1.2] mb-2">
            Four Product Lines for
          </h2>
          <h2 className="text-4xl md:text-6xl font-light leading-[1.2]">
            <span className="italic font-serif bg-gradient-to-r from-[#8FF5FF] to-[#FFA4F3] bg-clip-text text-transparent">Every Vaping Style</span>
          </h2>
        </div>

        {/* Feature 1: Premium E-Liquids */}
        <div className={`mb-16 md:mb-24 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <span className="text-sm text-muted-foreground mb-3 block font-light">01</span>
            <h3 className="text-2xl md:text-3xl font-light mb-4 leading-tight">
              Premium E-Liquids
            </h3>
            <p className="text-base md:text-lg text-foreground font-medium mb-2">
              Crafted with pharmaceutical-grade ingredients for unmatched purity and flavor depth
            </p>
          </div>
          
          <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-4xl">
            From classic tobacco to exotic fruit blends, our premium e-liquids are meticulously formulated using only the finest ingredients. Every bottle undergoes rigorous quality control and flavor testing. Available in multiple nicotine strengths and VG/PG ratios to match your preferences perfectly.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="group border-[#2D2D2D]/20 hover:border-[#2D2D2D]/40 hover:bg-[#2D2D2D]/5" asChild>
              <a href="#eliquids" className="flex items-center gap-2">
                <span className="text-sm">[ Browse E-Liquids ]</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="outline" className="group border-[#2D2D2D]/20 hover:border-[#2D2D2D]/40 hover:bg-[#2D2D2D]/5" asChild>
              <a href="#flavors" className="flex items-center gap-2">
                <span className="text-sm">[ View All Flavors ]</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>

        {/* Feature 2: Disposable Vapes */}
        <div className={`mb-16 md:mb-24 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <span className="text-sm text-muted-foreground mb-3 block font-light">02</span>
            <h3 className="text-2xl md:text-3xl font-light mb-4 leading-tight">
              Disposable Vapes
            </h3>
            <p className="text-base md:text-lg text-foreground font-medium mb-2">
              Ultimate convenience with up to 5000 puffs of smooth, consistent flavor
            </p>
          </div>
          
          <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-4xl">
            Pre-filled and ready to use right out of the box. Our disposable vapes feature advanced mesh coil technology for superior vapor production and flavor consistency. Ultra-portable design with long-lasting battery ensures you never run out at the wrong moment. Perfect for travel or trying new flavors.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="group border-[#2D2D2D]/20 hover:border-[#2D2D2D]/40 hover:bg-[#2D2D2D]/5" asChild>
              <a href="#disposables" className="flex items-center gap-2">
                <span className="text-sm">[ Shop Disposables ]</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>

        {/* Feature 3: Cigarette-Like Vapes */}
        <div className={`mb-16 md:mb-24 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <span className="text-sm text-muted-foreground mb-3 block font-light">03</span>
            <h3 className="text-2xl md:text-3xl font-light mb-4 leading-tight">
              Cigarette-Like Vapes
            </h3>
            <p className="text-base md:text-lg text-foreground font-medium mb-2">
              Familiar form factor with cutting-edge vaping technology for seamless transition
            </p>
          </div>
          
          <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-4xl">
            Designed for smokers making the switch to vaping. Our cigarette-style devices replicate the authentic feel and draw resistance of traditional cigarettes while delivering clean, satisfying vapor. Discreet LED tip, lightweight design, and rechargeable battery make this the perfect choice for those seeking familiarity with innovation.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="group border-[#2D2D2D]/20 hover:border-[#2D2D2D]/40 hover:bg-[#2D2D2D]/5" asChild>
              <a href="#cigarette" className="flex items-center gap-2">
                <span className="text-sm">[ Discover Cigarette-Like ]</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>

        {/* Feature 4: Flavor Masters */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <span className="text-sm text-muted-foreground mb-3 block font-light">04</span>
            <h3 className="text-2xl md:text-3xl font-light mb-4 leading-tight">
              Flavor Masters
            </h3>
            <p className="text-base md:text-lg text-foreground font-medium mb-2">
              Premium pod systems engineered for flavor chasers and cloud enthusiasts
            </p>
          </div>
          
          <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-4xl">
            Our flagship line combines advanced temperature control, adjustable airflow, and precision-engineered pods to deliver the most intense and pure flavor experience. Magnetic pod connection, rapid charging, and leak-proof design. With 50+ compatible flavor pods, the Flavor Masters series gives you complete control over your vaping experience.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="group border-[#2D2D2D]/20 hover:border-[#2D2D2D]/40 hover:bg-[#2D2D2D]/5" asChild>
              <a href="#masters" className="flex items-center gap-2">
                <span className="text-sm">[ Explore Flavor Masters ]</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="outline" className="group border-[#2D2D2D]/20 hover:border-[#2D2D2D]/40 hover:bg-[#2D2D2D]/5" asChild>
              <a href="#guide" className="flex items-center gap-2">
                <span className="text-sm">[ Read Buying Guide ]</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductFeatures;
