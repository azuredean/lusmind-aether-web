import { ArrowRight } from "lucide-react";

const PreFooterCTA = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-16 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-12">
          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-light leading-[1.15] text-[#2D2D2D]">
            Build With <span className="font-serif italic">{'{Proof}'}</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="#team"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-[#2D2D2D]/15 rounded-lg hover:border-[#2D2D2D]/30 hover:bg-[#F5F5F5] transition-all duration-300 text-[#2D2D2D]"
            >
              <span className="text-base">[ Talk to our Team ]</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            
            <a 
              href="#docs"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-[#2D2D2D]/15 rounded-lg hover:border-[#2D2D2D]/30 hover:bg-[#F5F5F5] transition-all duration-300 text-[#2D2D2D]"
            >
              <span className="text-base">[ Explore Documentation ]</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCTA;
