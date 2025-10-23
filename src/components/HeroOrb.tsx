const HeroOrb = () => {
  return (
    <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center">
      {/* Gradient Orb - Orange to Blue */}
      <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
        {/* Main gradient core */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, #FF6B35 0%, #4A90E2 100%)`,
            filter: 'blur(3px)',
          }}
        />
        {/* Glow layer */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, #FF6B35 0%, #4A90E2 100%)`,
            filter: 'blur(50px)',
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
};

export default HeroOrb;
