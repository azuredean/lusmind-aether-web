import heroImage from "@/assets/home/hero-group.jpg";

const HomeHero = () => {
  return (
    <section className="relative w-full">
      <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden md:h-[calc(100vh-6rem)] md:min-h-[680px]">
        <img
          src={heroImage}
          alt="LUSMIND premium vape devices and e-liquid bottles arranged on a warm travertine tabletop"
          width={1920}
          height={1088}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/70 via-cream/20 to-transparent" />

        <div className="relative container mx-auto flex h-full items-center px-6 md:px-16">
          <div className="max-w-2xl">
            <h1 className="font-display uppercase text-ink text-[13vw] leading-[0.88] tracking-[-0.01em] sm:text-6xl md:text-7xl lg:text-[5.75rem]">
              Vapor.
              <br />
              But like never
              <br />
              before.
            </h1>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft md:text-xs">
              Crafted flavor, direct to you. Yes, really.
            </p>

            <a
              href="/e-liquid"
              className="mt-8 inline-block bg-ink px-8 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cream transition-colors hover:bg-ink/85"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
