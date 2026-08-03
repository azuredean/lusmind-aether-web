import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import StorySplit from "@/components/home/StorySplit";
import FeaturedFlavors from "@/components/home/FeaturedFlavors";
import ProductLines from "@/components/home/ProductLines";
import BrandValues from "@/components/home/BrandValues";
import Experiences from "@/components/home/Experiences";
import NewsletterCTA from "@/components/home/NewsletterCTA";
import HomeFooter from "@/components/home/HomeFooter";

const Home = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Warning Bar */}
      <div className="fixed top-0 left-0 right-0 w-full border-b bg-black text-white border-white/20 z-[60]">
        <div className="max-w-6xl mx-auto px-4 py-2 text-center text-xs md:text-sm tracking-wide">
          WARNING: This product contains nicotine. Nicotine is an addictive chemical.
        </div>
      </div>

      <Navbar theme="light" />

      <main className="pt-24">
        <HomeHero />
        <StorySplit />
        <FeaturedFlavors />
        <ProductLines />
        <BrandValues />
        <Experiences />
        <NewsletterCTA />
      </main>

      <HomeFooter />
    </div>
  );
};

export default Home;
