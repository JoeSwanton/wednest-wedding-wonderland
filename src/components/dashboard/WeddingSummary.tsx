
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface WeddingDetails {
  partner1_name: string;
  partner2_name: string;
  selected_date?: string;
  wedding_date_status: string;
  wedding_location_status: string;
  guest_count: string;
  exact_guest_count?: number;
}

const WeddingSummary = () => {
  const { user } = useAuth();
  const [weddingDetails, setWeddingDetails] = useState<WeddingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWeddingDetails = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('wedding_details')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
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
  
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-32 flex items-center justify-center">
            <p className="text-wednest-brown-light">Loading wedding details...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!weddingDetails) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-32 flex items-center justify-center">
            <p className="text-wednest-brown-light">No wedding details found.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Format wedding date display
  const getDateDisplay = () => {
    if (weddingDetails.wedding_date_status === "chosen" && weddingDetails.selected_date) {
      return format(new Date(weddingDetails.selected_date), "MMMM d, yyyy");
    } else if (weddingDetails.wedding_date_status === "month_year") {
      return "Month and year planned";
    } else {
      return "Date not yet decided";
    }
  };
  
  // Format location display
  const getLocationDisplay = () => {
    switch (weddingDetails.wedding_location_status) {
      case "booked":
        return "Venue booked";
      case "city_region":
        return "City/region selected";
      case "destination":
        return "Destination wedding";
      default:
        return "Location to be determined";
    }
  };
  
  // Format guest count display
  const getGuestDisplay = () => {
    if (weddingDetails.guest_count === "exact" && weddingDetails.exact_guest_count) {
      return `${weddingDetails.exact_guest_count} guests`;
    } else {
      const guestCountMap: Record<string, string> = {
        "lt_10": "Less than 10 guests",
        "10_to_50": "10-50 guests",
        "51_to_100": "51-100 guests",
        "101_to_150": "101-150 guests",
        "more_than_150": "More than 150 guests"
      };
      
      return guestCountMap[weddingDetails.guest_count] || "Guest count undefined";
    }
  };
  
  return (
    <Card className="border border-wednest-beige shadow-sm">
      <CardHeader className="bg-gradient-to-r from-wednest-sage-light to-wednest-sage pb-2">
        <CardTitle className="text-white text-xl">
          {weddingDetails.partner1_name} & {weddingDetails.partner2_name}'s Wedding
        </CardTitle>
        <CardDescription className="text-white/90">
          Wedding Summary
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-wednest-sage bg-opacity-10 p-2">
              <Calendar className="h-5 w-5 text-wednest-sage" />
            </div>
            <div>
              <p className="text-sm text-wednest-brown-light">Date</p>
              <p className="font-medium text-wednest-brown">{getDateDisplay()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-wednest-sage bg-opacity-10 p-2">
              <MapPin className="h-5 w-5 text-wednest-sage" />
            </div>
            <div>
              <p className="text-sm text-wednest-brown-light">Location</p>
              <p className="font-medium text-wednest-brown">{getLocationDisplay()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-wednest-sage bg-opacity-10 p-2">
              <Users className="h-5 w-5 text-wednest-sage" />
            </div>
            <div>
              <p className="text-sm text-wednest-brown-light">Guests</p>
              <p className="font-medium text-wednest-brown">{getGuestDisplay()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeddingSummary;
