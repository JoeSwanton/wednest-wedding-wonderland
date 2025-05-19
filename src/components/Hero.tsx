
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, ChevronDown, MapPin, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Hero = () => {
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [vendorType, setVendorType] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const navigate = useNavigate();

  // Major Australian locations for suggestions
  const australianLocations = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Newcastle", "Canberra", "Wollongong", "Hobart", "Geelong", "Townsville", "Cairns", "Darwin", "Toowoomba", "Ballarat", "Bendigo", "Launceston", "Mackay", "Rockhampton", "Bunbury", "Bundaberg", "Hervey Bay", "Wagga Wagga", "Albury", "Mildura", "Shepparton", "Gladstone", "Coffs Harbour", "Port Macquarie"];

  // Major Australian States for initial dropdown
  const australianStates = ["Melbourne", "Sydney", "Brisbane", "Perth", "Queensland"];

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
    setIsLocationOpen(false);
  };

  return <div className="w-full bg-theme-brown py-12 px-4 md:px-8 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-3">Find Wedding Vendors You Can Trust</h1>
        
        <p className="text-theme-cream mb-8 max-w-2xl mx-auto">Book verified photographers, florists, venues, and more all in one place.</p>
        
        <div className="bg-white rounded-lg shadow-lg p-3 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Location Input with Dropdown - Redesigned to match vendor type dropdown */}
            <div className="md:col-span-4">
              <DropdownMenu open={isLocationOpen} onOpenChange={setIsLocationOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between border-theme-beige bg-white text-theme-brown">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-theme-brown" />
                      <span className="truncate">{location || "Where's your wedding?"}</span>
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-2rem)] md:w-[320px]" align="start">
                  <div className="py-2 px-4 font-medium text-gray-800 bg-gray-100 border-b">
                    <p className="font-normal text-sm text-gray-950">Trending destinations</p>
                  </div>
                  {australianStates.map((state, index) => <DropdownMenuItem key={index} onSelect={() => handleLocationSelect(state)}>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="font-medium">{state}</div>
                          <div className="text-xs text-gray-500">Australia</div>
                        </div>
                      </div>
                    </DropdownMenuItem>)}
                  <div className="py-2 px-4 font-medium text-gray-800 bg-gray-100 border-t border-b">
                    <p>Other locations</p>
                  </div>
                  {australianLocations.filter(loc => !australianStates.includes(loc)).slice(0, 5).map((location, index) => <DropdownMenuItem key={`other-${index}`} onSelect={() => handleLocationSelect(location)}>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="font-medium">{location}</div>
                          <div className="text-xs text-gray-500">Australia</div>
                        </div>
                      </div>
                    </DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Wedding Date - Updated to match location dropdown styling */}
            <div className="md:col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between border-theme-beige bg-white text-theme-brown hover:bg-theme-brown hover:text-white"
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span className="truncate">{date ? format(date, "PPP") : "Wedding date"}</span>
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
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
                <SelectTrigger className="border bg-white text-theme-brown flex justify-between items-center">
                  <SelectValue placeholder="Vendor type" className="text-theme-brown" />
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
              <Button onClick={handleSearch} className="w-full hover:bg-theme-blue-dark text-white bg-theme-brown">
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
