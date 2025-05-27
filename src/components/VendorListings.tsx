
import { useState, useMemo } from "react";
import { mockVendors } from "@/data/mockVendors";
import VendorFilters from "@/components/vendors/VendorFilters";
import VendorPagination from "@/components/vendors/VendorPagination";
import SimplifiedVendorCard from "@/components/vendors/SimplifiedVendorCard";
import { useVendorFiltering } from "@/hooks/useVendorFiltering";

const VendorListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 12;

  const {
    filteredVendors,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    priceRange,
    setPriceRange,
    rating,
    setRating,
    availability,
    setAvailability,
    sortBy,
    setSortBy
  } = useVendorFiltering(mockVendors);

  // Pagination
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);
  const startIndex = (currentPage - 1) * vendorsPerPage;
  const currentVendors = filteredVendors.slice(startIndex, startIndex + vendorsPerPage);

  // Reset pagination when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedLocation, priceRange, rating, availability, sortBy]);

  return (
    <div className="min-h-screen bg-theme-cream/10">
      {/* Filters */}
      <VendorFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        rating={rating}
        setRating={setRating}
        availability={availability}
        setAvailability={setAvailability}
        sortBy={sortBy}
        setSortBy={setSortBy}
        vendorCount={filteredVendors.length}
      />

      {/* Results */}
      <div className="container mx-auto px-4 pb-16">
        {currentVendors.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-theme-brown mb-2">No vendors found</h3>
            <p className="text-theme-brown-light">Try adjusting your filters to find more vendors.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {currentVendors.map((vendor) => (
                <SimplifiedVendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <VendorPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VendorListings;
