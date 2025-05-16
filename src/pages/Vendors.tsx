
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VendorSearch from "@/components/VendorSearch";
import VendorCards from "@/components/VendorCards";
import VendorHeader from "@/components/vendors/VendorHeader";
import VendorFilters from "@/components/vendors/VendorFilters";
import VendorMapView from "@/components/vendors/VendorMapView";
import VendorListingHeader from "@/components/vendors/VendorListingHeader";

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
    setStyleFilter(styles || []);
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
        <VendorHeader
          selectedCategory={selectedCategory}
          selectedLocation={selectedLocation}
        />
        
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
          <VendorFilters
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            priceFilter={priceFilter}
            styleFilter={styleFilter || []}
            availabilityFilter={availabilityFilter}
            ratingFilter={ratingFilter}
            onClearSearch={() => setSearchQuery("")}
            onClearCategory={() => setSelectedCategory("")}
            onClearLocation={() => setSelectedLocation("")}
            onClearPrice={() => setPriceFilter("")}
            onClearStyle={(style) => setStyleFilter((styleFilter || []).filter(s => s !== style))}
            onClearAvailability={() => setAvailabilityFilter("")}
            onClearRating={() => setRatingFilter(0)}
            onClearAll={clearAllFilters}
          />
          
          {/* Vendor Listing */}
          <div className="mt-8">
            <VendorListingHeader 
              selectedCategory={selectedCategory}
              selectedLocation={selectedLocation}
            />
            
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
              <VendorMapView />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Vendors;
