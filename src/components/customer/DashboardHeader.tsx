
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, DollarSign, Users } from "lucide-react";

const DashboardHeader = () => {
  const { user } = useAuth();
  const [weddingDetails, setWeddingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWeddingDetails = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('wedding_details')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error) throw error;
        setWeddingDetails(data);
      } catch (error) {
        console.error('Error fetching wedding details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeddingDetails();
  }, [user]);

  // Format the wedding date nicely
  const formattedDate = weddingDetails?.selected_date 
    ? new Date(weddingDetails.selected_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      }) 
    : "Not set";
  
  // Calculate days until wedding
  const getDaysRemaining = () => {
    if (!weddingDetails?.selected_date) return null;
    
    const weddingDate = new Date(weddingDetails.selected_date);
    const today = new Date();
    const daysLeft = Math.floor((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysLeft > 0 ? daysLeft : 0;
  };
  
  const daysLeft = getDaysRemaining();
  
  return (
    <div className="bg-theme-brown text-white py-8 px-4 shadow-md">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif mb-2 font-semibold">Your Wedding Dashboard</h1>
        {daysLeft !== null && (
          <Badge className="bg-white text-theme-brown font-medium mb-4">
            {daysLeft} days until your wedding
          </Badge>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-6 bg-white bg-opacity-10 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-white text-theme-brown rounded-full p-2 flex items-center justify-center">
              <CalendarIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm opacity-80">Wedding Date</p>
              <p className="font-semibold">{loading ? "Loading..." : formattedDate}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white text-theme-brown rounded-full p-2 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm opacity-80">Budget Remaining</p>
              <p className="font-semibold">$25,000</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white text-theme-brown rounded-full p-2 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm opacity-80">Guest Count</p>
              <p className="font-semibold">{loading ? "Loading..." : weddingDetails?.exact_guest_count || "Not set"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
