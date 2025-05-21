
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { differenceInDays } from "date-fns";

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
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const daysLeft = getDaysRemaining();
  
  return (
    <div className="bg-theme-brown rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="text-white">
          <h1 className="text-2xl font-serif mb-1">{getPartnerNames()}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white/80 text-sm">
            <span>{getFormattedDate()}{getLocation() && ` • ${getLocation()}`}</span>
            
            {daysLeft !== null && (
              <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded-md text-white text-sm">
                <Clock className="h-3.5 w-3.5" />
                <span>{daysLeft} days to go</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="bg-white text-theme-brown hover:bg-white/90">
            View Timeline
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/40 hover:bg-white/30">
            Edit Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeddingSummaryHeader;
