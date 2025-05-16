
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/auth.types";

export const useAuthRedirection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const nonRedirectPaths = ['/questionnaire', '/auth', '/profile', '/vendor/onboarding'];

  const handleAuthRedirection = async (
    user: User | null,
    userProfile: UserProfile | null,
    event?: string
  ) => {
    console.log("Auth redirection called with path:", location.pathname, "event:", event);
    
    // If on the auth page, only redirect on explicit sign-in event
    if (location.pathname === '/auth') {
      if (user && userProfile && event === 'SIGNED_IN') {
        console.log("Signed in from auth page, redirecting based on role");
        if (userProfile.user_role === 'vendor') {
          navigate('/vendor/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
      // Otherwise, don't redirect from auth page
      return;
    }
    
    if (!user || !userProfile) {
      // Handle sign-out event
      if (event === 'SIGNED_OUT') {
        console.log("User signed out, redirecting to /auth");
        navigate('/auth');
      }
      return;
    }

    // Handle vendor onboarding
    if (userProfile.user_role === 'vendor') {
      try {
        const { data: vendorProfile, error } = await supabase
          .from('vendor_profiles')
          .select('onboarding_completed, application_status')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error("Error checking vendor onboarding status:", error);
          return;
        }
        
        // Redirect to onboarding if needed and not already there
        if (!vendorProfile || !vendorProfile.onboarding_completed) {
          if (location.pathname !== '/vendor/onboarding') {
            console.log("Vendor needs onboarding, redirecting");
            navigate('/vendor/onboarding');
            return;
          }
        }
      } catch (error) {
        console.error("Error in vendor redirection:", error);
      }
    }
    
    // Handle new couple users
    if (userProfile.user_role === 'couple' && userProfile.is_new_user) {
      if (!nonRedirectPaths.includes(location.pathname) && location.pathname !== '/') {
        console.log("Redirecting new user to questionnaire");
        navigate('/questionnaire');
        return;
      }
    }
  };

  return { handleAuthRedirection };
};
