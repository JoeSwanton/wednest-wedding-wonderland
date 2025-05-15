
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import OnboardingSteps from "@/components/vendor/onboarding/OnboardingSteps";
import OnboardingProgress from "@/components/vendor/onboarding/OnboardingProgress";
import OnboardingHeader from "@/components/vendor/onboarding/OnboardingHeader";
import OnboardingSupport from "@/components/vendor/onboarding/OnboardingSupport";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
          <p className="mt-4 text-wednest-brown">Loading your onboarding experience...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <OnboardingHeader />
      
      <div className="flex-grow flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <OnboardingProgress currentStep={currentStep} />
          
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-wednest-beige p-6">
            <OnboardingSteps 
              currentStep={currentStep} 
              setCurrentStep={setCurrentStep} 
              onComplete={handleComplete}
            />
          </div>
          
          <OnboardingSupport />
        </div>
      </div>
    </div>
  );
};

export default VendorOnboarding;
