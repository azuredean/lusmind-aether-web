import { ArrowRight } from "lucide-react";

const footerLinks = {
  Products: [
    { name: "E-Liquid", href: "/e-liquid" },
    { name: "E-Cigarette", href: "/e-cigarette" },
  ],
  Discover: [
    { name: "Blog", href: "#blog" },
    { name: "Github", href: "#github" },
  ],
  Build: [
    { name: "Talk to a builder", href: "#builder" },
    { name: "Pico zkVM Docs", href: "#pico-docs" },
    { name: "zkCoprocessor Docs", href: "#zkco-docs" },
  ],
  "Contact Us": [
    { name: "Join Telegram", href: "#telegram" },
    { name: "Join Discord", href: "#discord" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] border-t border-[#E0E0E0]">
      <div className="container mx-auto px-6 md:px-16 py-16 md:py-20">
        {/* Top CTA */}
        <div className="mb-16 text-center">
          <a 
            href="#community"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-[#2D2D2D]/15 rounded-lg hover:border-[#2D2D2D]/30 hover:bg-white transition-all duration-300 text-[#2D2D2D]"
          >
            <span className="text-base">[ Join our Community ]</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src="/lovable-uploads/6a3cad97-68cc-4600-9c35-7d92e2c90d4b.png" alt="LM Logo" className="h-8 w-8" />
              <img src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png" alt="LUSMIND" className="h-8 w-auto" />
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-normal mb-4 text-sm text-[#2D2D2D]">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-[#666666] hover:text-[#2D2D2D] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E0E0E0]">
          <p className="text-sm text-[#666666] text-center">
            © Brevis 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
