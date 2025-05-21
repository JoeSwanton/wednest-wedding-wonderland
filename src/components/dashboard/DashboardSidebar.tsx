
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, Check, CreditCard, Heart, Home,
  MessageSquare, Settings, Users, ChevronRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const DashboardSidebar = () => {
  const location = useLocation();
  const { user, userProfile } = useAuth();
  const [weddingDetails, setWeddingDetails] = useState<any>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
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
      icon: <div className="rounded-md p-1.5 bg-gradient-to-br from-theme-brown to-theme-brown-dark text-white"><Home className="w-4 h-4" /></div> 
    },
    { 
      name: "Checklist", 
      path: "/checklist", 
      icon: <div className="rounded-md p-1.5 bg-gradient-to-br from-theme-sage to-theme-sage-dark text-white"><Check className="w-4 h-4" /></div> 
    },
    { 
      name: "Budget", 
      path: "/budget", 
      icon: <div className="rounded-md p-1.5 bg-gradient-to-br from-theme-gold to-theme-gold-dark text-white"><CreditCard className="w-4 h-4" /></div> 
    },
    { 
      name: "Guest List", 
      path: "/guest-list", 
      icon: <div className="rounded-md p-1.5 bg-gradient-to-br from-theme-cream to-theme-cream-dark text-theme-brown"><Users className="w-4 h-4" /></div> 
    },
    { 
      name: "Vendors", 
      path: "/vendors", 
      icon: <div className="rounded-md p-1.5 bg-gradient-to-br from-theme-blue to-theme-blue-dark text-white"><Heart className="w-4 h-4" /></div>,
      subItems: [
        { name: "Find Vendors", path: "/vendors" },
        { name: "My Vendors", path: "/my-vendors" },
        { name: "Favorites", path: "/vendor-favorites" }
      ]
    },
    { 
      name: "Timeline", 
      path: "/timeline", 
      icon: <div className="rounded-md p-1.5 bg-gradient-to-br from-theme-beige to-theme-beige-dark text-theme-brown"><Calendar className="w-4 h-4" /></div> 
    },
    { 
      name: "Messages", 
      path: "/messages", 
      icon: <div className="rounded-md p-1.5 bg-gradient-to-br from-theme-brown-light to-theme-brown text-white"><MessageSquare className="w-4 h-4" /></div> 
    },
    { 
      name: "Settings", 
      path: "/settings", 
      icon: <div className="rounded-md p-1.5 bg-gradient-to-br from-gray-500 to-gray-700 text-white"><Settings className="w-4 h-4" /></div> 
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

  // Calculate days until wedding
  const getDaysRemaining = () => {
    if (!weddingDetails || !weddingDetails.selected_date) return null;
    
    const weddingDate = new Date(weddingDetails.selected_date);
    const today = new Date();
    const daysLeft = Math.floor((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysLeft > 0 ? daysLeft : 0;
  };
  
  const daysLeft = getDaysRemaining();

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-60"
    )}>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <Link to="/" className={cn("flex items-center", isCollapsed && "justify-center")}>
          <h1 className={cn("text-xl font-serif font-semibold text-theme-brown transition-opacity duration-300", 
            isCollapsed && "opacity-0 w-0")}>
            Enosi
          </h1>
          <span className={cn("text-xl font-serif font-semibold text-theme-brown", 
            !isCollapsed && "hidden")}>E</span>
        </Link>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-theme-brown-light hover:text-theme-brown rounded-full p-1 hover:bg-gray-100"
        >
          <ChevronRight className={cn("h-4 w-4 transition-transform", 
            isCollapsed ? "rotate-180" : "")} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            item.subItems ? (
              <Collapsible key={item.name} className="w-full">
                <CollapsibleTrigger className="w-full" asChild>
                  <div className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md cursor-pointer group mb-1",
                    location.pathname === item.path
                      ? "bg-theme-cream/10 text-theme-brown font-medium"
                      : "text-theme-brown-light hover:bg-theme-cream/10 hover:text-theme-brown"
                  )}>
                    {item.icon}
                    <span className={cn("ml-3 flex-1 transition-opacity duration-300", 
                      isCollapsed && "opacity-0 w-0 hidden")}>{item.name}</span>
                    <ChevronRight className={cn("h-3.5 w-3.5 transition-transform text-theme-brown-light", 
                      isCollapsed && "hidden")} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className={cn("space-y-1 pl-8", isCollapsed && "hidden")}>
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className={cn(
                        "block px-3 py-1.5 text-xs rounded-md",
                        location.pathname === subItem.path
                          ? "bg-theme-cream/10 text-theme-brown font-medium"
                          : "text-theme-brown-light hover:bg-theme-cream/10 hover:text-theme-brown"
                      )}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md group",
                  location.pathname === item.path
                    ? "bg-theme-cream/10 text-theme-brown font-medium"
                    : "text-theme-brown-light hover:bg-theme-cream/10 hover:text-theme-brown"
                )}
              >
                {item.icon}
                <span className={cn("ml-3 transition-opacity duration-300", 
                  isCollapsed && "opacity-0 w-0 hidden")}>{item.name}</span>
              </Link>
            )
          ))}
        </nav>
      </div>
      
      <div className={cn("p-4 border-t border-gray-100", 
        isCollapsed ? "flex justify-center" : "")}>
        {isCollapsed ? (
          <div className="h-8 w-8 rounded-full bg-theme-brown flex items-center justify-center text-white text-xs">
            {initials}
          </div>
        ) : (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-theme-brown flex items-center justify-center text-white text-xs">
              {initials}
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-theme-brown">{names.partner1} & {names.partner2}</p>
              <div className="flex items-center gap-1">
                <p className="text-xs text-theme-brown-light">{weddingDate}</p>
                {daysLeft !== null && (
                  <span className="bg-theme-cream/20 text-theme-brown-light text-xs px-1.5 rounded-full">{daysLeft}d</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
