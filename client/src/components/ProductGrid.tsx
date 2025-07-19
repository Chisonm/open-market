
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SocialMediaAccountCard from "./SocialMediaAccountCard";
import FilterSidebar from "./FilterSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import type { SocialMediaAccount } from "@shared/schema";

const SocialMediaAccountGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minFollowers, setMinFollowers] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("followers");
  const [sortOrder, setSortOrder] = useState("desc");

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (selectedPlatform && selectedPlatform !== "all") queryParams.append("platform", selectedPlatform);
  if (selectedCategory) queryParams.append("category", selectedCategory);
  if (minFollowers) queryParams.append("minFollowers", minFollowers);
  if (maxPrice) queryParams.append("maxPrice", maxPrice);
  if (sortBy) queryParams.append("sortBy", sortBy);
  if (sortOrder) queryParams.append("sortOrder", sortOrder);

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

  const handleClearFilters = () => {
    setSelectedPlatform("all");
    setSelectedCategory("");
    setMinFollowers("");
    setMaxPrice("");
    setSearchTerm("");
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Accounts</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Filter Sidebar */}
      <FilterSidebar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedPlatform={selectedPlatform}
        onPlatformChange={setSelectedPlatform}
        minFollowers={minFollowers}
        onMinFollowersChange={setMinFollowers}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onClearFilters={handleClearFilters}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile Filter Button */}
        <div className="lg:hidden p-4 bg-white border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Social Media Accounts</h1>
            <FilterSidebar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
              minFollowers={minFollowers}
              onMinFollowersChange={setMinFollowers}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>

        <div className="p-4 lg:p-6">
          {/* Results Header */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Social Media Accounts</h1>
              {!isLoading && (
                <p className="text-gray-600 mt-1">
                  {filteredAccounts.length} {filteredAccounts.length === 1 ? 'account' : 'accounts'} found
                </p>
              )}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Accounts Grid */}
          {!isLoading && filteredAccounts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccounts.map((account) => (
                <SocialMediaAccountCard key={account.id} account={account} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredAccounts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No accounts found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
              <button
                onClick={handleClearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAccountGrid;
