import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg" 
          : "bg-background/80 backdrop-blur-md border-b border-border"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-primary-foreground" />
            </div>
            <span className="text-xl font-bold">LUSMIND</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm transition-colors ${isActive('/') ? 'text-accent font-medium' : 'hover:text-accent'}`}
            >
              Home
            </Link>
            <Link 
              to="/e-cigarette" 
              className={`text-sm transition-colors ${isActive('/e-cigarette') ? 'text-accent font-medium' : 'hover:text-accent'}`}
            >
              E-Cigarette
            </Link>
            <a href="#product" className="text-sm hover:text-accent transition-colors">
              Products
            </a>
            <a href="#use-cases" className="text-sm hover:text-accent transition-colors">
              Use Cases
            </a>
            <a href="#ecosystem" className="text-sm hover:text-accent transition-colors">
              Retailers
            </a>
            <a href="#community" className="text-sm hover:text-accent transition-colors">
              Community
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Shop Now
            </Button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in-up">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className={`text-sm transition-colors py-2 ${isActive('/') ? 'text-accent font-medium' : 'hover:text-accent'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/e-cigarette" 
                className={`text-sm transition-colors py-2 ${isActive('/e-cigarette') ? 'text-accent font-medium' : 'hover:text-accent'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                E-Cigarette
              </Link>
              <a 
                href="#product" 
                className="text-sm hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </a>
              <a 
                href="#use-cases" 
                className="text-sm hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Use Cases
              </a>
              <a 
                href="#ecosystem" 
                className="text-sm hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Retailers
              </a>
              <a 
                href="#community" 
                className="text-sm hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </a>
              <Button variant="outline" size="sm" className="w-full mt-2">
                Shop Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
