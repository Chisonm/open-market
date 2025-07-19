import { useState } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-orange-500 text-white">JD</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center space-x-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-orange-500 text-white">JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-gray-500">john.doe@example.com</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="h-4 w-4 mr-2" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;