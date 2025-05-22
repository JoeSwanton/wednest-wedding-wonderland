
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PlanningTools from "./pages/PlanningTools";
import Inspiration from "./pages/Inspiration";
import Blog from "./pages/Blog";
import Vendors from "./pages/Vendors";
import VendorProfile from "./pages/VendorProfile";

// Lazy loaded authenticated pages
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Questionnaire = lazy(() => import("./pages/Questionnaire"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CustomerDashboard = lazy(() => import("./pages/CustomerDashboard"));

// Lazy loaded vendor pages
const VendorDashboard = lazy(() => import("./pages/vendor/VendorDashboard"));
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

// Lazy load AuthProvider
const AuthProviderWrapper = lazy(() => import("./contexts/AuthContext").then(module => ({ 
  default: ({children}) => <module.AuthProvider>{children}</module.AuthProvider>
})));

// ProtectedRoute
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

const queryClient = new QueryClient();

// Loading fallback
const LoadingFallback = () => <div className="flex items-center justify-center min-h-screen">Loading...</div>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/:vendorId" element={<VendorProfile />} />
          <Route path="/planning-tools" element={<PlanningTools />} />
          <Route path="/inspiration" element={<Inspiration />} />
          <Route path="/blog" element={<Blog />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <Suspense fallback={<LoadingFallback />}>
              <AuthProviderWrapper>
                <ProtectedRoute />
              </AuthProviderWrapper>
            </Suspense>
          }>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            
            {/* Vendor routes */}
            <Route path="/vendor" element={<VendorDashboard />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
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
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
