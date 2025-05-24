
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Bell, Search, Settings, Plus, Calendar, CheckSquare, Users, CreditCard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BudgetTracker from "@/components/customer/BudgetTracker";
import GuestListManager from "@/components/customer/GuestListManager";
import TimelineCreator from "@/components/customer/TimelineCreator";
import TaskChecklist from "@/components/customer/TaskChecklist";
import VendorContracts from "@/components/customer/VendorContracts";
import PersonalizedHeader from "@/components/customer/PersonalizedHeader";
import SmartVendorManager from "@/components/customer/SmartVendorManager";
import NextStepsWidget from "@/components/customer/NextStepsWidget";
import BudgetOverviewWidget from "@/components/customer/BudgetOverviewWidget";
import GuestListWidget from "@/components/customer/GuestListWidget";
import PlanningToolsWidget from "@/components/customer/PlanningToolsWidget";
import UpcomingEventsList from "@/components/dashboard/UpcomingEventsList";

const CustomerDashboard = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("budget");
  const [slideDirection, setSlideDirection] = useState("right");
  
  // Mock wedding details - in real app this would come from API
  const mockWeddingDetails = {
    partner1_name: "Emma",
    partner2_name: "David",
    selected_date: "2025-11-03T00:00:00Z",
    location_details: "Downtown Event Center",
    exact_guest_count: 120
  };
  
  // Function to handle tab change with animation
  const handleTabChange = (tab: string) => {
    // Determine slide direction based on current and new tab
    const tabOrder = ["budget", "guests", "timeline", "checklist", "contracts"];
    const currentIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(tab);
    
    setSlideDirection(newIndex > currentIndex ? "right" : "left");
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-theme-beige/20">
      <Navbar />
      
      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Personalized Header */}
        <PersonalizedHeader weddingDetails={mockWeddingDetails} loading={false} />
        
        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Task-Centric Management */}
          <div className="lg:col-span-2 space-y-6">
            <SmartVendorManager />
            <NextStepsWidget />
          </div>
          
          {/* Right Sidebar - Widgets */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BudgetOverviewWidget />
              <GuestListWidget />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlanningToolsWidget />
              <UpcomingEventsList />
            </div>
          </div>
        </div>

        {/* Planning Tools Section */}
        <section className="space-y-6">
          <h3 className="font-serif font-semibold text-xl text-theme-text-primary">Detailed Planning Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button 
              variant="outline" 
              onClick={() => handleTabChange("budget")}
              className={`h-28 flex flex-col items-center justify-center gap-2 transition-all duration-200 border-theme-brown-light/30 hover:shadow-md
                ${activeTab === 'budget' ? 'border-theme-brown bg-theme-cream/20 shadow-md' : 'hover:bg-theme-cream/10'}`}
            >
              <CreditCard className="h-6 w-6 text-theme-brown" />
              <span className="font-medium text-sm">Budget</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleTabChange("guests")}
              className={`h-28 flex flex-col items-center justify-center gap-2 transition-all duration-200 border-theme-brown-light/30 hover:shadow-md
                ${activeTab === 'guests' ? 'border-theme-brown bg-theme-cream/20 shadow-md' : 'hover:bg-theme-cream/10'}`}
            >
              <Users className="h-6 w-6 text-theme-brown" />
              <span className="font-medium text-sm">Guests</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleTabChange("timeline")}
              className={`h-28 flex flex-col items-center justify-center gap-2 transition-all duration-200 border-theme-brown-light/30 hover:shadow-md
                ${activeTab === 'timeline' ? 'border-theme-brown bg-theme-cream/20 shadow-md' : 'hover:bg-theme-cream/10'}`}
            >
              <Calendar className="h-6 w-6 text-theme-brown" />
              <span className="font-medium text-sm">Timeline</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleTabChange("checklist")}
              className={`h-28 flex flex-col items-center justify-center gap-2 transition-all duration-200 border-theme-brown-light/30 hover:shadow-md
                ${activeTab === 'checklist' ? 'border-theme-brown bg-theme-cream/20 shadow-md' : 'hover:bg-theme-cream/10'}`}
            >
              <CheckSquare className="h-6 w-6 text-theme-brown" />
              <span className="font-medium text-sm">Checklist</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleTabChange("contracts")}
              className={`h-28 flex flex-col items-center justify-center gap-2 transition-all duration-200 border-theme-brown-light/30 hover:shadow-md
                ${activeTab === 'contracts' ? 'border-theme-brown bg-theme-cream/20 shadow-md' : 'hover:bg-theme-cream/10'}`}
            >
              <span className="text-2xl">📄</span>
              <span className="font-medium text-sm">Contracts</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/vendors")}
              className="h-28 flex flex-col items-center justify-center gap-2 border-theme-brown-light/30 hover:bg-theme-cream/10 hover:shadow-md transition-all duration-200"
            >
              <Search className="h-6 w-6 text-theme-brown" />
              <span className="font-medium text-sm">Find Vendors</span>
            </Button>
          </div>
        </section>
        
        {/* Tab Content */}
        <Card className="bg-white rounded-lg shadow-md border-theme-cream/30 animate-fade-in overflow-hidden">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-5 bg-theme-cream/20 p-0 h-auto">
              <TabsTrigger 
                value="budget" 
                className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-theme-brown data-[state=active]:rounded-none data-[state=active]:text-theme-brown data-[state=active]:font-medium"
              >
                Budget Tracker
              </TabsTrigger>
              <TabsTrigger 
                value="guests" 
                className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-theme-brown data-[state=active]:rounded-none data-[state=active]:text-theme-brown data-[state=active]:font-medium"
              >
                Guest List
              </TabsTrigger>
              <TabsTrigger 
                value="timeline" 
                className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-theme-brown data-[state=active]:rounded-none data-[state=active]:text-theme-brown data-[state=active]:font-medium"
              >
                Timeline
              </TabsTrigger>
              <TabsTrigger 
                value="checklist" 
                className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-theme-brown data-[state=active]:rounded-none data-[state=active]:text-theme-brown data-[state=active]:font-medium"
              >
                Checklist
              </TabsTrigger>
              <TabsTrigger 
                value="contracts" 
                className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-theme-brown data-[state=active]:rounded-none data-[state=active]:text-theme-brown data-[state=active]:font-medium"
              >
                Contracts
              </TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="budget" className={`mt-0 ${slideDirection === "right" ? "animate-slide-from-right" : "animate-slide-from-left"}`}>
                <BudgetTracker />
              </TabsContent>
              
              <TabsContent value="guests" className={`mt-0 ${slideDirection === "right" ? "animate-slide-from-right" : "animate-slide-from-left"}`}>
                <GuestListManager />
              </TabsContent>
              
              <TabsContent value="timeline" className={`mt-0 ${slideDirection === "right" ? "animate-slide-from-right" : "animate-slide-from-left"}`}>
                <TimelineCreator />
              </TabsContent>
              
              <TabsContent value="checklist" className={`mt-0 ${slideDirection === "right" ? "animate-slide-from-right" : "animate-slide-from-left"}`}>
                <TaskChecklist />
              </TabsContent>
              
              <TabsContent value="contracts" className={`mt-0 ${slideDirection === "right" ? "animate-slide-from-right" : "animate-slide-from-left"}`}>
                <VendorContracts />
              </TabsContent>
            </div>
          </Tabs>
        </Card>

        {/* Wedding Concierge CTA */}
        <Card className="bg-gradient-to-r from-theme-sage/10 to-theme-cream/10 border-theme-sage/20 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-theme-sage/20 rounded-full p-3">
                <span className="text-2xl">🧠</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-theme-brown mb-2">Need help with your planning?</h3>
                <p className="text-theme-brown-light mb-4">Based on your vendor preferences, we've curated 5 personalized recommendations just for you.</p>
                <Button className="bg-theme-sage hover:bg-theme-sage-dark text-white px-6">
                  View Recommendations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
