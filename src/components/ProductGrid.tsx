
import ProductCard from "./ProductCard";

// Mock data for demonstration
const mockProducts = [
  {
    id: "1",
    title: "iPhone 14 Pro Max - Excellent Condition",
    price: 899,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop",
    seller: "TechDealer_Mike",
    location: "San Francisco, CA",
    rating: 4.8,
    reviewCount: 127,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "2",
    title: "MacBook Air M2 - Brand New Sealed",
    price: 1199,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    seller: "AppleStore_Official",
    location: "New York, NY",
    rating: 5.0,
    reviewCount: 89,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "3",
    title: "Vintage Leather Jacket - Size M",
    price: 75,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    seller: "VintageVibes",
    location: "Austin, TX",
    rating: 4.6,
    reviewCount: 43,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "4",
    title: "Gaming Setup - Monitor, Keyboard, Mouse",
    price: 450,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop",
    seller: "GamerHub_Pro",
    location: "Seattle, WA",
    rating: 4.7,
    reviewCount: 68,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "5",
    title: "Handmade Ceramic Vase Set",
    price: 35,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    seller: "ArtisanCrafts",
    location: "Portland, OR",
    rating: 4.9,
    reviewCount: 152,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "6",
    title: "Professional Camera Lens - Canon 50mm",
    price: 320,
    originalPrice: 450,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
    seller: "PhotoPro_Shop",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviewCount: 91,
    isNew: false,
    isFeatured: false,
  },
];

const ProductGrid = () => {
  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Discover amazing deals from our community of sellers
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs md:text-sm text-muted-foreground">Sort by:</span>
            <select className="border border-input rounded-md px-2 md:px-3 py-1 text-xs md:text-sm bg-background min-w-0 flex-shrink-0">
              <option>Most Recent</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {mockProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          <button className="inline-flex items-center justify-center gap-2 h-10 md:h-11 px-6 md:px-8 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors text-sm md:text-base">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
