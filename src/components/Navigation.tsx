import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  title: string;
  href: string;
}

interface NavigationItem {
  title: string;
  href: string;
  dropdown?: DropdownItem[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'E-liquid',
    href: '/e-liquid',
    dropdown: [
      { title: 'Premium Series', href: '/e-liquid/premium' },
      { title: 'Classic Flavors', href: '/e-liquid/classic' },
      { title: 'Limited Edition', href: '/e-liquid/limited' },
      { title: 'Nicotine Salt', href: '/e-liquid/salt' },
    ]
  },
  {
    title: 'LusmindBar',
    href: '/lusmindbar',
    dropdown: [
      { title: 'Disposable Vapes', href: '/lusmindbar/disposable' },
      { title: 'Rechargeable', href: '/lusmindbar/rechargeable' },
      { title: 'Accessories', href: '/lusmindbar/accessories' },
    ]
  },
  {
    title: 'More Products',
    href: '/products',
    dropdown: [
      { title: 'Starter Kits', href: '/products/starter-kits' },
      { title: 'Advanced Mods', href: '/products/mods' },
      { title: 'Coils & Parts', href: '/products/coils' },
      { title: 'Gift Cards', href: '/products/gift-cards' },
    ]
  },
  {
    title: 'Community',
    href: '/community',
    dropdown: [
      { title: 'Forums', href: '/community/forums' },
      { title: 'Events', href: '/community/events' },
      { title: 'Reviews', href: '/community/reviews' },
      { title: 'Blog', href: '/community/blog' },
    ]
  },
  {
    title: 'Partner',
    href: '/partner',
    dropdown: [
      { title: 'Become a Partner', href: '/partner/join' },
      { title: 'Wholesale', href: '/partner/wholesale' },
      { title: 'Distribution', href: '/partner/distribution' },
      { title: 'Support', href: '/partner/support' },
    ]
  },
];

export const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-white border-b border-border shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/lovable-uploads/fb6ba6ca-9de9-4d01-a83a-92b431caadec.png" 
              alt="LusMind Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  {item.title}
                  {item.dropdown && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </a>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.title && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-black/90 backdrop-blur-md text-white rounded-lg shadow-vapor border border-white/10 py-4 px-2">
                    {item.dropdown.map((dropdownItem) => (
                      <a
                        key={dropdownItem.title}
                        href={dropdownItem.href}
                        className="block px-4 py-3 text-sm hover:bg-white/10 rounded-md transition-colors duration-200"
                      >
                        {dropdownItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-foreground hover:text-primary transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};