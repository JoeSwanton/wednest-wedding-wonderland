
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Map, Grid, ChevronDown, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import VendorAdvancedFilters from "@/components/vendors/search/VendorAdvancedFilters";
import { categories, locations } from "@/components/vendors/search/searchData";

interface VendorSearchFormProps {
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  onPriceChange: (price: string) => void;
  onStyleChange: (styles: string[]) => void;
  onAvailabilityChange: (availability: string) => void;
  onRatingChange: (rating: number) => void;
  onViewChange: (view: "grid" | "map") => void;
}

const VendorSearchForm = ({
  onSearchChange,
  onCategoryChange,
  onLocationChange,
  onPriceChange,
  onStyleChange,
  onAvailabilityChange,
  onRatingChange,
  onViewChange
}: VendorSearchFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("Any Location");
  const [priceRange, setPriceRange] = useState("$$$");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [view, setView] = useState<"grid" | "map">("grid");
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const handleSearch = () => {
    onSearchChange(searchQuery);
    onCategoryChange(selectedCategory);
    onLocationChange(selectedLocation);
    onPriceChange(priceRange);
    onStyleChange(selectedStyles || []);
    onAvailabilityChange(availabilityFilter);
    onRatingChange(ratingFilter);
  };

  const handleViewChange = (newView: "grid" | "map") => {
    setView(newView);
    onViewChange(newView);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLocation("Any Location");
    setPriceRange("$$$");
    setSelectedStyles([]);
    setAvailabilityFilter("");
    setRatingFilter(0);

    onSearchChange("");
    onCategoryChange("all");
    onLocationChange("Any Location");
    onPriceChange("$$$");
    onStyleChange([]);
    onAvailabilityChange("");
    onRatingChange(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            type="text" 
            placeholder="Search by name, description, or tags" 
            className="w-full border-wednest-beige focus-visible:ring-wednest-sage"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="border-wednest-beige">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-wednest-beige justify-between w-full">
                <span className="truncate">{selectedLocation}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search locations..." />
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-64">
                    {locations && locations.map((location) => (
                      <CommandItem
                        key={location}
                        value={location}
                        onSelect={() => {
                          setSelectedLocation(location);
                        }}
                      >
                        {location}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          
          <Button 
            className="w-full bg-wednest-sage hover:bg-wednest-sage-dark text-white"
            onClick={handleSearch}
          >
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          className="flex items-center text-wednest-brown-light border-wednest-beige hover:bg-wednest-cream"
          onClick={() => setFiltersExpanded(!filtersExpanded)}
        >
          <Filter className="h-4 w-4 mr-2" />
          {filtersExpanded ? 'Hide Filters' : 'Show Advanced Filters'}
        </Button>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-wednest-brown-light mr-1">View:</span>
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="sm"
            className={`p-1 h-8 w-8 ${view === "grid" ? "bg-wednest-sage text-white" : "border-wednest-beige"}`}
            onClick={() => handleViewChange("grid")}
          >
            <Grid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={view === "map" ? "default" : "outline"}
            size="sm"
            className={`p-1 h-8 w-8 ${view === "map" ? "bg-wednest-sage text-white" : "border-wednest-beige"}`}
            onClick={() => handleViewChange("map")}
          >
            <Map className="h-4 w-4" />
            <span className="sr-only">Map view</span>
          </Button>
        </div>
      </div>
      
      {/* Advanced filters */}
      {filtersExpanded && (
        <VendorAdvancedFilters
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedStyles={selectedStyles}
          setSelectedStyles={setSelectedStyles}
          availabilityFilter={availabilityFilter}
          setAvailabilityFilter={setAvailabilityFilter}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          onClear={handleClear}
        />
      )}
    </div>
  );
};

export default VendorSearchForm;
