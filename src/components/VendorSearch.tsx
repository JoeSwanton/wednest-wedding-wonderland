
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const locations = [
  "Any Location",
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Gold Coast",
  "Canberra"
];

const categories = [
  { label: "All Categories", value: "all" },
  { label: "Venues", value: "venues" },
  { label: "Photographers", value: "photographers" },
  { label: "Florists", value: "florists" },
  { label: "Caterers", value: "caterers" },
  { label: "Wedding Planners", value: "planners" },
  { label: "DJs & Entertainment", value: "entertainment" },
  { label: "Videographers", value: "videographers" },
  { label: "Cake Designers", value: "cakes" }
];

const VendorSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("Any Location");
  const [priceRange, setPriceRange] = useState([0, 100]);

  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-wednest-beige">
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
              <div>
                <Input 
                  type="text" 
                  placeholder="Search for vendors (e.g., rustic outdoor venues with mountain views)" 
                  className="w-full border-wednest-beige focus-visible:ring-wednest-sage"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
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
                </div>
                
                <div>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="border-wednest-beige">
                      <SelectValue placeholder="Any Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Button className="w-full bg-wednest-sage hover:bg-wednest-sage-dark text-white">
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2 text-sm text-wednest-brown">
                  <span>Price Range</span>
                  <span>$$$</span>
                </div>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-wednest-brown-light">
                  <span>$</span>
                  <span>$$$$$</span>
                </div>
              </div>
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
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-wednest-brown mb-3">
                  Popular Locations
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {locations.slice(1).map((location) => (
                    <Button 
                      key={location} 
                      variant="outline" 
                      className="border-wednest-beige text-wednest-brown-light hover:bg-wednest-cream hover:text-wednest-brown justify-center"
                    >
                      {location}
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
