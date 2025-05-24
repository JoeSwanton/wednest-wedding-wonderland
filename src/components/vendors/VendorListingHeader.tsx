
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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-6 bg-theme-cream rounded-xl border border-theme-beige">
      <div>
        <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-2">
          {selectedCategory && selectedCategory !== "all" 
            ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Vendors` 
            : "All Wedding Vendors"}
          {selectedLocation && selectedLocation !== "Any Location" 
            ? ` in ${selectedLocation}` 
            : ""}
        </h2>
        <p className="text-theme-brown-light">
          Browse our curated selection of wedding professionals
        </p>
      </div>
      
      <div className="flex items-center gap-3 mt-4 md:mt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 border-theme-beige hover:bg-white"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjust vendor filters</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center border border-theme-beige rounded-lg p-1 bg-white">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="px-3 hover:bg-theme-cream text-theme-brown">
                  <Grid className="h-4 w-4" />
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
                <Button variant="ghost" size="sm" className="px-3 hover:bg-theme-cream text-theme-brown">
                  <Map className="h-4 w-4" />
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
