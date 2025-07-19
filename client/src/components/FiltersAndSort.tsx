import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface FiltersAndSortProps {
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
  { value: "all", label: "All Platforms" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
];

const sortOptions = [
  { value: "price", label: "Price" },
  { value: "followers", label: "Followers" },
  { value: "engagement", label: "Engagement Rate" },
  { value: "createdAt", label: "Date Listed" },
];

const FiltersAndSort = ({
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
}: FiltersAndSortProps) => {
  const hasActiveFilters = (selectedPlatform && selectedPlatform !== "all") || minFollowers || maxPrice;

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search accounts by handle, description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>

          {/* Platform Filter */}
          <div className="w-full lg:w-40">
            <Select value={selectedPlatform} onValueChange={onPlatformChange}>
              <SelectTrigger>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={onSortByChange}>
              <SelectTrigger className="w-32">
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
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>
          </div>

          {/* Advanced Filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                    !
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Minimum Followers</label>
                  <Input
                    type="number"
                    placeholder="e.g., 10000"
                    value={minFollowers}
                    onChange={(e) => onMinFollowersChange(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Maximum Price ($)</label>
                  <Input
                    type="number"
                    placeholder="e.g., 5000"
                    value={maxPrice}
                    onChange={(e) => onMaxPriceChange(e.target.value)}
                  />
                </div>

                {hasActiveFilters && (
                  <Button 
                    variant="outline" 
                    onClick={onClearFilters}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default FiltersAndSort;