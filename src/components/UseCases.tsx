import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const UseCases = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-16 bg-white">
      <div className="container mx-auto max-w-7xl">
        <h2 className={`text-3xl md:text-4xl font-normal text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-[#2D2D2D]`}>
          Use Cases
        </h2>
      </div>
    </section>
  );
};

export default UseCases;
