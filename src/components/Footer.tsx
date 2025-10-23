import { Github, Twitter, MessageSquare } from "lucide-react";

const footerLinks = {
  "Products": [
    { name: "Premium E-Liquids", href: "#eliquids" },
    { name: "Disposable Vapes", href: "#disposables" },
    { name: "Cigarette-Like Vapes", href: "#cigarette" },
    { name: "Flavor Masters", href: "#masters" }
  ],
  "Discover": [
    { name: "Find Retailers", href: "#retailers" },
    { name: "Flavor Guide", href: "#flavors" },
    { name: "Vaping Tips", href: "#tips" }
  ],
  "Support": [
    { name: "User Manual", href: "#manual" },
    { name: "FAQ", href: "#faq" },
    { name: "Warranty", href: "#warranty" }
  ],
  "Contact": [
    { name: "Customer Service", href: "#service" },
    { name: "Join VIP Club", href: "#vip" },
    { name: "Wholesale Inquiry", href: "#wholesale" }
  ]
};

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground" />
              </div>
              <span className="text-xl font-bold">LUSMIND</span>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-4 text-foreground">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
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
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © LUSMIND 2025. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#twitter" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#instagram" className="text-muted-foreground hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#community" className="text-muted-foreground hover:text-accent transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
