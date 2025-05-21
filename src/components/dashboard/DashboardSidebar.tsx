
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, Check, CreditCard, Heart, Home,
  List, MessageSquare, Settings, Users
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const DashboardSidebar = () => {
  const location = useLocation();
  const { user, userProfile } = useAuth();
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
  
  const navItems = [
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: <div className="rounded-md p-1.5 bg-theme-brown text-white"><Home className="w-4 h-4" /></div> 
    },
    { 
      name: "Checklist", 
      path: "/checklist", 
      icon: <div className="rounded-md p-1.5 bg-theme-sage text-white"><Check className="w-4 h-4" /></div> 
    },
    { 
      name: "Budget", 
      path: "/budget", 
      icon: <div className="rounded-md p-1.5 bg-theme-gold text-white"><CreditCard className="w-4 h-4" /></div> 
    },
    { 
      name: "Guest List", 
      path: "/guest-list", 
      icon: <div className="rounded-md p-1.5 bg-theme-cream text-theme-brown"><Users className="w-4 h-4" /></div> 
    },
    { 
      name: "Vendors", 
      path: "/vendors", 
      icon: <div className="rounded-md p-1.5 bg-theme-blue text-white"><Heart className="w-4 h-4" /></div> 
    },
    { 
      name: "Timeline", 
      path: "/timeline", 
      icon: <div className="rounded-md p-1.5 bg-theme-beige text-theme-brown"><Calendar className="w-4 h-4" /></div> 
    },
    { 
      name: "Messages", 
      path: "/messages", 
      icon: <div className="rounded-md p-1.5 bg-theme-brown-light text-white"><MessageSquare className="w-4 h-4" /></div> 
    },
    { 
      name: "Settings", 
      path: "/settings", 
      icon: <div className="rounded-md p-1.5 bg-gray-500 text-white"><Settings className="w-4 h-4" /></div> 
    },
  ];
  
  // Extract names for the footer
  const partnerNames = () => {
    if (!weddingDetails) return { partner1: "Partner", partner2: "Partner" };
    return {
      partner1: weddingDetails.partner1_name?.split(" ")[0] || "Partner 1",
      partner2: weddingDetails.partner2_name?.split(" ")[0] || "Partner 2"
    };
  };

  const names = partnerNames();
  const weddingDate = weddingDetails?.selected_date 
    ? new Date(weddingDetails.selected_date).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      }) 
    : "Date not set";
  const initials = `${names.partner1[0] || ""}${names.partner2[0] || ""}`;

  return (
    <div className="w-52 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <Link to="/">
          <h1 className="text-xl font-serif font-semibold text-theme-brown">
            Enosi
          </h1>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md group",
                location.pathname === item.path
                  ? "bg-theme-cream/10 text-theme-brown font-medium"
                  : "text-theme-brown-light hover:bg-theme-cream/10"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-theme-brown flex items-center justify-center text-white text-xs">
            {initials}
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium text-theme-brown">{names.partner1} & {names.partner2}</p>
            <p className="text-xs text-theme-brown-light">{weddingDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
