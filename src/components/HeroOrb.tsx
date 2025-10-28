import heroProducts from "@/assets/hero-products.png";

const HeroOrb = () => {
  return (
    <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center overflow-visible">
      <img 
        src={heroProducts} 
        alt="LUSMIND Products" 
        className="w-full h-full object-contain animate-float scale-[1.5]"
      />
    </div>
  );
};

export default HeroOrb;
