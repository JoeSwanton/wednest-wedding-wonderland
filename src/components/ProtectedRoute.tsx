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
    if (!user || !userProfile?.user_role || isAuthRoute || isOnboardingRoute) return;

    const checkVendorOnboarding = async () => {
      if (userProfile.user_role === 'vendor' && isVendorRoute && !isOnboardingRoute) {
        setCheckingOnboarding(true);
        try {
          const { data, error } = await supabase
            .from('vendor_profiles')
            .select('onboarding_completed')
            .eq('user_id', user.id)
            .single();

          setVendorOnboarded(data?.onboarding_completed ?? false);
        } catch (err) {
          console.error("Failed to check onboarding:", err);
          setVendorOnboarded(false);
        } finally {
          setCheckingOnboarding(false);
        }
      }
    };

    checkVendorOnboarding();
  }, [user, userProfile, isVendorRoute, isOnboardingRoute, isAuthRoute]);

  if (loading || checkingOnboarding || vendorOnboarded === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
        <p className="ml-3 text-wednest-brown">Loading your profile...</p>
      </div>
    );
  }

  if (isAuthRoute) return <Outlet />;
  if (!user) return <Navigate to="/auth" replace />;

  if (
    userProfile?.user_role === 'vendor' &&
    vendorOnboarded === false &&
    !isOnboardingRoute &&
    isVendorRoute
  ) {
    return <Navigate to="/vendor/onboarding" replace />;
  }

  if (isVendorRoute && userProfile?.user_role !== 'vendor') {
    return <Navigate to="/dashboard" replace />;
  }

  if (!isVendorRoute && !isProfileRoute && userProfile?.user_role === 'vendor') {
    return <Navigate to="/vendor/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
