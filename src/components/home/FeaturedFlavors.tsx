import arcticSweetIce from "@/assets/me-products/arctic-sweet-ice.png";
import blueberryRaspberry from "@/assets/me-products/blueberry-raspberry.png";
import mangoIce from "@/assets/me-products/mango-ice.png";
import watermelonIce from "@/assets/me-products/watermelon-ice.png";
import niagaraGrape from "@/assets/me-products/niagara-grape.png";
import caramelCustard from "@/assets/me-products/caramel-custard.png";

const featured = [
  { name: "Arctic Sweet Ice", image: arcticSweetIce },
  { name: "Blueberry Raspberry", image: blueberryRaspberry },
  { name: "Mango Ice", image: mangoIce },
  { name: "Watermelon Ice", image: watermelonIce },
  { name: "Niagara Grape", image: niagaraGrape },
  { name: "Caramel Custard", image: caramelCustard },
];

const FeaturedFlavors = () => {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft">Featured</span>
        <span className="text-ink-soft">✦</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft">Flavors</span>
      </div>

      {/* Ghost wordmark behind the products */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll">
          {[0, 1].map((n) => (
            <span
              key={n}
              className="font-display uppercase text-[16vw] leading-none tracking-tight text-ink/[0.07] pr-[4vw]"
            >
              LUSMIND FLAVORS LUSMIND FLAVORS&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-6 md:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((flavor) => (
            <a
              key={flavor.name}
              href="/e-liquid"
              className="group flex w-[200px] flex-shrink-0 snap-center flex-col items-center md:w-[260px]"
            >
              <img
                src={flavor.image}
                alt={`${flavor.name} LUSMIND product`}
                className="h-56 w-full object-contain transition-transform duration-500 group-hover:-translate-y-2 md:h-72"
              />
              <span className="mt-6 font-serif text-lg uppercase tracking-[0.08em] text-ink md:text-xl">
                {flavor.name}
              </span>
              <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft opacity-0 transition-opacity group-hover:opacity-100">
                View
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFlavors;
