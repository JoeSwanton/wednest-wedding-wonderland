
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import Questionnaire from "./pages/Questionnaire";
import Vendors from "./pages/Vendors";
import PlanningTools from "./pages/PlanningTools";
import Inspiration from "./pages/Inspiration";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";

// Vendor pages
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorBookings from "./pages/vendor/VendorBookings";
import VendorListings from "./pages/vendor/VendorListings";
import VendorMessages from "./pages/vendor/VendorMessages";
import VendorPackages from "./pages/vendor/VendorPackages";
import VendorEarnings from "./pages/vendor/VendorEarnings";
import VendorReviews from "./pages/vendor/VendorReviews";
import VendorInsights from "./pages/vendor/VendorInsights";
import VendorSettings from "./pages/vendor/VendorSettings";
import VendorSubscription from "./pages/vendor/VendorSubscription";
import VendorBusinessProfile from "./pages/vendor/VendorBusinessProfile";

// ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/planning-tools" element={<PlanningTools />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/blog" element={<Blog />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/questionnaire" element={<Questionnaire />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
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
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
