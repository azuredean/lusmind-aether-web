import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
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
  return <nav className="fixed top-10 left-0 right-0 z-50 flex justify-center px-4 md:px-6">
      <div className={`w-full max-w-7xl transition-all duration-300 rounded-full h-10 flex items-center justify-between px-4 ${scrolled ? "bg-[rgba(43,48,59,0.05)] backdrop-blur-lg border border-[rgba(43,48,59,0.1)] shadow-lg" : "bg-[rgba(43,48,59,0.02)] backdrop-blur-md border border-[rgba(43,48,59,0.05)]"}`}>
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/6a3cad97-68cc-4600-9c35-7d92e2c90d4b.png" alt="LM Logo" className="h-6 w-6" />
          <img src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png" alt="LUSMIND" className="h-6 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-normal bg-transparent hover:bg-transparent data-[state=open]:bg-transparent h-auto py-0">
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 bg-background">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/e-liquid" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">E-Liquid</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Premium e-liquid flavors and blends
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/e-cigarette" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">E-Cigarette</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Premium vaping devices and products
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/disposable" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Disposable</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Convenient disposable vape devices
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <a href="#explorer" className="text-sm font-normal hover:text-accent transition-colors">
            Flavors
          </a>
          <a href="#ecosystem" className="text-sm font-normal hover:text-accent transition-colors">
            Retailers
          </a>
          
          <a href="#community" className="text-sm font-normal hover:text-accent transition-colors">
            Community
          </a>
          <a href="#career" className="text-sm font-normal hover:text-accent transition-colors">
            About Us
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex h-8 text-sm font-normal rounded-full px-4">
            Shop Now
          </Button>
          
          {/* Mobile menu button */}
          <button className="md:hidden p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && <div className="absolute top-12 left-4 right-4 md:hidden bg-background/95 backdrop-blur-lg border border-border rounded-2xl p-4 shadow-lg animate-fade-in-up">
          <div className="flex flex-col gap-3">
            <Link to="/e-liquid" className="text-sm font-normal hover:text-accent transition-colors py-2">
              E-Liquid
            </Link>
            <Link to="/e-cigarette" className="text-sm font-normal hover:text-accent transition-colors py-2">
              E-Cigarette
            </Link>
            <Link to="/disposable" className="text-sm font-normal hover:text-accent transition-colors py-2">
              Disposable
            </Link>
            <a href="#explorer" className="text-sm font-normal hover:text-accent transition-colors py-2">
              Flavors
            </a>
            <a href="#ecosystem" className="text-sm font-normal hover:text-accent transition-colors py-2">
              Retailers
            </a>
            <a href="#blog" className="text-sm font-normal hover:text-accent transition-colors py-2">
              Blog
            </a>
            <a href="#community" className="text-sm font-normal hover:text-accent transition-colors py-2">
              Community
            </a>
            <a href="#career" className="text-sm font-normal hover:text-accent transition-colors py-2">
              About Us
            </a>
            <Button variant="outline" size="sm" className="w-full mt-2 rounded-full h-8 text-sm font-normal">
              Shop Now
            </Button>
          </div>
        </div>}
    </nav>;
};
export default Navbar;