import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { ArrowLeft, Camera, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Link } from "wouter";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

const Profile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      bio: "Social media enthusiast and digital marketer. I specialize in growing Instagram and TikTok accounts with organic engagement strategies.",
      location: "San Francisco, CA",
    },
  });

  const onSubmit = (data: ProfileForm) => {
    console.log("Profile updated:", data);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
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

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-orange-500 text-white text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  variant="outline"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                      {form.watch("firstName")} {form.watch("lastName")}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Mail className="h-4 w-4 mr-2" />
                      {form.watch("email")}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {form.watch("location")}
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <Button 
                      onClick={() => setIsEditing(!isEditing)}
                      variant={isEditing ? "outline" : "default"}
                      className={isEditing ? "" : "bg-orange-500 hover:bg-orange-600"}
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">12</div>
              <div className="text-sm text-gray-600">Accounts Sold</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">$2,450</div>
              <div className="text-sm text-gray-600">Total Earnings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">4.8</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              {isEditing ? "Update your profile information" : "Your profile information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Bio */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          disabled={!isEditing}
                          className="min-h-[100px]"
                          placeholder="Tell us about yourself..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                {isEditing && (
                  <div className="flex justify-end space-x-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Login Activity</h4>
                <p className="text-sm text-gray-600">View recent login activity</p>
              </div>
              <Button variant="outline">View</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;