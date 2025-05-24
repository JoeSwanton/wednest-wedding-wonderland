
import { Badge } from "@/components/ui/badge";
import { X, MapPin } from "lucide-react";

interface VendorFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  selectedLocation: string;
  priceFilter: string;
  styleFilter: string[];
  availabilityFilter: string;
  ratingFilter: number;
  onClearSearch: () => void;
  onClearCategory: () => void;
  onClearLocation: () => void;
  onClearPrice: () => void;
  onClearStyle: (style: string) => void;
  onClearAvailability: () => void;
  onClearRating: () => void;
  onClearAll: () => void;
}

const VendorFilters = ({
  searchQuery,
  selectedCategory,
  selectedLocation,
  priceFilter,
  styleFilter,
  availabilityFilter,
  ratingFilter,
  onClearSearch,
  onClearCategory,
  onClearLocation,
  onClearPrice,
  onClearStyle,
  onClearAvailability,
  onClearRating,
  onClearAll
}: VendorFiltersProps) => {
  // Count active filters
  const activeFiltersCount = [
    searchQuery, 
    selectedCategory !== "" && selectedCategory !== "all", 
    selectedLocation !== "" && selectedLocation !== "Any Location",
    priceFilter !== "",
    styleFilter.length > 0,
    availabilityFilter !== "",
    ratingFilter > 0
  ].filter(Boolean).length;

  if (activeFiltersCount === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-2 items-center bg-theme-cream/50 p-4 rounded-lg border border-theme-beige">
      <span className="text-sm font-medium text-theme-brown">Active Filters:</span>
      
      {searchQuery && (
        <Badge variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-theme-beige bg-white">
          {`Search: "${searchQuery}"`}
          <button onClick={onClearSearch} className="ml-1 p-0.5 hover:bg-theme-beige rounded">
            <X className="h-3.5 w-3.5 text-theme-brown-light" />
          </button>
        </Badge>
      )}
      
      {selectedCategory && selectedCategory !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-theme-beige bg-white">
          {`Category: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
          <button onClick={onClearCategory} className="ml-1 p-0.5 hover:bg-theme-beige rounded">
            <X className="h-3.5 w-3.5 text-theme-brown-light" />
          </button>
        </Badge>
      )}
      
      {selectedLocation && selectedLocation !== "Any Location" && (
        <Badge variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-theme-beige bg-white">
          <MapPin className="h-3.5 w-3.5 mr-0.5" />
          {selectedLocation}
          <button onClick={onClearLocation} className="ml-1 p-0.5 hover:bg-theme-beige rounded">
            <X className="h-3.5 w-3.5 text-theme-brown-light" />
          </button>
        </Badge>
      )}
      
      {priceFilter && (
        <Badge variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-theme-beige bg-white">
          {`Price: ${priceFilter}`}
          <button onClick={onClearPrice} className="ml-1 p-0.5 hover:bg-theme-beige rounded">
            <X className="h-3.5 w-3.5 text-theme-brown-light" />
          </button>
        </Badge>
      )}
      
      {styleFilter.map(style => (
        <Badge key={style} variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-theme-beige bg-white">
          {`Style: ${style}`}
          <button 
            onClick={() => onClearStyle(style)} 
            className="ml-1 p-0.5 hover:bg-theme-beige rounded"
          >
            <X className="h-3.5 w-3.5 text-theme-brown-light" />
          </button>
        </Badge>
      ))}
      
      {availabilityFilter && (
        <Badge variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-theme-beige bg-white">
          {`Availability: ${availabilityFilter.charAt(0).toUpperCase() + availabilityFilter.slice(1)}`}
          <button onClick={onClearAvailability} className="ml-1 p-0.5 hover:bg-theme-beige rounded">
            <X className="h-3.5 w-3.5 text-theme-brown-light" />
          </button>
        </Badge>
      )}
      
      {ratingFilter > 0 && (
        <Badge variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-theme-beige bg-white">
          {`Rating: ${ratingFilter}+ Stars`}
          <button onClick={onClearRating} className="ml-1 p-0.5 hover:bg-theme-beige rounded">
            <X className="h-3.5 w-3.5 text-theme-brown-light" />
          </button>
        </Badge>
      )}
      
      <button 
        className="text-sm text-theme-brown hover:text-theme-brown-dark hover:underline"
        onClick={onClearAll}
      >
        Clear All
      </button>
    </div>
  );
};

export default VendorFilters;
