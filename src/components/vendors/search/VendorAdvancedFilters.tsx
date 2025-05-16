
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { styles } from "@/components/vendors/search/searchData";

interface VendorAdvancedFiltersProps {
  priceRange: string;
  setPriceRange: (price: string) => void;
  selectedStyles: string[];
  setSelectedStyles: (styles: string[]) => void;
  availabilityFilter: string;
  setAvailabilityFilter: (availability: string) => void;
  ratingFilter: number;
  setRatingFilter: (rating: number) => void;
  onClear: () => void;
}

const VendorAdvancedFilters = ({
  priceRange,
  setPriceRange,
  selectedStyles,
  setSelectedStyles,
  availabilityFilter,
  setAvailabilityFilter,
  ratingFilter,
  setRatingFilter,
  onClear
}: VendorAdvancedFiltersProps) => {
  const handleStyleSelect = (style: string) => {
    const currentStyles = selectedStyles || [];
    if (currentStyles.includes(style)) {
      setSelectedStyles(currentStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...currentStyles, style]);
    }
  };

  return (
    <div className="p-4 bg-wednest-cream/50 rounded-lg border border-wednest-beige mt-4 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-wednest-brown">Advanced Filters</h3>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 text-wednest-brown-light hover:bg-wednest-beige"
          onClick={onClear}
        >
          <X className="h-3.5 w-3.5 mr-1" /> Clear All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Price range */}
        <div>
          <h4 className="text-sm font-medium text-wednest-brown mb-2">Price Range</h4>
          <div className="space-y-3">
            {["$", "$$", "$$$", "$$$$", "$$$$$"].map((price) => (
              <Button
                key={price}
                variant={priceRange === price ? "default" : "outline"}
                size="sm"
                className={`mr-2 ${priceRange === price ? "bg-wednest-sage text-white" : "border-wednest-beige text-wednest-brown"}`}
                onClick={() => setPriceRange(price)}
              >
                {price}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Styles filter */}
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-sm font-medium text-wednest-brown mb-2">Styles</h4>
          <div className="flex flex-wrap gap-2">
            {styles && styles.map((style) => (
              <Button
                key={style}
                variant={selectedStyles?.includes(style) ? "default" : "outline"}
                size="sm"
                className={`text-xs py-1 px-3 ${
                  selectedStyles?.includes(style) 
                    ? "bg-wednest-sage text-white" 
                    : "border-wednest-beige text-wednest-brown-light"
                }`}
                onClick={() => handleStyleSelect(style)}
              >
                {style}
                {selectedStyles?.includes(style) && <X className="ml-1.5 h-3 w-3" />}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Availability filter */}
        <div>
          <h4 className="text-sm font-medium text-wednest-brown mb-2">Availability</h4>
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="border-wednest-beige">
              <SelectValue placeholder="Any Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Availability</SelectItem>
              <SelectItem value="high">High Availability</SelectItem>
              <SelectItem value="medium">Medium Availability</SelectItem>
              <SelectItem value="low">Low Availability</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Rating filter */}
        <div>
          <h4 className="text-sm font-medium text-wednest-brown mb-2">Minimum Rating</h4>
          <Select 
            value={ratingFilter.toString()} 
            onValueChange={value => setRatingFilter(Number(value))}
          >
            <SelectTrigger className="border-wednest-beige">
              <SelectValue placeholder="Any Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any Rating</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
              <SelectItem value="5">5 Stars Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Sort options */}
        <div>
          <h4 className="text-sm font-medium text-wednest-brown mb-2">Sort By</h4>
          <Select defaultValue="recommended">
            <SelectTrigger className="border-wednest-beige">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default VendorAdvancedFilters;
