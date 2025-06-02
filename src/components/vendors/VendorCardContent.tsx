
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
    <div className="p-4 flex flex-col flex-1">
      {/* Title and pricing */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-theme-brown group-hover:text-theme-brown-dark transition-colors line-clamp-1 mb-1">
          {vendor.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="text-sm text-theme-brown-light font-medium">
            {formatPrice(vendor.price)}
          </div>
        </div>
      </div>
      
      {/* Location - full width on its own line */}
      <div className="flex items-center text-sm text-theme-brown-light mb-2">
        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{vendor.location}</span>
      </div>
      
      <VendorCardBadges tags={vendor.tags} isVerified={isVerified} />
      
      {/* Single key signal - response time OR booking activity - flex-1 to push button down */}
      <div className="flex items-center justify-between text-xs mb-4 flex-1">
        <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <Clock className="h-3 w-3 mr-1" />
          <span>Responds in {responseTime}</span>
        </div>
        <div className="text-theme-brown-light bg-theme-cream px-2 py-1 rounded-full">
          {bookingUrgency}
        </div>
      </div>
      
      {/* Full-width subtle CTA button - always at bottom */}
      <Link to={`/vendors/${vendor.id}`} className="block mt-auto" onClick={onCardClick}>
        <Button className="w-full bg-theme-cream text-theme-brown border border-theme-beige hover:bg-theme-brown hover:text-white text-sm py-2.5 rounded-xl transition-all duration-300">
          Check Availability
        </Button>
      </Link>
    </div>
  );
};

export default VendorCardContent;
