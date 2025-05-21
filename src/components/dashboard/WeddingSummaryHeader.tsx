
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, MapPin, Users, Edit } from "lucide-react";
import { differenceInDays } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WeddingSummaryHeaderProps {
  weddingDetails: any;
  loading: boolean;
}

const WeddingSummaryHeader = ({ weddingDetails, loading }: WeddingSummaryHeaderProps) => {
  // Format partner names
  const getPartnerNames = () => {
    if (loading || !weddingDetails) return "Your Wedding";
    return `${weddingDetails.partner1_name || "Partner 1"} & ${weddingDetails.partner2_name || "Partner 2"}'s Wedding`;
  };
  
  // Format location
  const getLocation = () => {
    if (loading || !weddingDetails) return "";
    if (weddingDetails.location_details) return weddingDetails.location_details;
    if (weddingDetails.location) return weddingDetails.location;
    if (weddingDetails.city) return weddingDetails.city;
    return "";
  };
  
  // Calculate days until wedding
  const getDaysRemaining = () => {
    if (loading || !weddingDetails || !weddingDetails.selected_date) return null;
    
    const weddingDate = new Date(weddingDetails.selected_date);
    const today = new Date();
    const daysLeft = differenceInDays(weddingDate, today);
    
    return daysLeft > 0 ? daysLeft : 0;
  };

  // Format wedding date
  const getFormattedDate = () => {
    if (loading || !weddingDetails || !weddingDetails.selected_date) return "";
    
    return new Date(weddingDetails.selected_date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const daysLeft = getDaysRemaining();
  
  return (
    <div className="bg-gradient-to-r from-theme-brown to-theme-brown-dark rounded-lg p-6 shadow-md">
      <Tabs defaultValue="overview" className="text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-serif mb-1">{getPartnerNames()}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <TabsList className="bg-white/10 border border-white/20">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white data-[state=active]:text-theme-brown">
                Overview
              </TabsTrigger>
              <TabsTrigger value="details" className="text-white data-[state=active]:bg-white data-[state=active]:text-theme-brown">
                Wedding Details
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white/10 rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm">
              <div className="bg-white/20 rounded-full p-2 text-white">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Wedding Date</p>
                <p className="text-white font-medium">{loading ? "Loading..." : getFormattedDate() || "Not set"}</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm">
              <div className="bg-white/20 rounded-full p-2 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Location</p>
                <p className="text-white font-medium">{loading ? "Loading..." : getLocation() || "Not set"}</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm">
              <div className="bg-white/20 rounded-full p-2 text-white">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Guest Count</p>
                <p className="text-white font-medium">{loading ? "Loading..." : weddingDetails?.exact_guest_count || "Not set"}</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm">
              <div className="bg-white/20 rounded-full p-2 text-white">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Countdown</p>
                {daysLeft !== null ? (
                  <p className="text-white font-medium">{daysLeft} days to go</p>
                ) : (
                  <p className="text-white font-medium">Date not set</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="mt-0">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-medium">Wedding Details</h3>
              <Button variant="outline" size="sm" className="bg-white/20 text-white border-white/40 hover:bg-white/30 flex items-center gap-1">
                <Edit className="h-3.5 w-3.5" />
                <span>Edit</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-white/70 text-sm">Partners</p>
                <p className="text-white">{loading ? "Loading..." : `${weddingDetails?.partner1_name || "Not set"} & ${weddingDetails?.partner2_name || "Not set"}`}</p>
              </div>
              
              <div>
                <p className="text-white/70 text-sm">Wedding Date</p>
                <p className="text-white">{loading ? "Loading..." : getFormattedDate() || "Not set"}</p>
              </div>
              
              <div>
                <p className="text-white/70 text-sm">Venue</p>
                <p className="text-white">{loading ? "Loading..." : getLocation() || "Not set"}</p>
              </div>
              
              <div>
                <p className="text-white/70 text-sm">Guest Count</p>
                <p className="text-white">{loading ? "Loading..." : weddingDetails?.exact_guest_count || "Not set"}</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WeddingSummaryHeader;
