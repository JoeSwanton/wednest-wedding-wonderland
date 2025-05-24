
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DollarSign, Users, Bell, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

  // Calculate days until wedding
  const getDaysRemaining = () => {
    if (!weddingDetails?.selected_date) return null;
    
    const weddingDate = new Date(weddingDetails.selected_date);
    const today = new Date();
    const daysLeft = Math.floor((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysLeft > 0 ? daysLeft : 0;
  };
  
  const daysLeft = getDaysRemaining();
  
  // Check if wedding details are incomplete
  const isIncomplete = !weddingDetails?.selected_date || !weddingDetails?.exact_guest_count;
  
  return (
    <div className="bg-theme-brown text-white py-8 px-4 shadow-md">
      <div className="max-w-7xl mx-auto">
        {/* Status alert for incomplete details */}
        {isIncomplete && (
          <div className="bg-theme-cream/20 border border-white/20 rounded-lg p-3 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="text-sm">Finish setting your wedding details to unlock full tools</span>
            </div>
            <Button size="sm" variant="outline" className="text-white border-white/40 hover:bg-white/10">
              Complete Setup
            </Button>
          </div>
        )}
        
        <h1 className="text-3xl font-serif mb-2 font-semibold">Your Wedding Dashboard</h1>
        {daysLeft !== null && (
          <Badge className="bg-white text-theme-brown font-medium mb-4">
            {daysLeft} days until your wedding
          </Badge>
        )}
        
        {/* Enhanced header cards with better spacing and action-driven labels */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card className="bg-white/10 border-white/20 text-white hover:bg-white/15 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-white text-theme-brown rounded-full p-2">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm opacity-80 font-medium">Wedding Date</p>
                  {loading ? (
                    <p className="font-semibold">Loading...</p>
                  ) : weddingDetails?.selected_date ? (
                    <p className="font-semibold">
                      {new Date(weddingDetails.selected_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  ) : (
                    <button className="flex items-center gap-1 text-white/90 hover:text-white transition-colors">
                      <Plus className="h-3 w-3" />
                      <span className="text-sm font-medium">Add Wedding Date</span>
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white hover:bg-white/15 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-white text-theme-brown rounded-full p-2">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm opacity-80 font-medium">Budget Remaining</p>
                  <p className="font-semibold">$25,000</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white hover:bg-white/15 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-white text-theme-brown rounded-full p-2">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm opacity-80 font-medium">Guest Count</p>
                  {loading ? (
                    <p className="font-semibold">Loading...</p>
                  ) : weddingDetails?.exact_guest_count ? (
                    <p className="font-semibold">{weddingDetails.exact_guest_count} guests</p>
                  ) : (
                    <button className="flex items-center gap-1 text-white/90 hover:text-white transition-colors">
                      <Plus className="h-3 w-3" />
                      <span className="text-sm font-medium">Add Guest Count</span>
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white hover:bg-white/15 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-white text-theme-brown rounded-full p-2">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm opacity-80 font-medium">Countdown</p>
                  {daysLeft !== null ? (
                    <div>
                      <p className="font-semibold">{daysLeft} days</p>
                      <p className="text-xs opacity-70">to go!</p>
                    </div>
                  ) : (
                    <p className="text-sm opacity-70">Set date to see countdown</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
