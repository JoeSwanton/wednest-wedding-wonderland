
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar, SidebarContent, SidebarFooter, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, Calendar, MessageSquare, Package, DollarSign, Star, TrendingUp, Settings, Info, LogOut } from "lucide-react";
import VendorSidebar from "./VendorSidebar";

interface VendorLayoutProps {
  children: ReactNode;
  title: string;
}

const VendorLayout = ({ children, title }: VendorLayoutProps) => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  
  console.log("VendorLayout: user:", user);
  console.log("VendorLayout: userProfile:", userProfile);
  console.log("VendorLayout: loading:", loading);
  
  // Protect vendor routes - redirect non-vendors away
  useEffect(() => {
    console.log("VendorLayout: useEffect triggered", { loading, user: !!user, userRole: userProfile?.user_role });
    
    if (!loading) {
      if (!user) {
        console.log("VendorLayout: No user, redirecting to auth");
        navigate('/auth');
        return;
      }
      
      if (userProfile && userProfile.user_role !== 'vendor') {
        console.log("VendorLayout: User is not vendor, redirecting to dashboard");
        navigate('/dashboard');
        return;
      }
    }
  }, [user, userProfile, loading, navigate]);
  
  // Show loading state
  if (loading) {
    console.log("VendorLayout: showing loading state");
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // If not logged in, don't render anything (redirect will handle it)
  if (!user) {
    console.log("VendorLayout: No user, not rendering");
    return null;
  }

  // If userProfile is still loading but we have a user, show loading
  if (!userProfile) {
    console.log("VendorLayout: No userProfile yet, showing loading");
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If not a vendor, don't render anything (redirect will handle it)
  if (userProfile.user_role !== 'vendor') {
    console.log("VendorLayout: Not a vendor, not rendering");
    return null;
  }

  console.log("VendorLayout: rendering layout");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <VendorSidebar />
        <main className="flex-1 bg-gray-50">
          <div className="flex justify-between items-center p-4 border-b bg-white">
            <h1 className="text-2xl font-serif text-wednest-brown">{title}</h1>
            <div className="flex items-center">
              <SidebarTrigger />
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default VendorLayout;
