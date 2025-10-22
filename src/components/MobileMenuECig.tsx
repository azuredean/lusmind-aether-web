import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const theme = {
  brand: {
    secondary: "#E6FE7F"
  }
};

export const MobileMenuECig = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute top-0 right-0 w-64 h-full bg-[#0B102A] border-l border-white/10 p-6">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-white/80 hover:text-white transition-colors py-3 px-4 hover:bg-white/5 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <div className="border-t border-white/10 pt-4">
                <p className="text-white/50 text-sm px-4 mb-2">Products</p>
                <Link 
                  to="/e-liquid" 
                  className="text-white/80 hover:text-white transition-colors py-3 px-4 hover:bg-white/5 rounded-lg block"
                  onClick={() => setIsOpen(false)}
                >
                  E-Liquid
                </Link>
                <Link 
                  to="/e-cigarette" 
                  className="text-white/80 hover:text-white transition-colors py-3 px-4 hover:bg-white/5 rounded-lg block"
                  onClick={() => setIsOpen(false)}
                >
                  E-Cigarette
                </Link>
              </div>

              <a 
                href="/#story" 
                className="text-white/80 hover:text-white transition-colors py-3 px-4 hover:bg-white/5 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Story
              </a>
              <a 
                href="/#safety" 
                className="text-white/80 hover:text-white transition-colors py-3 px-4 hover:bg-white/5 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Compliance
              </a>
              <a 
                href="/#contact" 
                className="text-white/80 hover:text-white transition-colors py-3 px-4 hover:bg-white/5 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>

              <Button 
                className="rounded-xl mt-4 h-12 text-base"
                style={{
                  background: theme.brand.secondary,
                  color: "#0B102A"
                }}
                onClick={() => setIsOpen(false)}
              >
                Explore Flavors
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
