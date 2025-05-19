
import { useState } from "react";
import { Button } from "@/components/ui/button";
import VendorCards from "./VendorCards";
import { Star, ArrowDown, ArrowUp, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const VendorListings = () => {
  const [sort, setSort] = useState("popular");
  
  // Wedding vendor categories with images
  const categories = [
    {
      type: "Venues",
      count: "245",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      type: "Photographers",
      count: "189",
      image: "https://images.unsplash.com/photo-1537633552122-d3b236552305?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      type: "Caterers",
      count: "156",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      type: "Florists",
      count: "132",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      type: "Entertainment",
      count: "98",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      type: "Planners",
      count: "76",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=400&h=300"
    }
  ];

  return <div className="w-full py-8 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Browse by Category Section - Moved above Popular in Sydney */}
        <div className="mb-12">
          <h3 className="text-xl md:text-2xl font-serif text-theme-brown-dark mb-5">
            Browse by Category
          </h3>
          
          {/* Mobile view: Show as carousel */}
          <div className="block md:hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {categories.map((category, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Link to={`/vendors?category=${category.type.toLowerCase()}`} className="block">
                      <div className="relative rounded-lg overflow-hidden">
                        <img 
                          src={category.image} 
                          alt={category.type} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                          <h4 className="text-white text-lg font-medium">{category.type}</h4>
                          <p className="text-white/80 text-sm">{category.count} vendors</p>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 bg-white border-theme-beige" />
              <CarouselNext className="-right-4 bg-white border-theme-beige" />
            </Carousel>
          </div>
          
          {/* Desktop view: Show as grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link to={`/vendors?category=${category.type.toLowerCase()}`} key={index} className="block">
                <div className="relative rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <img 
                    src={category.image} 
                    alt={category.type} 
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h4 className="text-white text-lg font-medium">{category.type}</h4>
                    <p className="text-white/80 text-sm">{category.count} vendors</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Popular Vendors Section - Now below Browse by Category */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl md:text-2xl font-serif text-theme-brown-dark">
              Popular in Sydney
            </h2>
            
            <div className="flex items-center gap-2">
              <div className="text-sm text-theme-gray-dark mr-1 hidden md:block">Sort by:</div>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Recommended" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1.5 text-yellow-500 fill-yellow-500" />
                      <span>Recommended</span>
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
              
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          {/* Vendor Cards */}
          <VendorCards />
        </div>
        
        {/* "See More" Button */}
        <div className="text-center mt-8 mb-8">
          <Link to="/vendors">
            <Button variant="outline" className="bg-theme-brown hover:bg-theme-brown-dark text-white px-8">
              View All Sydney Vendors
            </Button>
          </Link>
        </div>
        
        {/* Recently Viewed Section */}
        <div className="mb-10">
          <h3 className="text-xl font-serif text-theme-brown-dark mb-5">
            Recently Viewed
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-lg overflow-hidden border border-theme-beige hover:shadow-md transition-shadow">
              <img src="https://images.unsplash.com/photo-1561128290-000992e97018?auto=format&fit=crop&q=80&w=400&h=300" alt="Bloom & Petal" className="w-full h-40 object-cover" />
              <div className="p-3">
                <div className="flex justify-between">
                  <h4 className="font-medium text-theme-brown">Bloom & Petal</h4>
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs ml-1">4.6</span>
                  </div>
                </div>
                <div className="text-xs text-theme-gray-dark mt-1">
                  Florist • Sydney
                </div>
                <div className="text-xs font-medium mt-2">
                  From $180
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sign in and save section */}
        <div className="rounded-lg bg-theme-cream p-5 mb-10 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-lg font-serif text-theme-brown-dark">Sign in and save</h3>
            <p className="text-sm text-theme-gray-dark">Create an account to save your favorite vendors and get special offers</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link to="/auth">
              <Button variant="outline" className="border-theme-brown text-theme-brown hover:bg-theme-beige">
                Sign In
              </Button>
            </Link>
            <Link to="/auth?tab=signup">
              <Button className="hover:bg-theme-blue-dark text-white bg-theme-brown">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
export default VendorListings;
