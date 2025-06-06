
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, Clock, Plus, Settings, Search, Bell, MessageSquare, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import WeddingSummaryHeader from "@/components/dashboard/WeddingSummaryHeader";
import TaskProgressCard from "@/components/dashboard/TaskProgressCard";
import BudgetSummaryCard from "@/components/dashboard/BudgetSummaryCard";
import GuestListCard from "@/components/dashboard/GuestListCard";
import UpcomingTasksList from "@/components/dashboard/UpcomingTasksList";
import UpcomingEventsList from "@/components/dashboard/UpcomingEventsList";
import VendorDashboardList from "@/components/dashboard/VendorDashboardList";

const Dashboard = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [weddingDetails, setWeddingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
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
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeddingDetails();
  }, [user]);
  
  // Determine if user is a couple based on profile
  const isCouple = userProfile?.user_role !== 'vendor';

  // If user is a vendor, redirect to vendor dashboard
  useEffect(() => {
    if (userProfile?.user_role === 'vendor') {
      navigate('/vendor/dashboard');
    }
  }, [userProfile, navigate]);

  if (!isCouple) {
    return null; // Return nothing while redirecting
  }
  
  // Check if questionnaire is complete (all required fields filled)
  const isQuestionnaireComplete = weddingDetails && 
    weddingDetails.partner1_name && 
    weddingDetails.partner2_name && 
    weddingDetails.wedding_date_status && 
    weddingDetails.wedding_location_status && 
    weddingDetails.guest_count;
  
  return (
    <div className="min-h-screen flex bg-theme-cream/10">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Wedding Summary Header */}
          <WeddingSummaryHeader weddingDetails={weddingDetails} loading={loading} />
          
          {/* Setup CTA if questionnaire is not complete */}
          {!isQuestionnaireComplete && (
            <div className="dashboard-card mb-6 bg-theme-beige/30 animate-fade-in shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-serif font-semibold text-theme-brown">Complete Your Wedding Profile</h4>
                  <p className="text-theme-brown-light mt-1">Set important details like date, location, and guest count</p>
                </div>
                <Button 
                  className="bg-theme-brown text-white hover:bg-theme-brown-dark font-semibold"
                  onClick={() => navigate('/questionnaire')}
                >
                  Setup Wedding Details
                </Button>
              </div>
            </div>
          )}
          
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Planning Progress */}
            <TaskProgressCard />
            
            {/* Budget Overview */}
            <BudgetSummaryCard />
            
            {/* Guest List */}
            <GuestListCard />
          </div>
          
          {/* Tasks and Events Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Upcoming Tasks */}
            <UpcomingTasksList />
            
            {/* Upcoming Events */}
            <UpcomingEventsList />
          </div>
          
          {/* Vendor Section */}
          <div className="mt-8">
            <VendorDashboardList />
          </div>
          
          {/* Recommendations */}
          <Card className="mt-8 bg-theme-cream/20 border-theme-cream shadow-card">
            <CardContent className="flex flex-col md:flex-row items-center justify-between p-6 gap-4">
              <div>
                <h4 className="font-serif font-semibold text-lg text-theme-brown">Need help with your planning?</h4>
                <p className="text-theme-brown-light">Explore our curated vendor recommendations based on your preferences.</p>
              </div>
              <Button 
                variant="outline" 
                className="bg-theme-brown text-white hover:bg-theme-brown-dark font-semibold whitespace-nowrap"
              >
                <Search className="mr-2 h-4 w-4" />
                View Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
