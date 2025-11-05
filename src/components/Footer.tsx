import { ArrowRight } from "lucide-react";
const footerLinks = {
  Products: [{
    name: "E-Liquid",
    href: "/e-liquid"
  }, {
    name: "Disposable",
    href: "/disposable"
  }, {
    name: "NG-cigarette",
    href: "/e-cigarette"
  }],
  About: [{
    name: "Brand story",
    href: "#story"
  }, {
    name: "Products & flavors",
    href: "#products"
  }],
  Compliance: [{
    name: "Safety & notices",
    href: "#safety"
  }, {
    name: "Privacy & Cookies",
    href: "#"
  }, {
    name: "Terms",
    href: "#"
  }],
  Contact: [{
    name: "support@lusmind.com",
    href: "mailto:support@lusmind.com"
  }, {
    name: "Mon—Fri 10:00‑18:00",
    href: "#"
  }]
};
const Footer = () => {
  return <footer className="bg-[#F5F5F5] border-t border-[#E0E0E0]">
      <div className="container mx-auto px-6 md:px-16 py-16 md:py-20">
        {/* Top CTA */}
        

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src="/lovable-uploads/6a3cad97-68cc-4600-9c35-7d92e2c90d4b.png" alt="LM Logo" className="h-8 w-8" />
              <img src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png" alt="LUSMIND" className="h-8 w-auto" />
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => <div key={category}>
              <h3 className="font-normal mb-4 text-sm text-[#2D2D2D]">{category}</h3>
              <ul className="space-y-3">
                {links.map(link => <li key={link.name}>
                    <a href={link.href} className="text-sm text-[#666666] hover:text-[#2D2D2D] transition-colors">
                      {link.name}
                    </a>
                  </li>)}
              </ul>
            </div>)}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E0E0E0]">
          <p className="text-sm text-[#666666] text-center">
            © Brevis 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;