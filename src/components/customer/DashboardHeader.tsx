
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

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
  
  return (
    <div className="bg-theme-brown text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif mb-2">Your Wedding Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-6 bg-white bg-opacity-10 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-white text-theme-brown rounded-full p-2">
              <span className="text-xl">📆</span>
            </div>
            <div>
              <p className="text-sm opacity-80">Wedding Date</p>
              <p className="font-medium">{loading ? "Loading..." : formattedDate}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white text-theme-brown rounded-full p-2">
              <span className="text-xl">💰</span>
            </div>
            <div>
              <p className="text-sm opacity-80">Budget Remaining</p>
              <p className="font-medium">$25,000</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white text-theme-brown rounded-full p-2">
              <span className="text-xl">👥</span>
            </div>
            <div>
              <p className="text-sm opacity-80">Guest Count</p>
              <p className="font-medium">{loading ? "Loading..." : weddingDetails?.exact_guest_count || "Not set"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
