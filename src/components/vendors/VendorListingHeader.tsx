
import { Button } from "@/components/ui/button";
import { Grid, Map, SlidersHorizontal } from "lucide-react";

interface VendorListingHeaderProps {
  selectedCategory: string;
  selectedLocation: string;
}

const VendorListingHeader = ({ 
  selectedCategory, 
  selectedLocation 
}: VendorListingHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-6 bg-gradient-to-r from-theme-cream to-white rounded-2xl border border-theme-beige/30">
      <div>
        <h2 className="text-2xl md:text-3xl font-serif text-theme-brown-dark mb-2">
          {selectedCategory && selectedCategory !== "all" 
            ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Vendors` 
            : "All Wedding Vendors"}
          {selectedLocation && selectedLocation !== "Any Location" 
            ? ` in ${selectedLocation}` 
            : ""}
        </h2>
        <p className="text-theme-gray-dark">
          Browse our curated selection of wedding professionals
        </p>
      </div>
      
      <div className="flex items-center gap-3 mt-4 md:mt-0">
        <Button variant="outline" size="sm" className="flex items-center gap-2 border-theme-beige">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
        
        <div className="flex items-center border border-theme-beige rounded-lg p-1">
          <Button variant="ghost" size="sm" className="px-3">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="px-3">
            <Map className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorListingHeader;
