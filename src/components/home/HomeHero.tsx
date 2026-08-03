import heroImage from "@/assets/home-hero-group.jpg";

const HomeHero = () => {
  return (
    <section className="relative w-full">
      <div className="relative h-[62vh] min-h-[440px] md:h-[78vh] md:min-h-[620px] w-full overflow-hidden">
        <img
          src={heroImage}
          alt="LUSMIND premium vape devices and e-liquid bottles arranged on a warm neutral tabletop"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/85 via-cream/40 to-transparent" />

        <div className="relative h-full container mx-auto px-6 md:px-16 flex items-center">
          <div className="max-w-2xl">
            <h1 className="font-display uppercase text-ink text-[13vw] leading-[0.88] sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[-0.01em]">
              Vapor.
              <br />
              But like never
              <br />
              before.
            </h1>

            <p className="mt-6 font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-ink-soft">
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
