import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import VendorCards from "./VendorCards";
import RecentlyViewedVendors from "./landing/RecentlyViewedVendors";
import { Star, ArrowDown, ArrowUp, Filter, ArrowRight, ArrowLeft, SlidersHorizontal, MapPin, Grid } from "lucide-react";
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
  const [userLocation, setUserLocation] = useState("Sydney");
  
  // Enhanced wedding vendor categories with better visuals and proper photos - removed trending property
  const categories = [
    {
      type: "Venues",
      count: "245",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800&h=600",
      description: "Dream wedding locations"
    },
    {
      type: "Photographers",
      count: "189",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&q=80&w=800&h=600",
      description: "Capture your special moments"
    },
    {
      type: "Caterers",
      count: "156",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800&h=600",
      description: "Delicious wedding cuisine"
    },
    {
      type: "Florists",
      count: "132",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800&h=600",
      description: "Beautiful floral arrangements"
    },
    {
      type: "Entertainment",
      count: "98",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=800&h=600",
      description: "Music & entertainment"
    },
    {
      type: "Planners",
      count: "76",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800&h=600",
      description: "Professional planning services"
    }
  ];

  // Function to get user's location
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        // Try to get user's location from browser geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                // Use reverse geocoding to get city name (this would normally require an API)
                // For now, we'll use a simple mapping based on coordinates
                const { latitude, longitude } = position.coords;
                const detectedCity = getCityFromCoordinates(latitude, longitude);
                setUserLocation(detectedCity);
              } catch (error) {
                console.log("Could not detect city from coordinates, using default");
              }
            },
            (error) => {
              console.log("Location access denied or failed, using default location");
            }
          );
        }
      } catch (error) {
        console.log("Geolocation not supported, using default location");
      }
    };

    getUserLocation();
  }, []);

  // Simple mapping of coordinates to major Australian cities
  const getCityFromCoordinates = (lat: number, lng: number) => {
    const cities = [
      { name: "Sydney", lat: -33.8688, lng: 151.2093, radius: 100 },
      { name: "Melbourne", lat: -37.8136, lng: 144.9631, radius: 100 },
      { name: "Brisbane", lat: -27.4698, lng: 153.0251, radius: 100 },
      { name: "Perth", lat: -31.9505, lng: 115.8605, radius: 100 },
      { name: "Adelaide", lat: -34.9285, lng: 138.6007, radius: 100 },
      { name: "Gold Coast", lat: -28.0167, lng: 153.4000, radius: 50 },
      { name: "Canberra", lat: -35.2809, lng: 149.1300, radius: 50 },
    ];

    for (const city of cities) {
      const distance = Math.sqrt(
        Math.pow(lat - city.lat, 2) + Math.pow(lng - city.lng, 2)
      );
      if (distance <= city.radius / 111) { // Rough conversion to degrees
        return city.name;
      }
    }
    return "Sydney"; // Default fallback
  };

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
            
            {/* Enhanced Browse All CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/vendors">
                <Button 
                  size="lg"
                  className="bg-theme-brown hover:bg-theme-brown-dark text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Grid className="h-5 w-5" />
                  Browse All Categories
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile carousel */}
          <div className="block md:hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {categories.map((category, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Link to={`/vendors?category=${category.type.toLowerCase()}`} className="block group">
                      <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 transform">
                        <div className="relative h-56">
                          <img 
                            src={category.image} 
                            alt={category.type} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          {/* Improved gradient overlay for better text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          {/* Additional overlay for better text contrast */}
                          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                          <h4 className="text-xl font-bold mb-1 text-white drop-shadow-lg">{category.type}</h4>
                          <p className="text-white/95 text-sm mb-2 drop-shadow-md">{category.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-white/90 text-sm font-medium drop-shadow-md">{category.count} vendors</span>
                            <ArrowRight className="h-4 w-4 text-white/90 group-hover:translate-x-1 transition-transform drop-shadow-md" />
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
              className="rounded-full h-14 w-14 mr-6 border-theme-beige hover:bg-theme-cream shadow-lg hover:scale-110 transition-all"
            >
              <ArrowLeft className="h-6 w-6 text-theme-brown" />
            </Button>
            
            <div className="grid grid-cols-3 gap-6 flex-1">
              {currentCategories.map((category, index) => (
                <Link to={`/vendors?category=${category.type.toLowerCase()}`} key={index} className="block group">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 transform">
                    <div className="relative h-64">
                      <img 
                        src={category.image} 
                        alt={category.type} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Improved gradient overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      {/* Additional overlay for better text contrast */}
                      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/90 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                      <h4 className="text-xl font-bold mb-1 text-white drop-shadow-lg">{category.type}</h4>
                      <p className="text-white/95 text-sm mb-2 drop-shadow-md">{category.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-white/90 text-sm font-medium drop-shadow-md">{category.count} vendors</span>
                        <ArrowRight className="h-4 w-4 text-white/90 group-hover:translate-x-1 transition-transform drop-shadow-md" />
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
              className="rounded-full h-14 w-14 ml-6 border-theme-beige hover:bg-theme-cream shadow-lg hover:scale-110 transition-all"
            >
              <ArrowRight className="h-6 w-6 text-theme-brown" />
            </Button>
          </div>

          {/* Mobile Browse All Button */}
          <div className="block md:hidden mt-6 text-center">
            <Link to="/vendors">
              <Button 
                size="lg"
                className="bg-theme-brown hover:bg-theme-brown-dark text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
              >
                <Grid className="h-5 w-5" />
                Browse All Categories
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Enhanced Popular Vendors Section - Now Dynamic */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-2">
                Popular in {userLocation}
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
        
        {/* Updated Recently Viewed Section */}
        <RecentlyViewedVendors />
        
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
