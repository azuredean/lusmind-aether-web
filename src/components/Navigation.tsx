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
    <nav className="bg-white/90 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <img 
              src="/lovable-uploads/9bbea08d-d65d-4174-a865-0c9d8cf90176.png" 
              alt="LusMind Brand Logo" 
              className="h-12 w-auto"
            />
            <img 
              src="/lovable-uploads/fb6ba6ca-9de9-4d01-a83a-92b431caadec.png" 
              alt="LusMind Logo" 
              className="h-12 w-auto"
            />
          </div>

          {/* Navigation Items - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-12">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center text-gray-800 hover:text-primary transition-colors duration-300 font-medium text-sm tracking-wide py-3 px-4 rounded-full hover:bg-gray-100/50"
                >
                  {item.title}
                  {item.dropdown && (
                    <ChevronDown className="ml-1 h-3 w-3" />
                  )}
                </a>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.title && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white/95 backdrop-blur-md text-gray-800 rounded-xl shadow-lg border border-gray-200/50 py-2 z-50">
                    {item.dropdown.map((dropdownItem) => (
                      <a
                        key={dropdownItem.title}
                        href={dropdownItem.href}
                        className="block px-4 py-3 text-sm hover:bg-gray-100/70 transition-colors duration-200 rounded-lg mx-2"
                      >
                        {dropdownItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side - could be used for search or user menu */}
          <div className="flex-shrink-0 w-20"></div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-800 hover:text-primary transition-colors">
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