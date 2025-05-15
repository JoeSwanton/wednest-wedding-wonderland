
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
  
  // Protect vendor routes - redirect non-vendors away
  useEffect(() => {
    if (!loading && (!user || userProfile?.user_role !== 'vendor')) {
      navigate('/auth');
    }
  }, [user, userProfile, loading, navigate]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // If not logged in or not a vendor, don't render anything (redirect will handle it)
  if (!user || userProfile?.user_role !== 'vendor') {
    return null;
  }

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
