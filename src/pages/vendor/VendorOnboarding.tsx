import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import OnboardingSteps from "@/components/vendor/onboarding/OnboardingSteps";
import OnboardingProgress from "@/components/vendor/onboarding/OnboardingProgress";
import { CircleCheck, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { logOnboardingStep } from "@/services/onboardingTracker";

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
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [sessionId, setSessionId] = useState<string>(`session-${Date.now()}`);

  // Track page load for analytics
  useEffect(() => {
    if (user) {
      logOnboardingStep('OnboardingPageView', {
        sessionId: sessionId,
        path: location.pathname,
        timestamp: new Date().toISOString()
      }, 'started').catch(console.error);
    }
  }, [user, sessionId, location.pathname]);

  // Handle loading timeout and show progress bar for better UX
  useEffect(() => {
    let timer: number | undefined;
    let progressTimer: number | undefined;
    
    if (isLoading) {
      // Increment loading progress for visual feedback
      progressTimer = window.setInterval(() => {
        setLoadingProgress(prev => {
          const nextProgress = prev + 5;
          return nextProgress > 90 ? 90 : nextProgress; // Cap at 90% until actually loaded
        });
      }, 100);
      
      // Force proceed after timeout if still loading
      timer = window.setTimeout(() => {
        if (isLoading) {
          console.log("Forcing onboarding to proceed after timeout");
          setIsLoading(false);
          setLoadingProgress(100);
          setCheckedOnboarding(true);
          
          // Log timeout event
          if (user) {
            logOnboardingStep('OnboardingLoadTimeout', {
              sessionId: sessionId,
              checkAttempts: checkAttempts
            }, 'error').catch(console.error);
          }
        }
      }, 2000); // Reduced from 3s to 2s for better responsiveness
    } else {
      // Complete progress bar when done loading
      setLoadingProgress(100);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [isLoading, sessionId, checkAttempts, user]);

  useEffect(() => {
    // Skip check if already completed or on another page
    if (location.pathname !== "/vendor/onboarding") return;
    
    const checkOnboardingStatus = async () => {
      // Safety check - only make 2 attempts maximum (reduced from 3)
      if (checkAttempts >= 2) {
        console.log("Maximum check attempts reached, proceeding with onboarding");
        setIsLoading(false);
        setCheckedOnboarding(true);
        
        // Log the max attempts reached
        if (user) {
          logOnboardingStep('OnboardingCheckMaxAttempts', {
            sessionId: sessionId
          }, 'error').catch(console.error);
        }
        return;
      }
      
      if (!user) {
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
          
        if (error) {
          // Log the error for analytics
          logOnboardingStep('OnboardingStatusCheck', {
            sessionId: sessionId,
            error: error.message,
            attempt: checkAttempts
          }, 'error').catch(console.error);
          
          throw error;
        }
        
        if (!data) {
          console.log("No vendor profile found. Starting onboarding.");
          setHasCompletedOnboarding(false);
          
          // Log for analytics
          logOnboardingStep('OnboardingStatusCheck', {
            sessionId: sessionId,
            status: 'new_vendor',
            attempt: checkAttempts
          }, 'started').catch(console.error);
        } else if (data.onboarding_completed && location.pathname !== "/vendor/dashboard") {
          // Only redirect if explicitly completed onboarding
          
          // Log for analytics before redirecting
          logOnboardingStep('OnboardingStatusCheck', {
            sessionId: sessionId,
            status: 'completed_redirecting',
            attempt: checkAttempts
          }, 'completed').catch(console.error);
          
          navigate("/vendor/dashboard");
          return;
        } else {
          setHasCompletedOnboarding(false);
          
          // Log for analytics
          logOnboardingStep('OnboardingStatusCheck', {
            sessionId: sessionId,
            status: 'in_progress',
            attempt: checkAttempts
          }, 'started').catch(console.error);
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
  }, [user, navigate, location, checkedOnboarding, checkAttempts, sessionId]);

  useEffect(() => {
    // Skip role check - this is handled by ProtectedRoute
    if (userProfile && userProfile.user_role !== "vendor") {
      setIsLoading(false);
      setCheckedOnboarding(true);
      
      // Log incorrect role access for analytics
      if (user) {
        logOnboardingStep('IncorrectRoleAccess', {
          sessionId: sessionId,
          actualRole: userProfile.user_role
        }, 'error').catch(console.error);
      }
    }
  }, [userProfile, sessionId, user]);

  const handleComplete = async (formData: any) => {
    if (!user) return;
    setIsLoading(true);
    
    try {
      // Log submission attempt
      await logOnboardingStep('OnboardingSubmission', {
        sessionId: sessionId,
        dataCompleteness: {
          hasBusinessData: !!formData.businessName && !!formData.businessCategory,
          hasContactInfo: !!formData.phone && !!formData.businessEmail,
          hasPortfolio: formData.portfolioImages?.length > 0,
          hasPackages: formData.servicePackages?.length > 0,
        }
      }, 'started');
      
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
        willing_to_travel: formData.willingToTravel || false
      };
      
      const { error } = await supabase
        .from("vendor_profiles")
        .upsert(vendorData, { onConflict: "user_id" });
        
      if (error) {
        // Log error for analytics
        await logOnboardingStep('OnboardingSubmission', {
          sessionId: sessionId,
          error: error.message
        }, 'error');
        
        throw error;
      }
      
      await supabase.auth.updateUser({
        data: {
          business_name: formData.businessName,
          bio: formData.bio
        }
      });

      // Trigger admin notification by calling the edge function directly
      // The database trigger will also fire, but this ensures immediate notification
      try {
        await supabase.functions.invoke('notify-admin-vendor', {
          body: {
            vendor_id: user.id,
            business_name: formData.businessName,
            business_email: formData.businessEmail,
            business_category: formData.businessCategory
          }
        });
      } catch (notificationError) {
        console.error('Error sending admin notification:', notificationError);
        // Don't fail the onboarding if notification fails
      }
      
      // Log successful completion
      await logOnboardingStep('OnboardingSubmission', {
        sessionId: sessionId,
        status: 'success'
      }, 'completed');
      
      toast({
        title: "Onboarding Complete",
        description: "Your vendor profile has been submitted for review. You'll receive an email once it's approved."
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white to-wednest-beige/30">
        <div className="flex flex-col items-center max-w-md mx-auto px-4 py-8 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-10 w-10 text-wednest-sage animate-spin" />
            </div>
            <svg className="w-20 h-20 text-wednest-sage/20" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" />
            </svg>
          </div>
          <h2 className="text-xl font-serif text-wednest-brown mb-2">
            Setting up your experience
          </h2>
          <p className="text-wednest-brown-light mb-4">
            We're preparing your onboarding journey...
          </p>
          <Progress value={loadingProgress} className="w-full h-2 bg-wednest-beige/30" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-white to-wednest-beige/20">
      <header className="bg-white border-b border-wednest-beige/30 py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif text-wednest-brown">Enosi</h1>
            <div className="h-4 w-px bg-wednest-beige mx-2"></div>
            <span className="text-sm font-medium text-wednest-sage">Vendor Portal</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              logOnboardingStep('ExitOnboarding', {
                sessionId: sessionId,
                currentStep: currentStep
              }, 'skipped').catch(console.error);
              navigate("/auth");
            }}
            className="hover:bg-wednest-beige/10 text-wednest-brown"
          >
            Exit
          </Button>
        </div>
      </header>

      <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-serif text-wednest-brown mb-3">
                  Vendor Onboarding
                </h2>
                <p className="text-wednest-brown-light">
                  Complete the steps below to set up your vendor profile and get discovered by couples.
                </p>
              </div>
              
              <OnboardingProgress currentStep={currentStep} />
              
              <div className="mt-8">
                <OnboardingSteps 
                  currentStep={currentStep} 
                  setCurrentStep={setCurrentStep} 
                  onComplete={handleComplete} 
                />
              </div>
            </div>
            
            <div className="bg-wednest-beige/10 border-t border-wednest-beige/30 px-6 py-4 md:px-8 md:py-5">
              <div className="flex items-center gap-3 text-sm text-wednest-brown-light">
                <CircleCheck className="h-5 w-5 text-wednest-sage" />
                <span>Your progress is automatically saved as you complete each step</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorOnboarding;
