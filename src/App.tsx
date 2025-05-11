
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Questionnaire from "./pages/Questionnaire";
import Dashboard from "./pages/Dashboard";
import Vendors from "./pages/Vendors";
import PlanningTools from "./pages/PlanningTools";
import Inspiration from "./pages/Inspiration";
import Blog from "./pages/Blog";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

// Title updater component
const TitleUpdater = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Set default title
    document.title = "Enosi - Your All-in-One Australian Wedding Planning Platform";
    
    // You can add more route-specific titles here
    if (location.pathname === "/vendors") {
      document.title = "Find Wedding Vendors - Enosi";
    } else if (location.pathname === "/auth") {
      document.title = "Sign In - Enosi";
    } else if (location.pathname === "/questionnaire") {
      document.title = "Wedding Questionnaire - Enosi";
    } else if (location.pathname === "/dashboard") {
      document.title = "Your Dashboard - Enosi";
    } else if (location.pathname === "/planning-tools") {
      document.title = "Wedding Planning Tools - Enosi";
    } else if (location.pathname === "/inspiration") {
      document.title = "Wedding Inspiration - Enosi";
    } else if (location.pathname === "/blog") {
      document.title = "Wedding Blog - Enosi";
    } else if (location.pathname === "/profile") {
      document.title = "Your Profile - Enosi";
    }
  }, [location]);
  
  return null;
};

const AppRoutes = () => (
  <>
    <TitleUpdater />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/planning-tools" element={<PlanningTools />} />
      <Route path="/inspiration" element={<Inspiration />} />
      <Route path="/blog" element={<Blog />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
