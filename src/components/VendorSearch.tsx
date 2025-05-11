
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Map, Grid, ChevronDown, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

const locations = [
  "Any Location",
  "Sydney, NSW",
  "Melbourne, VIC",
  "Brisbane, QLD",
  "Perth, WA",
  "Adelaide, SA",
  "Gold Coast, QLD",
  "Canberra, ACT",
  "Hobart, TAS",
  "Darwin, NT",
  "Newcastle, NSW",
  "Wollongong, NSW",
  "Cairns, QLD",
  "Geelong, VIC",
  "Townsville, QLD",
  "Yarra Valley, VIC",
  "Byron Bay, NSW",
  "Hunter Valley, NSW",
  "Margaret River, WA",
  "Barossa Valley, SA"
];

const categories = [
  { label: "All Categories", value: "all" },
  { label: "Venues", value: "venue" },
  { label: "Photographers", value: "photographer" },
  { label: "Florists", value: "florist" },
  { label: "Caterers", value: "catering" },
  { label: "Wedding Planners", value: "wedding planner" },
  { label: "DJs & Entertainment", value: "dj" },
  { label: "Videographers", value: "videographer" },
  { label: "Cake Designers", value: "cake designer" },
  { label: "Makeup Artists", value: "makeup artist" },
  { label: "Transportation", value: "transportation" }
];

const styles = [
  "Modern",
  "Rustic",
  "Classic",
  "Bohemian",
  "Vintage",
  "Minimalist",
  "Luxury",
  "Garden",
  "Beach",
  "Industrial",
  "Cultural",
  "Sustainable"
];

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
    onStyleChange(selectedStyles);
    onAvailabilityChange(availabilityFilter);
    onRatingChange(ratingFilter);
  };

  const handleViewChange = (newView: "grid" | "map") => {
    setView(newView);
    onViewChange(newView);
  };

  const handleStyleSelect = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
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
    <div className="w-full py-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-wednest-beige">
        <Tabs defaultValue="search">
          <TabsList className="w-full border-b border-wednest-beige bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="search" 
              className="flex-1 py-3 rounded-none data-[state=active]:bg-wednest-cream data-[state=active]:shadow-none border-r border-wednest-beige"
            >
              Search Vendors
            </TabsTrigger>
            <TabsTrigger 
              value="browse" 
              className="flex-1 py-3 rounded-none data-[state=active]:bg-wednest-cream data-[state=active]:shadow-none"
            >
              Browse by Category
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="p-6">
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
                            {locations.map((location) => (
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
                <div className="p-4 bg-wednest-cream/50 rounded-lg border border-wednest-beige mt-4 animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-wednest-brown">Advanced Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 text-wednest-brown-light hover:bg-wednest-beige"
                      onClick={handleClear}
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
                        {styles.map((style) => (
                          <Button
                            key={style}
                            variant={selectedStyles.includes(style) ? "default" : "outline"}
                            size="sm"
                            className={`text-xs py-1 px-3 ${
                              selectedStyles.includes(style) 
                                ? "bg-wednest-sage text-white" 
                                : "border-wednest-beige text-wednest-brown-light"
                            }`}
                            onClick={() => handleStyleSelect(style)}
                          >
                            {style}
                            {selectedStyles.includes(style) && <X className="ml-1.5 h-3 w-3" />}
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
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="browse" className="p-6">
            <div>
              <h3 className="text-lg font-medium text-wednest-brown mb-3">
                Browse by Category
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {categories.slice(1).map((category) => (
                  <Button 
                    key={category.value} 
                    variant="outline" 
                    className="border-wednest-beige text-wednest-brown-light hover:bg-wednest-cream hover:text-wednest-brown justify-center h-auto py-3"
                    onClick={() => {
                      setSelectedCategory(category.value);
                      onCategoryChange(category.value);
                      // Switch to search tab
                      const searchTab = document.querySelector('[data-value="search"]') as HTMLElement;
                      if (searchTab) searchTab.click();
                    }}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-wednest-brown mb-3">
                  Popular Locations
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {locations.slice(1, 13).map((location) => (
                    <Button 
                      key={location} 
                      variant="outline" 
                      className="border-wednest-beige text-wednest-brown-light hover:bg-wednest-cream hover:text-wednest-brown justify-center"
                      onClick={() => {
                        setSelectedLocation(location);
                        onLocationChange(location);
                        // Switch to search tab
                        const searchTab = document.querySelector('[data-value="search"]') as HTMLElement;
                        if (searchTab) searchTab.click();
                      }}
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-wednest-brown mb-3">
                  Popular Styles
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {styles.slice(0, 8).map((style) => (
                    <Button 
                      key={style} 
                      variant="outline" 
                      className="border-wednest-beige text-wednest-brown-light hover:bg-wednest-cream hover:text-wednest-brown justify-center"
                      onClick={() => {
                        setSelectedStyles([style]);
                        onStyleChange([style]);
                        // Switch to search tab
                        const searchTab = document.querySelector('[data-value="search"]') as HTMLElement;
                        if (searchTab) searchTab.click();
                      }}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorSearch;
