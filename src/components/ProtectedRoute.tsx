
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = () => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();
  const [vendorOnboarded, setVendorOnboarded] = useState<boolean | null>(null);
  const [checkingOnboarding, setCheckingOnboarding] = useState(false);

  const isVendorRoute = location.pathname.startsWith('/vendor');
  const isProfileRoute = location.pathname === '/profile';
  const isOnboardingRoute = location.pathname === '/vendor/onboarding';
  const isAuthRoute = location.pathname === '/auth';

  useEffect(() => {
    if (!user || !userProfile?.user_role || isAuthRoute || isOnboardingRoute) {
      // Skip checking if we don't have user, or if we're on auth or onboarding page
      setVendorOnboarded(false); // Set a default value so we don't get stuck
      return;
    }

    const checkVendorOnboarding = async () => {
      if (userProfile.user_role === 'vendor' && isVendorRoute && !isOnboardingRoute) {
        console.log("Checking vendor onboarding status in ProtectedRoute");
        setCheckingOnboarding(true);
        try {
          const { data, error } = await supabase
            .from('vendor_profiles')
            .select('onboarding_completed')
            .eq('user_id', user.id)
            .maybeSingle();

          if (error) throw error;
          console.log("Vendor onboarding status:", data?.onboarding_completed);
          setVendorOnboarded(data?.onboarding_completed ?? false);
        } catch (err) {
          console.error("Failed to check onboarding:", err);
          setVendorOnboarded(false);
        } finally {
          setCheckingOnboarding(false);
        }
      } else {
        // If not a vendor or not on vendor route, set to false to continue loading
        setVendorOnboarded(false);
      }
    };

    // Add a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (checkingOnboarding) {
        console.log("Checking onboarding timed out, forcing to continue");
        setCheckingOnboarding(false);
        setVendorOnboarded(false);
      }
    }, 3000);

    checkVendorOnboarding();
    
    return () => clearTimeout(timeout);
  }, [user, userProfile, isVendorRoute, isOnboardingRoute, isAuthRoute]);

  // Show loading state for a maximum of 5 seconds
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (loading || checkingOnboarding) {
        console.log("Loading timeout reached in ProtectedRoute, forcing to continue");
        setCheckingOnboarding(false);
      }
    }, 5000);
    
    return () => clearTimeout(loadingTimeout);
  }, [loading, checkingOnboarding]);

  if (loading || checkingOnboarding) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
        <p className="ml-3 text-wednest-brown">Loading your profile...</p>
      </div>
    );
  }

  // Allow access to auth route without authentication
  if (isAuthRoute) return <Outlet />;
  
  // Redirect to auth if not authenticated
  if (!user) return <Navigate to="/auth" replace />;

  // Handle vendor onboarding redirection
  if (
    userProfile?.user_role === 'vendor' &&
    vendorOnboarded === false &&
    !isOnboardingRoute &&
    isVendorRoute
  ) {
    console.log("Redirecting to vendor onboarding from ProtectedRoute");
    return <Navigate to="/vendor/onboarding" replace />;
  }

  // Prevent non-vendors from accessing vendor routes
  if (isVendorRoute && userProfile?.user_role !== 'vendor') {
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect vendors to vendor dashboard when accessing non-vendor routes
  if (!isVendorRoute && !isProfileRoute && userProfile?.user_role === 'vendor') {
    return <Navigate to="/vendor/dashboard" replace />;
  }

  // If all checks pass, render the route
  return <Outlet />;
};

export default ProtectedRoute;
