import heroProducts from "@/assets/hero-products.png";

const HeroOrb = () => {
  return (
    <div
      className="
        relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]
        overflow-visible self-center
        md:-translate-y-10 lg:-translate-y-16
        flex items-center justify-center
      "
    >
      <img
        src={heroProducts}
        alt="LUSMIND Products"
        className="w-full h-full object-contain scale-[1.3] animate-float -translate-y-8"
      />
    </div>
  );
};

export default HeroOrb;
