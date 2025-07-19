import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const sellProductSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  accountHandle: z.string().min(1, "Account handle is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  followers: z.string().transform((val) => parseInt(val)).refine((val) => val > 0, "Followers must be a positive number"),
  price: z.string().transform((val) => parseFloat(val)).refine((val) => val > 0, "Price must be a positive number"),
  sellerName: z.string().min(1, "Seller name is required"),
  sellerRating: z.string().optional(),
});

type SellProductForm = z.infer<typeof sellProductSchema>;

const platforms = [
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "snapchat", label: "Snapchat" },
  { value: "pinterest", label: "Pinterest" },
];

const SellProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const form = useForm<SellProductForm>({
    resolver: zodResolver(sellProductSchema),
    defaultValues: {
      platform: "",
      accountHandle: "",
      description: "",
      followers: "",
      price: "",
      sellerName: "",
      sellerRating: "4.8",
    },
  });

  const createAccountMutation = useMutation({
    mutationFn: async (data: SellProductForm) => {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          sellerId: 1, // Default seller ID
          category: "social_media",
          isVerified: true,
          engagementRate: "3.2%",
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create account listing');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your account has been listed for sale.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/accounts'] });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: SellProductForm) => {
    createAccountMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Account</h1>
          <p className="text-gray-600">List your social media account for sale on our marketplace</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>
              Provide accurate information about your account to attract potential buyers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Platform */}
                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {platforms.map((platform) => (
                              <SelectItem key={platform.value} value={platform.value}>
                                {platform.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Account Handle */}
                  <FormField
                    control={form.control}
                    name="accountHandle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Handle *</FormLabel>
                        <FormControl>
                          <Input placeholder="@username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Followers */}
                  <FormField
                    control={form.control}
                    name="followers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Followers *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="10000" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Price */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (USD) *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                            <Input 
                              type="number" 
                              step="0.01"
                              placeholder="199.99" 
                              className="pl-7"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Seller Name */}
                  <FormField
                    control={form.control}
                    name="sellerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Seller Rating */}
                  <FormField
                    control={form.control}
                    name="sellerRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Rating (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.1"
                            min="1"
                            max="5"
                            placeholder="4.8" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your account, its niche, engagement rate, demographics, etc."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Link href="/">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button 
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600"
                    disabled={createAccountMutation.isPending}
                  >
                    {createAccountMutation.isPending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : null}
                    List Account for Sale
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tips for a Successful Listing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">📸 High-Quality Screenshots</h4>
                <p className="text-sm text-gray-600">Include recent analytics and follower demographics</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">📊 Accurate Metrics</h4>
                <p className="text-sm text-gray-600">Provide honest follower counts and engagement rates</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">💬 Detailed Description</h4>
                <p className="text-sm text-gray-600">Explain your niche, content style, and audience</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">💰 Competitive Pricing</h4>
                <p className="text-sm text-gray-600">Research similar accounts to price competitively</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellProduct;