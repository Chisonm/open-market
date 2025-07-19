import { Heart, Eye, Users, TrendingUp, BadgeCheck, Instagram, Twitter, Facebook, Youtube, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { SocialMediaAccount } from "@shared/schema";

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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
      <CardContent className="p-0">
        {/* Header with Platform */}
        <div className="relative p-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PlatformIcon platform={account.platform} />
              <span className="font-semibold text-sm capitalize">{account.platform}</span>
              {account.verified && (
                <BadgeCheck className="h-4 w-4 text-blue-500" />
              )}
            </div>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Account Handle */}
          <h3 className="text-lg font-bold mt-2 text-gray-800">{account.accountHandle}</h3>
          
          {/* Category */}
          <Badge variant="secondary" className="mt-2">
            {account.category}
          </Badge>
        </div>

        {/* Stats */}
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center space-x-1">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="font-bold text-lg">{formatFollowers(account.followers)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Followers</p>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-bold text-lg">{engagement.toFixed(1)}%</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Engagement</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-3">
            {account.description}
          </p>

          {/* Additional Info */}
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Age: {account.age} months</span>
            <span className="capitalize">{account.status}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-green-600">${price.toLocaleString()}</span>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            Buy Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SocialMediaAccountCard;