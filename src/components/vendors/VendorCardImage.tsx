
import React from "react";
import { Star, Award, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import VendorCardActions from "./VendorCardActions";

interface VendorCardImageProps {
  vendor: {
    id: number;
    type: string;
    name: string;
    rating: number;
    imageUrl: string;
  };
  isTopRated: boolean;
  isHighDemand: boolean;
  isCouple: boolean;
  onSaveVendor: (e: React.MouseEvent) => void;
}

const VendorCardImage = ({ 
  vendor, 
  isTopRated, 
  isHighDemand, 
  isCouple, 
  onSaveVendor 
}: VendorCardImageProps) => {
  return (
    <div className="relative h-56 bg-theme-cream overflow-hidden">
      {/* Simplified header line - condensed badges */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
        <div className="flex items-center gap-2 text-sm">
          <Badge className="bg-theme-brown text-white px-2 py-1 rounded-md text-xs font-medium">
            {vendor.type}
          </Badge>
          <div className="flex items-center gap-1 bg-black/80 text-white px-2 py-1 rounded-md backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{vendor.rating}</span>
          </div>
          {isTopRated && isHighDemand && (
            <div className="flex items-center gap-1 bg-red-500/90 text-white px-2 py-1 rounded-md text-xs font-medium">
              <Award className="h-3 w-3" />
              <TrendingUp className="h-3 w-3" />
            </div>
          )}
        </div>
        
        {/* Favorite button - only show for couples and always visible */}
        {isCouple && (
          <VendorCardActions vendorId={vendor.id} onSaveVendor={onSaveVendor} />
        )}
      </div>

      {/* Optimized image with improved error handling */}
      <OptimizedImage
        src={vendor.imageUrl}
        alt={`${vendor.name} - ${vendor.type}`}
        className="w-full h-full group-hover:scale-110 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
        onError={() => {
          // Error handling is managed by OptimizedImage component
        }}
      />
    </div>
  );
};

export default VendorCardImage;
