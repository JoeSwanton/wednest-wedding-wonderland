
import { useState, useMemo, useCallback } from "react";
import { VendorData } from "@/components/vendors/VendorCard";
import { logger } from "@/lib/logger";

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

  // Memoize filter logic to prevent infinite re-renders
  const filteredVendors = useMemo(() => {
    try {
      if (!vendors || !Array.isArray(vendors)) {
        logger.warn('Invalid vendors data provided to useVendorFiltering');
        return [];
      }

      return vendors.filter(vendor => {
        if (!vendor) return false;

        try {
          // Text search
          const matchesSearch = searchQuery === "" || 
            vendor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.tags?.some(tag => tag?.toLowerCase().includes(searchQuery.toLowerCase()));
          
          // Category filter
          const matchesCategory = selectedCategory === "" || selectedCategory === "all" || 
            vendor.type?.toLowerCase() === selectedCategory.toLowerCase();
          
          // Location filter
          const matchesLocation = selectedLocation === "" || selectedLocation === "Any Location" ||
            vendor.location?.includes(selectedLocation);

          // Price filter
          const matchesPrice = priceFilter === "" || vendor.price?.length === priceFilter.length;

          // Rating filter
          const matchesRating = ratingFilter === 0 || vendor.rating >= ratingFilter;

          // Availability filter
          const matchesAvailability = availabilityFilter === "" || 
            vendor.availability?.toLowerCase() === availabilityFilter.toLowerCase();

          // Style filter (tags)
          const matchesStyle = styleFilter.length === 0 || 
            styleFilter.some(style => vendor.tags?.includes(style));

          return matchesSearch && matchesCategory && matchesLocation && 
                matchesPrice && matchesRating && matchesAvailability && 
                (styleFilter.length === 0 || matchesStyle);
        } catch (error) {
          logger.error('Error filtering vendor', { vendor: vendor.id, error });
          return false;
        }
      });
    } catch (error) {
      logger.error('Error in vendor filtering', { error });
      return [];
    }
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
  const totalPages = Math.max(1, Math.ceil((filteredVendors?.length || 0) / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVendors = useMemo(() => {
    if (!filteredVendors) return [];
    return filteredVendors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredVendors, startIndex, itemsPerPage]);

  // Handle page change with bounds checking
  const handlePageChange = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLocation, priceFilter, ratingFilter, availabilityFilter, styleFilter]);

  return {
    filteredVendors: filteredVendors || [],
    paginatedVendors: paginatedVendors || [],
    currentPage,
    totalPages,
    startIndex,
    itemsPerPage,
    handlePageChange
  };
};
