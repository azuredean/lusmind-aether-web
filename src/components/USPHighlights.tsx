import { ShieldCheck, Sparkles, FlaskConical, Cpu } from 'lucide-react';

export const USPHighlights = () => {
  const items = [
    {
      icon: ShieldCheck,
      title: 'Authentic & Secure',
      desc: 'Anti-counterfeit codes with instant verification to protect every purchase.',
    },
    {
      icon: Sparkles,
      title: 'Signature Flavors',
      desc: 'Curated profiles crafted with artisanal precision for pure sensory bliss.',
    },
    {
      icon: FlaskConical,
      title: 'Lab-Grade Quality',
      desc: 'Strict QC and premium ingredients for a clean, consistent experience.',
    },
    {
      icon: Cpu,
      title: 'Digital Craft',
      desc: 'A fusion of vapor and tech—minimal neon aesthetics meet glassmorphism.',
    },
  ];

  return (
    <section aria-labelledby="usp-heading" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="usp-heading" className="cyber-title text-3xl md:text-4xl neon-text mb-8">
          Why LusMind
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <article key={i} className="glass-panel rounded-2xl p-6 hover-scale glow-hover focus-within:shadow-[var(--shadow-glow)] transition-shadow">
              <Icon aria-hidden className="h-6 w-6 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
