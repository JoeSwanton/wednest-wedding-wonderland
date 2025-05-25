
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, ChevronDown, MapPin, Search, X, ArrowRight, Users, Star, Clock } from "lucide-react";
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const locationInputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

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
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Only show suggestions if user has typed at least 2 characters
    if (value.length >= 2) {
      // Add a small delay to avoid interrupting typing
      timeoutRef.current = setTimeout(() => {
        setShowSuggestions(true);
        setIsLocationOpen(true);
      }, 300);
    } else {
      setShowSuggestions(false);
      setIsLocationOpen(false);
    }
  };

  const handleInputFocus = () => {
    // Only open if there's enough text and matching suggestions
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full bg-theme-brown py-16 md:py-24 px-4 md:px-8 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Updated hero headline - more focused and benefit-driven */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
          Plan Your Perfect Wedding
        </h1>
        
        {/* Enhanced value proposition */}
        <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-4xl mx-auto">
          Compare prices, availability, and book directly with trusted wedding professionals near you
        </p>
        
        {/* Trust signals */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-white/80">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span className="text-sm">1,200+ verified vendors</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">4.8 average rating</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="text-sm">Instant booking</span>
          </div>
        </div>
        
        {/* Enhanced search bar - larger and more prominent */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Location Input - larger and more prominent */}
            <div className="md:col-span-5 relative">
              <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      ref={locationInputRef}
                      value={inputValue}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      placeholder="Where's your wedding?"
                      className="w-full pl-12 pr-10 py-4 h-14 text-lg border-2 border-theme-beige/30 bg-white text-theme-brown placeholder:text-theme-brown-light hover:border-theme-brown/60 focus:border-theme-brown focus:ring-2 focus:ring-theme-brown/20 transition-all rounded-xl"
                    />
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-theme-brown-light" />
                    {inputValue && (
                      <Button 
                        variant="ghost" 
                        onClick={clearInput}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full hover:bg-theme-cream/20"
                      >
                        <X className="h-5 w-5 text-theme-brown-light" />
                      </Button>
                    )}
                  </div>
                </PopoverTrigger>
                {showSuggestions && filteredLocations.length > 0 && (
                  <PopoverContent className="w-[calc(100vw-2rem)] md:w-[400px] p-0" align="start">
                    <Command>
                      <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup heading="Popular wedding destinations">
                          {filteredLocations.slice(0, 6).map((location, index) => (
                            <CommandItem
                              key={`location-${index}`}
                              value={location}
                              onSelect={() => handleLocationSelect(location)}
                              className="flex items-center py-3 cursor-pointer"
                            >
                              <MapPin className="h-5 w-5 text-theme-brown-light mr-3 flex-shrink-0" />
                              <div>
                                <div className="font-medium">{location}</div>
                                <div className="text-sm text-theme-brown-light">Australia</div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                )}
              </Popover>
            </div>
            
            {/* Wedding Date - enhanced */}
            <div className="md:col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full h-14 justify-between border-2 border-theme-beige/30 bg-white text-theme-brown placeholder:text-theme-brown-light hover:border-theme-brown/60 hover:bg-theme-cream/10 transition-all rounded-xl text-lg"
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="mr-3 h-6 w-6 text-theme-brown-light" />
                      <span className={cn("truncate", !date && "text-theme-brown-light")}>
                        {date ? format(date, "MMM dd, yyyy") : "Wedding date"}
                      </span>
                    </div>
                    <ChevronDown className="ml-2 h-5 w-5 text-theme-brown-light" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent 
                    mode="single" 
                    selected={date} 
                    onSelect={setDate} 
                    initialFocus 
                    className={cn("p-3")} 
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Vendor Type - enhanced */}
            <div className="md:col-span-3">
              <Select value={vendorType} onValueChange={setVendorType}>
                <SelectTrigger className="h-14 border-2 border-theme-beige/30 bg-white text-theme-brown [&>span]:text-theme-brown-light hover:border-theme-brown/60 hover:bg-theme-cream/10 transition-all rounded-xl text-lg">
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
            
            {/* Enhanced Search Button */}
            <div className="md:col-span-1">
              <Button 
                onClick={handleSearch} 
                size="lg"
                className="w-full h-14 bg-theme-brown hover:bg-theme-brown-dark text-white transition-all rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Search className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Ghost CTA for browsing */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/vendors')}
            className="text-white hover:bg-white/10 border border-white/30 hover:border-white/50 px-8 py-3 rounded-xl text-lg group transition-all"
          >
            Or browse by category 
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        {/* Enhanced benefits bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/80 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="w-3 h-3 bg-white rounded-full mb-2"></div>
            <span className="font-medium">Verified Vendors</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="w-3 h-3 bg-white rounded-full mb-2"></div>
            <span className="font-medium">Instant Booking</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="w-3 h-3 bg-white rounded-full mb-2"></div>
            <span className="font-medium">Price Comparison</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="w-3 h-3 bg-white rounded-full mb-2"></div>
            <span className="font-medium">Planning Tools</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
