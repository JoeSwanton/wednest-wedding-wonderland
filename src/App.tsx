
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Vendors from "./pages/Vendors";
import VendorProfile from "./pages/VendorProfile";
import SavedVendors from "./pages/SavedVendors";

// Import AuthProvider
import { AuthProvider } from "./contexts/AuthContext";

// Lazy loaded authenticated pages
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Questionnaire = lazy(() => import("./pages/Questionnaire"));
const StreamlinedCustomerDashboard = lazy(() => import("./pages/StreamlinedCustomerDashboard"));

// Lazy loaded vendor pages
const StreamlinedVendorDashboard = lazy(() => import("./pages/StreamlinedVendorDashboard"));
const VendorOnboarding = lazy(() => import("./pages/vendor/VendorOnboarding"));

// Lazy loaded admin pages
const VendorList = lazy(() => import("./pages/admin/VendorList"));
const VendorReview = lazy(() => import("./pages/admin/VendorReview"));

// Lazy load ProtectedRoute
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

// Loading fallback
const LoadingFallback = () => <div className="flex items-center justify-center min-h-screen">Loading...</div>;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/vendors/:vendorId" element={<VendorProfile />} />
            <Route path="/saved-vendors" element={<SavedVendors />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <Suspense fallback={<LoadingFallback />}>
                <ProtectedRoute />
              </Suspense>
            }>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/questionnaire" element={<Questionnaire />} />
              <Route path="/dashboard" element={<StreamlinedCustomerDashboard />} />
              <Route path="/customer-dashboard" element={<StreamlinedCustomerDashboard />} />
              
              {/* Vendor routes */}
              <Route path="/vendor" element={<StreamlinedVendorDashboard />} />
              <Route path="/vendor/dashboard" element={<StreamlinedVendorDashboard />} />
              <Route path="/vendor/onboarding" element={<VendorOnboarding />} />
              
              {/* Admin routes */}
              <Route path="/admin/vendors" element={<VendorList />} />
              <Route path="/admin/vendor-review/:vendorId" element={<VendorReview />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
