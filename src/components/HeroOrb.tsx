const HeroOrb = () => {
  return (
    <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] flex items-center justify-center">
      {/* Gradient Orb - Orange, Cyan, Blue, Dark Blue */}
      <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
        {/* Main gradient core */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, #FF6B4A 0%, #00D4FF 35%, #4A7FE2 65%, #1E3A8A 100%)`,
            filter: 'blur(2px)',
          }}
        />
        {/* Glow layer */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, #FF6B4A 0%, #00D4FF 35%, #4A7FE2 65%, #1E3A8A 100%)`,
            filter: 'blur(40px)',
            opacity: 0.6,
          }}
        />
        {/* Extra glow */}
        <div 
          className="absolute inset-[-20px] rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255,107,74,0.3) 0%, rgba(0,212,255,0.2) 50%, transparent 70%)`,
            filter: 'blur(30px)',
          }}
        />
      </div>
    </div>
  );
};

export default HeroOrb;
