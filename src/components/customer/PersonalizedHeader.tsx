
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Edit, MessageSquare } from "lucide-react";

interface PersonalizedHeaderProps {
  weddingDetails: any;
  loading: boolean;
}

const PersonalizedHeader = ({ weddingDetails, loading }: PersonalizedHeaderProps) => {
  const getWeddingTitle = () => {
    if (loading || !weddingDetails) return "Your Wedding";
    return `${weddingDetails.partner1_name || "Partner 1"} & ${weddingDetails.partner2_name || "Partner 2"}'s Wedding`;
  };

  const getFormattedDate = () => {
    if (loading || !weddingDetails?.selected_date) return "Date not set";
    return new Date(weddingDetails.selected_date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLocation = () => {
    if (loading || !weddingDetails) return "Location not set";
    return weddingDetails.location_details || "Location not set";
  };

  const getGuestCount = () => {
    if (loading || !weddingDetails?.exact_guest_count) return "Guest count not set";
    return `${weddingDetails.exact_guest_count} guests`;
  };

  return (
    <div className="bg-gradient-to-r from-theme-brown to-theme-brown-dark text-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-serif font-semibold mb-3">{getWeddingTitle()}</h1>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{getFormattedDate()}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{getLocation()}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">{getGuestCount()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Ask Eva, Your Planner
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedHeader;
