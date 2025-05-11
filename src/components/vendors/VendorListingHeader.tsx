
interface VendorListingHeaderProps {
  selectedCategory: string;
  selectedLocation: string;
}

const VendorListingHeader = ({ 
  selectedCategory, 
  selectedLocation 
}: VendorListingHeaderProps) => {
  return (
    <h2 className="text-2xl font-serif text-wednest-brown mb-6">
      {selectedCategory && selectedCategory !== "all" 
        ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Vendors` 
        : "All Vendors"}
      {selectedLocation && selectedLocation !== "Any Location" 
        ? ` in ${selectedLocation}` 
        : ""}
    </h2>
  );
};

export default VendorListingHeader;
