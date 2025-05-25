import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Vendors from "@/pages/Vendors";
import VendorProfile from "@/pages/VendorProfile";
import PlanningTools from "@/pages/PlanningTools";
import WeddingBudgetCalculator from "@/pages/WeddingBudgetCalculator";
import Inspiration from "@/pages/Inspiration";
import Blog from "@/pages/Blog";
import Questionnaire from "@/pages/Questionnaire";
import Dashboard from "@/pages/Dashboard";
import CustomerDashboard from "@/pages/CustomerDashboard";
import UserProfile from "@/pages/UserProfile";
import VendorDashboard from "@/pages/vendor/VendorDashboard";
import VendorOnboarding from "@/pages/vendor/VendorOnboarding";
import VendorListings from "@/pages/vendor/VendorListings";
import VendorBookings from "@/pages/vendor/VendorBookings";
import VendorReviews from "@/pages/vendor/VendorReviews";
import VendorEarnings from "@/pages/vendor/VendorEarnings";
import VendorMessages from "@/pages/vendor/VendorMessages";
import VendorPackages from "@/pages/vendor/VendorPackages";
import VendorBusinessProfile from "@/pages/vendor/VendorBusinessProfile";
import VendorInsights from "@/pages/vendor/VendorInsights";
import VendorSettings from "@/pages/vendor/VendorSettings";
import VendorSubscription from "@/pages/vendor/VendorSubscription";
import OnboardingAnalytics from "@/pages/admin/OnboardingAnalytics";
import NotFound from "@/pages/NotFound";
import SavedVendors from "@/pages/SavedVendors";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster"

// A wrapper for routes that require authentication
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    if (!loading) {
      setHasCheckedAuth(true);
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!user && hasCheckedAuth) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/:id" element={<VendorProfile />} />
          <Route path="/planning-tools" element={<PlanningTools />} />
          <Route path="/planning-tools/budget-calculator" element={<WeddingBudgetCalculator />} />
          <Route path="/inspiration" element={<Inspiration />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/saved-vendors" element={<SavedVendors />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/customer-dashboard" element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          
          {/* Vendor Routes */}
          <Route path="/vendor/*" element={
            <ProtectedRoute>
              <Routes>
                <Route path="dashboard" element={<VendorDashboard />} />
                <Route path="onboarding" element={<VendorOnboarding />} />
                <Route path="listings" element={<VendorListings />} />
                <Route path="bookings" element={<VendorBookings />} />
                <Route path="reviews" element={<VendorReviews />} />
                <Route path="earnings" element={<VendorEarnings />} />
                <Route path="messages" element={<VendorMessages />} />
                <Route path="packages" element={<VendorPackages />} />
                <Route path="business-profile" element={<VendorBusinessProfile />} />
                <Route path="insights" element={<VendorInsights />} />
                <Route path="settings" element={<VendorSettings />} />
                <Route path="subscription" element={<VendorSubscription />} />
              </Routes>
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Routes>
                <Route path="onboarding-analytics" element={<OnboardingAnalytics />} />
              </Routes>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
