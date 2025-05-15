
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = () => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();
  const [vendorOnboarded, setVendorOnboarded] = useState<boolean | null>(null);
  const [checkingOnboarding, setCheckingOnboarding] = useState(false);
  
  // Check if the route is a vendor route
  const isVendorRoute = location.pathname.startsWith('/vendor');
  const isProfileRoute = location.pathname === '/profile';
  const isOnboardingRoute = location.pathname === '/vendor/onboarding';
  const isAuthRoute = location.pathname === '/auth';
  
  // Check if vendor has completed onboarding
  useEffect(() => {
    const checkVendorOnboarding = async () => {
      if (user && userProfile?.user_role === 'vendor' && !isOnboardingRoute && !isAuthRoute) {
        setCheckingOnboarding(true);
        try {
          const { data, error } = await supabase
            .from('vendor_profiles')
            .select('onboarding_completed')
            .eq('user_id', user.id)
            .single();
            
          if (error) {
            console.error("Error checking vendor onboarding:", error);
            setVendorOnboarded(false);
          } else {
            setVendorOnboarded(data?.onboarding_completed || false);
          }
        } catch (err) {
          console.error("Failed to check vendor onboarding:", err);
          setVendorOnboarded(false);
        } finally {
          setCheckingOnboarding(false);
        }
      }
    };
    
    checkVendorOnboarding();
  }, [user, userProfile, isOnboardingRoute, isAuthRoute]);
  
  // If auth is still loading, show loading indicator
  if (loading || checkingOnboarding) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
        <p className="ml-3 text-wednest-brown">Loading your profile...</p>
      </div>
    );
  }
  
  // If user is not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Redirect vendor to onboarding if they haven't completed it
  // Only for vendor routes, not for the auth page
  if (userProfile?.user_role === 'vendor' && 
      vendorOnboarded === false && 
      !isOnboardingRoute &&
      isVendorRoute) {
    return <Navigate to="/vendor/onboarding" replace />;
  }
  
  // For vendor routes, check if user is a vendor
  if (isVendorRoute && userProfile?.user_role !== 'vendor') {
    // Redirect non-vendors away from vendor routes
    return <Navigate to="/dashboard" replace />;
  }
  
  // For couple routes, except profile page which all users can access
  if (!isVendorRoute && !isProfileRoute && userProfile?.user_role === 'vendor') {
    // Redirect vendors to vendor dashboard
    return <Navigate to="/vendor" replace />;
  }
  
  // If user is authenticated and has proper permissions, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
