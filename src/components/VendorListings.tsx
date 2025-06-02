
import { useState, useMemo } from "react";
import { mockBusinesses } from "@/data/mockVendors";
import VendorPagination from "@/components/vendors/VendorPagination";
import SimplifiedVendorCard from "@/components/vendors/SimplifiedVendorCard";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Loading } from "@/components/ui/Loading";

// Transform mock data to match SimplifiedVendorCard props
const transformVendorData = (vendors: any[]) => {
  return vendors.map(vendor => ({
    id: vendor.id,
    name: vendor.name,
    type: vendor.type,
    location: vendor.location,
    image: vendor.image || vendor.imageUrl || '/placeholder.svg',
    rating: vendor.rating,
    reviewCount: vendor.reviewCount,
    priceRange: vendor.priceRange || vendor.price || 'Contact for pricing',
    tags: vendor.tags || [],
    verified: vendor.verified || false,
    featured: vendor.featured || false,
    availability: vendor.availability || 'available'
  }));
};

const VendorListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  const vendorsPerPage = 12;

  // Transform and filter vendors with error handling
  const transformedVendors = useMemo(() => {
    if (!mockBusinesses || !Array.isArray(mockBusinesses)) {
      return [];
    }
    return transformVendorData(mockBusinesses);
  }, []);

  const filteredVendors = useMemo(() => {
    if (!transformedVendors.length) return [];
    
    return transformedVendors.filter(vendor => {
      const matchesSearch = searchTerm === "" || 
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "" || selectedCategory === "all" || 
        vendor.type.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesLocation = selectedLocation === "" || selectedLocation === "Any Location" ||
        vendor.location.includes(selectedLocation);

      const matchesRating = rating === 0 || vendor.rating >= rating;

      const matchesAvailability = availability === "" || 
        vendor.availability?.toLowerCase() === availability.toLowerCase();

      return matchesSearch && matchesCategory && matchesLocation && matchesRating && matchesAvailability;
    });
  }, [transformedVendors, searchTerm, selectedCategory, selectedLocation, rating, availability]);

  // Pagination
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);
  const startIndex = (currentPage - 1) * vendorsPerPage;
  const currentVendors = filteredVendors.slice(startIndex, startIndex + vendorsPerPage);

  // Reset pagination when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedLocation, priceRange, rating, availability, sortBy]);

  if (!mockBusinesses) {
    return <Loading text="Loading vendor listings..." />;
  }

  return (
    <div className="min-h-screen bg-theme-cream/10">
      <ErrorBoundary>
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
                  <ErrorBoundary key={vendor.id}>
                    <SimplifiedVendorCard vendor={vendor} />
                  </ErrorBoundary>
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
      </ErrorBoundary>
    </div>
  );
};

export default VendorListings;
