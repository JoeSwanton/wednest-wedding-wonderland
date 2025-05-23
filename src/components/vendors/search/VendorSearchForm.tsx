
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
    <div className="space-y-6 p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-theme-gray-dark" />
          </div>
          <Input 
            type="text" 
            placeholder="Search vendors by name, description, or tags" 
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-theme-beige focus-visible:ring-theme-brown rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:w-auto">
          <div className="relative">
            <label className="block text-sm font-semibold text-theme-brown-dark mb-2 uppercase tracking-wide">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-2 border-theme-beige rounded-xl py-3 shadow-md hover:shadow-lg transition-all duration-300">
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
          </div>
          
          <div className="relative">
            <label className="block text-sm font-semibold text-theme-brown-dark mb-2 uppercase tracking-wide">Location</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-2 border-theme-beige justify-between w-full rounded-xl py-3 shadow-md hover:shadow-lg transition-all duration-300">
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
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-theme-brown to-theme-brown-dark hover:from-theme-brown-dark hover:to-theme-brown text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={handleSearch}
          >
            <Search className="mr-2 h-5 w-5" /> Search Vendors
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          className={`flex items-center font-semibold border-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-md ${
            filtersExpanded 
              ? 'bg-theme-brown text-white border-theme-brown hover:bg-theme-brown-dark' 
              : 'text-theme-brown border-theme-brown hover:bg-theme-cream'
          }`}
          onClick={() => setFiltersExpanded(!filtersExpanded)}
        >
          <Filter className="h-5 w-5 mr-2" />
          {filtersExpanded ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
        </Button>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold text-theme-brown-dark mr-2 uppercase tracking-wide">View:</span>
          <div className="flex items-center border-2 border-theme-beige rounded-full p-1 bg-white shadow-md">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="sm"
              className={`p-3 h-10 w-10 rounded-full transition-all duration-300 ${
                view === "grid" 
                  ? "bg-theme-brown text-white shadow-md" 
                  : "hover:bg-theme-cream"
              }`}
              onClick={() => handleViewChange("grid")}
            >
              <Grid className="h-5 w-5" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={view === "map" ? "default" : "ghost"}
              size="sm"
              className={`p-3 h-10 w-10 rounded-full transition-all duration-300 ${
                view === "map" 
                  ? "bg-theme-brown text-white shadow-md" 
                  : "hover:bg-theme-cream"
              }`}
              onClick={() => handleViewChange("map")}
            >
              <Map className="h-5 w-5" />
              <span className="sr-only">Map view</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Advanced filters */}
      {filtersExpanded && (
        <div className="bg-gradient-to-r from-theme-cream/50 to-white rounded-2xl p-6 border-2 border-theme-beige/50 shadow-lg">
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
        </div>
      )}
    </div>
  );
};

export default VendorSearchForm;
