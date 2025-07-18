export const BrandElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Geometric lines */}
      <div className="absolute top-20 left-10 w-32 h-px bg-gradient-to-r from-primary to-transparent opacity-30"></div>
      <div className="absolute top-40 right-20 w-24 h-px bg-gradient-to-l from-secondary to-transparent opacity-40"></div>
      <div className="absolute bottom-60 left-1/4 w-40 h-px bg-gradient-to-r from-accent to-transparent opacity-25"></div>
      
      {/* Vertical lines */}
      <div className="absolute top-32 right-10 w-px h-20 bg-gradient-to-b from-primary to-transparent opacity-30"></div>
      <div className="absolute bottom-40 left-16 w-px h-16 bg-gradient-to-t from-secondary to-transparent opacity-35"></div>
      
      {/* Color blocks */}
      <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-primary/20 rotate-45 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-secondary/15 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-2/3 right-1/4 w-2 h-4 bg-accent/20 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      {/* Grid pattern */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
        <div className="grid grid-cols-12 gap-8 w-96 h-96">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-primary/30 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};