
import { Button } from "@/components/ui/button";
import { Grid, Map, SlidersHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VendorListingHeaderProps {
  selectedCategory: string;
  selectedLocation: string;
}

const VendorListingHeader = ({ 
  selectedCategory, 
  selectedLocation 
}: VendorListingHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 p-8 bg-gradient-to-r from-white via-theme-cream/50 to-white rounded-3xl border border-theme-beige/40 shadow-lg">
      <div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-theme-brown-dark mb-3">
          {selectedCategory && selectedCategory !== "all" 
            ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Vendors` 
            : "All Wedding Vendors"}
          {selectedLocation && selectedLocation !== "Any Location" 
            ? ` in ${selectedLocation}` 
            : ""}
        </h2>
        <p className="text-theme-gray-dark text-lg font-medium">
          Browse our curated selection of wedding professionals
        </p>
      </div>
      
      <div className="flex items-center gap-4 mt-6 md:mt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex items-center gap-3 border-2 border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-md"
              >
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjust vendor filters</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center border-2 border-theme-beige rounded-full p-2 bg-white shadow-md">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="px-4 py-2 hover:bg-theme-cream rounded-full transition-all duration-200">
                  <Grid className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Grid view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="px-4 py-2 hover:bg-theme-cream rounded-full transition-all duration-200">
                  <Map className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Map view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default VendorListingHeader;
