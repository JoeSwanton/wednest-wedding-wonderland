
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ListChecks, 
  Wallet, 
  Users, 
  Briefcase, 
  Clock, 
  MessageSquare, 
  Settings, 
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

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
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      name: "Checklist", 
      path: "/checklist", 
      icon: <ListChecks className="w-5 h-5" />,
      badge: "24"
    },
    { 
      name: "Budget", 
      path: "/budget", 
      icon: <Wallet className="w-5 h-5" /> 
    },
    { 
      name: "Guest List", 
      path: "/guest-list", 
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      name: "Vendors", 
      path: "/vendors", 
      icon: <Briefcase className="w-5 h-5" />,
      subItems: [
        { name: "Find Vendors", path: "/vendors" },
        { name: "My Vendors", path: "/my-vendors" },
        { name: "Favorites", path: "/vendor-favorites" }
      ]
    },
    { 
      name: "Timeline", 
      path: "/timeline", 
      icon: <Clock className="w-5 h-5" /> 
    },
    { 
      name: "Messages", 
      path: "/messages", 
      icon: <MessageSquare className="w-5 h-5" />,
      badge: "3"
    },
    { 
      name: "Settings", 
      path: "/settings", 
      icon: <Settings className="w-5 h-5" />
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
      "bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col shadow-sm",
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
        <nav className="px-2 space-y-1.5">
          {navItems.map((item) => (
            item.subItems ? (
              <Collapsible key={item.name} className="w-full">
                <CollapsibleTrigger className="w-full" asChild>
                  <div className={cn(
                    "flex items-center px-3 py-2.5 text-sm rounded-md cursor-pointer group mb-1 transition-colors duration-150",
                    location.pathname === item.path
                      ? "bg-theme-cream/30 text-theme-brown font-medium"
                      : "text-theme-brown-light hover:bg-theme-cream/20 hover:text-theme-brown"
                  )}>
                    <div className={cn(
                      "rounded-md p-1.5 text-theme-brown-light group-hover:text-theme-brown",
                      location.pathname === item.path ? "text-theme-brown" : ""
                    )}>
                      {item.icon}
                    </div>
                    <span className={cn("ml-3 flex-1 transition-opacity duration-300", 
                      isCollapsed && "opacity-0 w-0 hidden")}>{item.name}</span>
                    {item.badge && !isCollapsed && (
                      <Badge className="bg-theme-brown text-white ml-2 mr-2">{item.badge}</Badge>
                    )}
                    <ChevronRight className={cn("h-3.5 w-3.5 transition-transform text-theme-brown-light", 
                      isCollapsed && "hidden")} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className={cn("space-y-1 pl-9", isCollapsed && "hidden")}>
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className={cn(
                        "block px-3 py-2 text-xs rounded-md transition-colors duration-150",
                        location.pathname === subItem.path
                          ? "bg-theme-cream/30 text-theme-brown font-medium"
                          : "text-theme-brown-light hover:bg-theme-cream/20 hover:text-theme-brown"
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
                  "flex items-center px-3 py-2.5 text-sm rounded-md group transition-colors duration-150",
                  location.pathname === item.path
                    ? "bg-theme-cream/30 text-theme-brown font-medium"
                    : "text-theme-brown-light hover:bg-theme-cream/20 hover:text-theme-brown"
                )}
              >
                <div className={cn(
                  "rounded-md p-1 text-theme-brown-light group-hover:text-theme-brown",
                  location.pathname === item.path ? "text-theme-brown" : ""
                )}>
                  {item.icon}
                </div>
                <span className={cn("ml-3 transition-opacity duration-300", 
                  isCollapsed && "opacity-0 w-0 hidden")}>{item.name}</span>
                {item.badge && !isCollapsed && (
                  <Badge className="bg-theme-brown text-white ml-auto">{item.badge}</Badge>
                )}
              </Link>
            )
          ))}
        </nav>
      </div>
      
      <div className={cn(
        "p-4 border-t border-gray-100 transition-all duration-300", 
        isCollapsed ? "flex justify-center" : ""
      )}>
        {isCollapsed ? (
          <div className="h-8 w-8 rounded-full bg-theme-brown flex items-center justify-center text-white text-xs font-medium shadow-md">
            {initials}
          </div>
        ) : (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-theme-brown flex items-center justify-center text-white text-xs font-medium shadow-md">
              {initials}
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-theme-brown">{names.partner1} & {names.partner2}</p>
              <div className="flex items-center gap-1">
                <p className="text-xs text-theme-brown-light">{weddingDate}</p>
                {daysLeft !== null && (
                  <Badge variant="outline" className="bg-theme-cream/20 text-theme-brown-light text-xs px-1.5 py-0 rounded-full border-none">
                    {daysLeft}d
                  </Badge>
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
