
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [date, setDate] = useState<Date>();
  
  return (
    <div className="w-full bg-wednest-cream py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-wednest-brown text-center mb-6">
          Search Verified Wedding Vendors
        </h1>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Location Input */}
            <div>
              <label className="text-xs font-medium text-wednest-brown-light mb-1 block">Location</label>
              <Input 
                type="text" 
                placeholder="Where's your wedding?" 
                className="w-full border-wednest-beige focus-visible:ring-wednest-sage"
              />
            </div>
            
            {/* Vendor Type */}
            <div>
              <label className="text-xs font-medium text-wednest-brown-light mb-1 block">Vendor Type</label>
              <Select>
                <SelectTrigger className="border-wednest-beige">
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
            
            {/* Wedding Date */}
            <div>
              <label className="text-xs font-medium text-wednest-brown-light mb-1 block">Wedding Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full border-wednest-beige justify-start text-left font-normal",
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
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Search Button */}
            <div className="flex items-end">
              <Button 
                className="w-full bg-wednest-sage hover:bg-wednest-sage-dark text-white"
              >
                Search Vendors
              </Button>
            </div>
          </div>
          
          {/* Benefits Bar */}
          <div className="flex flex-wrap justify-center gap-x-8 mt-6 text-xs md:text-sm text-wednest-brown-light">
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
