import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, CheckIcon, Image, InfoIcon, Loader2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { VendorOnboardingData } from "@/types/vendor";

interface PreviewPublishStepProps {
  onBack: () => void;
  onComplete: () => void;
  formData: VendorOnboardingData;
}

const PreviewPublishStep = ({ onBack, onComplete, formData }: PreviewPublishStepProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(true);
  
  const handleSubmit = async () => {
    if (!user) return;
    
    if (!acceptTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Save to vendor profiles table
      const { error: profileError } = await supabase.from('vendor_profiles')
        .insert({
          user_id: user.id,
          business_name: formData.businessName,
          business_category: formData.businessCategory,
          abn: formData.abn,
          years_in_business: formData.yearsInBusiness ? parseInt(formData.yearsInBusiness) : null,
          phone: formData.phone,
          business_email: formData.businessEmail,
          website: formData.website,
          instagram: formData.instagram,
          facebook: formData.facebook,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          service_radius: formData.serviceRadius ? parseInt(formData.serviceRadius) : null,
          bio: formData.bio,
          tagline: formData.tagline,
          specialties: formData.specialties,
          logo_url: formData.logoUrl,
          instagram_feed: formData.instagramFeed,
          is_published: profileVisibility,
          onboarding_completed: true
        })
        .select()
        .single();
        
      if (profileError) throw profileError;
      
      // Save portfolio images
      if (formData.portfolioImages && formData.portfolioImages.length > 0) {
        const portfolioData = formData.portfolioImages.map((image, index) => ({
          vendor_id: user.id,
          image_url: image.url,
          storage_path: image.path,
          caption: image.caption,
          display_order: index + 1
        }));
        
        const { error: portfolioError } = await supabase
          .from('vendor_portfolio')
          .insert(portfolioData);
          
        if (portfolioError) throw portfolioError;
      }
      
      // Save service packages
      if (formData.servicePackages && formData.servicePackages.length > 0) {
        const packagesData = formData.servicePackages.map((pkg) => ({
          vendor_id: user.id,
          name: pkg.name,
          price_range: pkg.priceRange,
          description: pkg.description,
          features: pkg.features
        }));
        
        const { error: packagesError } = await supabase
          .from('vendor_packages')
          .insert(packagesData);
          
        if (packagesError) throw packagesError;
      }
      
      toast({
        title: "Profile published!",
        description: "Your vendor profile has been successfully set up."
      });
      
      onComplete();
    } catch (error: any) {
      console.error("Error saving vendor profile:", error);
      toast({
        title: "Error saving profile",
        description: error.message || "Failed to complete setup.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if the form data is complete
  const isProfileComplete = () => {
    const requiredFields = [
      'businessName',
      'businessCategory',
      'phone',
      'businessEmail',
      'city',
      'state',
      'bio'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof VendorOnboardingData]);
    return missingFields.length === 0;
  };
  
  // Count missing elements
  const getMissingElementsCount = () => {
    let count = 0;
    
    // Required fields
    const requiredFields = ['businessName', 'businessCategory', 'phone', 'businessEmail', 'city', 'state', 'bio'];
    requiredFields.forEach(field => {
      if (!formData[field as keyof VendorOnboardingData]) count++;
    });
    
    // Portfolio images (at least 1 required)
    if (!formData.portfolioImages || formData.portfolioImages.length === 0) count++;
    
    return count;
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif text-wednest-brown">Preview & Publish</h2>
        <p className="text-wednest-brown-light">
          Review your profile before publishing it to the WedNest directory.
        </p>
      </div>
      
      {/* Profile status */}
      <Card className={isProfileComplete() ? "border-green-500" : "border-amber-500"}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {isProfileComplete() ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            ) : (
              <InfoIcon className="h-5 w-5 text-amber-500 mt-0.5" />
            )}
            <div>
              <h3 className={`font-medium ${isProfileComplete() ? "text-green-600" : "text-amber-600"}`}>
                {isProfileComplete() ? "Profile Ready to Publish" : "Profile Incomplete"}
              </h3>
              <p className="text-sm text-wednest-brown-light mt-1">
                {isProfileComplete() 
                  ? "All required information has been provided. Your profile is ready to go live!"
                  : `${getMissingElementsCount()} required elements are missing. Go back and complete all required fields.`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Profile preview */}
      <div className="border rounded-md overflow-hidden">
        <div className="bg-wednest-sage/10 p-4 border-b">
          <h3 className="font-medium text-wednest-brown flex items-center gap-2">
            <Image size={18} />
            <span>Profile Preview</span>
          </h3>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="w-24 h-24 flex-shrink-0">
              {formData.logoUrl ? (
                <AspectRatio ratio={1}>
                  <img 
                    src={formData.logoUrl} 
                    alt={formData.businessName} 
                    className="rounded-md object-cover w-full h-full" 
                  />
                </AspectRatio>
              ) : (
                <div className="w-full h-full bg-wednest-beige/30 rounded-md flex items-center justify-center">
                  <span className="text-wednest-brown-light text-xs">No Logo</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-serif text-wednest-brown">
                {formData.businessName || "Your Business Name"}
              </h2>
              {formData.tagline && (
                <p className="italic text-wednest-brown-light mt-1">
                  "{formData.tagline}"
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.businessCategory && (
                  <span className="bg-wednest-sage/20 text-wednest-sage text-xs px-2 py-1 rounded-full">
                    {formData.businessCategory.charAt(0).toUpperCase() + formData.businessCategory.slice(1)}
                  </span>
                )}
                {formData.city && formData.state && (
                  <span className="bg-wednest-beige/20 text-wednest-brown-light text-xs px-2 py-1 rounded-full">
                    {formData.city}, {formData.state.toUpperCase()}
                  </span>
                )}
                {formData.specialties && formData.specialties.slice(0, 3).map((specialty, index) => (
                  <span key={index} className="bg-wednest-cream text-wednest-brown-light text-xs px-2 py-1 rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Portfolio Preview */}
          {formData.portfolioImages && formData.portfolioImages.length > 0 ? (
            <div className="space-y-2">
              <h3 className="font-medium text-wednest-brown">Portfolio Highlight</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {formData.portfolioImages.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-[4/3] rounded-md overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={`Portfolio ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {formData.portfolioImages.length > 4 && (
                <p className="text-sm text-wednest-brown-light text-center mt-2">
                  +{formData.portfolioImages.length - 4} more photos
                </p>
              )}
            </div>
          ) : (
            <div className="bg-wednest-beige/10 p-6 rounded-md text-center">
              <p className="text-wednest-brown-light">No portfolio images added</p>
            </div>
          )}
          
          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-medium text-wednest-brown">About</h3>
            <p className="text-wednest-brown-light">
              {formData.bio || "No business description provided."}
            </p>
          </div>
          
          {/* Service Packages Preview */}
          {formData.servicePackages && formData.servicePackages.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-wednest-brown">Service Packages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formData.servicePackages.slice(0, 2).map((pkg, index) => (
                  <div key={index} className="border rounded-md p-3">
                    <h4 className="font-medium text-wednest-brown">{pkg.name}</h4>
                    <p className="text-wednest-sage font-medium text-sm">{pkg.priceRange}</p>
                    {pkg.description && (
                      <p className="text-wednest-brown-light text-sm mt-1">
                        {pkg.description.length > 100 
                          ? pkg.description.substring(0, 100) + '...'
                          : pkg.description
                        }
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {formData.servicePackages.length > 2 && (
                <p className="text-sm text-wednest-brown-light text-center">
                  +{formData.servicePackages.length - 2} more packages
                </p>
              )}
            </div>
          )}
          
          {/* Contact Info */}
          <div className="space-y-2">
            <h3 className="font-medium text-wednest-brown">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {formData.phone && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-wednest-brown">Phone:</span>
                  <span className="text-wednest-brown-light">{formData.phone}</span>
                </div>
              )}
              {formData.businessEmail && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-wednest-brown">Email:</span>
                  <span className="text-wednest-brown-light">{formData.businessEmail}</span>
                </div>
              )}
              {formData.website && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-wednest-brown">Website:</span>
                  <span className="text-wednest-brown-light">{formData.website}</span>
                </div>
              )}
              {(formData.facebook || formData.instagram) && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-wednest-brown">Social:</span>
                  <span className="text-wednest-brown-light">
                    {formData.instagram && 'Instagram'}
                    {formData.instagram && formData.facebook && ', '}
                    {formData.facebook && 'Facebook'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Publishing options */}
      <div className="space-y-4 pt-4 border-t border-wednest-beige">
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="termsAccepted" 
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked === true)}
            className="mt-1"
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="termsAccepted"
              className="text-sm font-normal leading-snug text-wednest-brown"
            >
              I agree to WedNest's{" "}
              <a href="#" className="text-wednest-sage hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-wednest-sage hover:underline">Vendor Guidelines</a>.
            </Label>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="visibility" 
            checked={profileVisibility}
            onCheckedChange={(checked) => setProfileVisibility(checked === true)}
            className="mt-1"
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="visibility"
              className="text-sm font-normal leading-snug text-wednest-brown"
            >
              Make my profile visible to couples searching on WedNest
            </Label>
            <p className="text-xs text-wednest-brown-light">
              Uncheck if you want to complete your profile setup first before making it public.
            </p>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="button" 
          onClick={handleSubmit}
          className="bg-wednest-sage hover:bg-wednest-sage-dark"
          disabled={isLoading || !isProfileComplete() || !acceptTerms}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <CheckIcon className="mr-2 h-4 w-4" />
              Complete Setup
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PreviewPublishStep;
