
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();
  
  // Check if the route is a vendor route
  const isVendorRoute = location.pathname.startsWith('/vendor');
  const isProfileRoute = location.pathname === '/profile';
  
  // If auth is still loading, show loading indicator
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // If user is not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // For vendor routes, check if user is a vendor
  if (isVendorRoute && userProfile?.user_type !== 'vendor') {
    // Redirect non-vendors away from vendor routes
    return <Navigate to="/dashboard" replace />;
  }
  
  // For couple routes, except profile page which all users can access
  if (!isVendorRoute && !isProfileRoute && userProfile?.user_type === 'vendor') {
    // Redirect vendors to vendor dashboard
    return <Navigate to="/vendor" replace />;
  }
  
  // If user is authenticated and has proper permissions, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
