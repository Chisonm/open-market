import { User, Heart, Menu, Plus, ShoppingCart, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItem, SocialMediaAccount } from "@shared/schema";
import { Link } from "wouter";

const CartPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['/api/cart/1'],
    queryFn: () => fetch('/api/cart/1').then(res => res.json()) as Promise<(CartItem & { account: SocialMediaAccount })[]>
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (accountId: number) => {
      const response = await fetch(`/api/cart/1/${accountId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to remove item');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart/1'] });
    }
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.account.price), 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {cartItems.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cartItems.length})</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {isLoading ? (
            <p>Loading cart...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.account.accountHandle}</h4>
                    <p className="text-sm text-gray-500 capitalize">{item.account.platform}</p>
                    <p className="text-sm font-medium text-green-600">${parseFloat(item.account.price).toLocaleString()}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCartMutation.mutate(item.account.id)}
                    disabled={removeFromCartMutation.isPending}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold text-green-600">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="space-y-2">
                  <Link href="/cart">
                    <Button className="w-full" onClick={() => setIsOpen(false)}>
                      View Full Cart
                    </Button>
                  </Link>
                  <Button className="w-full" variant="outline">
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <nav className="mt-6 space-y-4">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
              Home
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
              Cart
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start">
            <Heart className="h-4 w-4 mr-2" />
            Favorites
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Sell Account
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <MobileMenu />
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <span className="hidden font-bold sm:inline-block text-xl">SocialMarket</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <CartPreview />
            <Button variant="outline" size="sm" className="hidden md:flex">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Sell Account
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;