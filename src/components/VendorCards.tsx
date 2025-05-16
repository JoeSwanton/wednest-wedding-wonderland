
import React from "react";
import VendorCard from "@/components/vendors/VendorCard";
import VendorPagination from "@/components/vendors/VendorPagination";
import { useVendorFiltering } from "@/hooks/useVendorFiltering";
import { mockBusinesses } from "@/data/mockVendors";

interface VendorCardsProps {
  searchQuery?: string;
  selectedCategory?: string;
  selectedLocation?: string;
  priceFilter?: string;
  styleFilter?: string[];
  availabilityFilter?: string;
  ratingFilter?: number;
}

const VendorCards = ({ 
  searchQuery = "", 
  selectedCategory = "", 
  selectedLocation = "",
  priceFilter = "",
  styleFilter = [],
  availabilityFilter = "",
  ratingFilter = 0
}: VendorCardsProps) => {
  const {
    filteredVendors,
    paginatedVendors,
    currentPage,
    totalPages,
    startIndex,
    itemsPerPage,
    handlePageChange
  } = useVendorFiltering({
    vendors: mockBusinesses || [],
    searchQuery,
    selectedCategory,
    selectedLocation,
    priceFilter,
    styleFilter: styleFilter || [],
    availabilityFilter,
    ratingFilter
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(paginatedVendors && paginatedVendors.length > 0) ? (
          paginatedVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))
        ) : (
          <div className="col-span-full py-8 text-center">
            <p className="text-wednest-brown-light text-lg">No vendors found matching your criteria. Please try adjusting your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {filteredVendors && filteredVendors.length > itemsPerPage && (
        <div className="mt-8">
          <VendorPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Results count */}
      <div className="mt-4 text-sm text-center text-wednest-brown-light">
        Showing {filteredVendors && filteredVendors.length > 0 ? startIndex + 1 : 0} - {filteredVendors ? Math.min(startIndex + itemsPerPage, filteredVendors.length) : 0} of {filteredVendors ? filteredVendors.length : 0} vendors
      </div>
    </div>
  );
};

export default VendorCards;
