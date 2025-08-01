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
    
    // Left side particles - multiple layers for depth
    for (let i = 0; i < 12; i++) {
      particles.push({
        id: i,
        startX: -300 - Math.random() * 100,
        endX: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: 30 + Math.random() * 40,
        size: 40 + Math.random() * 80,
        delay: Math.random() * 1.2,
      });
    }

    // Right side particles - multiple layers for depth
    for (let i = 12; i < 24; i++) {
      particles.push({
        id: i,
        startX: window.innerWidth + 300 + Math.random() * 100,
        endX: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: 30 + Math.random() * 40,
        size: 40 + Math.random() * 80,
        delay: Math.random() * 1.2,
      });
    }

    // Additional background mist particles
    for (let i = 24; i < 40; i++) {
      const isFromLeft = i % 2 === 0;
      particles.push({
        id: i,
        startX: isFromLeft ? -400 : window.innerWidth + 400,
        endX: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
        y: 20 + Math.random() * 60,
        size: 80 + Math.random() * 120,
        delay: Math.random() * 2,
      });
    }

    setMistParticles(particles);

    // Show button after collision animation
    setTimeout(() => {
      setShowButton(true);
    }, 3500);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: 'url(/lovable-uploads/fb6ba6ca-9de9-4d01-a83a-92b431caadec.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Animated mist collision */}
      {showAnimation && (
        <div className="absolute inset-0">
          {mistParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute"
              style={{
                left: particle.startX,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: particle.id < 24 
                  ? `radial-gradient(ellipse at center, 
                      hsla(190, 95%, 65%, 0.2) 0%, 
                      hsla(200, 90%, 70%, 0.15) 20%,
                      hsla(320, 80%, 75%, 0.1) 35%, 
                      hsla(280, 70%, 80%, 0.08) 50%,
                      hsla(260, 60%, 85%, 0.05) 65%,
                      transparent 80%)`
                  : `radial-gradient(ellipse at center, 
                      hsla(180, 100%, 60%, 0.15) 0%, 
                      hsla(190, 95%, 65%, 0.12) 15%,
                      hsla(300, 85%, 70%, 0.1) 30%, 
                      hsla(320, 75%, 75%, 0.08) 45%,
                      hsla(280, 65%, 80%, 0.05) 60%,
                      hsla(240, 55%, 85%, 0.03) 75%,
                      transparent 90%)`,
                borderRadius: '50%',
                filter: `blur(${8 + (particle.size / 20)}px)`,
                animation: `mist-collision ${3 + Math.random() * 2}s ease-out infinite`,
                animationDelay: `${particle.delay}s`,
                transform: `translateX(${particle.endX - particle.startX}px)`,
                opacity: particle.id < 24 ? 0.7 : 0.4,
              }}
            >
              {/* Inner glow effect */}
              <div
                className="absolute inset-2"
                style={{
                  background: `radial-gradient(circle, 
                    hsla(190, 100%, 70%, 0.6) 0%, 
                    hsla(320, 90%, 80%, 0.4) 30%, 
                    transparent 60%)`,
                  borderRadius: '50%',
                  filter: `blur(${4 + (particle.size / 40)}px)`,
                }}
              />
            </div>
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

      {/* Background overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 pointer-events-none" />
      
      {/* Additional center overlay for logo area */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-transparent pointer-events-none" />
    </div>
  );
};