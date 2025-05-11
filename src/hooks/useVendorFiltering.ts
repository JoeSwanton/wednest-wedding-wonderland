
import { useState, useMemo } from "react";
import { VendorData } from "@/components/vendors/VendorCard";

interface UseVendorFilteringProps {
  vendors: VendorData[];
  searchQuery?: string;
  selectedCategory?: string;
  selectedLocation?: string;
  priceFilter?: string;
  styleFilter?: string[];
  availabilityFilter?: string;
  ratingFilter?: number;
  itemsPerPage?: number;
}

export const useVendorFiltering = ({
  vendors,
  searchQuery = "",
  selectedCategory = "",
  selectedLocation = "",
  priceFilter = "",
  styleFilter = [],
  availabilityFilter = "",
  ratingFilter = 0,
  itemsPerPage = 8
}: UseVendorFilteringProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Filter businesses based on search criteria
  const filteredVendors = useMemo(() => {
    return vendors.filter(vendor => {
      // Text search
      const matchesSearch = searchQuery === "" || 
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category filter
      const matchesCategory = selectedCategory === "" || selectedCategory === "all" || 
        vendor.type.toLowerCase() === selectedCategory.toLowerCase();
      
      // Location filter
      const matchesLocation = selectedLocation === "" || selectedLocation === "Any Location" ||
        vendor.location.includes(selectedLocation);

      // Price filter
      const matchesPrice = priceFilter === "" || vendor.price.length === priceFilter.length;

      // Rating filter
      const matchesRating = ratingFilter === 0 || vendor.rating >= ratingFilter;

      // Availability filter
      const matchesAvailability = availabilityFilter === "" || 
        vendor.availability.toLowerCase() === availabilityFilter.toLowerCase();

      // Style filter (tags)
      const matchesStyle = styleFilter.length === 0 || 
        styleFilter.some(style => vendor.tags.includes(style));

      return matchesSearch && matchesCategory && matchesLocation && 
            matchesPrice && matchesRating && matchesAvailability && 
            (styleFilter.length === 0 || matchesStyle);
    });
  }, [
    vendors,
    searchQuery,
    selectedCategory,
    selectedLocation,
    priceFilter,
    ratingFilter,
    availabilityFilter,
    styleFilter
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVendors = filteredVendors.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    filteredVendors,
    paginatedVendors,
    currentPage,
    totalPages,
    startIndex,
    itemsPerPage,
    handlePageChange
  };
};
