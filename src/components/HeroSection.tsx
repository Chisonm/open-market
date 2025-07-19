import { Search, ArrowRight, Users, ShoppingBag, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-marketplace.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Marketplace Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Your Open
            <span className="text-hero-accent"> Marketplace</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up">
            Buy and sell anything with trust and transparency. 
            Connect with your community today.
          </p>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12 animate-scale-in">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="What are you looking for?"
                className="pl-10 h-12 text-base bg-white border-0 shadow-lg"
              />
            </div>
            <Button variant="accent" size="lg" className="h-12 px-8">
              Search <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button variant="hero" size="xl">
              Start Shopping
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
              Start Selling
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center text-white animate-float">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-hero-accent mr-2" />
                <span className="text-3xl font-bold">10K+</span>
              </div>
              <p className="text-white/80">Active Users</p>
            </div>
            
            <div className="text-center text-white animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center justify-center mb-2">
                <ShoppingBag className="h-8 w-8 text-hero-accent mr-2" />
                <span className="text-3xl font-bold">50K+</span>
              </div>
              <p className="text-white/80">Products Listed</p>
            </div>
            
            <div className="text-center text-white animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-hero-accent mr-2" />
                <span className="text-3xl font-bold">100%</span>
              </div>
              <p className="text-white/80">Secure Transactions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;