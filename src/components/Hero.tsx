
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [vendorType, setVendorType] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = () => {
    // Build query parameters
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (vendorType) params.append("category", vendorType);
    if (date) params.append("date", date.toISOString().split('T')[0]);
    
    // Navigate to vendors page with search parameters
    navigate(`/vendors?${params.toString()}`);
  };
  
  return (
    <div className="w-full bg-blue-800 py-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-white text-center mb-6">
          Find your wedding vendors
        </h1>
        
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Location Input */}
            <div className="md:col-span-4">
              <div className="flex items-center border rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-wednest-sage">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <Input 
                  type="text" 
                  placeholder="Where's your wedding?" 
                  className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            
            {/* Wedding Date */}
            <div className="md:col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full border justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Vendor Type */}
            <div className="md:col-span-3">
              <Select value={vendorType} onValueChange={setVendorType}>
                <SelectTrigger className="border">
                  <SelectValue placeholder="All Vendor Types" />
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
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>
          
          {/* Benefits Bar */}
          <div className="flex flex-wrap justify-center gap-x-8 mt-6 text-xs md:text-sm text-gray-600 border-t pt-4">
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-wednest-sage rounded-full mr-1.5"></span>
              <span>Verified Vendors</span>
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-wednest-sage rounded-full mr-1.5"></span>
              <span>Planning Tools</span>
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-wednest-sage rounded-full mr-1.5"></span>
              <span>Instant Inquiries</span>
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-wednest-sage rounded-full mr-1.5"></span>
              <span>Mobile Friendly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
