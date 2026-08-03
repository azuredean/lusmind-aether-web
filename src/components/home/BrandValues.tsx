const values = [
  {
    title: "Expert Team",
    body:
      "Decades of combined industry experience, dedicated to pushing vaping innovation while holding the highest standards of craftsmanship.",
  },
  {
    title: "Premium Materials",
    body:
      "Only the finest raw materials, with rigorous quality control from component selection through final assembly.",
  },
  {
    title: "Natural Flavors",
    body:
      "European flavor compounds selected for purity, delivering clean, authentic taste profiles in every formulation.",
  },
  {
    title: "Safety First",
    body:
      "Comprehensive testing and compliance with international safety standards — peace of mind with every puff.",
  },
  {
    title: "R&D Innovation",
    body:
      "A dedicated research team continuously exploring new technologies to bring tomorrow's experiences today.",
  },
  {
    title: "Our Promise",
    body:
      "From concept to delivery, quality, safety and satisfaction are built into every product we create.",
  },
];

const BrandValues = () => {
  return (
    <section id="values" className="relative bg-ink text-cream">
      <div className="absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-cream/25" />

      <div className="container mx-auto px-6 py-28 md:px-16 md:py-36">
        <div className="text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
            Inside LUSMIND
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-[1.1] md:text-5xl lg:text-[3.2rem]">
            Built on <span className="italic">detail.</span> Measured in{" "}
            <span className="italic">trust.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-14">
          {values.map((value) => (
            <div key={value.title} className="border-t border-cream/20 pt-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream">
                {value.title}
              </h3>
              <p className="mt-4 font-mono text-xs leading-relaxed tracking-[0.04em] text-cream/60">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandValues;
