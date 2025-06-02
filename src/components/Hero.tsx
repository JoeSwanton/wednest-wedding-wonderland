
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, ChevronDown, MapPin, Search, X, Users } from "lucide-react";
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
  const [guestCount, setGuestCount] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Major Australian locations for suggestions
  const australianLocations = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Newcastle", "Canberra", "Wollongong", "Hobart", "Geelong", "Townsville", "Cairns", "Darwin", "Toowoomba", "Ballarat", "Bendigo", "Launceston", "Mackay", "Rockhampton", "Bunbury", "Bundaberg", "Hervey Bay", "Wagga Wagga", "Albury", "Mildura", "Shepparton", "Gladstone", "Coffs Harbour", "Port Macquarie"];

  // Filter locations based on input
  const filteredLocations = australianLocations.filter(loc => 
    loc.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSearch = () => {
    // Build query parameters
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (vendorType) params.append("category", vendorType);
    if (date) params.append("date", date.toISOString().split('T')[0]);
    if (guestCount) params.append("guests", guestCount);

    // Navigate to vendors page with search parameters
    navigate(`/vendors?${params.toString()}`);
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setInputValue(selectedLocation);
    setIsLocationOpen(false);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setLocation(value);
    
    if (value.length >= 2) {
      setShowSuggestions(true);
      setIsLocationOpen(true);
    } else {
      setShowSuggestions(false);
      setIsLocationOpen(false);
    }
  };

  const handleInputFocus = () => {
    if (inputValue.length >= 2 && filteredLocations.length > 0) {
      setShowSuggestions(true);
      setIsLocationOpen(true);
    }
  };

  const clearInput = () => {
    setInputValue("");
    setLocation("");
    setShowSuggestions(false);
    setIsLocationOpen(false);
    if (locationInputRef.current) {
      locationInputRef.current.focus();
    }
  };

  return (
    <div className="w-full bg-theme-brown py-20 md:py-32 px-4 md:px-8 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Simplified hero headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
          Find Your Perfect Wedding Team
        </h1>
        
        {/* Clean value proposition */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
          Compare, connect, and book trusted wedding vendors across Australia
        </p>
        
        {/* Single-row search bar - Booking.com style */}
        <div className="bg-white rounded-xl shadow-2xl p-3 max-w-5xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Location Input */}
            <div className="md:col-span-4 relative">
              <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      ref={locationInputRef}
                      value={inputValue}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      placeholder="Where?"
                      className="w-full pl-10 pr-8 py-3 h-12 border-0 bg-white text-theme-brown placeholder:text-theme-brown-light focus:ring-2 focus:ring-theme-brown/20 transition-all rounded-lg"
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-theme-brown-light" />
                    {inputValue && (
                      <Button 
                        variant="ghost" 
                        onClick={clearInput}
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 rounded-full hover:bg-theme-cream/20"
                      >
                        <X className="h-4 w-4 text-theme-brown-light" />
                      </Button>
                    )}
                  </div>
                </PopoverTrigger>
                {showSuggestions && filteredLocations.length > 0 && (
                  <PopoverContent className="w-[calc(100vw-2rem)] md:w-[350px] p-0" align="start">
                    <Command>
                      <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup>
                          {filteredLocations.slice(0, 6).map((location, index) => (
                            <CommandItem
                              key={`location-${index}`}
                              value={location}
                              onSelect={() => handleLocationSelect(location)}
                              className="flex items-center py-2 cursor-pointer"
                            >
                              <MapPin className="h-4 w-4 text-theme-brown-light mr-2 flex-shrink-0" />
                              <span>{location}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
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
                    className="w-full h-12 justify-start border-0 bg-white text-theme-brown hover:bg-theme-cream/10 transition-all rounded-lg"
                  >
                    <CalendarIcon className="mr-2 h-5 w-5 text-theme-brown-light" />
                    <span className={cn("truncate", !date && "text-theme-brown-light")}>
                      {date ? format(date, "MMM dd, yyyy") : "When?"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent 
                    mode="single" 
                    selected={date} 
                    onSelect={setDate} 
                    initialFocus 
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Vendor Type */}
            <div className="md:col-span-2">
              <Select value={vendorType} onValueChange={setVendorType}>
                <SelectTrigger className="h-12 border-0 bg-white text-theme-brown hover:bg-theme-cream/10 transition-all rounded-lg">
                  <SelectValue placeholder="What?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photographer">Photography</SelectItem>
                  <SelectItem value="venue">Venues</SelectItem>
                  <SelectItem value="catering">Catering</SelectItem>
                  <SelectItem value="florist">Flowers</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="cake">Cakes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Guest Count */}
            <div className="md:col-span-2">
              <Select value={guestCount} onValueChange={setGuestCount}>
                <SelectTrigger className="h-12 border-0 bg-white text-theme-brown hover:bg-theme-cream/10 transition-all rounded-lg">
                  <Users className="mr-2 h-4 w-4 text-theme-brown-light" />
                  <SelectValue placeholder="Guests?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-50">1-50 guests</SelectItem>
                  <SelectItem value="51-100">51-100 guests</SelectItem>
                  <SelectItem value="101-150">101-150 guests</SelectItem>
                  <SelectItem value="151-200">151-200 guests</SelectItem>
                  <SelectItem value="200+">200+ guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Search Button */}
            <div className="md:col-span-1">
              <Button 
                onClick={handleSearch} 
                size="lg"
                className="w-full h-12 bg-theme-brown hover:bg-theme-brown-dark text-white transition-all rounded-lg font-semibold shadow-lg hover:shadow-xl"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
