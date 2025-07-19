import { User, Search, Bell, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
            <nav className="hidden lg:flex items-start space-x-8">
              <div className="space-y-3">
                <Link href="/" className="text-gray-900 font-medium border-b-2 border-orange-500 pb-1 block">
                  Marketplace
                </Link>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by name or description"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 w-72 xl:w-80 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="pt-4">
                <Link href="/purchases" className="text-gray-600 hover:text-gray-900">
                  My Purchase
                </Link>
              </div>
              <div className="pt-4">
                <Link href="/wallet" className="text-gray-600 hover:text-gray-900">
                  Wallet
                </Link>
              </div>
            </nav>

            {/* Mobile Search */}
            <div className="flex-1 mx-4 lg:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
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
            
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>

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