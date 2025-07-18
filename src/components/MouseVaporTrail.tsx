import { useEffect, useState } from 'react';

interface VaporTrail {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export const MouseVaporTrail = () => {
  const [trails, setTrails] = useState<VaporTrail[]>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newTrail: VaporTrail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      };

      setTrails(prev => [...prev.slice(-10), newTrail]);
    };

    const cleanupTrails = () => {
      const now = Date.now();
      setTrails(prev => prev.filter(trail => now - trail.timestamp < 2000));
    };

    document.addEventListener('mousemove', handleMouseMove);
    const interval = setInterval(cleanupTrails, 100);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trails.map((trail, index) => {
        const age = Date.now() - trail.timestamp;
        const opacity = Math.max(0, 1 - age / 2000);
        const scale = 1 - age / 4000;

        return (
          <div
            key={trail.id}
            className="absolute rounded-full"
            style={{
              left: trail.x - 15,
              top: trail.y - 15,
              width: 30,
              height: 30,
              background: `radial-gradient(circle, 
                hsla(190, 85%, 55%, ${opacity * 0.4}) 0%, 
                hsla(320, 70%, 75%, ${opacity * 0.2}) 50%, 
                transparent 100%)`,
              transform: `scale(${scale})`,
              filter: 'blur(4px)',
              opacity: opacity,
              transition: 'opacity 0.1s ease-out',
            }}
          />
        );
      })}
    </div>
  );
};