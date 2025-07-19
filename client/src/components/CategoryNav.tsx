import { 
  Smartphone, 
  Laptop, 
  Car, 
  Home, 
  Shirt, 
  Gamepad2, 
  Book, 
  Dumbbell,
  Wrench
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const categories = [
  { name: "Electronics", icon: Smartphone, color: "text-blue-600" },
  { name: "Computers", icon: Laptop, color: "text-purple-600" },
  { name: "Vehicles", icon: Car, color: "text-red-600" },
  { name: "Home & Garden", icon: Home, color: "text-green-600" },
  { name: "Fashion", icon: Shirt, color: "text-pink-600" },
  { name: "Gaming", icon: Gamepad2, color: "text-orange-600" },
  { name: "Books", icon: Book, color: "text-amber-600" },
  { name: "Sports", icon: Dumbbell, color: "text-emerald-600" },
  { name: "Tools", icon: Wrench, color: "text-gray-600" },
];

const CategoryNav = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <div className="bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Browse Categories</h2>
          <div className="flex-1 max-w-xs ml-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <SelectItem key={category.name} value={category.name}>
                      <div className="flex items-center space-x-2">
                        <IconComponent className={`h-4 w-4 ${category.color}`} />
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;