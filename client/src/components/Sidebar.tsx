import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface SidebarProps {
  selectedPlatforms: string[];
  onPlatformChange: (platforms: string[]) => void;
}

const categories = [
  {
    name: "Social Media",
    icon: "🌐",
    expanded: true,
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
  }
];

const Sidebar = ({ selectedPlatforms, onPlatformChange }: SidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState(["Social Media"]);

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

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter</h2>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Account Category</h3>
        </div>

        {categories.map((category) => {
          const isExpanded = expandedCategories.includes(category.name);
          
          return (
            <div key={category.name} className="mb-4">
              <button
                onClick={() => toggleCategory(category.name)}
                className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-gray-700 font-medium">{category.name}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </button>
              
              {isExpanded && (
                <div className="ml-6 mt-2 space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.name} className="flex items-center space-x-2 py-1">
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
                            : "text-gray-600"
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
    </div>
  );
};

export default Sidebar;