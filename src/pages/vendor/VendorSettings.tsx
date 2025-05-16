
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import VendorLayout from "@/components/vendor/VendorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  User, 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Facebook, 
  Instagram, 
  Bell, 
  Shield, 
  Users
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import ApplicationStatus from "@/components/vendor/settings/ApplicationStatus";

const VendorSettings = () => {
  const { toast } = useToast();
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    businessName: userProfile?.business_name || "Your Business Name",
    contactName: userProfile?.full_name || "",
    bio: userProfile?.bio || "", 
    email: user?.email || "",
    phone: "0412 345 678",
    address: "123 Wedding Lane, Sydney NSW 2000",
    website: "https://yourwebsite.com.au",
    facebook: "https://facebook.com/yourbusiness",
    instagram: "https://instagram.com/yourbusiness"
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailInquiries: true,
    emailBookings: true,
    emailReviews: true,
    emailMarketing: false,
    pushInquiries: true,
    pushBookings: true,
    pushReviews: true,
    pushMarketing: false
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (setting: string) => {
    setNotifications(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved."
    });
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
  };

  return (
    <VendorLayout title="Account Settings">
      <div className="space-y-6">
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-3 h-auto">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Business Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Application Status card - Added at the top of profile tab */}
            <ApplicationStatus />

            {/* Business Profile card */}
            <Card>
              <form onSubmit={handleProfileSubmit}>
                <CardHeader>
                  <CardTitle>Business Profile</CardTitle>
                  <CardDescription>
                    Update your business information that will be visible to couples
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <div className="flex items-center">
                          <Building className="mr-2 h-4 w-4 text-wednest-brown-light" />
                          <Input
                            id="businessName"
                            name="businessName"
                            value={profileForm.businessName}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name</Label>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-wednest-brown-light" />
                          <Input
                            id="contactName"
                            name="contactName"
                            value={profileForm.contactName}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio / Description</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        placeholder="Tell couples about your business, style, and experience..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-wednest-brown-light" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            disabled
                          />
                        </div>
                        <p className="text-xs text-wednest-brown-light">Login email cannot be changed</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-wednest-brown-light" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={profileForm.phone}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address</Label>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-wednest-brown-light" />
                        <Input
                          id="address"
                          name="address"
                          value={profileForm.address}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Online Presence</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4 text-wednest-brown-light" />
                        <Input
                          id="website"
                          name="website"
                          placeholder="Website URL"
                          value={profileForm.website}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="flex items-center">
                        <Instagram className="mr-2 h-4 w-4 text-wednest-brown-light" />
                        <Input
                          id="instagram"
                          name="instagram"
                          placeholder="Instagram URL"
                          value={profileForm.instagram}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="flex items-center">
                        <Facebook className="mr-2 h-4 w-4 text-wednest-brown-light" />
                        <Input
                          id="facebook"
                          name="facebook"
                          placeholder="Facebook URL"
                          value={profileForm.facebook}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-wednest-sage hover:bg-wednest-sage-dark">
                    Save Changes
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Inquiries</p>
                          <p className="text-sm text-wednest-brown-light">Get notified when a couple inquires about your services</p>
                        </div>
                        <Switch 
                          checked={notifications.emailInquiries} 
                          onCheckedChange={() => handleNotificationChange('emailInquiries')} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Booking Confirmations</p>
                          <p className="text-sm text-wednest-brown-light">Get notified when a booking is confirmed</p>
                        </div>
                        <Switch 
                          checked={notifications.emailBookings} 
                          onCheckedChange={() => handleNotificationChange('emailBookings')} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Reviews</p>
                          <p className="text-sm text-wednest-brown-light">Get notified when a couple leaves a review</p>
                        </div>
                        <Switch 
                          checked={notifications.emailReviews} 
                          onCheckedChange={() => handleNotificationChange('emailReviews')} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing & Updates</p>
                          <p className="text-sm text-wednest-brown-light">Receive platform updates and marketing tips</p>
                        </div>
                        <Switch 
                          checked={notifications.emailMarketing} 
                          onCheckedChange={() => handleNotificationChange('emailMarketing')} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Inquiries</p>
                          <p className="text-sm text-wednest-brown-light">Get push notifications for new inquiries</p>
                        </div>
                        <Switch 
                          checked={notifications.pushInquiries} 
                          onCheckedChange={() => handleNotificationChange('pushInquiries')} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Booking Confirmations</p>
                          <p className="text-sm text-wednest-brown-light">Get push notifications for confirmed bookings</p>
                        </div>
                        <Switch 
                          checked={notifications.pushBookings} 
                          onCheckedChange={() => handleNotificationChange('pushBookings')} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Reviews</p>
                          <p className="text-sm text-wednest-brown-light">Get push notifications for new reviews</p>
                        </div>
                        <Switch 
                          checked={notifications.pushReviews} 
                          onCheckedChange={() => handleNotificationChange('pushReviews')} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing & Updates</p>
                          <p className="text-sm text-wednest-brown-light">Receive push notifications for platform updates</p>
                        </div>
                        <Switch 
                          checked={notifications.pushMarketing} 
                          onCheckedChange={() => handleNotificationChange('pushMarketing')} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-wednest-sage hover:bg-wednest-sage-dark">
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <form onSubmit={handlePasswordSubmit}>
                <CardHeader>
                  <CardTitle>Password Management</CardTitle>
                  <CardDescription>
                    Change your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-wednest-sage hover:bg-wednest-sage-dark">
                    Update Password
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-wednest-brown-light">Require a verification code when signing in</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Team Access</CardTitle>
                <CardDescription>
                  Manage team members who can access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-wednest-sage text-white flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Team Members</p>
                      <p className="text-sm text-wednest-brown-light">Invite staff to help manage your account</p>
                    </div>
                  </div>
                  <Button variant="outline">Manage Team</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Export All Data</p>
                    <p className="text-sm text-wednest-brown-light">Download all your account data</p>
                  </div>
                  <Button variant="outline">Export</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-destructive">Delete Account</p>
                    <p className="text-sm text-wednest-brown-light">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" onClick={() => toast({
                    title: "Action Not Available",
                    description: "Account deletion is currently disabled. Please contact support.",
                    variant: "destructive"
                  })}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
};

export default VendorSettings;
