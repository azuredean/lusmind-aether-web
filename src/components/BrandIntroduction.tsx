export const BrandIntroduction = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-[hsl(var(--brand-dark))]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="cyber-title text-4xl md:text-5xl neon-text animate-float">
                Welcome to LusMind
              </h2>
              <p className="text-xl text-white/80">
                Where digital vapor meets unparalleled craftsmanship
              </p>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-white/90">
              <p>
                At LusMind, we transcend the boundaries between reality and dreams, 
                crafting premium e-liquid experiences that transport you to a world 
                of pure sensory bliss.
              </p>
              
              <p>
                Our vision is to create not just flavors, but entire digital universes 
                where every puff becomes a journey through carefully curated taste 
                landscapes, enhanced by cutting-edge technology and artisanal precision.
              </p>
              
              <p className="text-primary font-medium">
                "Innovation is our vapor, excellence is our essence."
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="cyber-title text-3xl neon-text mb-2">100+</div>
                <div className="text-sm text-white/60">Premium Flavors</div>
              </div>
              <div className="text-center">
                <div className="cyber-title text-3xl neon-text mb-2">50K+</div>
                <div className="text-sm text-white/60">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="cyber-title text-3xl neon-text mb-2">24/7</div>
                <div className="text-sm text-white/60">Quality Control</div>
              </div>
            </div>
          </div>

          {/* Visual element */}
          <div className="relative">
            <div className="aspect-square glass-panel rounded-3xl p-8 flex items-center justify-center relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full opacity-30"
                    style={{
                      left: `${20 + (i % 3) * 30}%`,
                      top: `${20 + Math.floor(i / 3) * 40}%`,
                      width: `${40 + Math.random() * 20}px`,
                      height: `${40 + Math.random() * 20}px`,
                      background: `radial-gradient(circle, 
                        hsla(${190 + i * 30}, 85%, 55%, 0.4) 0%, 
                        transparent 70%)`,
                      animation: `float ${4 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`,
                      filter: 'blur(8px)',
                    }}
                  />
                ))}
              </div>

              {/* Center logo/brand element */}
              <div className="relative z-10 text-center">
                <div className="cyber-title text-6xl neon-text mb-4 animate-glow">
                  Lus
                </div>
                <div className="text-2xl text-accent font-light tracking-wider">
                  Mind
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 opacity-20">
        <div className="w-32 h-32 rounded-full bg-gradient-primary animate-drift" style={{ animationDuration: '12s' }} />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20">
        <div className="w-24 h-24 rounded-full bg-gradient-secondary animate-drift" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
      </div>
    </section>
  );
};