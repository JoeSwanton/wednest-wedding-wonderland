
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccountSettings from "@/components/profile/AccountSettings";
import PaymentManagement from "@/components/profile/PaymentManagement";
import { Settings, CreditCard, Bell, Lock } from "lucide-react";

const UserProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("account");
  
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
    },
    // Additional tabs could be added here in the future
  ];

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
                    {user?.user_metadata?.full_name || "Wedding Planner"}
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
