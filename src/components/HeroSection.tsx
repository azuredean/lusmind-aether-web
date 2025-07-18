import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface MistParticle {
  id: number;
  startX: number;
  endX: number;
  y: number;
  size: number;
  delay: number;
}

interface HeroSectionProps {
  onEnter: () => void;
}

export const HeroSection = ({ onEnter }: HeroSectionProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [mistParticles, setMistParticles] = useState<MistParticle[]>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
      generateMistCollision();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const generateMistCollision = () => {
    const particles: MistParticle[] = [];
    
    // Left side particles
    for (let i = 0; i < 8; i++) {
      particles.push({
        id: i,
        startX: -200,
        endX: window.innerWidth / 2,
        y: 40 + Math.random() * 20,
        size: 60 + Math.random() * 40,
        delay: Math.random() * 0.5,
      });
    }

    // Right side particles
    for (let i = 8; i < 16; i++) {
      particles.push({
        id: i,
        startX: window.innerWidth + 200,
        endX: window.innerWidth / 2,
        y: 40 + Math.random() * 20,
        size: 60 + Math.random() * 40,
        delay: Math.random() * 0.5,
      });
    }

    setMistParticles(particles);

    // Show button after collision animation
    setTimeout(() => {
      setShowButton(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-dark))] relative overflow-hidden flex items-center justify-center">
      {/* Animated mist collision */}
      {showAnimation && (
        <div className="absolute inset-0">
          {mistParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute opacity-60"
              style={{
                left: particle.startX,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: `radial-gradient(circle, 
                  hsla(190, 85%, 55%, 0.3) 0%, 
                  hsla(320, 70%, 75%, 0.2) 40%, 
                  transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(12px)',
                animation: `mist-collision 3s ease-out infinite`,
                animationDelay: `${particle.delay}s`,
                transform: `translateX(${particle.endX - particle.startX}px)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-12 animate-float">
          <img 
            src="/lovable-uploads/fb6ba6ca-9de9-4d01-a83a-92b431caadec.png" 
            alt="LusMind Logo" 
            className="mx-auto h-32 w-auto neon-text animate-glow"
          />
        </div>

        {/* Enter button */}
        {showButton && (
          <div className="animate-float" style={{ animationDelay: '1s' }}>
            <Button
              onClick={onEnter}
              size="lg"
              className="glass-panel glow-hover cyber-title px-12 py-6 text-xl bg-gradient-primary border-primary/30 text-white"
            >
              Lusmind World
            </Button>
          </div>
        )}
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
    </div>
  );
};