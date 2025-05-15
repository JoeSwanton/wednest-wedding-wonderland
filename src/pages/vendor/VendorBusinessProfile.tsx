import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import VendorLayout from "@/components/vendor/VendorLayout";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Link as LinkIcon, 
  Instagram, 
  Facebook, 
  Clock,
  Award,
  Calendar,
  Tags,
  FileText,
  Star,
  Image as ImageIcon,
  Video,
  ToggleRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const businessCategoryOptions = [
  "Photographer",
  "Videographer",
  "Wedding Planner",
  "Florist",
  "Venue",
  "Caterer",
  "Bakery",
  "DJ",
  "Band",
  "Makeup Artist",
  "Hair Stylist",
  "Transportation",
  "Rental Company",
  "Officiant",
  "Jewelry",
  "Bridal Shop",
  "Stationery",
  "Other"
];

const VendorBusinessProfile = () => {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [isLoading, setIsLoading] = useState(true);
  const [vendorProfile, setVendorProfile] = useState<any>(null);
  
  // Fetch vendor profile data from Supabase
  useEffect(() => {
    const fetchVendorProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('vendor_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setVendorProfile(data);
        }
      } catch (error) {
        console.error("Error fetching vendor profile:", error);
        toast({
          title: "Error",
          description: "Could not load your business profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVendorProfile();
  }, [user, toast]);
  
  // Form states for different sections using actual data
  const [basicInfo, setBasicInfo] = useState({
    businessName: "",
    businessCategory: "",
    businessDescription: "",
    yearsInBusiness: "",
    abn: ""
  });
  
  const [locationInfo, setLocationInfo] = useState({
    businessAddress: "",
    primaryServiceAreas: "",
    willingToTravel: false,
    travelFeeInfo: ""
  });
  
  const [contactInfo, setContactInfo] = useState({
    phoneNumber: "",
    emailAddress: user?.email || "",
    websiteUrl: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    pinterest: "",
    youtube: ""
  });
  
  // Update form data when vendor profile is loaded
  useEffect(() => {
    if (vendorProfile) {
      setBasicInfo({
        businessName: vendorProfile.business_name || "",
        businessCategory: vendorProfile.business_category || "",
        businessDescription: vendorProfile.bio || "",
        yearsInBusiness: vendorProfile.years_in_business?.toString() || "",
        abn: vendorProfile.abn || ""
      });
      
      setLocationInfo({
        businessAddress: `${vendorProfile.address || ""}, ${vendorProfile.city || ""}, ${vendorProfile.state || ""}, ${vendorProfile.postcode || ""}`.replace(/, ,/g, ",").replace(/^, |, $/g, ""),
        primaryServiceAreas: vendorProfile.service_radius ? `${vendorProfile.service_radius}km radius around ${vendorProfile.city || ""}` : "",
        willingToTravel: !!vendorProfile.service_radius,
        travelFeeInfo: ""
      });
      
      setContactInfo({
        phoneNumber: vendorProfile.phone || "",
        emailAddress: vendorProfile.business_email || user?.email || "",
        websiteUrl: vendorProfile.website || "",
        instagram: vendorProfile.instagram || "",
        facebook: vendorProfile.facebook || "",
        tiktok: "",
        pinterest: "",
        youtube: ""
      });
    }
  }, [vendorProfile, user]);
  
  // Keep all the existing state
  const [mediaInfo, setMediaInfo] = useState({
    hasLogo: false,
    hasCoverPhoto: false,
    hasGallery: false,
    hasVideo: false
  });
  
  const [highlightsInfo, setHighlightsInfo] = useState({
    certifications: "",
    awards: "",
    averageRating: 0,
    reviewCount: 0
  });
  
  const [tagsInfo, setTagsInfo] = useState({
    stylesTags: "",
    specialties: vendorProfile?.specialties?.join(", ") || "",
    eventTypes: ""
  });
  
  // Update specialties when vendorProfile changes
  useEffect(() => {
    if (vendorProfile?.specialties) {
      setTagsInfo(prev => ({
        ...prev,
        specialties: vendorProfile.specialties.join(", ")
      }));
    }
  }, [vendorProfile]);
  
  const [availabilityInfo, setAvailabilityInfo] = useState({
    operatingHours: "",
    bookingType: "quote",
    leadTimeRequired: ""
  });
  
  const [adminPreferences, setAdminPreferences] = useState({
    listingVisible: true,
    autoResponseEnabled: false,
    preferredContactMethod: "email"
  });
  
  // Update form handlers
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLocationInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocationInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (setting: string, category: string) => {
    switch(category) {
      case 'location':
        setLocationInfo(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }));
        break;
      case 'media':
        setMediaInfo(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }));
        break;
      case 'admin':
        setAdminPreferences(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }));
        break;
      default:
        break;
    }
  };
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTagsInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAvailabilityInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Save profile changes to Supabase
  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Format the specialties as an array from the comma-separated string
      const specialties = tagsInfo.specialties
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Parse the years in business to an integer if provided
      const yearsInBusiness = basicInfo.yearsInBusiness ? parseInt(basicInfo.yearsInBusiness) : null;
      
      // Update the vendor profile in Supabase
      const { error } = await supabase
        .from('vendor_profiles')
        .update({
          business_name: basicInfo.businessName,
          business_category: basicInfo.businessCategory,
          bio: basicInfo.businessDescription,
          years_in_business: yearsInBusiness,
          abn: basicInfo.abn,
          phone: contactInfo.phoneNumber,
          business_email: contactInfo.emailAddress,
          website: contactInfo.websiteUrl,
          instagram: contactInfo.instagram,
          facebook: contactInfo.facebook,
          specialties: specialties,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Also update the user metadata
      await supabase.auth.updateUser({
        data: { 
          business_name: basicInfo.businessName
        }
      });
      
      toast({
        title: "Profile updated",
        description: "Your business profile has been updated successfully.",
      });
      
      // Refresh the vendor profile data
      const { data: refreshedData } = await supabase
        .from('vendor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (refreshedData) {
        setVendorProfile(refreshedData);
      }
      
    } catch (error: any) {
      console.error("Error updating business profile:", error);
      toast({
        title: "Update failed",
        description: error.message || "Failed to update business profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <VendorLayout title="Business Profile">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
            <p className="mt-4 text-wednest-brown">Loading your business profile...</p>
          </div>
        </div>
      </VendorLayout>
    );
  }

  // Calculate profile completeness
  const calculateProfileCompleteness = () => {
    let completed = 0;
    let total = 0;
    
    // Basic info checks
    if (basicInfo.businessName) completed++;
    if (basicInfo.businessCategory) completed++;
    if (basicInfo.businessDescription) completed++;
    total += 3;
    
    // Contact info checks
    if (contactInfo.phoneNumber) completed++;
    if (contactInfo.emailAddress) completed++;
    if (contactInfo.websiteUrl || contactInfo.instagram || contactInfo.facebook) completed++;
    total += 3;
    
    // Location info
    if (locationInfo.businessAddress) completed++;
    total += 1;
    
    // Tags info
    if (tagsInfo.specialties) completed++;
    total += 1;
    
    return Math.round((completed / total) * 100);
  };

  const profileCompleteness = calculateProfileCompleteness();

  return (
    <VendorLayout title="Business Profile">
      <div className="space-y-6">
        <Tabs defaultValue="basic-info" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto mb-4">
            <TabsTrigger value="basic-info" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>Basic Info</span>
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Media</span>
            </TabsTrigger>
            <TabsTrigger value="highlights" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Highlights</span>
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-2">
              <Tags className="h-4 w-4" />
              <span>Tags & Style</span>
            </TabsTrigger>
            <TabsTrigger value="availability" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Availability</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <ToggleRight className="h-4 w-4" />
              <span>Preferences</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Basic Business Information */}
          <TabsContent value="basic-info">
            <Card>
              <CardHeader>
                <CardTitle>Basic Business Information</CardTitle>
                <CardDescription>
                  Essential information about your business that will be visible to couples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={basicInfo.businessName}
                    onChange={handleBasicInfoChange}
                    placeholder="Your business name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessCategory">Business Category *</Label>
                  <select 
                    id="businessCategory" 
                    name="businessCategory"
                    value={basicInfo.businessCategory}
                    onChange={handleBasicInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select a category</option>
                    {businessCategoryOptions.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-wednest-brown-light">
                    This helps couples find your business when searching by category
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessDescription">
                    Business Description / Bio *
                  </Label>
                  <Textarea
                    id="businessDescription"
                    name="businessDescription"
                    value={basicInfo.businessDescription}
                    onChange={handleBasicInfoChange}
                    placeholder="Tell couples about your business, style, experience, and what makes you special..."
                    className="min-h-[150px]"
                    maxLength={1000}
                    required
                  />
                  <div className="flex justify-between">
                    <p className="text-xs text-wednest-brown-light">
                      A compelling overview of your business (up to 1,000 characters)
                    </p>
                    <p className="text-xs text-wednest-brown-light">
                      {basicInfo.businessDescription.length}/1000
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearsInBusiness">Years in Business</Label>
                    <Input
                      id="yearsInBusiness"
                      name="yearsInBusiness"
                      type="number"
                      min="0"
                      value={basicInfo.yearsInBusiness}
                      onChange={handleBasicInfoChange}
                      placeholder="e.g. 5"
                    />
                    <p className="text-xs text-wednest-brown-light">
                      Businesses with 5+ years get a special experience badge
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="abn">ABN (Australian Business Number)</Label>
                    <Input
                      id="abn"
                      name="abn"
                      value={basicInfo.abn}
                      onChange={handleBasicInfoChange}
                      placeholder="e.g. 12 345 678 901"
                    />
                    <p className="text-xs text-wednest-brown-light">
                      Optional, but adds credibility to your listing
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={isLoading}
                  className="bg-wednest-sage hover:bg-wednest-sage-dark text-white"
                >
                  {isLoading ? "Saving..." : "Save Basic Information"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Service Area / Location */}
          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Service Area / Location</CardTitle>
                <CardDescription>
                  Help couples find relevant vendors in their area
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Textarea
                    id="businessAddress"
                    name="businessAddress"
                    value={locationInfo.businessAddress}
                    onChange={handleLocationInfoChange}
                    placeholder="Your business address"
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="hideAddress"
                      checked={!locationInfo.willingToTravel}
                      onCheckedChange={() => handleToggleChange('willingToTravel', 'location')}
                    />
                    <label htmlFor="hideAddress" className="text-sm text-wednest-brown">
                      Hide address from public profile
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="primaryServiceAreas">Primary Service Areas / Regions *</Label>
                  <Input
                    id="primaryServiceAreas"
                    name="primaryServiceAreas"
                    value={locationInfo.primaryServiceAreas}
                    onChange={handleLocationInfoChange}
                    placeholder="e.g. Sydney, Melbourne, Hunter Valley"
                    required
                  />
                  <p className="text-xs text-wednest-brown-light">
                    Enter the regions where you typically provide services, separated by commas
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="willingToTravel"
                      checked={locationInfo.willingToTravel}
                      onCheckedChange={() => handleToggleChange('willingToTravel', 'location')}
                    />
                    <label htmlFor="willingToTravel" className="text-sm text-wednest-brown">
                      Willing to travel outside primary service areas
                    </label>
                  </div>
                  
                  {locationInfo.willingToTravel && (
                    <div className="mt-4">
                      <Label htmlFor="travelFeeInfo">Travel Fee Information</Label>
                      <Textarea
                        id="travelFeeInfo"
                        name="travelFeeInfo"
                        value={locationInfo.travelFeeInfo}
                        onChange={handleLocationInfoChange}
                        placeholder="Describe your travel fees, e.g., $1/km outside Sydney metro area"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isLoading} 
                  className="bg-wednest-sage hover:bg-wednest-sage-dark text-white"
                >
                  {isLoading ? "Saving..." : "Save Location Information"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Contact & Social Media Links */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact & Social Media Links</CardTitle>
                <CardDescription>
                  Let couples get in touch and view your work
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-wednest-brown-light" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={contactInfo.phoneNumber}
                      onChange={handleContactInfoChange}
                      placeholder="e.g. 0412 345 678"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailAddress">Email Address *</Label>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-wednest-brown-light" />
                    <Input
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      value={contactInfo.emailAddress}
                      onChange={handleContactInfoChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <div className="flex items-center">
                    <LinkIcon className="mr-2 h-4 w-4 text-wednest-brown-light" />
                    <Input
                      id="websiteUrl"
                      name="websiteUrl"
                      type="url"
                      value={contactInfo.websiteUrl}
                      onChange={handleContactInfoChange}
                      placeholder="https://yourbusiness.com.au"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="flex items-center">
                    <Instagram className="mr-2 h-4 w-4 text-wednest-brown-light" />
                    <Input
                      id="instagram"
                      name="instagram"
                      value={contactInfo.instagram}
                      onChange={handleContactInfoChange}
                      placeholder="https://instagram.com/yourbusiness"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <div className="flex items-center">
                    <Facebook className="mr-2 h-4 w-4 text-wednest-brown-light" />
                    <Input
                      id="facebook"
                      name="facebook"
                      value={contactInfo.facebook}
                      onChange={handleContactInfoChange}
                      placeholder="https://facebook.com/yourbusiness"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Button variant="link" size="sm" className="text-wednest-sage">
                    + Add additional social media (TikTok, Pinterest, YouTube)
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isLoading} 
                  className="bg-wednest-sage hover:bg-wednest-sage-dark text-white"
                >
                  {isLoading ? "Saving..." : "Save Contact Information"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Media Gallery Tab */}
          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Media Gallery</CardTitle>
                <CardDescription>
                  Visuals are critical in the wedding industry — make your business stand out
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <ImageIcon className="h-10 w-10 text-wednest-brown-light mb-2" />
                      <h3 className="font-medium text-wednest-brown mb-1">Business Logo</h3>
                      <p className="text-sm text-wednest-brown-light mb-4">
                        Upload a high-quality logo (recommended size: 400×400px)
                      </p>
                      <Button variant="outline" className="border-wednest-sage text-wednest-brown">
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <ImageIcon className="h-10 w-10 text-wednest-brown-light mb-2" />
                      <h3 className="font-medium text-wednest-brown mb-1">Cover Photo / Banner</h3>
                      <p className="text-sm text-wednest-brown-light mb-4">
                        This will be the main image on your profile (recommended size: 1200×400px)
                      </p>
                      <Button variant="outline" className="border-wednest-sage text-wednest-brown">
                        Upload Cover Photo
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <ImageIcon className="h-10 w-10 text-wednest-brown-light mb-2" />
                      <h3 className="font-medium text-wednest-brown mb-1">Photo Gallery</h3>
                      <p className="text-sm text-wednest-brown-light mb-4">
                        Upload up to 20 high-quality images showcasing your work
                      </p>
                      <Button variant="outline" className="border-wednest-sage text-wednest-brown">
                        Upload Gallery Images
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <Video className="h-10 w-10 text-wednest-brown-light mb-2" />
                      <h3 className="font-medium text-wednest-brown mb-1">Video Reel / Intro Clip</h3>
                      <p className="text-sm text-wednest-brown-light mb-4">
                        Add a YouTube/Vimeo link or upload a short video (max 2 minutes)
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Button variant="outline" className="border-wednest-sage text-wednest-brown">
                          Upload Video
                        </Button>
                        <Button variant="outline" className="border-wednest-sage text-wednest-brown">
                          Add Video Link
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-wednest-sage hover:bg-wednest-sage-dark text-white">
                  Save Media
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Highlights & Accreditations Tab */}
          <TabsContent value="highlights">
            <Card>
              <CardHeader>
                <CardTitle>Highlights & Accreditations</CardTitle>
                <CardDescription>
                  Add credibility and stand out from other vendors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications / Licenses</Label>
                  <Textarea
                    id="certifications"
                    name="certifications"
                    value={highlightsInfo.certifications}
                    onChange={(e) => setHighlightsInfo(prev => ({ ...prev, certifications: e.target.value }))}
                    placeholder="e.g. Certified Wedding Planner, Food Handling License"
                  />
                  <p className="text-xs text-wednest-brown-light">
                    List any professional certifications relevant to your services
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="awards">Awards & Features</Label>
                  <Textarea
                    id="awards"
                    name="awards"
                    value={highlightsInfo.awards}
                    onChange={(e) => setHighlightsInfo(prev => ({ ...prev, awards: e.target.value }))}
                    placeholder="e.g. Featured in Vogue Weddings, 2023 Wedding Awards Finalist"
                  />
                  <p className="text-xs text-wednest-brown-light">
                    Share any press features, awards, or recognitions you've received
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <h3 className="font-medium">Review Badge</h3>
                  </div>
                  <p className="text-sm text-wednest-brown-light mb-2">
                    This information will be automatically generated based on reviews from couples
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="bg-wednest-sage text-white px-2 py-1 rounded text-sm">
                      {highlightsInfo.averageRating.toFixed(1)} ★
                    </div>
                    <span className="text-sm text-wednest-brown">
                      {highlightsInfo.reviewCount} reviews
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-wednest-sage hover:bg-wednest-sage-dark text-white">
                  Save Highlights
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Service Tags & Styles Tab */}
          <TabsContent value="tags">
            <Card>
              <CardHeader>
                <CardTitle>Service Tags & Styles</CardTitle>
                <CardDescription>
                  Let couples find you based on their style preferences and needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stylesTags">Service Style Tags</Label>
                  <Input
                    id="stylesTags"
                    name="stylesTags"
                    value={tagsInfo.stylesTags}
                    onChange={handleTagsChange}
                    placeholder="e.g. Boho, Classic, Luxury, DIY-friendly"
                  />
                  <p className="text-xs text-wednest-brown-light">
                    Enter style tags separated by commas
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialties">Specialties</Label>
                  <Input
                    id="specialties"
                    name="specialties"
                    value={tagsInfo.specialties}
                    onChange={handleTagsChange}
                    placeholder="e.g. Elopements, Destination Weddings, Same-sex Weddings"
                  />
                  <p className="text-xs text-wednest-brown-light">
                    Enter your specialties separated by commas
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="eventTypes">Event Types</Label>
                  <Input
                    id="eventTypes"
                    name="eventTypes"
                    value={tagsInfo.eventTypes}
                    onChange={handleTagsChange}
                    placeholder="e.g. Weddings, Engagement Parties, Pre-wedding Shoots"
                  />
                  <p className="text-xs text-wednest-brown-light">
                    Enter the types of events you service separated by commas
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isLoading} 
                  className="bg-wednest-sage hover:bg-wednest-sage-dark text-white"
                >
                  {isLoading ? "Saving..." : "Save Tags"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Availability & Booking Options Tab */}
          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Availability & Booking Options</CardTitle>
                <CardDescription>
                  Help couples understand how to book your services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="operatingHours">Operating Days/Hours</Label>
                  <Input
                    id="operatingHours"
                    name="operatingHours"
                    value={availabilityInfo.operatingHours}
                    onChange={handleAvailabilityChange}
                    placeholder="e.g. Mon–Sat, 9am–6pm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Available Dates Calendar</Label>
                  <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-wednest-brown-light" />
                    <div>
                      <p className="text-sm font-medium text-wednest-brown">
                        Calendar integration coming soon
                      </p>
                      <p className="text-xs text-wednest-brown-light">
                        You'll be able to sync your availability calendar
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bookingType">Booking Type</Label>
                  <select 
                    id="bookingType" 
                    name="bookingType"
                    value={availabilityInfo.bookingType}
                    onChange={handleAvailabilityChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="quote">Request a Quote</option>
                    <option value="package">Fixed Package Booking</option>
                    <option value="call">Call to Book</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="leadTimeRequired">Lead Time Required</Label>
                  <Input
                    id="leadTimeRequired"
                    name="leadTimeRequired"
                    value={availabilityInfo.leadTimeRequired}
                    onChange={handleAvailabilityChange}
                    placeholder="e.g. 2 weeks' notice, 6 months in advance"
                  />
                  <p className="text-xs text-wednest-brown-light">
                    How much advance notice do you need for bookings?
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-wednest-sage hover:bg-wednest-sage-dark text-white">
                  Save Availability
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Admin & Preferences Tab */}
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin & Preferences</CardTitle>
                <CardDescription>
                  Settings that affect how your profile works (not visible to couples)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-wednest-brown">Listing Visibility</p>
                    <p className="text-sm text-wednest-brown-light">
                      Show or hide your profile from public search
                    </p>
                  </div>
                  <Switch
                    checked={adminPreferences.listingVisible}
                    onCheckedChange={() => handleToggleChange('listingVisible', 'admin')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-wednest-brown">Auto-response Message</p>
                    <p className="text-sm text-wednest-brown-light">
                      Send automatic replies to new inquiries
                    </p>
                  </div>
                  <Switch
                    checked={adminPreferences.autoResponseEnabled}
                    onCheckedChange={() => handleToggleChange('autoResponseEnabled', 'admin')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
                  <select 
                    id="preferredContactMethod" 
                    name="preferredContactMethod"
                    value={adminPreferences.preferredContactMethod}
                    onChange={(e) => setAdminPreferences(prev => ({ 
                      ...prev, 
                      preferredContactMethod: e.target.value 
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="platform">Platform Messages</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isLoading} 
                  className="bg-wednest-sage hover:bg-wednest-sage-dark text-white"
                >
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Profile Completeness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-wednest-sage h-2.5 rounded-full" style={{ width: `${profileCompleteness}%` }}></div>
                  </div>
                  <p className="text-sm text-wednest-brown">
                    Your profile is {profileCompleteness}% complete. Complete all sections to increase visibility.
                  </p>
                  <Button variant="outline" className="w-full mt-2">
                    Preview Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
};

export default VendorBusinessProfile;
