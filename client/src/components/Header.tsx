import { Bell, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProfileDropdown from "@/components/ProfileDropdown";
import type { CartItem, SocialMediaAccount } from "@shared/schema";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Header = ({ searchTerm, onSearchChange }: HeaderProps) => {
  const { data: cartItems = [] } = useQuery({
    queryKey: ['/api/cart/1'],
    queryFn: () => fetch('/api/cart/1').then(res => res.json()) as Promise<(CartItem & { account: SocialMediaAccount })[]>
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="h-8 w-8 rounded bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-xl text-gray-900">acctbazaar</span>
              </div>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-900 font-medium border-b-2 border-orange-500 pb-4">
                Marketplace
              </Link>
              <Link href="/purchases" className="text-gray-600 hover:text-gray-900 pb-4">
                My Purchase
              </Link>
              <Link href="/wallet" className="text-gray-600 hover:text-gray-900 pb-4">
                Wallet
              </Link>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/sell">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-6 text-sm">
                <span className="hidden sm:inline">Sell Product</span>
                <span className="sm:hidden">Sell</span>
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <div className="hidden sm:flex">
              <ProfileDropdown />
            </div>

            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;