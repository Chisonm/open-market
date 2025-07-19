import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";

interface MobileFiltersProps {
  selectedPlatforms: string[];
  onPlatformChange: (platforms: string[]) => void;
}

const MobileFilters = ({ selectedPlatforms, onPlatformChange }: MobileFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex-1 justify-start bg-orange-500 hover:bg-orange-600 text-white border-orange-500">
          <Menu className="h-4 w-4 mr-2" />
          Filters & Categories
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-80">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle>Filters & Categories</SheetTitle>
          <SheetDescription>
            Filter products by category and platform
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <Sidebar 
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={onPlatformChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;