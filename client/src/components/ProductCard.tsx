
import { Heart, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  seller: string;
  location: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

const ProductCard = ({
  id,
  title,
  price,
  originalPrice,
  image,
  seller,
  location,
  rating,
  reviewCount,
  isNew = false,
  isFeatured = false,
}: ProductCardProps) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-product-hover cursor-pointer h-full flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {isNew && <Badge variant="secondary" className="text-xs">New</Badge>}
          {isFeatured && <Badge variant="destructive" className="text-xs">Featured</Badge>}
        </div>
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 md:h-8 md:w-8 bg-background/80 backdrop-blur-sm hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </div>

      <CardContent className="p-3 md:p-4 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors text-sm md:text-base min-h-[2.5rem] md:min-h-[3rem]">
          {title}
        </h3>
        
        {/* Rating & Reviews */}
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
          <span className="text-xs md:text-sm font-medium">{rating}</span>
          <span className="text-xs md:text-sm text-muted-foreground">({reviewCount})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-base md:text-lg font-bold text-price">${price}</span>
          {originalPrice && (
            <span className="text-xs md:text-sm text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
        </div>
        
        {/* Seller & Location - Push to bottom */}
        <div className="text-xs md:text-sm text-muted-foreground mt-auto">
          <div className="mb-1 truncate">by {seller}</div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 md:p-4 pt-0 mt-auto">
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-xs md:text-sm h-8 md:h-9"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
