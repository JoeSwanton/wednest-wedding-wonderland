
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, Users, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const Settings = () => {
  const { user, signOut } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("private");
  
  return (
    <div className="min-h-screen flex bg-theme-cream/10">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-serif font-semibold text-theme-brown mb-2">Settings</h1>
            <p className="text-theme-brown-light">Manage your account preferences and settings</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-5 bg-theme-cream/20 p-1">
              <TabsTrigger 
                value="profile" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-theme-brown"
              >
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-theme-brown"
              >
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-theme-brown"
              >
                <Shield className="h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger 
                value="billing" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-theme-brown"
              >
                <CreditCard className="h-4 w-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger 
                value="wedding" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-theme-brown"
              >
                <Users className="h-4 w-4" />
                Wedding
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <Card className="bg-white border-theme-cream shadow-sm">
                <CardHeader>
                  <CardTitle className="text-theme-brown">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={user?.email || ""} disabled />
                    <p className="text-sm text-theme-brown-light mt-1">
                      Contact support to change your email address
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" placeholder="Tell us about yourself" />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-theme-brown mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                      Save Changes
                    </Button>
                    <Button variant="outline">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications">
              <Card className="bg-white border-theme-cream shadow-sm">
                <CardHeader>
                  <CardTitle className="text-theme-brown">Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-theme-brown">Email Notifications</h4>
                        <p className="text-sm text-theme-brown-light">Receive updates via email</p>
                      </div>
                      <Switch 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-theme-brown">SMS Notifications</h4>
                        <p className="text-sm text-theme-brown-light">Receive important updates via SMS</p>
                      </div>
                      <Switch 
                        checked={smsNotifications} 
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-theme-brown">Push Notifications</h4>
                        <p className="text-sm text-theme-brown-light">Receive browser notifications</p>
                      </div>
                      <Switch 
                        checked={pushNotifications} 
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-theme-brown">Marketing Emails</h4>
                        <p className="text-sm text-theme-brown-light">Receive tips and wedding inspiration</p>
                      </div>
                      <Switch 
                        checked={marketingEmails} 
                        onCheckedChange={setMarketingEmails}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-theme-brown mb-4">Notification Frequency</h4>
                    <Select defaultValue="immediate">
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <Card className="bg-white border-theme-cream shadow-sm">
                <CardHeader>
                  <CardTitle className="text-theme-brown">Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium text-theme-brown mb-4">Profile Visibility</h4>
                    <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                      <SelectTrigger className="w-full md:w-64">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="vendors-only">Vendors Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-theme-brown-light mt-2">
                      Control who can see your wedding profile
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-theme-brown mb-4">Data & Privacy</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full md:w-auto">
                        Download My Data
                      </Button>
                      <Button variant="outline" className="w-full md:w-auto">
                        Privacy Policy
                      </Button>
                      <Button variant="outline" className="w-full md:w-auto">
                        Terms of Service
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-theme-brown mb-4">Account Security</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full md:w-auto">
                        Enable Two-Factor Authentication
                      </Button>
                      <Button variant="outline" className="w-full md:w-auto">
                        View Login Activity
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Settings */}
            <TabsContent value="billing">
              <Card className="bg-white border-theme-cream shadow-sm">
                <CardHeader>
                  <CardTitle className="text-theme-brown">Billing & Subscription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-theme-cream/20 p-4 rounded-lg">
                    <h4 className="font-medium text-theme-brown mb-2">Current Plan</h4>
                    <p className="text-2xl font-semibold text-theme-brown mb-1">Free Plan</p>
                    <p className="text-sm text-theme-brown-light">
                      Upgrade to Premium for advanced planning tools and priority vendor access
                    </p>
                  </div>
                  
                  <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                    Upgrade to Premium
                  </Button>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-theme-brown mb-4">Payment Method</h4>
                    <p className="text-theme-brown-light mb-4">No payment method on file</p>
                    <Button variant="outline">Add Payment Method</Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-theme-brown mb-4">Billing History</h4>
                    <p className="text-theme-brown-light">No billing history available</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wedding Settings */}
            <TabsContent value="wedding">
              <Card className="bg-white border-theme-cream shadow-sm">
                <CardHeader>
                  <CardTitle className="text-theme-brown">Wedding Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium text-theme-brown mb-4">Wedding Details</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="partner1">Partner 1 Name</Label>
                          <Input id="partner1" placeholder="Enter name" />
                        </div>
                        <div>
                          <Label htmlFor="partner2">Partner 2 Name</Label>
                          <Input id="partner2" placeholder="Enter name" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="weddingDate">Wedding Date</Label>
                        <Input id="weddingDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="venue">Venue</Label>
                        <Input id="venue" placeholder="Enter venue name" />
                      </div>
                      <div>
                        <Label htmlFor="guestCount">Expected Guest Count</Label>
                        <Input id="guestCount" type="number" placeholder="Number of guests" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-theme-brown mb-4">Danger Zone</h4>
                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-start gap-3">
                        <Trash2 className="h-5 w-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="font-medium text-red-800 mb-1">Delete Wedding Profile</h5>
                          <p className="text-sm text-red-600 mb-3">
                            This will permanently delete all your wedding planning data, including vendors, guest lists, and timeline.
                          </p>
                          <Button variant="destructive" size="sm">
                            Delete Wedding Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                      Save Wedding Settings
                    </Button>
                    <Button variant="outline">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
