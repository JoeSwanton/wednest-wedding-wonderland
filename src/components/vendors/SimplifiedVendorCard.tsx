
import React, { useState, useMemo } from "react";
import { MapPin, Heart, Star, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSavedVendors } from "@/hooks/useSavedVendors";
import { useRecentlyViewedVendors } from "@/hooks/useRecentlyViewedVendors";

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
}

interface SimplifiedVendorCardProps {
  vendor: VendorData;
}

const SimplifiedVendorCard = ({ vendor }: SimplifiedVendorCardProps) => {
  const { userProfile } = useAuth();
  const { toggleSavedVendor, isVendorSaved } = useSavedVendors();
  const { addRecentlyViewed } = useRecentlyViewedVendors();
  const [showTooltip, setShowTooltip] = useState(false);
  const isCouple = userProfile?.user_role === 'couple';
  const isSaved = isVendorSaved(vendor.id);

  // Stable verification status
  const isVerified = useMemo(() => {
    return vendor.verified_vendor !== undefined ? vendor.verified_vendor : (vendor.id % 10) < 6;
  }, [vendor.id, vendor.verified_vendor]);

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

  const handleSaveVendor = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCouple) {
      toggleSavedVendor(vendor);
    }
  };

  const handleCardClick = () => {
    addRecentlyViewed({
      id: vendor.id,
      name: vendor.name,
      type: vendor.type,
      location: vendor.location,
      rating: vendor.rating,
      price: formatPrice(vendor.price),
      image: vendor.imageUrl
    });
  };

  return (
    <Card className="overflow-hidden bg-white border border-theme-beige rounded-2xl hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1 flex flex-col h-full">
      {/* Image section */}
      <div className="relative h-56 bg-theme-cream overflow-hidden">
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Badge className="bg-theme-brown text-white px-2 py-1 rounded-md text-xs font-medium">
              {vendor.type}
            </Badge>
            <div className="flex items-center gap-1 bg-black/80 text-white px-2 py-1 rounded-md backdrop-blur-sm">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{vendor.rating}</span>
            </div>
          </div>
          
          {/* Favorite button */}
          {isCouple && (
            <div className="relative">
              <button 
                onClick={handleSaveVendor}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all"
              >
                <Heart className={`h-4 w-4 transition-colors ${
                  isSaved 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-theme-brown-light hover:text-red-500'
                }`} />
              </button>
              
              {showTooltip && (
                <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded backdrop-blur-sm z-50 whitespace-nowrap">
                  {isSaved ? 'Remove from saved' : 'Save vendor'}
                  <div className="absolute -top-1 right-3 w-2 h-2 bg-black/80 rotate-45"></div>
                </div>
              )}
            </div>
          )}
        </div>

        <img 
          src={vendor.imageUrl} 
          alt={`${vendor.name} - ${vendor.type}`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800&h=600`;
          }}
        />
      </div>
      
      {/* Content section */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-theme-brown group-hover:text-theme-brown-dark transition-colors line-clamp-1 mb-1">
            {vendor.name}
          </h3>
          <div className="text-sm text-theme-brown-light font-medium">
            {formatPrice(vendor.price)}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-theme-brown-light mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">{vendor.location}</span>
        </div>
        
        {isVerified && (
          <div className="mb-3">
            <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium w-fit">
              <CheckCircle className="h-3 w-3" />
              <span>Verified by Enosi</span>
            </div>
          </div>
        )}
        
        {vendor.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap mb-4">
            {vendor.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="border-theme-beige text-theme-brown-light text-xs px-2 py-0.5 rounded-full bg-theme-cream/30 whitespace-nowrap"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <Link to={`/vendors/${vendor.id}`} className="block mt-auto" onClick={handleCardClick}>
          <Button className="w-full bg-theme-cream text-theme-brown border border-theme-beige hover:bg-theme-brown hover:text-white text-sm py-2.5 rounded-xl transition-all duration-300">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default SimplifiedVendorCard;
