import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Music, 
  Gamepad2, 
  Camera, 
  Dumbbell,
  Briefcase
} from "lucide-react";

interface CategoryNavProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { name: "All", color: "text-gray-600" },
  { name: "lifestyle", color: "text-pink-600" },
  { name: "technology", color: "text-blue-600" },
  { name: "entertainment", color: "text-purple-600" },
  { name: "food", color: "text-orange-600" },
  { name: "fitness", color: "text-green-600" },
  { name: "gaming", color: "text-red-600" },
  { name: "business", color: "text-gray-800" },
  { name: "fashion", color: "text-pink-500" },
];

const CategoryNav = ({ selectedCategory, onCategoryChange }: CategoryNavProps) => {
  return (
    <div className="bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Browse Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onCategoryChange(category.name === "All" ? "" : category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === (category.name === "All" ? "" : category.name)
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <span className={category.color}>{category.name === "All" ? "All" : category.name.charAt(0).toUpperCase() + category.name.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;