import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Filter, X, Search, SlidersHorizontal } from "lucide-react";
import { SiInstagram, SiX, SiFacebook, SiTiktok, SiYoutube } from "react-icons/si";

interface FilterSidebarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedPlatform: string;
  onPlatformChange: (value: string) => void;
  minFollowers: string;
  onMinFollowersChange: (value: string) => void;
  maxPrice: string;
  onMaxPriceChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  sortOrder: string;
  onSortOrderChange: (value: string) => void;
  onClearFilters: () => void;
}

const platforms = [
  { value: "all", label: "All Platforms", icon: null },
  { value: "instagram", label: "Instagram", icon: SiInstagram },
  { value: "twitter", label: "Twitter", icon: SiX },
  { value: "facebook", label: "Facebook", icon: SiFacebook },
  { value: "tiktok", label: "TikTok", icon: SiTiktok },
  { value: "youtube", label: "YouTube", icon: SiYoutube },
];

const categories = [
  "lifestyle", "technology", "entertainment", "food", 
  "fitness", "gaming", "fashion", "travel", "business", "education"
];

const sortOptions = [
  { value: "price", label: "Price" },
  { value: "followers", label: "Followers" },
  { value: "engagement", label: "Engagement Rate" },
  { value: "createdAt", label: "Date Listed" },
];

const FilterSidebarContent = ({
  searchTerm,
  onSearchChange,
  selectedPlatform,
  onPlatformChange,
  minFollowers,
  onMinFollowersChange,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  onClearFilters,
}: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState([89, 1000]);
  const hasActiveFilters = (selectedPlatform && selectedPlatform !== "all") || minFollowers || maxPrice;

  const categories = [
    { name: "Social Media", icon: "🛡️", expanded: true },
    { name: "Emails & Messaging Service", icon: "↗️", expanded: false },
    { name: "Giftcards", icon: "🎁", expanded: false },
    { name: "VPN & PROXYs", icon: "🌐", expanded: false },
    { name: "Websites", icon: "💻", expanded: false },
    { name: "E-commerce Platforms", icon: "🛒", expanded: false },
    { name: "Gaming", icon: "🎮", expanded: false },
    { name: "Accounts & Subscriptions", icon: "💰", expanded: false },
    { name: "Others", icon: "⏰", expanded: false },
  ];

  return (
    <div className="w-full h-full overflow-y-auto bg-black text-white p-6 space-y-6">
      {/* Filter Header */}
      <h2 className="text-2xl font-bold text-white">Filter</h2>

      {/* Account Category */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Account Category</h3>
        <hr className="border-gray-600" />
        
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
            <div className="flex items-center space-x-3">
              <span className="text-lg">{category.icon}</span>
              <span className="text-white">{category.name}</span>
            </div>
            <svg 
              className="w-4 h-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Price range</h3>
        
        {/* Price Range Slider */}
        <div className="px-2">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="absolute w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="absolute w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between items-center mt-8">
              <div className="w-20 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1 h-2 bg-orange-500 rounded-full mx-2"></div>
              <div className="w-20 h-2 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Min/Max Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-400 text-sm">Minimum</Label>
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3">
              <span className="text-white text-lg">$ {priceRange[0]}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400 text-sm">Maximum</Label>
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3">
              <span className="text-white text-lg">$ {priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );
};

const FilterSidebar = (props: FilterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-80 bg-black border-r border-gray-800">
        <div className="sticky top-16">
          <FilterSidebarContent {...props} />
        </div>
      </div>

      {/* Mobile Sheet */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {((props.selectedPlatform && props.selectedPlatform !== "all") || props.minFollowers || props.maxPrice) && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[350px] p-0 bg-black border-gray-800">
            <FilterSidebarContent {...props} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default FilterSidebar;