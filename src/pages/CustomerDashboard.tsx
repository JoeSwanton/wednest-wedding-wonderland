
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
import DashboardHeader from "@/components/customer/DashboardHeader";

const CustomerDashboard = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("budget");
  const [slideDirection, setSlideDirection] = useState("right");
  
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
      
      {/* Dashboard Header */}
      <DashboardHeader />
      
      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Quick Access Tiles */}
        <h3 className="font-serif font-semibold text-xl text-theme-text-primary mb-4">Planning Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => handleTabChange("budget")}
            className={`h-28 flex flex-col items-center justify-center gap-2 transition-all duration-200 
              ${activeTab === 'budget' ? 'border-theme-brown bg-theme-cream/20 shadow-card' : 'hover:shadow-card'}`}
          >
            <CreditCard className="h-6 w-6 text-theme-brown" />
            <span className="font-medium text-sm">Budget</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleTabChange("guests")}
            className={`h-28 flex flex-col items-center justify-center gap-2 transition-all duration-200
              ${activeTab === 'guests' ? 'border-theme-brown bg-theme-cream/20 shadow-card' : 'hover:shadow-card'}`}
          >
            <Users className="h-6 w-6 text-theme-brown" />
            <span className="font-medium text-sm">Guests</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleTabChange("timeline")}
            className={`h-28 flex flex-col items-center justify-center gap-2 transition-all duration-200
              ${activeTab === 'timeline' ? 'border-theme-brown bg-theme-cream/20 shadow-card' : 'hover:shadow-card'}`}
          >
            <Calendar className="h-6 w-6 text-theme-brown" />
            <span className="font-medium text-sm">Timeline</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleTabChange("checklist")}
            className={`h-28 flex flex-col items-center justify-center gap-2 transition-all duration-200
              ${activeTab === 'checklist' ? 'border-theme-brown bg-theme-cream/20 shadow-card' : 'hover:shadow-card'}`}
          >
            <CheckSquare className="h-6 w-6 text-theme-brown" />
            <span className="font-medium text-sm">Checklist</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleTabChange("contracts")}
            className={`h-28 flex flex-col items-center justify-center gap-2 transition-all duration-200
              ${activeTab === 'contracts' ? 'border-theme-brown bg-theme-cream/20 shadow-card' : 'hover:shadow-card'}`}
          >
            <span className="text-2xl">📄</span>
            <span className="font-medium text-sm">Contracts</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate("/vendors")}
            className="h-28 flex flex-col items-center justify-center gap-2 hover:shadow-card transition-all duration-200"
          >
            <Search className="h-6 w-6 text-theme-brown" />
            <span className="font-medium text-sm">Find Vendors</span>
          </Button>
        </div>
        
        {/* Tab Content */}
        <Card className="bg-white rounded-lg shadow-card mb-8 animate-fade-in overflow-hidden">
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
        
        {/* Bottom Action Bar */}
        <Card className="shadow-card bg-white">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-serif">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center md:justify-start gap-x-4 md:gap-x-8">
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-4">
              <Bell className="h-5 w-5 text-theme-brown" />
              <span className="text-xs font-medium">Reminders</span>
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-4">
              <Plus className="h-5 w-5 text-theme-brown" />
              <span className="text-xs font-medium">Add Task</span>
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-4">
              <Calendar className="h-5 w-5 text-theme-brown" />
              <span className="text-xs font-medium">Add Event</span>
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-4">
              <Settings className="h-5 w-5 text-theme-brown" />
              <span className="text-xs font-medium">Settings</span>
            </Button>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
