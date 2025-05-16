import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = () => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();

  const [vendorOnboarded, setVendorOnboarded] = useState<boolean | null>(null);
  const [checkingOnboarding, setCheckingOnboarding] = useState(false);

  const isVendorRoute = location.pathname.startsWith("/vendor");
  const isOnboardingRoute = location.pathname === "/vendor/onboarding";
  const isAuthRoute = location.pathname === "/auth";
  const isProfileRoute = location.pathname === "/profile";

  useEffect(() => {
    const checkVendorOnboarding = async () => {
      if (
        user &&
        userProfile?.user_role === "vendor" &&
        isVendorRoute &&
        !isOnboardingRoute &&
        !isAuthRoute
      ) {
        setCheckingOnboarding(true);

        try {
          const { data, error } = await supabase
            .from("vendor_profiles")
            .select("onboarding_completed")
            .eq("user_id", user.id)
            .single();

          if (error) {
            console.error("Error checking onboarding:", error);
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
  }, [user, userProfile, isVendorRoute, isOnboardingRoute, isAuthRoute]);

  // Still loading user or checking onboarding status
  if (loading || checkingOnboarding || vendorOnboarded === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
        <p className="ml-3 text-wednest-brown">Loading your profile...</p>
      </div>
    );
  }

  // Allow access to auth route
  if (isAuthRoute) {
    return <Outlet />;
  }

  // User not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Vendor hasn't completed onboarding yet
  if (
    userProfile?.user_role === "vendor" &&
    vendorOnboarded === false &&
    isVendorRoute &&
    !isOnboardingRoute
  ) {
    return <Navigate to="/vendor/onboarding" replace />;
  }

  // Non-vendor trying to access vendor route
  if (isVendorRoute && userProfile?.user_role !== "vendor") {
    return <Navigate to="/dashboard" replace />;
  }

  // Vendor trying to access couple-only routes (except profile)
  if (
    !isVendorRoute &&
    !isProfileRoute &&
    userProfile?.user_role === "vendor"
  ) {
    return <Navigate to="/vendor/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
