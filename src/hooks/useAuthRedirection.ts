
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/auth.types";

export const useAuthRedirection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Pages that shouldn't trigger automatic redirects
  const nonRedirectPaths = ['/questionnaire', '/auth', '/profile', '/vendor/onboarding'];

  const handleAuthRedirection = async (
    user: User | null,
    userProfile: UserProfile | null,
    event?: string
  ) => {
    console.log("Auth redirection called with path:", location.pathname, "event:", event);
    
    // Skip redirect on token refresh events to prevent loops
    if (event === 'TOKEN_REFRESHED') {
      console.log("Skipping redirection for TOKEN_REFRESHED event");
      return;
    }
    
    // If currently on the onboarding page, don't redirect regardless of event
    if (location.pathname === '/vendor/onboarding') {
      console.log("Currently on onboarding page, skipping redirection");
      return;
    }
    
    // If on the auth page, only redirect on explicit sign-in event
    if (location.pathname === '/auth') {
      if (user && userProfile && event === 'SIGNED_IN') {
        console.log("Signed in from auth page, checking admin status");
        
        // Check if user is admin first
        try {
          const { data: isAdminUser, error } = await supabase
            .rpc('is_admin', { uid: user.id });
            
          if (!error && isAdminUser) {
            console.log("Admin user detected, redirecting to vendor applications");
            navigate('/admin/vendors');
            return;
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
        
        // Regular user redirect logic
        if (userProfile.user_role === 'vendor') {
          navigate('/vendor/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
      // Otherwise, don't redirect from auth page
      return;
    }
    
    // Skip redirections for all non-redirect paths unless it's an explicit sign-out
    if (nonRedirectPaths.includes(location.pathname) && event !== 'SIGNED_OUT') {
      console.log(`Skipping redirection for protected path: ${location.pathname}`);
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

    // Handle vendor onboarding - but only if not already on onboarding page
    if (userProfile.user_role === 'vendor' && location.pathname !== '/vendor/onboarding') {
      try {
        // Skip this check if already on a non-redirect path to prevent loops
        if (nonRedirectPaths.includes(location.pathname)) {
          console.log("On non-redirect path, skipping vendor onboarding check");
          return;
        }
        
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
