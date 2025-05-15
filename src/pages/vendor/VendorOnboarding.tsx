
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import OnboardingSteps from "@/components/vendor/onboarding/OnboardingSteps";
import OnboardingProgress from "@/components/vendor/onboarding/OnboardingProgress";
import { Loader2 } from "lucide-react";

const VendorOnboarding = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if the user has already completed onboarding
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('vendor_profiles')
          .select('onboarding_completed')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error) throw error;
        
        if (data && data.onboarding_completed) {
          setHasCompletedOnboarding(true);
          navigate("/vendor/dashboard");
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkOnboardingStatus();
  }, [user, navigate]);
  
  // Skip onboarding check for non-vendor users
  useEffect(() => {
    if (userProfile && userProfile.user_role !== 'vendor') {
      navigate("/dashboard");
    }
  }, [userProfile, navigate]);
  
  const handleComplete = async (formData: any) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Save the onboarding data to Supabase
      const vendorData = {
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
        onboarding_completed: true
      };
      
      // Update the vendor profile
      const { error } = await supabase
        .from('vendor_profiles')
        .upsert(vendorData, { onConflict: 'user_id' });
      
      if (error) throw error;
      
      // Update user metadata
      await supabase.auth.updateUser({
        data: { 
          business_name: formData.businessName,
          bio: formData.bio
        }
      });
      
      toast({
        title: "Onboarding Complete",
        description: "Your vendor profile is now set up. Welcome to WedNest!"
      });
      
      navigate("/vendor/dashboard");
    } catch (error: any) {
      console.error("Error completing onboarding:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete onboarding.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-wednest-sage animate-spin" />
          <p className="mt-4 text-wednest-brown">Loading your onboarding experience...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Simplified */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-serif text-wednest-brown">Vendor Onboarding</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/auth")}
            >
              Exit
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <OnboardingProgress currentStep={currentStep} />
          
          <div className="mt-6">
            <OnboardingSteps 
              currentStep={currentStep} 
              setCurrentStep={setCurrentStep} 
              onComplete={handleComplete}
            />
          </div>
        </div>
        
        {/* Support section - Simplified */}
        <div className="mt-8 text-center">
          <p className="text-sm text-wednest-brown-light">
            Need help with your onboarding? <a href="#" className="text-wednest-sage hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorOnboarding;
