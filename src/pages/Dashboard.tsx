
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Bell, Menu, Search, Settings } from "lucide-react";
import WeddingSummary from "@/components/dashboard/WeddingSummary";
import TaskProgressChart from "@/components/dashboard/TaskProgressChart";
import BudgetOverview from "@/components/dashboard/BudgetOverview";
import QuickActions from "@/components/dashboard/QuickActions";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [weddingDetails, setWeddingDetails] = useState<any>(null);
  
  useEffect(() => {
    const fetchWeddingDetails = async () => {
      if (!user) return;
      
      try {
        const { data } = await supabase
          .from('wedding_details')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        setWeddingDetails(data);
      } catch (error) {
        console.error('Error fetching wedding details:', error);
      }
    };
    
    fetchWeddingDetails();
  }, [user]);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/auth');
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wednest-beige/20">
      <header className="bg-white shadow-sm border-b border-wednest-beige/30">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-serif text-wednest-brown">Your Wedding Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-wednest-brown">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-wednest-brown">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-wednest-brown">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={handleSignOut} className="ml-2">Sign Out</Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-wednest-sage-light to-wednest-sage rounded-lg shadow-sm p-6 mb-8 text-white">
          <h2 className="text-2xl font-serif">
            Welcome, {weddingDetails?.partner1_name || "there"}!
          </h2>
          <p className="opacity-90 mt-1">
            {weddingDetails ? 
              `Your wedding planning journey is underway. Here's your latest progress.` : 
              "Let's start planning your dream wedding."}
          </p>
        </div>
        
        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <WeddingSummary />
          <TaskProgressChart />
          <QuickActions />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BudgetOverview />
          <UpcomingEvents />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
