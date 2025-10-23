import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

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
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg" 
          : "bg-background/80 backdrop-blur-md border-b border-border"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-primary-foreground" />
            </div>
            <span className="text-xl font-bold">LUSMIND</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-background">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Brevis Network</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Infinite Compute Layer for Ethereum
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/ecigarette"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">E-Cigarette</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Premium vaping products and flavors
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <a href="#explorer" className="text-sm hover:text-accent transition-colors">
              Flavors
            </a>
            <a href="#ecosystem" className="text-sm hover:text-accent transition-colors">
              Retailers
            </a>
            <a href="#blog" className="text-sm hover:text-accent transition-colors">
              Blog
            </a>
            <a href="#community" className="text-sm hover:text-accent transition-colors">
              Community
            </a>
            <a href="#career" className="text-sm hover:text-accent transition-colors">
              About Us
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
              <a href="#product" className="text-sm hover:text-accent transition-colors py-2">
                Products
              </a>
              <a href="#explorer" className="text-sm hover:text-accent transition-colors py-2">
                Flavors
              </a>
              <a href="#ecosystem" className="text-sm hover:text-accent transition-colors py-2">
                Retailers
              </a>
              <a href="#blog" className="text-sm hover:text-accent transition-colors py-2">
                Blog
              </a>
              <a href="#community" className="text-sm hover:text-accent transition-colors py-2">
                Community
              </a>
              <a href="#career" className="text-sm hover:text-accent transition-colors py-2">
                About Us
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
