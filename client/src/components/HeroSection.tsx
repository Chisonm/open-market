import { Search, ArrowRight, Users, Instagram, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Buy & Sell
            <span className="text-yellow-300"> Social Media Accounts</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Discover premium social media accounts across Instagram, Twitter, TikTok, and more. 
            Verified accounts with real engagement.
          </p>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by platform or niche..."
                className="pl-10 h-12 text-base bg-white border-0 shadow-lg"
              />
            </div>
            <Button size="lg" className="h-12 px-8 bg-yellow-400 text-black hover:bg-yellow-500">
              Search <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button size="xl" className="bg-white text-purple-700 hover:bg-gray-100">
              Browse Accounts
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-purple-700">
              List Your Account
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-yellow-300 mr-2" />
                <span className="text-3xl font-bold">2.5K+</span>
              </div>
              <p className="text-white/80">Happy Buyers</p>
            </div>
            
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-2">
                <Instagram className="h-8 w-8 text-yellow-300 mr-2" />
                <span className="text-3xl font-bold">8K+</span>
              </div>
              <p className="text-white/80">Accounts Available</p>
            </div>
            
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-yellow-300 mr-2" />
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