import { Button } from '@/components/ui/button';

export const AuthenticityCTA = () => {
  return (
    <section aria-labelledby="auth-cta" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 md:p-10 bg-gradient-to-br from-background/60 to-background/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 id="auth-cta" className="cyber-title text-2xl md:text-3xl neon-text mb-2">
                Verify Your Product
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Protect your purchase with our instant authenticity check. Enter the code on your package to confirm it’s genuine.
              </p>
            </div>
            <a href="#verification" aria-label="Go to authenticity verification">
              <Button size="lg" className="glow-hover">
                Check Authenticity
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
