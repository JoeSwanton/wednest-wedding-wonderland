
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
    // Skip any redirects if we're already on the auth page
    if (location.pathname === '/auth') {
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
      const { data: vendorProfile, error } = await supabase
        .from('vendor_profiles')
        .select('onboarding_completed')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error("Error checking vendor onboarding status:", error);
      }
      
      // Redirect to onboarding if needed and not already there
      if (
        !vendorProfile || 
        !vendorProfile.onboarding_completed
      ) {
        if (location.pathname !== '/vendor/onboarding') {
          console.log("Vendor needs onboarding, redirecting");
          navigate('/vendor/onboarding');
          return;
        }
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
    
    // Handle sign-in event specifically
    if (event === 'SIGNED_IN' && location.pathname === '/auth') {
      console.log("Signed in, redirecting from auth page");
      if (userProfile.user_role === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return { handleAuthRedirection };
};
