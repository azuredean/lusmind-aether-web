import { useState, useEffect } from "react";
import { Menu, X, Plus } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#F5F5F5]/95 backdrop-blur-lg border-b border-[#E0E0E0]" 
          : "bg-[#F5F5F5]/60 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2D2D2D] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-white" />
            </div>
            <span className="text-xl font-bold text-[#2D2D2D]">LUSMIND</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <a href="#product" className="text-sm text-[#2D2D2D] hover:text-[#999999] transition-colors duration-200">
              Product
            </a>
            <a href="#explorer" className="text-sm text-[#2D2D2D] hover:text-[#999999] transition-colors duration-200">
              Explorer
            </a>
            <a href="#ecosystem" className="text-sm text-[#2D2D2D] hover:text-[#999999] transition-colors duration-200">
              Ecosystem
            </a>
            <a href="#blog" className="text-sm text-[#2D2D2D] hover:text-[#999999] transition-colors duration-200">
              Blog
            </a>
            <button className="text-sm text-[#2D2D2D] hover:text-[#999999] transition-colors duration-200 flex items-center gap-1">
              Community
              <Plus className="w-3 h-3" />
            </button>
            <a href="#career" className="text-sm text-[#2D2D2D] hover:text-[#999999] transition-colors duration-200">
              Career
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-[#2D2D2D]"
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
              <a href="#product" className="text-sm text-[#2D2D2D] hover:text-[#666666] transition-colors py-2">
                Product
              </a>
              <a href="#explorer" className="text-sm text-[#2D2D2D] hover:text-[#666666] transition-colors py-2">
                Explorer
              </a>
              <a href="#ecosystem" className="text-sm text-[#2D2D2D] hover:text-[#666666] transition-colors py-2">
                Ecosystem
              </a>
              <a href="#blog" className="text-sm text-[#2D2D2D] hover:text-[#666666] transition-colors py-2">
                Blog
              </a>
              <a href="#community" className="text-sm text-[#2D2D2D] hover:text-[#666666] transition-colors py-2">
                Community
              </a>
              <a href="#career" className="text-sm text-[#2D2D2D] hover:text-[#666666] transition-colors py-2">
                Career
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
