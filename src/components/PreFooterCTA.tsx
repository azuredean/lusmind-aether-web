import { ArrowRight } from "lucide-react";

const PreFooterCTA = () => {
  return (
    <section className="py-32 md:py-40 px-6 md:px-16 bg-[#1A1A1A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white" />
        <div className="absolute right-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Left side - Title */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] text-white">
            Build With <span className="font-serif italic">{'{Proof}'}</span>
          </h2>
        </div>
        
        {/* Right side - CTAs */}
        <div className="flex flex-col gap-6 items-start md:absolute md:right-16 md:top-1/2 md:-translate-y-1/2">
          <a 
            href="#team"
            className="group inline-flex items-center gap-3 text-white hover:text-gray-300 transition-all duration-300"
          >
            <span className="text-sm">[ Talk to our Team ]</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          
          <a 
            href="#docs"
            className="group inline-flex items-center gap-3 text-white hover:text-gray-300 transition-all duration-300"
          >
            <span className="text-sm">[ Explore Documentation ]</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCTA;
