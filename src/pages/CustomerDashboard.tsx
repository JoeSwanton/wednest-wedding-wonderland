
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Bell, Search, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wednest-beige/20">
      <Navbar />
      
      {/* Dashboard Header */}
      <DashboardHeader />
      
      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Quick Access Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => setActiveTab("budget")}
            className={`h-28 flex flex-col items-center justify-center gap-2 ${activeTab === 'budget' ? 'border-theme-brown bg-theme-cream/20' : ''}`}
          >
            <span className="text-2xl">📊</span>
            <span className="font-medium">Budget Tracker</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setActiveTab("guests")}
            className={`h-28 flex flex-col items-center justify-center gap-2 ${activeTab === 'guests' ? 'border-theme-brown bg-theme-cream/20' : ''}`}
          >
            <span className="text-2xl">👥</span>
            <span className="font-medium">Guest List</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setActiveTab("timeline")}
            className={`h-28 flex flex-col items-center justify-center gap-2 ${activeTab === 'timeline' ? 'border-theme-brown bg-theme-cream/20' : ''}`}
          >
            <span className="text-2xl">🕒</span>
            <span className="font-medium">Timeline</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setActiveTab("checklist")}
            className={`h-28 flex flex-col items-center justify-center gap-2 ${activeTab === 'checklist' ? 'border-theme-brown bg-theme-cream/20' : ''}`}
          >
            <span className="text-2xl">✅</span>
            <span className="font-medium">Checklist</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setActiveTab("contracts")}
            className={`h-28 flex flex-col items-center justify-center gap-2 ${activeTab === 'contracts' ? 'border-theme-brown bg-theme-cream/20' : ''}`}
          >
            <span className="text-2xl">📄</span>
            <span className="font-medium">Vendor Contracts</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate("/vendors")}
            className="h-28 flex flex-col items-center justify-center gap-2"
          >
            <span className="text-2xl">💍</span>
            <span className="font-medium">Browse Vendors</span>
          </Button>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="budget">Budget Tracker</TabsTrigger>
              <TabsTrigger value="guests">Guest List</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="budget">
              <BudgetTracker />
            </TabsContent>
            
            <TabsContent value="guests">
              <GuestListManager />
            </TabsContent>
            
            <TabsContent value="timeline">
              <TimelineCreator />
            </TabsContent>
            
            <TabsContent value="checklist">
              <TaskChecklist />
            </TabsContent>
            
            <TabsContent value="contracts">
              <VendorContracts />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Bottom Action Bar */}
        <div className="flex flex-wrap justify-center gap-x-8 mb-8 bg-white rounded-lg p-4 shadow-sm">
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <span className="text-xl">📥</span>
            <span className="text-sm font-medium">Uploads</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <span className="text-xl">🔔</span>
            <span className="text-sm font-medium">Reminders</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <span className="text-xl">📱</span>
            <span className="text-sm font-medium">Mobile View</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <span className="text-xl">⚙️</span>
            <span className="text-sm font-medium">Settings</span>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
