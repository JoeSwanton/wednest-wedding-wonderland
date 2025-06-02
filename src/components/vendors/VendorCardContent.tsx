
import React from "react";
import { MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import VendorCardBadges from "./VendorCardBadges";

interface VendorCardContentProps {
  vendor: {
    id: number;
    name: string;
    location: string;
    tags: string[];
    price: string;
  };
  formatPrice: (price: string) => string;
  responseTime: string;
  bookingUrgency: string;
  isVerified: boolean;
  onCardClick: () => void;
}

const VendorCardContent = ({ 
  vendor, 
  formatPrice, 
  responseTime, 
  bookingUrgency, 
  isVerified, 
  onCardClick 
}: VendorCardContentProps) => {
  return (
    <div className="p-5 flex flex-col flex-1 bg-white">
      {/* Title and pricing */}
      <div className="mb-3">
        <h3 className="text-xl font-bold text-theme-brown group-hover:text-theme-brown-dark transition-colors line-clamp-1 mb-2">
          {vendor.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="text-base text-theme-brown font-bold">
            {formatPrice(vendor.price)}
          </div>
        </div>
      </div>
      
      {/* Location - full width on its own line */}
      <div className="flex items-center text-sm text-theme-brown-light mb-3 font-medium">
        <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-theme-brown" />
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{vendor.location}</span>
      </div>
      
      <VendorCardBadges tags={vendor.tags} isVerified={isVerified} />
      
      {/* Single key signal - response time OR booking activity - flex-1 to push button down */}
      <div className="flex items-center justify-between text-sm mb-4 flex-1">
        <div className="flex items-center text-green-700 bg-green-100 px-3 py-2 rounded-lg font-medium">
          <Clock className="h-4 w-4 mr-2" />
          <span>Responds in {responseTime}</span>
        </div>
        <div className="text-theme-brown bg-theme-cream/80 px-3 py-2 rounded-lg font-medium">
          {bookingUrgency}
        </div>
      </div>
      
      {/* Full-width subtle CTA button - always at bottom */}
      <Link to={`/vendors/${vendor.id}`} className="block mt-auto" onClick={onCardClick}>
        <Button className="w-full bg-theme-brown text-white border-2 border-theme-brown hover:bg-theme-brown-dark hover:border-theme-brown-dark text-base py-3 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg">
          Check Availability
        </Button>
      </Link>
    </div>
  );
};

export default VendorCardContent;
