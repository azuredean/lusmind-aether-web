
const PreFooterCTA = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-16 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-12">
          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-light leading-[1.2]">
            Experience <span className="italic font-serif bg-gradient-to-r from-[#8FF5FF] to-[#FFA4F3] bg-clip-text text-transparent">LUSMIND</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto mt-8">
            {/* Team Excellence */}
            <div className="space-y-4 text-left">
              <h3 className="text-xl font-light text-foreground">Expert Team</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our team brings decades of combined industry experience and professional expertise. 
                Each member is dedicated to pushing the boundaries of vaping innovation while maintaining 
                the highest standards of craftsmanship.
              </p>
            </div>

            {/* Production Quality */}
            <div className="space-y-4 text-left">
              <h3 className="text-xl font-light text-foreground">Premium Materials</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We source only the finest raw materials for our products. Our rigorous quality control 
                processes ensure every device meets our exacting standards, from component selection 
                through final assembly.
              </p>
            </div>

            {/* E-liquid Excellence */}
            <div className="space-y-4 text-left">
              <h3 className="text-xl font-light text-foreground">Natural Flavors</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our e-liquid formulations feature premium flavor compounds imported from Europe. 
                Every ingredient is carefully selected for purity, delivering clean, authentic taste 
                profiles that elevate your vaping experience.
              </p>
            </div>

            {/* Safety Standards */}
            <div className="space-y-4 text-left">
              <h3 className="text-xl font-light text-foreground">Safety First</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Safety is paramount in everything we do. Our products undergo comprehensive testing 
                and comply with international safety standards, ensuring peace of mind with every puff.
              </p>
            </div>

            {/* Innovation */}
            <div className="space-y-4 text-left">
              <h3 className="text-xl font-light text-foreground">R&D Innovation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our dedicated research and development team continuously explores new technologies 
                and techniques. We invest heavily in innovation to bring you tomorrow's vaping 
                experiences today.
              </p>
            </div>

            {/* Commitment */}
            <div className="space-y-4 text-left">
              <h3 className="text-xl font-light text-foreground">Our Promise</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                LUSMIND represents our commitment to excellence in every detail. From concept to 
                delivery, we ensure that quality, safety, and satisfaction are built into every 
                product we create.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCTA;
