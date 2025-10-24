import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PreFooterCTA = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-16 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-12">
          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-light leading-[1.2]">
            Experience <span className="italic font-serif bg-gradient-to-r from-[#8FF5FF] to-[#FFA4F3] bg-clip-text text-transparent">LUSMIND</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="outline" 
              size="lg"
              className="group border-[#2D2D2D]/20 hover:border-[#2D2D2D]/40 hover:bg-[#2D2D2D]/5 transition-all duration-300"
            >
              <span className="text-base">[ Contact Our Team ]</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="group border-[#2D2D2D]/20 hover:border-[#2D2D2D]/40 hover:bg-[#2D2D2D]/5 transition-all duration-300"
            >
              <span className="text-base">[ Browse Catalog ]</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="group border-[#2D2D2D]/20 hover:border-[#2D2D2D]/40 hover:bg-[#2D2D2D]/5 transition-all duration-300"
            >
              <span className="text-base">[ Join VIP Club ]</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCTA;
