import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Star, User, ArrowLeft, ShoppingCart } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItem, SocialMediaAccount } from "@shared/schema";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cart = () => {
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

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/cart/1', {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart/1'] });
    }
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.account.price), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Loading your cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Browse our social media accounts to add some to your cart.</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Browse Accounts
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Cart Items</h2>
                {cartItems.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => clearCartMutation.mutate()}
                    disabled={clearCartMutation.isPending}
                  >
                    Clear Cart
                  </Button>
                )}
              </div>
              
              {cartItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      {/* Platform Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium capitalize">{item.account.platform[0]}</span>
                        </div>
                      </div>
                      
                      {/* Account Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{item.account.accountHandle}</h3>
                          {item.account.verified && (
                            <Badge variant="secondary" className="text-xs">Verified</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="capitalize font-medium">{item.account.platform}</span>
                          <span>•</span>
                          <span>{item.account.followers.toLocaleString()} followers</span>
                          <span>•</span>
                          <span>{parseFloat(item.account.engagement || '0').toFixed(1)}% engagement</span>
                        </div>
                        
                        {/* Seller Info */}
                        {item.account.sellerName && (
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-600">{item.account.sellerName}</span>
                            {item.account.sellerRating && (
                              <>
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-gray-600">
                                  {parseFloat(item.account.sellerRating).toFixed(1)}
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Price and Actions */}
                      <div className="flex-shrink-0 text-right">
                        <p className="text-2xl font-bold text-green-600 mb-2">
                          ${parseFloat(item.account.price).toLocaleString()}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCartMutation.mutate(item.account.id)}
                          disabled={removeFromCartMutation.isPending}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Platform fee</span>
                    <span>$0</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Transaction fee</span>
                    <span>$0</span>
                  </div>
                  
                  <hr />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">${totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Proceed to Checkout
                    </Button>
                    <Link href="/">
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;