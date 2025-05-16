import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedOnboarding, setCheckedOnboarding] = useState(false);
  const [checkAttempts, setCheckAttempts] = useState(0);

  useEffect(() => {
    // If still loading after 3 seconds, force proceed to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.log("Forcing onboarding to proceed after timeout");
        setIsLoading(false);
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // Safety check - only make 3 attempts maximum
      if (checkAttempts >= 3) {
        console.log("Maximum check attempts reached, proceeding with onboarding");
        setIsLoading(false);
        setCheckedOnboarding(true);
        return;
      }

      if (!user) {
        // Don't redirect here, let ProtectedRoute handle authentication
        setIsLoading(false);
        return;
      }

      try {
        setCheckAttempts(prev => prev + 1);
        
        const { data, error } = await supabase
          .from("vendor_profiles")
          .select("onboarding_completed")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          console.log("No vendor profile found. Starting onboarding.");
          setHasCompletedOnboarding(false);
        } else if (data.onboarding_completed && location.pathname !== "/vendor/dashboard") {
          // Only redirect if explicitly completed onboarding
          navigate("/vendor/dashboard");
          return;
        } else {
          setHasCompletedOnboarding(false);
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        setIsLoading(false);
        setCheckedOnboarding(true);
      }
    };

    // Only check if we have a user and haven't already checked
    if (user && !checkedOnboarding && isLoading) {
      checkOnboardingStatus();
    } else if (!user) {
      // If no user, don't keep loading
      setIsLoading(false);
    }
  }, [user, navigate, location, checkedOnboarding, checkAttempts]);

  useEffect(() => {
    // Skip role check - this is handled by ProtectedRoute
    if (userProfile && userProfile.user_role !== "vendor") {
      setIsLoading(false);
      setCheckedOnboarding(true);
    }
  }, [userProfile]);

  const handleComplete = async (formData: any) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const vendorData = {
        user_id: user.id,
        business_name: formData.businessName,
        business_category: formData.businessCategory,
        abn: formData.abn,
        years_in_business: parseInt(formData.yearsInBusiness || "0"),
        phone: formData.phone,
        business_email: formData.businessEmail,
        website: formData.website,
        instagram: formData.instagram,
        facebook: formData.facebook,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postcode: formData.postcode,
        service_radius: parseInt(formData.serviceRadius || "0"),
        bio: formData.bio,
        tagline: formData.tagline,
        specialties: formData.specialties,
        logo_url: formData.logoUrl,
        instagram_feed: formData.instagramFeed,
        onboarding_completed: true,
        application_status: "pending_review",
        willing_to_travel: formData.willingToTravel || false,
      };

      const { error } = await supabase
        .from("vendor_profiles")
        .upsert(vendorData, { onConflict: "user_id" });

      if (error) throw error;

      await supabase.auth.updateUser({
        data: {
          business_name: formData.businessName,
          bio: formData.bio,
        },
      });

      toast({
        title: "Onboarding Complete",
        description: "Your vendor profile has been submitted for review.",
      });

      navigate("/vendor/dashboard");
    } catch (error: any) {
      console.error("Error completing onboarding:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete onboarding.",
        variant: "destructive",
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
          <p className="mt-4 text-wednest-brown">
            Loading your onboarding experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-serif text-wednest-brown">
            Join Enosi as a Vendor
          </h1>
          <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
            Exit
          </Button>
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
      </div>
    </div>
  );
};

export default VendorOnboarding;
