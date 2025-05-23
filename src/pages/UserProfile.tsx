
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccountSettings from "@/components/profile/AccountSettings";
import PaymentManagement from "@/components/profile/PaymentManagement";
import { Settings, CreditCard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const UserProfile = () => {
  const { user, signOut, userProfile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("account");
  const { toast } = useToast();
  
  const tabs = [
    {
      id: "account",
      label: "Account Settings",
      icon: <Settings className="h-5 w-5" />,
      component: <AccountSettings />
    },
    {
      id: "payments",
      label: "Payment Management",
      icon: <CreditCard className="h-5 w-5" />,
      component: <PaymentManagement />
    }
    // Additional tabs could be added here in the future
  ];

  const handleSignOut = async () => {
    try {
      console.log("Profile: Initiating sign out");
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account."
      });
      // No need to navigate here as it's handled by onAuthStateChange
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Display loading state while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
          <p className="mt-4 text-wednest-brown">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // If no user is found, display a message instead of redirecting (redirection is handled by ProtectedRoute)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-wednest-brown">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-wednest-cream py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-serif text-wednest-brown text-center mb-2">
              Your Profile
            </h1>
            <p className="text-wednest-brown-light text-center max-w-2xl mx-auto">
              Manage your account information and payment details
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-sm border border-wednest-beige p-4">
                <div className="flex flex-col items-center p-4 border-b border-wednest-beige">
                  <div className="w-20 h-20 rounded-full bg-wednest-sage/30 flex items-center justify-center mb-3">
                    <span className="text-2xl font-serif text-wednest-sage">
                      {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                  <h3 className="font-medium text-wednest-brown">
                    {userProfile?.full_name || user?.user_metadata?.full_name || "Wedding Planner"}
                  </h3>
                  <p className="text-sm text-wednest-brown-light mt-1">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-xs uppercase text-wednest-brown-light font-medium tracking-wider mb-3 px-2">
                    Profile Settings
                  </h4>
                  <nav className="space-y-1">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-left transition-colors ${
                          activeTab === tab.id 
                            ? 'bg-wednest-sage/10 text-wednest-sage' 
                            : 'text-wednest-brown-light hover:bg-wednest-cream/50 hover:text-wednest-brown'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
                
                {/* Account management section */}
                <div className="mt-6 pt-6 border-t border-wednest-beige">
                  <h4 className="text-xs uppercase text-wednest-brown-light font-medium tracking-wider mb-3 px-2">
                    Account
                  </h4>
                  <Button 
                    variant="ghost" 
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-start gap-3 text-wednest-brown-light hover:text-wednest-brown hover:bg-wednest-cream/50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:w-3/4">
              {tabs.find(tab => tab.id === activeTab)?.component}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
