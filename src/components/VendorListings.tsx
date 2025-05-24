
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import VendorCards from "./VendorCards";
import { Star, ArrowDown, ArrowUp, Filter, ArrowRight, ArrowLeft, SlidersHorizontal, MapPin } from "lucide-react";
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
  const [categoryPage, setCategoryPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");
  
  // Enhanced wedding vendor categories with better visuals
  const categories = [
    {
      type: "Venues",
      count: "245",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400&h=300",
      description: "Dream wedding locations",
      trending: true
    },
    {
      type: "Photographers",
      count: "189",
      image: "https://images.unsplash.com/photo-1537633552122-d3b236552305?auto=format&fit=crop&q=80&w=400&h=300",
      description: "Capture your special moments",
      trending: false
    },
    {
      type: "Caterers",
      count: "156",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=400&h=300",
      description: "Delicious wedding cuisine",
      trending: true
    },
    {
      type: "Florists",
      count: "132",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=400&h=300",
      description: "Beautiful floral arrangements",
      trending: false
    },
    {
      type: "Entertainment",
      count: "98",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400&h=300",
      description: "Music & entertainment",
      trending: false
    },
    {
      type: "Planners",
      count: "76",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=400&h=300",
      description: "Professional planning services",
      trending: true
    }
  ];

  const displayIndex = categoryPage % categories.length;
  const currentCategories = [
    categories[displayIndex],
    categories[(displayIndex + 1) % categories.length],
    categories[(displayIndex + 2) % categories.length]
  ];
  
  const handleNextCategoryPage = () => {
    setSlideDirection("right");
    setCategoryPage((prev) => (prev + 1) % categories.length);
  };

  const handlePrevCategoryPage = () => {
    setSlideDirection("left");
    setCategoryPage((prev) => (prev - 1 + categories.length) % categories.length);
  };

  return (
    <div className="w-full py-12 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Browse by Category Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif text-theme-brown mb-2">
                Browse by Category
              </h3>
              <p className="text-theme-brown-light text-lg">
                Find the perfect vendors for every part of your wedding
              </p>
            </div>
            
            {/* Enhanced category navigation */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-theme-brown-light mr-2">
                {displayIndex + 1} - {Math.min(displayIndex + 3, categories.length)} of {categories.length}
              </span>
              <div className="flex gap-1">
                {categories.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full transition-colors ${
                      categoryPage % categories.length === i ? 'bg-theme-brown' : 'bg-theme-beige'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile carousel */}
          <div className="block md:hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {categories.map((category, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Link to={`/vendors?category=${category.type.toLowerCase()}`} className="block group">
                      <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        <div className="relative h-56">
                          <img 
                            src={category.image} 
                            alt={category.type} 
                            className="w-full h-full object-cover"
                          />
                          {category.trending && (
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              Trending
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                          <h4 className="text-xl font-semibold mb-1">{category.type}</h4>
                          <p className="text-white/90 text-sm mb-2">{category.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-white/80 text-sm">{category.count} vendors</span>
                            <ArrowRight className="h-4 w-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 bg-white shadow-lg border-theme-beige" />
              <CarouselNext className="-right-6 bg-white shadow-lg border-theme-beige" />
            </Carousel>
          </div>
          
          {/* Desktop enhanced grid */}
          <div className="hidden md:flex items-center">
            <Button 
              onClick={handlePrevCategoryPage} 
              variant="outline" 
              size="lg"
              className="rounded-full h-14 w-14 mr-6 border-theme-beige hover:bg-theme-cream shadow-lg"
            >
              <ArrowLeft className="h-6 w-6 text-theme-brown" />
            </Button>
            
            <div className="grid grid-cols-3 gap-6 flex-1">
              {currentCategories.map((category, index) => (
                <Link to={`/vendors?category=${category.type.toLowerCase()}`} key={index} className="block group">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <div className="relative h-64">
                      <img 
                        src={category.image} 
                        alt={category.type} 
                        className="w-full h-full object-cover"
                      />
                      {category.trending && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Trending
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                      <h4 className="text-xl font-semibold mb-1">{category.type}</h4>
                      <p className="text-white/90 text-sm mb-2">{category.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-white/80 text-sm">{category.count} vendors</span>
                        <ArrowRight className="h-4 w-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <Button 
              onClick={handleNextCategoryPage} 
              variant="outline" 
              size="lg"
              className="rounded-full h-14 w-14 ml-6 border-theme-beige hover:bg-theme-cream shadow-lg"
            >
              <ArrowRight className="h-6 w-6 text-theme-brown" />
            </Button>
          </div>
        </div>
        
        {/* Enhanced Popular Vendors Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-2">
                Popular in Sydney
              </h2>
              <p className="text-theme-brown-light text-lg">
                Highly rated vendors available for your wedding date
              </p>
            </div>
            
            {/* Enhanced filter controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-theme-cream rounded-lg p-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 rounded-md"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[180px] border-theme-beige">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
                      <span>Most Popular</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="price-low">
                    <div className="flex items-center">
                      <ArrowDown className="w-4 h-4 mr-2" />
                      <span>Price Low to High</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="price-high">
                    <div className="flex items-center">
                      <ArrowUp className="w-4 h-4 mr-2" />
                      <span>Price High to Low</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="availability">Best Availability</SelectItem>
                  <SelectItem value="response">Fastest Response</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <VendorCards />
        </div>
        
        {/* Enhanced CTA Banner */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-theme-brown to-theme-brown-dark rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-serif mb-4">
                Discover All Sydney Wedding Vendors
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Browse our complete collection of verified wedding professionals in Sydney
              </p>
              <Link to="/vendors">
                <Button 
                  size="lg" 
                  className="bg-white text-theme-brown hover:bg-theme-cream px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  View All Sydney Vendors
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Enhanced Recently Viewed Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl md:text-2xl font-serif text-theme-brown">
              Recently Viewed
            </h3>
            <Button variant="outline" size="sm" className="text-theme-brown border-theme-beige hover:bg-theme-cream">
              Clear History
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-xl overflow-hidden border border-theme-beige hover:shadow-lg transition-all duration-300 group bg-white">
              <div className="relative h-40">
                <img 
                  src="https://images.unsplash.com/photo-1561128290-000992e97018?auto=format&fit=crop&q=80&w=400&h=300" 
                  alt="Bloom & Petal" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full flex items-center text-xs">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  4.6
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-theme-brown group-hover:text-theme-brown-dark transition-colors">
                    Bloom & Petal
                  </h4>
                </div>
                <div className="text-sm text-theme-brown-light mb-3 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  Florist • Sydney
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-semibold text-theme-brown">From $180</div>
                  <Button size="sm" className="bg-theme-brown hover:bg-theme-brown-dark text-white text-xs px-3">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Sign up CTA */}
        <div className="rounded-2xl bg-theme-cream border border-theme-beige p-8 md:p-10 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-serif text-theme-brown mb-2">
              Save Your Favorites & Get Matched
            </h3>
            <p className="text-theme-brown-light text-lg">
              Create your free account to save vendors, compare prices, and get personalized recommendations
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/auth">
              <Button 
                variant="outline" 
                size="lg"
                className="border-theme-brown text-theme-brown hover:bg-theme-beige px-6 py-3 rounded-xl"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/auth?tab=signup">
              <Button 
                size="lg"
                className="bg-theme-brown hover:bg-theme-brown-dark text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorListings;
