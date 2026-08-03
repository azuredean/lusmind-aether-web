import storyImage from "@/assets/home/story-arch.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const StorySplit = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative bg-ink text-cream">
      {/* vertical connector lines */}
      <div className="absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-cream/25" />
      <div className="absolute left-1/2 bottom-0 h-16 w-px -translate-x-1/2 bg-cream/25" />

      <div className="container mx-auto grid items-center gap-14 px-6 py-28 md:grid-cols-2 md:gap-20 md:px-16 md:py-36">
        {/* Arched image */}
        <div
          className={`flex justify-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative w-full max-w-[380px] overflow-hidden rounded-t-full md:max-w-[440px]">
            <img
              src={storyImage}
              alt="LUSMIND e-liquid bottle and device in warm low light"
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
              className="h-[480px] w-full object-cover md:h-[620px]"
            />
          </div>
        </div>

        {/* Copy */}
        <div
          className={`text-center md:text-left transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-6 flex items-center justify-center gap-4 md:justify-start">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">The</span>
            <span className="h-px w-16 bg-cream/30 md:w-24" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">Craft</span>
          </div>

          <h2 className="font-serif text-4xl leading-[1.1] md:text-5xl lg:text-[3.4rem]">
            Aged in <span className="italic">tradition.</span>
            <br />
            Steeped in <span className="italic">innovation.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-md font-mono text-xs leading-relaxed tracking-[0.06em] text-cream/70 md:mx-0">
            At LUSMIND, every device begins with pharmaceutical-grade ingredients and
            European flavor compounds — matured, tested and refined before it ever
            reaches your hand.
          </p>

          <a
            href="#values"
            className="mt-10 inline-block border border-cream/40 px-8 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-cream transition-colors hover:bg-cream hover:text-ink"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default StorySplit;
