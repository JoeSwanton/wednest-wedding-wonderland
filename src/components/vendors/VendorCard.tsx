import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useSavedVendors } from "@/hooks/useSavedVendors";
import { useRecentlyViewedVendors } from "@/hooks/useRecentlyViewedVendors";
import VendorCardImage from "./VendorCardImage";
import VendorCardContent from "./VendorCardContent";

export interface VendorData {
  id: number;
  type: string;
  name: string;
  location: string;
  availability: string;
  price: string;
  description: string;
  rating: number;
  tags: string[];
  imageUrl: string;
  verified_vendor?: boolean;
  reviewCount?: number;
  yearsInBusiness?: number;
  servicesOffered?: string[];
  specialties?: string[];
}

interface VendorCardProps {
  vendor: VendorData;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  const { userProfile } = useAuth();
  const { toggleSavedVendor } = useSavedVendors();
  const { addRecentlyViewed } = useRecentlyViewedVendors();
  const isCouple = userProfile?.user_role === 'couple';

  // Create stable calculations based on vendor ID to prevent random changes on re-render
  const stableCalculations = useMemo(() => {
    const seed = vendor.id;
    
    const times = ["1h", "2h", "24h", "48h"];
    const responseTime = times[seed % times.length];
    
    const urgencies = [
      "Booked 3x this week",
      "Booked 2x this week", 
      "5 inquiries today",
      "Popular this month"
    ];
    const bookingUrgency = urgencies[(seed * 3) % urgencies.length];
    
    const isHighDemand = vendor.availability.includes("High") || (seed % 10) < 7;
    
    const isVerified = vendor.verified_vendor !== undefined ? vendor.verified_vendor : (seed % 10) < 6;
    
    return {
      responseTime,
      bookingUrgency,
      isHighDemand,
      isVerified
    };
  }, [vendor.id, vendor.availability, vendor.verified_vendor]);

  const formatPrice = (price: string) => {
    if (price.includes('$')) return price;
    const priceNum = parseInt(price.replace(/[^0-9]/g, ''));
    if (vendor.type.toLowerCase() === 'venue' || vendor.type.toLowerCase() === 'catering') {
      return `From $${priceNum}`;
    } else if (vendor.type.toLowerCase() === 'photographer') {
      return `From $${priceNum * 100}`;
    } else {
      return `From $${priceNum * 10}`;
    }
  };

  const isTopRated = vendor.rating > 4.5;

  const handleSaveVendor = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCouple) {
      toggleSavedVendor(vendor);
    }
  };

  const handleCardClick = () => {
    // Track this vendor view
    addRecentlyViewed({
      id: vendor.id,
      name: vendor.name,
      type: vendor.type,
      location: vendor.location,
      rating: vendor.rating,
      priceRange: formatPrice(vendor.price),
      image: vendor.imageUrl
    });
  };

  return (
    <Card className="overflow-hidden bg-white border-2 border-theme-beige/40 rounded-2xl hover:shadow-2xl hover:border-theme-brown/30 transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full shadow-lg">
      <VendorCardImage
        vendor={vendor}
        isTopRated={isTopRated}
        isHighDemand={stableCalculations.isHighDemand}
        isCouple={isCouple}
        onSaveVendor={handleSaveVendor}
      />
      
      <VendorCardContent
        vendor={vendor}
        formatPrice={formatPrice}
        responseTime={stableCalculations.responseTime}
        bookingUrgency={stableCalculations.bookingUrgency}
        isVerified={stableCalculations.isVerified}
        onCardClick={handleCardClick}
      />
    </Card>
  );
};

export default VendorCard;
