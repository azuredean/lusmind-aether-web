import { Button } from '@/components/ui/button';

interface NewHeroSectionProps {
  onExploreProducts: () => void;
  onVerifyProduct: () => void;
}

export const NewHeroSection = ({ onExploreProducts, onVerifyProduct }: NewHeroSectionProps) => {
  return (
    <section className="section hero relative min-h-screen flex flex-col">
      {/* Vapor Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div 
          className="absolute inset-0 opacity-60 blur-[48px]"
          style={{
            margin: '-20%',
            animation: 'vapor 10s ease-in-out infinite',
            background: `
              radial-gradient(60% 60% at 25% 20%, hsla(266 85% 66% / 0.18), transparent 60%),
              radial-gradient(50% 50% at 80% 25%, hsla(198 93% 60% / 0.18), transparent 60%),
              radial-gradient(50% 50% at 55% 85%, hsla(258 90% 66% / 0.16), transparent 70%)
            `
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.08] mix-blend-mode-soft-light"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px'
          }}
        />
        <div className="absolute inset-0 mx-auto max-w-[1400px] rounded-[32px] border border-white/10" />
      </div>

      <div className="container relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6 text-sm text-white/75">
          <a href="#top" className="font-black tracking-[4px] text-transparent bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-300 bg-clip-text">
            LUSMIND
          </a>
          <div className="flex gap-6">
            <a href="#products" className="hover:text-white transition-colors">Products</a>
            <a href="#verify" className="hover:text-white transition-colors">Verify</a>
            <a href="#subscribe" className="hover:text-white transition-colors">Subscribe</a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-12 pb-24">
          <p className="text-xs tracking-[0.28em] text-white/60 mb-3 uppercase">
            DIGITAL VAPOR • FUTURE FLAVORS
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] mb-6 text-transparent bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-300 bg-clip-text">
            A Soft‑Neon Universe for Taste
          </h1>
          
          <p className="text-lg text-white/82 max-w-3xl mx-auto mb-8 leading-relaxed">
            Where cyber aesthetics meet artisanal precision. Premium e‑liquid designed for an immersive, future‑forward journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
            <Button
              onClick={onExploreProducts}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 font-bold shadow-[0_10px_30px_-10px_rgba(99,102,241,0.6)] hover:scale-105 transition-transform"
            >
              Explore Collection
            </Button>
            <Button
              onClick={onVerifyProduct}
              variant="outline"
              className="bg-white/12 border-white/20 text-white hover:bg-white/20 px-6 py-3 font-bold"
            >
              Verify Product
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/6 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-2xl lg:text-3xl font-black text-white">100+</div>
              <div className="text-xs text-white/75 mt-1">Premium Flavors</div>
            </div>
            <div className="bg-white/6 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-2xl lg:text-3xl font-black text-white">50K+</div>
              <div className="text-xs text-white/75 mt-1">Happy Customers</div>
            </div>
            <div className="bg-white/6 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-2xl lg:text-3xl font-black text-white">24/7</div>
              <div className="text-xs text-white/75 mt-1">Quality Control</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};