import { Star, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { SocialMediaAccount } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

interface AccountCardProps {
  account: SocialMediaAccount;
}

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return '📷';
    case 'twitter':
      return '🐦';
    case 'facebook':
      return '👥';
    case 'tiktok':
      return '🎵';
    case 'youtube':
      return '📺';
    default:
      return '🌐';
  }
};

const AccountCard = ({ account }: AccountCardProps) => {
  const queryClient = useQueryClient();
  const price = parseFloat(account.price);

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, accountId: account.id })
      });
      
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Added to cart",
        description: `${account.accountHandle} has been added to your cart.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/cart/1'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleAddToCart = () => {
    addToCartMutation.mutate();
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Platform Icon */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl sm:text-2xl">
              {getPlatformIcon(account.platform)}
            </div>
          </div>

          {/* Account Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                  {account.accountHandle}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-1 line-clamp-2">
                  {account.description || `${account.platform} account with ${account.followers.toLocaleString()} followers`}
                </p>
                
                {/* Seller Info */}
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                  <span className="font-medium text-orange-600">{account.sellerName}</span>
                  {account.sellerRating && (
                    <>
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>{parseFloat(account.sellerRating).toFixed(1)}</span>
                    </>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    Delivers Instantly
                  </Badge>
                </div>
              </div>

              {/* Price and Rating */}
              <div className="text-right flex-shrink-0 ml-2">
                <div className="flex items-center space-x-1 mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">8.4/5</span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  ${price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                onClick={handleAddToCart}
                disabled={addToCartMutation.isPending}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {addToCartMutation.isPending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <ShoppingCart className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;