import { Heart, Eye, Users, TrendingUp, BadgeCheck, Instagram, Twitter, Facebook, Youtube, Music, ShoppingCart, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { SocialMediaAccount } from "@shared/schema";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SocialMediaAccountCardProps {
  account: SocialMediaAccount;
}

const PlatformIcon = ({ platform }: { platform: string }) => {
  const iconProps = { className: "h-5 w-5" };
  
  switch (platform.toLowerCase()) {
    case 'instagram':
      return <Instagram {...iconProps} className="h-5 w-5 text-pink-500" />;
    case 'twitter':
      return <Twitter {...iconProps} className="h-5 w-5 text-blue-400" />;
    case 'facebook':
      return <Facebook {...iconProps} className="h-5 w-5 text-blue-600" />;
    case 'youtube':
      return <Youtube {...iconProps} className="h-5 w-5 text-red-500" />;
    case 'tiktok':
      return <Music {...iconProps} className="h-5 w-5 text-black" />;
    default:
      return <Eye {...iconProps} />;
  }
};

const formatFollowers = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const SocialMediaAccountCard = ({ account }: SocialMediaAccountCardProps) => {
  const price = parseFloat(account.price);
  const engagement = parseFloat(account.engagement || '0');
  const queryClient = useQueryClient();

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
    <Card className="group hover:shadow-md transition-all duration-200 border border-gray-200 bg-white">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Platform Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <PlatformIcon platform={account.platform} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Account Handle and Platform */}
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {account.accountHandle}
                  </h3>
                  {account.verified && (
                    <BadgeCheck className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  )}
                </div>
                
                {/* Platform and Description */}
                <p className="text-sm text-gray-600 capitalize mb-2">
                  {account.platform} account • {account.description ? account.description.substring(0, 60) + '...' : 'Premium social media account'}
                </p>

                {/* Seller Info */}
                {account.sellerName && (
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                    <User className="h-3 w-3 text-red-500" />
                    <span className="font-medium text-red-500">{account.sellerName}</span>
                    {account.sellerRating && (
                      <>
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{parseFloat(account.sellerRating).toFixed(1)}</span>
                      </>
                    )}
                    <span className="text-gray-400">•</span>
                    <span>Delivers in: 5 mins</span>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">
                      {formatFollowers(account.followers)} followers
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">
                      {engagement.toFixed(1)}% engagement
                    </span>
                  </div>
                </div>
              </div>

              {/* Price and Action */}
              <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ${price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaAccountCard;