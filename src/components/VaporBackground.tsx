import { useEffect, useState } from 'react';

interface VaporParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export const VaporBackground = () => {
  const [particles, setParticles] = useState<VaporParticle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: VaporParticle[] = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: 100,
          size: Math.random() * 30 + 20,
          delay: Math.random() * 4,
          duration: Math.random() * 3 + 4,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute opacity-30"
          style={{
            left: `${particle.x}%`,
            bottom: '-10%',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, 
              hsla(190, 85%, 55%, 0.4) 0%, 
              hsla(320, 70%, 75%, 0.2) 30%, 
              transparent 70%)`,
            borderRadius: '50%',
            animation: `vapor-rise ${particle.duration}s ease-out infinite`,
            animationDelay: `${particle.delay}s`,
            filter: 'blur(8px)',
          }}
        />
      ))}
    </div>
  );
};