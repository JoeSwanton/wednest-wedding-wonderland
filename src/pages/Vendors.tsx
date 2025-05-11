
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VendorSearch from "@/components/VendorSearch";
import VendorCards from "@/components/VendorCards";
import { Badge } from "@/components/ui/badge";
import { X, MapPin } from "lucide-react";

const Vendors = () => {
  // State for search filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [styleFilter, setStyleFilter] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Handle search input change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle location selection
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
  };

  // Handle price filter
  const handlePriceChange = (price: string) => {
    setPriceFilter(price);
  };

  // Handle style filter
  const handleStyleChange = (styles: string[]) => {
    setStyleFilter(styles);
  };

  // Handle availability filter
  const handleAvailabilityChange = (availability: string) => {
    setAvailabilityFilter(availability);
  };

  // Handle rating filter
  const handleRatingChange = (rating: number) => {
    setRatingFilter(rating);
  };

  // Handle view mode change
  const handleViewChange = (view: "grid" | "map") => {
    setViewMode(view);
  };

  // Count active filters
  const activeFiltersCount = [
    searchQuery, 
    selectedCategory !== "" && selectedCategory !== "all", 
    selectedLocation !== "" && selectedLocation !== "Any Location",
    priceFilter !== "",
    styleFilter.length > 0,
    availabilityFilter !== "",
    ratingFilter > 0
  ].filter(Boolean).length;

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedLocation("");
    setPriceFilter("");
    setStyleFilter([]);
    setAvailabilityFilter("");
    setRatingFilter(0);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="bg-wednest-cream py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif text-wednest-brown text-center mb-4">
              Wedding Vendors
            </h1>
            <p className="text-wednest-brown-light text-center max-w-2xl mx-auto mb-0">
              Find the perfect vendors for your special day. Browse through our curated 
              selection of photographers, venues, florists, and more.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Search Component */}
          <VendorSearch 
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onLocationChange={handleLocationChange}
            onPriceChange={handlePriceChange}
            onStyleChange={handleStyleChange}
            onAvailabilityChange={handleAvailabilityChange}
            onRatingChange={handleRatingChange}
            onViewChange={handleViewChange}
          />
          
          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-wednest-brown">Active Filters:</span>
              
              {searchQuery && (
                <Badge variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-wednest-beige">
                  {`Search: "${searchQuery}"`}
                  <button onClick={() => setSearchQuery("")} className="ml-1 p-0.5 hover:bg-wednest-beige rounded">
                    <X className="h-3.5 w-3.5 text-wednest-brown-light" />
                  </button>
                </Badge>
              )}
              
              {selectedCategory && selectedCategory !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-wednest-beige">
                  {`Category: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
                  <button onClick={() => setSelectedCategory("")} className="ml-1 p-0.5 hover:bg-wednest-beige rounded">
                    <X className="h-3.5 w-3.5 text-wednest-brown-light" />
                  </button>
                </Badge>
              )}
              
              {selectedLocation && selectedLocation !== "Any Location" && (
                <Badge variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-wednest-beige">
                  <MapPin className="h-3.5 w-3.5 mr-0.5" />
                  {selectedLocation}
                  <button onClick={() => setSelectedLocation("")} className="ml-1 p-0.5 hover:bg-wednest-beige rounded">
                    <X className="h-3.5 w-3.5 text-wednest-brown-light" />
                  </button>
                </Badge>
              )}
              
              {priceFilter && (
                <Badge variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-wednest-beige">
                  {`Price: ${priceFilter}`}
                  <button onClick={() => setPriceFilter("")} className="ml-1 p-0.5 hover:bg-wednest-beige rounded">
                    <X className="h-3.5 w-3.5 text-wednest-brown-light" />
                  </button>
                </Badge>
              )}
              
              {styleFilter.map(style => (
                <Badge key={style} variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-wednest-beige">
                  {`Style: ${style}`}
                  <button 
                    onClick={() => setStyleFilter(styleFilter.filter(s => s !== style))} 
                    className="ml-1 p-0.5 hover:bg-wednest-beige rounded"
                  >
                    <X className="h-3.5 w-3.5 text-wednest-brown-light" />
                  </button>
                </Badge>
              ))}
              
              {availabilityFilter && (
                <Badge variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-wednest-beige">
                  {`Availability: ${availabilityFilter.charAt(0).toUpperCase() + availabilityFilter.slice(1)}`}
                  <button onClick={() => setAvailabilityFilter("")} className="ml-1 p-0.5 hover:bg-wednest-beige rounded">
                    <X className="h-3.5 w-3.5 text-wednest-brown-light" />
                  </button>
                </Badge>
              )}
              
              {ratingFilter > 0 && (
                <Badge variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-1.5 border-wednest-beige">
                  {`Rating: ${ratingFilter}+ Stars`}
                  <button onClick={() => setRatingFilter(0)} className="ml-1 p-0.5 hover:bg-wednest-beige rounded">
                    <X className="h-3.5 w-3.5 text-wednest-brown-light" />
                  </button>
                </Badge>
              )}
              
              <button 
                className="text-sm text-wednest-sage hover:text-wednest-sage-dark hover:underline"
                onClick={clearAllFilters}
              >
                Clear All
              </button>
            </div>
          )}
          
          {/* Vendor Listing */}
          <div className="mt-8">
            <h2 className="text-2xl font-serif text-wednest-brown mb-6">
              {selectedCategory && selectedCategory !== "all" 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Vendors` 
                : "All Vendors"}
              {selectedLocation && selectedLocation !== "Any Location" 
                ? ` in ${selectedLocation}` 
                : ""}
            </h2>
            
            {/* Map or Grid view */}
            {viewMode === "grid" ? (
              <VendorCards 
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                selectedLocation={selectedLocation}
                priceFilter={priceFilter}
                styleFilter={styleFilter}
                availabilityFilter={availabilityFilter}
                ratingFilter={ratingFilter}
              />
            ) : (
              <div className="bg-gray-100 h-[500px] rounded-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="h-12 w-12 text-wednest-sage mx-auto mb-2" />
                  <h3 className="text-xl font-medium text-wednest-brown mb-2">Map View</h3>
                  <p className="text-wednest-brown-light">
                    Map view is coming soon. This will show vendors based on their geographic location.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Vendors;
