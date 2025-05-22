
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, ChevronDown, MapPin, Search, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const Hero = () => {
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [vendorType, setVendorType] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Major Australian locations for suggestions
  const australianLocations = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Newcastle", "Canberra", "Wollongong", "Hobart", "Geelong", "Townsville", "Cairns", "Darwin", "Toowoomba", "Ballarat", "Bendigo", "Launceston", "Mackay", "Rockhampton", "Bunbury", "Bundaberg", "Hervey Bay", "Wagga Wagga", "Albury", "Mildura", "Shepparton", "Gladstone", "Coffs Harbour", "Port Macquarie"];

  // Filter locations based on input
  const filteredLocations = australianLocations.filter(loc => 
    loc.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Show suggestions only when user has typed something
  const showSuggestions = inputValue.length > 0 && isLocationOpen;

  const handleSearch = () => {
    // Build query parameters
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (vendorType) params.append("category", vendorType);
    if (date) params.append("date", date.toISOString().split('T')[0]);

    // Navigate to vendors page with search parameters
    navigate(`/vendors?${params.toString()}`);
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setInputValue(selectedLocation);
    setIsLocationOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setLocation(value);
    
    // Open the dropdown when user types
    if (value && !isLocationOpen) {
      setIsLocationOpen(true);
    }
  };

  const clearInput = () => {
    setInputValue("");
    setLocation("");
    if (locationInputRef.current) {
      locationInputRef.current.focus();
    }
  };

  return <div className="w-full bg-theme-brown py-12 px-4 md:px-8 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-3">Find Wedding Vendors You Can Trust</h1>
        
        <p className="text-theme-cream mb-8 max-w-2xl mx-auto">Book verified photographers, florists, venues, and more all in one place.</p>
        
        <div className="bg-white rounded-lg shadow-lg p-3 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Location Input with direct typing and suggestions */}
            <div className="md:col-span-4 relative">
              <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      ref={locationInputRef}
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Where's your wedding?"
                      className="w-full pl-9 pr-8 py-2 h-10 border border-theme-beige/40 bg-white text-theme-brown hover:border-theme-brown/60 focus:border-theme-brown focus:ring-1 focus:ring-theme-brown/30 transition-colors rounded-md"
                      onFocus={() => setIsLocationOpen(true)}
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-theme-brown-light flex-shrink-0" />
                    {inputValue && (
                      <Button 
                        variant="ghost" 
                        onClick={clearInput}
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 rounded-full hover:bg-theme-cream/10"
                      >
                        <X className="h-4 w-4 text-theme-brown-light" />
                      </Button>
                    )}
                  </div>
                </PopoverTrigger>
                {showSuggestions && (
                  <PopoverContent className="w-[calc(100vw-2rem)] md:w-[320px] p-0" align="start">
                    <Command>
                      <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        {filteredLocations.length > 0 && (
                          <CommandGroup heading="Suggested locations">
                            {filteredLocations.slice(0, 6).map((location, index) => (
                              <CommandItem
                                key={`location-${index}`}
                                value={location}
                                onSelect={() => handleLocationSelect(location)}
                                className="flex items-center py-2 cursor-pointer"
                              >
                                <MapPin className="h-4 w-4 text-theme-brown-light mr-2 flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-sm">{location}</div>
                                  <div className="text-xs text-theme-brown-light">Australia</div>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                )}
              </Popover>
            </div>
            
            {/* Wedding Date */}
            <div className="md:col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between border border-theme-beige/40 bg-white text-theme-brown hover:border-theme-brown/60 hover:bg-theme-cream/10 transition-colors"
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-theme-brown-light" />
                      <span className="truncate">{date ? format(date, "PPP") : "Wedding date"}</span>
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 text-theme-brown-light" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent 
                    mode="single" 
                    selected={date} 
                    onSelect={setDate} 
                    initialFocus 
                    className={cn("p-3 pointer-events-auto")} 
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Vendor Type */}
            <div className="md:col-span-3">
              <Select value={vendorType} onValueChange={setVendorType}>
                <SelectTrigger className="border border-theme-beige/40 bg-white text-theme-brown hover:border-theme-brown/60 hover:bg-theme-cream/10 transition-colors">
                  <SelectValue placeholder="Vendor type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photographer">Photographers</SelectItem>
                  <SelectItem value="venue">Venues</SelectItem>
                  <SelectItem value="catering">Catering</SelectItem>
                  <SelectItem value="florist">Florists</SelectItem>
                  <SelectItem value="music">Music & Entertainment</SelectItem>
                  <SelectItem value="cake">Cake & Dessert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Search Button */}
            <div className="md:col-span-2">
              <Button 
                onClick={handleSearch} 
                className="w-full bg-theme-brown hover:bg-theme-brown/90 text-white transition-colors"
              >
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </div>
        
        {/* Benefits Bar */}
        <div className="flex flex-wrap justify-center gap-x-8 mt-6 text-sm text-theme-cream">
          <div className="flex items-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></span>
            <span>Verified Vendors</span>
          </div>
          <div className="flex items-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></span>
            <span>Planning Tools</span>
          </div>
          <div className="flex items-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></span>
            <span>Instant Inquiries</span>
          </div>
          <div className="flex items-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></span>
            <span>Mobile Friendly</span>
          </div>
        </div>
      </div>
    </div>;
};

export default Hero;
