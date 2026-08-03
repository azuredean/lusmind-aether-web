import flavor1 from "@/assets/home/flavor-1.jpg";
import flavor2 from "@/assets/home/flavor-2.jpg";
import flavor3 from "@/assets/home/flavor-3.jpg";
import flavor4 from "@/assets/home/flavor-4.jpg";
import flavor5 from "@/assets/home/flavor-5.jpg";
import flavor6 from "@/assets/home/flavor-6.jpg";

const featured = [
  { name: "Arctic Sweet Ice", image: flavor1 },
  { name: "Blueberry Raspberry", image: flavor2 },
  { name: "Mango Ice", image: flavor3 },
  { name: "Watermelon Ice", image: flavor4 },
  { name: "Niagara Grape", image: flavor5 },
  { name: "Caramel Custard", image: flavor6 },
];

const FeaturedFlavors = () => {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="mb-12 flex items-center justify-center gap-4">
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
              className="font-display uppercase text-[20vw] leading-none tracking-tight text-ink/[0.06] pr-[4vw]"
            >
              LUSMIND FLAVORS LUSMIND FLAVORS&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:gap-10 md:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((flavor) => (
            <a
              key={flavor.name}
              href="/e-liquid"
              className="group flex w-[240px] flex-shrink-0 snap-center flex-col md:w-[320px]"
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={flavor.image}
                  alt={`${flavor.name} LUSMIND e-liquid bottle`}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
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
