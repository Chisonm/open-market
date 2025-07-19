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
    <div className="w-full h-full overflow-y-auto bg-white text-gray-900 p-6 space-y-6 border-r">
      {/* Filter Header */}
      <h2 className="text-2xl font-bold text-gray-900">Filter</h2>

      {/* Account Category */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Account Category</h3>
        <hr className="border-gray-200" />
        
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="flex items-center space-x-3">
              <span className="text-lg">{category.icon}</span>
              <span className="text-gray-700">{category.name}</span>
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
        <h3 className="text-lg font-medium text-gray-900">Price range</h3>
        
        {/* Price Range Slider */}
        <div className="px-2">
          <div className="relative">
            <Slider
              value={priceRange}
              onValueChange={(value) => {
                setPriceRange(value);
                onMaxPriceChange(value[1].toString());
              }}
              min={0}
              max={2000}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>$0</span>
              <span>$2000</span>
            </div>
          </div>
        </div>

        {/* Min/Max Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-600 text-sm">Minimum</Label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <span className="text-gray-900 text-lg">${priceRange[0]}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-600 text-sm">Maximum</Label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <span className="text-gray-900 text-lg">${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
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
      <div className="hidden lg:block lg:w-80 bg-white border-r border-gray-200">
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
          <SheetContent side="left" className="w-[350px] p-0 bg-white border-gray-200">
            <FilterSidebarContent {...props} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default FilterSidebar;