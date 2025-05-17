
import { useState } from "react";
import { Button } from "@/components/ui/button";
import VendorCards from "./VendorCards";
import { Star, ArrowDown, ArrowUp, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VendorListings = () => {
  const [sort, setSort] = useState("popular");

  return (
    <div className="w-full py-6 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Popular Vendors Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-medium text-gray-800">
              Popular Wedding Vendors
            </h2>
            
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600 mr-1 hidden md:block">Sort by:</div>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1.5 text-yellow-500 fill-yellow-500" />
                      <span>Most Popular</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="price-low">
                    <div className="flex items-center">
                      <ArrowDown className="w-4 h-4 mr-1.5" />
                      <span>Price Low to High</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="price-high">
                    <div className="flex items-center">
                      <ArrowUp className="w-4 h-4 mr-1.5" />
                      <span>Price High to Low</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Filter className="h-4 w-4" /> Filters
              </Button>
            </div>
          </div>

          {/* Vendor Cards */}
          <VendorCards />
        </div>
        
        {/* Popular in Your Area Section */}
        <div className="mb-10">
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Popular in Sydney
          </h3>
          <VendorCards />
        </div>
        
        {/* Trending Categories Section */}
        <div className="mb-10">
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Browse by vendor category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: "Photography", image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=400&h=300" },
              { type: "Venues", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400&h=300" },
              { type: "Catering", image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=400&h=300" },
              { type: "Florists", image: "https://images.unsplash.com/photo-1561128290-000992e97018?auto=format&fit=crop&q=80&w=400&h=300" }
            ].map((category, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden h-40 group">
                <img 
                  src={category.image} 
                  alt={category.type} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h4 className="text-white font-medium text-lg">{category.type}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* "See More" Button */}
        <div className="text-center mt-8 mb-4">
          <Button 
            variant="outline" 
            className="border-wednest-sage text-wednest-sage hover:bg-wednest-cream"
          >
            See All Vendors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorListings;
