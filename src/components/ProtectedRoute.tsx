
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = () => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();

  const [vendorOnboarded, setVendorOnboarded] = useState<boolean | null>(null);
  const [checkingOnboarding, setCheckingOnboarding] = useState(false);
  const [checkTimeout, setCheckTimeout] = useState(false);

  const isVendorRoute = location.pathname.startsWith("/vendor");
  const isOnboardingRoute = location.pathname === "/vendor/onboarding";
  const isAuthRoute = location.pathname === "/auth";
  const isProfileRoute = location.pathname === "/profile";

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (checkingOnboarding) {
        console.log("Forcing timeout on vendor onboarding check");
        setCheckingOnboarding(false);
        setCheckTimeout(true);
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [checkingOnboarding]);

  useEffect(() => {
    const checkVendorOnboarding = async () => {
      // Skip check if we're already on the onboarding or auth page
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
            .maybeSingle();

          if (error) {
            console.error("Error checking onboarding:", error);
            setVendorOnboarded(false);
          } else if (!data) {
            console.log("No vendor profile found — assuming onboarding not complete.");
            setVendorOnboarded(false);
          } else {
            setVendorOnboarded(data.onboarding_completed || false);
          }
        } catch (err) {
          console.error("Failed to check vendor onboarding:", err);
          setVendorOnboarded(false);
        } finally {
          setCheckingOnboarding(false);
        }
      } else {
        // If we're on the onboarding page, don't show loading
        if (isOnboardingRoute || isAuthRoute) {
          setVendorOnboarded(null);
          setCheckingOnboarding(false);
        }
      }
    };

    // Only run this check if we have a user and we're not already checking
    if (user && userProfile && !checkingOnboarding && vendorOnboarded === null && !isOnboardingRoute && !isAuthRoute) {
      checkVendorOnboarding();
    }
  }, [user, userProfile, isVendorRoute, isOnboardingRoute, isAuthRoute, checkingOnboarding, vendorOnboarded]);

  // If on auth or onboarding page, don't show loading screen
  if (isAuthRoute || isOnboardingRoute) {
    return <Outlet />;
  }

  // If loading, show loading screen, but only if not on auth or onboarding pages
  if ((loading || (checkingOnboarding && !checkTimeout)) && !isOnboardingRoute && !isAuthRoute) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
        <p className="ml-3 text-wednest-brown">Loading your profile...</p>
      </div>
    );
  }

  // Authentication checks
  if (!user) return <Navigate to="/auth" replace />;

  // Vendor-specific checks
  if (
    userProfile?.user_role === "vendor" &&
    vendorOnboarded === false &&
    isVendorRoute &&
    !isOnboardingRoute
  ) {
    return <Navigate to="/vendor/onboarding" replace />;
  }

  // Role-based routing
  if (isVendorRoute && userProfile?.user_role !== "vendor") {
    return <Navigate to="/dashboard" replace />;
  }

  if (!isVendorRoute && !isProfileRoute && userProfile?.user_role === "vendor") {
    return <Navigate to="/vendor/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
