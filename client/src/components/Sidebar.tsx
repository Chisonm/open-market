import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface SidebarProps {
  selectedPlatforms: string[];
  onPlatformChange: (platforms: string[]) => void;
}

const categories = [
  {
    name: "Social Media",
    icon: "🛡️",
    subcategories: [
      { name: "Facebook", checked: false },
      { name: "Twitter", checked: false },
      { name: "Instagram", checked: false },
      { name: "LinkedIn", checked: false },
      { name: "Pinterest", checked: false },
      { name: "Snapchat", checked: false },
      { name: "TikTok", checked: false },
      { name: "Threads", checked: false },
      { name: "Tinder", checked: false },
      { name: "Bumble", checked: false },
      { name: "Reddit", checked: false },
      { name: "Discord", checked: false },
      { name: "POF", checked: false },
      { name: "Hinge", checked: false },
      { name: "Grindr", checked: false },
      { name: "Viber", checked: false },
      { name: "CMM", checked: false },
      { name: "Quora", checked: false },
      { name: "Match", checked: false },
      { name: "Ourtime", checked: false },
    ]
  },
  {
    name: "Emails & Messaging Service",
    icon: "↗️",
    subcategories: []
  },
  {
    name: "Giftcards",
    icon: "🎁",
    subcategories: []
  },
  {
    name: "VPN & PROXYs",
    icon: "🌐",
    subcategories: []
  },
  {
    name: "Websites",
    icon: "💻",
    subcategories: []
  },
  {
    name: "E-commerce Platforms",
    icon: "🛒",
    subcategories: []
  },
  {
    name: "Gaming",
    icon: "🎮",
    subcategories: []
  },
  {
    name: "Accounts & Subscriptions",
    icon: "💰",
    subcategories: []
  },
  {
    name: "Others",
    icon: "⏰",
    subcategories: []
  }
];

const Sidebar = ({ selectedPlatforms, onPlatformChange }: SidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("1000");

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handlePlatformToggle = (platform: string) => {
    const updatedPlatforms = selectedPlatforms.includes(platform.toLowerCase())
      ? selectedPlatforms.filter(p => p !== platform.toLowerCase())
      : [...selectedPlatforms, platform.toLowerCase()];
    onPlatformChange(updatedPlatforms);
  };

  const handleSliderChange = (values: number[]) => {
    setPriceRange(values);
    setMinPrice(values[0].toString());
    setMaxPrice(values[1].toString());
  };

  const handleMinPriceChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setMinPrice(value);
    setPriceRange([numValue, priceRange[1]]);
  };

  const handleMaxPriceChange = (value: string) => {
    const numValue = parseInt(value) || 1000;
    setMaxPrice(value);
    setPriceRange([priceRange[0], numValue]);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0 hidden lg:block">
      <div className="p-4 lg:p-6 h-full overflow-y-auto">
        {/* Filter Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Filter</h2>
          <h3 className="text-base font-medium text-gray-900 mb-4">Account Category</h3>
        </div>

        {/* Categories */}
        <div className="space-y-2 mb-8">
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.name);
            
            return (
              <div key={category.name}>
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-gray-900 font-medium text-left">{category.name}</span>
                  </div>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 text-gray-400 transition-transform",
                      isExpanded ? "rotate-180" : ""
                    )} 
                  />
                </button>
                
                {isExpanded && category.subcategories.length > 0 && (
                  <div className="ml-10 mt-2 space-y-3 pb-2">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={subcategory.name}
                          checked={selectedPlatforms.includes(subcategory.name.toLowerCase())}
                          onCheckedChange={() => handlePlatformToggle(subcategory.name)}
                          className="h-4 w-4"
                        />
                        <label
                          htmlFor={subcategory.name}
                          className={cn(
                            "text-sm cursor-pointer",
                            selectedPlatforms.includes(subcategory.name.toLowerCase())
                              ? "text-orange-600 font-medium"
                              : "text-gray-700"
                          )}
                        >
                          {subcategory.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-900">Price range</h3>
          
          {/* Slider */}
          <div className="px-1">
            <Slider
              value={priceRange}
              onValueChange={handleSliderChange}
              min={0}
              max={2000}
              step={10}
              className="w-full"
            />
          </div>

          {/* Min/Max Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Minimum</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                <Input
                  type="number"
                  value={minPrice}
                  onChange={(e) => handleMinPriceChange(e.target.value)}
                  className="pl-7 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  min="0"
                  max="2000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Maximum</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                <Input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => handleMaxPriceChange(e.target.value)}
                  className="pl-7 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  min="0"
                  max="2000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;