import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Search } from "lucide-react";
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
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Major Australian locations for suggestions
  const australianLocations = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Newcastle", "Canberra", "Wollongong", "Hobart", "Geelong", "Townsville", "Cairns", "Darwin", "Toowoomba", "Ballarat", "Bendigo", "Launceston", "Mackay", "Rockhampton", "Bunbury", "Bundaberg", "Hervey Bay", "Wagga Wagga", "Albury", "Mildura", "Shepparton", "Gladstone", "Coffs Harbour", "Port Macquarie"];

  // Major Australian States for initial dropdown
  const australianStates = ["Melbourne", "Sydney", "Brisbane", "Perth", "Queensland"];
  useEffect(() => {
    // Filter locations based on user input
    if (location) {
      const filtered = australianLocations.filter(loc => loc.toLowerCase().includes(location.toLowerCase()));
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [location]);
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
    setIsLocationFocused(false);
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (locationInputRef.current && !locationInputRef.current.contains(e.target as Node)) {
      setIsLocationFocused(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return <div className="w-full bg-theme-brown py-12 px-4 md:px-8 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-3">Find Wedding Vendors You Can Trust</h1>
        
        <p className="text-theme-cream mb-8 max-w-2xl mx-auto">Book verified photographers, florists, venues, and more all in one place.</p>
        
        <div className="bg-white rounded-lg shadow-lg p-3 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Location Input with Dropdown */}
            <div className="md:col-span-5" ref={locationInputRef}>
              <div className="flex items-center border rounded-md px-3 bg-white py-0 relative">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <Input type="text" placeholder="Where's your wedding?" className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0" value={location} onChange={e => setLocation(e.target.value)} onFocus={() => setIsLocationFocused(true)} />
                
                {/* Dropdown for suggestions */}
                {isLocationFocused && <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    {location === '' ?
                // Show Australian states when empty
                australianStates.map((state, index) => <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleLocationSelect(state)}>
                          {state}
                        </div>) : searchResults.length > 0 ?
                // Show filtered results when typing
                searchResults.map((result, index) => <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleLocationSelect(result)}>
                          {result}
                        </div>) : <div className="px-4 py-2 text-gray-500">No locations found</div>}
                  </div>}
              </div>
            </div>
            
            {/* Wedding Date */}
            <div className="md:col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full border justify-start text-left font-normal bg-theme-brown text-[theme-brown-dark] text-slate-50">
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span className="text-[theme-brown-light] text-theme-brown">Wedding date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus className="pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Vendor Type */}
            <div className="md:col-span-2">
              <Select value={vendorType} onValueChange={setVendorType}>
                <SelectTrigger className="border bg-white">
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
              <Button onClick={handleSearch} className="w-full hover:bg-theme-blue-dark text-[theme-brown-dark] text-slate-50 bg-[theme-brown-light] bg-theme-brown">
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