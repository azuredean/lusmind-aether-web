const footerLinks = {
  Products: [
    { name: "E-Liquid", href: "/e-liquid" },
    { name: "Disposable", href: "/disposable" },
    { name: "NG-cigarette", href: "/e-cigarette" },
  ],
  Inside: [
    { name: "Brand story", href: "#values" },
    { name: "Flavors", href: "#lines" },
    { name: "Occasions", href: "#use-cases" },
  ],
  Compliance: [
    { name: "Safety & notices", href: "#safety" },
    { name: "Privacy & Cookies", href: "#" },
    { name: "Terms", href: "#" },
  ],
  Contact: [
    { name: "support@lusmind.com", href: "mailto:support@lusmind.com" },
    { name: "Mon—Fri 10:00-18:00", href: "#" },
  ],
};

const HomeFooter = () => {
  return (
    <footer className="bg-ink text-cream">
      <div className="container mx-auto px-6 py-16 md:px-16 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <img
                src="/lovable-uploads/6a3cad97-68cc-4600-9c35-7d92e2c90d4b.png"
                alt="LM Logo"
                className="h-8 w-8 invert"
              />
              <img
                src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png"
                alt="LUSMIND"
                className="h-8 w-auto invert"
              />
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-cream/60">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="font-mono text-[11px] uppercase tracking-[0.12em] text-cream/80 transition-colors hover:text-cream"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-cream/15 pt-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/50">
            © LUSMIND 2026. All rights reserved. 21+ only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
