import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PlanningTools from "./pages/PlanningTools";
import WeddingBudgetCalculator from "./pages/WeddingBudgetCalculator";
import Inspiration from "./pages/Inspiration";
import Blog from "./pages/Blog";
import Vendors from "./pages/Vendors";
import VendorProfile from "./pages/VendorProfile";
import SavedVendors from "./pages/SavedVendors";

// Import AuthProvider
import { AuthProvider } from "./contexts/AuthContext";

// Lazy loaded authenticated pages
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Questionnaire = lazy(() => import("./pages/Questionnaire"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const StreamlinedCustomerDashboard = lazy(() => import("./pages/StreamlinedCustomerDashboard"));

// Lazy loaded couples dashboard pages
const Checklist = lazy(() => import("./pages/Checklist"));
const Budget = lazy(() => import("./pages/Budget"));
const GuestList = lazy(() => import("./pages/GuestList"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Messages = lazy(() => import("./pages/Messages"));
const Settings = lazy(() => import("./pages/Settings"));

// Lazy loaded vendor pages
const StreamlinedVendorDashboard = lazy(() => import("./pages/StreamlinedVendorDashboard"));
const VendorBookings = lazy(() => import("./pages/vendor/VendorBookings"));
const VendorListings = lazy(() => import("./pages/vendor/VendorListings"));
const VendorMessages = lazy(() => import("./pages/vendor/VendorMessages"));
const VendorPackages = lazy(() => import("./pages/vendor/VendorPackages"));
const VendorEarnings = lazy(() => import("./pages/vendor/VendorEarnings"));
const VendorReviews = lazy(() => import("./pages/vendor/VendorReviews"));
const VendorInsights = lazy(() => import("./pages/vendor/VendorInsights"));
const VendorSettings = lazy(() => import("./pages/vendor/VendorSettings"));
const VendorSubscription = lazy(() => import("./pages/vendor/VendorSubscription"));
const VendorBusinessProfile = lazy(() => import("./pages/vendor/VendorBusinessProfile"));
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
            <Route path="/planning-tools" element={<PlanningTools />} />
            <Route path="/planning-tools/budget-calculator" element={<WeddingBudgetCalculator />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/blog" element={<Blog />} />
            
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
              
              {/* Keep existing couples tools but de-emphasize them */}
              <Route path="/checklist" element={<Checklist />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/guest-list" element={<GuestList />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Vendor routes - use streamlined dashboard */}
              <Route path="/vendor" element={<StreamlinedVendorDashboard />} />
              <Route path="/vendor/dashboard" element={<StreamlinedVendorDashboard />} />
              <Route path="/vendor/bookings" element={<VendorBookings />} />
              <Route path="/vendor/listings" element={<VendorListings />} />
              <Route path="/vendor/messages" element={<VendorMessages />} />
              <Route path="/vendor/packages" element={<VendorPackages />} />
              <Route path="/vendor/earnings" element={<VendorEarnings />} />
              <Route path="/vendor/reviews" element={<VendorReviews />} />
              <Route path="/vendor/insights" element={<VendorInsights />} />
              <Route path="/vendor/settings" element={<VendorSettings />} />
              <Route path="/vendor/subscription" element={<VendorSubscription />} />
              <Route path="/vendor/business-profile" element={<VendorBusinessProfile />} />
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
