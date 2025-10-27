import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooterCTA from "@/components/PreFooterCTA";
import BackedBy from "@/components/BackedBy";
import heroImage from "@/assets/disposable-hero.png";

const Disposable = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar theme="dark" />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Disposable Vape Products" 
            className="w-full h-full object-cover object-center"
            style={{ 
              objectFit: 'cover',
              maxWidth: '100%',
              height: '100%'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6">
              Disposable Vapes
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-8 max-w-2xl mx-auto">
              Experience ultimate convenience with our premium disposable vape collection
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-light text-lg transition-all"
            >
              Explore Collection
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Why Choose Disposable?
            </h2>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              Designed for simplicity, crafted for satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "No Maintenance",
                description: "No refilling, no charging, no complications. Just pure enjoyment."
              },
              {
                title: "Portable Design",
                description: "Sleek and compact, fits perfectly in your pocket or bag."
              },
              {
                title: "Premium Flavors",
                description: "Wide selection of authentic flavors crafted with quality ingredients."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background p-8 rounded-lg border border-border"
              >
                <h3 className="text-2xl font-light text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Product Specifications
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Puff Count", value: "Up to 5000 puffs" },
                { label: "Battery", value: "Integrated rechargeable" },
                { label: "E-liquid Capacity", value: "12ml" },
                { label: "Nicotine Strength", value: "2% / 5%" },
                { label: "Flavors Available", value: "27 varieties" },
                { label: "Activation", value: "Draw-activated" }
              ].map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex justify-between items-center py-3 border-b border-border"
                >
                  <span className="text-muted-foreground font-light">{spec.label}</span>
                  <span className="text-foreground font-light">{spec.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BackedBy />
      <PreFooterCTA />
      <Footer />
    </div>
  );
};

export default Disposable;
