import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialMediaAccountGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SocialMediaAccountGrid />
      <Footer />
    </div>
  );
};

export default Index;
