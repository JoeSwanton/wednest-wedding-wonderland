
import React from "react";
import VendorSearchTabs from "@/components/vendors/search/VendorSearchTabs";

interface VendorSearchProps {
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  onPriceChange: (price: string) => void;
  onStyleChange: (styles: string[]) => void;
  onAvailabilityChange: (availability: string) => void;
  onRatingChange: (rating: number) => void;
  onViewChange: (view: "grid" | "map") => void;
}

const VendorSearch = ({
  onSearchChange = () => {},
  onCategoryChange = () => {},
  onLocationChange = () => {},
  onPriceChange = () => {},
  onStyleChange = () => {},
  onAvailabilityChange = () => {},
  onRatingChange = () => {},
  onViewChange = () => {}
}: VendorSearchProps) => {
  return (
    <div className="w-full py-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-wednest-beige">
        <VendorSearchTabs 
          onSearchChange={onSearchChange}
          onCategoryChange={onCategoryChange}
          onLocationChange={onLocationChange}
          onPriceChange={onPriceChange}
          onStyleChange={onStyleChange}
          onAvailabilityChange={onAvailabilityChange}
          onRatingChange={onRatingChange}
          onViewChange={onViewChange}
        />
      </div>
    </div>
  );
};

export default VendorSearch;
