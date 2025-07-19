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
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [followerRange, setFollowerRange] = useState([0, 1000000]);

  const hasActiveFilters = (selectedPlatform && selectedPlatform !== "all") || minFollowers || maxPrice;

  return (
    <div className="w-full h-full overflow-y-auto p-6 space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Search Accounts</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search handles, descriptions..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Separator />

      {/* Platform Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Platform</Label>
        <div className="grid grid-cols-1 gap-2">
          {platforms.map((platform) => (
            <div
              key={platform.value}
              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedPlatform === platform.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => onPlatformChange(platform.value)}
            >
              {platform.icon && <platform.icon className="h-4 w-4" />}
              <span className="text-sm">{platform.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Followers Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Minimum Followers</Label>
        <Input
          type="number"
          placeholder="e.g., 10000"
          value={minFollowers}
          onChange={(e) => onMinFollowersChange(e.target.value)}
        />
        <div className="text-xs text-gray-500">
          Popular ranges: 1K-10K (Micro), 10K-100K (Mid-tier), 100K+ (Macro)
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Maximum Price</Label>
        <Input
          type="number"
          placeholder="e.g., 5000"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
        />
        <div className="text-xs text-gray-500">
          Set your budget limit in USD
        </div>
      </div>

      <Separator />

      {/* Sorting */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Sort Results</Label>
        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={onSortOrderChange}>
          <SelectTrigger>
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Low to High</SelectItem>
            <SelectItem value="desc">High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full"
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
      <div className="hidden lg:block lg:w-80 bg-white border-r">
        <div className="sticky top-16">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center">
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters & Search
            </h2>
          </div>
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
          <SheetContent side="left" className="w-[350px] p-0">
            <SheetHeader className="p-6 pb-0">
              <SheetTitle className="flex items-center">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters & Search
              </SheetTitle>
            </SheetHeader>
            <FilterSidebarContent {...props} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default FilterSidebar;