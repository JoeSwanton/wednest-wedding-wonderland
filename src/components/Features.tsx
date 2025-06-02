
import { useState } from "react";
import { Button } from "@/components/ui/button";
import VendorCards from "./VendorCards";
import { Star, ArrowDown, ArrowUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const vendorCategories = [
  "Photography",
  "Venues",
  "Catering",
  "Florists",
  "Music & Entertainment",
  "Wedding Planners",
  "Cakes & Desserts",
  "Wedding Dresses"
];

const Features = () => {
  const [sort, setSort] = useState("popular");

  return (
    <ErrorBoundary>
      <div className="w-full py-8 md:py-12 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-normal text-wednest-brown">
              Popular Wedding Vendors
            </h2>
            
            <div className="flex items-center gap-2">
              <div className="text-sm text-wednest-brown-light mr-1 hidden md:block">Sort by:</div>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="border-wednest-beige w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1.5 text-wednest-gold" />
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
            </div>
          </div>
          
          {/* Quick Category Selectors */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button 
              variant="outline" 
              className="bg-wednest-sage text-white border-wednest-sage hover:bg-wednest-sage/90"
            >
              All Categories
            </Button>
            
            {vendorCategories.map((category, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="border-wednest-beige text-wednest-brown-light hover:bg-wednest-cream"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Vendor Cards */}
          <div className="mb-8">
            <VendorCards />
          </div>
          
          {/* Popular in Your Area Section */}
          <div className="mt-12 mb-6">
            <h3 className="text-xl font-serif font-normal text-wednest-brown mb-6">
              Popular in Sydney
            </h3>
            <VendorCards />
          </div>
          
          {/* "See More" Button */}
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="border-wednest-sage text-wednest-sage hover:bg-wednest-cream"
            >
              See More Vendors
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Features;
