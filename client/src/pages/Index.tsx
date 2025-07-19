import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AccountCard from "@/components/AccountCard";
import ProfileDropdown from "@/components/ProfileDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Menu, Search } from "lucide-react";
import type { SocialMediaAccount } from "@shared/schema";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (selectedPlatforms.length > 0) {
    // Only filter by first selected platform for simplicity
    queryParams.append("platform", selectedPlatforms[0]);
  }

  const { data: accounts, isLoading, error } = useQuery<SocialMediaAccount[]>({
    queryKey: ["/api/accounts", queryParams.toString()],
    queryFn: async () => {
      const response = await fetch(`/api/accounts?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }
      return response.json();
    },
  });

  // Filter by search term on client side
  const filteredAccounts = accounts?.filter(account => 
    searchTerm === "" || 
    account.accountHandle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.platform.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Accounts</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <Sidebar
          selectedPlatforms={selectedPlatforms}
          onPlatformChange={setSelectedPlatforms}
        />

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden p-4 border-b bg-white flex items-center justify-between">
          <Button variant="outline" className="flex-1 justify-start mr-4">
            <Menu className="h-4 w-4 mr-2" />
            Filters & Categories
          </Button>
          <div className="sm:hidden">
            <ProfileDropdown />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Marketplace</h1>
              <p className="text-sm sm:text-base text-gray-600 mb-4">Access all products on the marketplace by our verified sellers</p>
              
              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name or description"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 w-full max-w-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              
              {!isLoading && (
                <p className="text-sm text-gray-500">
                  {filteredAccounts.length} {filteredAccounts.length === 1 ? 'account' : 'accounts'} found
                </p>
              )}
            </div>

            {/* Latest accounts section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Latest account</h2>
                <div className="w-8 h-1 bg-orange-500 rounded"></div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Accounts List */}
              {!isLoading && filteredAccounts.length > 0 && (
                <div className="space-y-4">
                  {filteredAccounts.map((account) => (
                    <AccountCard key={account.id} account={account} />
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isLoading && filteredAccounts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
