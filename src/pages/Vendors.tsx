
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VendorSearch from "@/components/VendorSearch";
import VendorCards from "@/components/VendorCards";
import { useState } from "react";

const Vendors = () => {
  // State for search filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Handle search input change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="bg-wednest-cream py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif text-wednest-brown text-center mb-4">
              Wedding Vendors
            </h1>
            <p className="text-wednest-brown-light text-center max-w-2xl mx-auto mb-8">
              Find the perfect vendors for your special day. Browse through our curated 
              selection of photographers, venues, florists, and more.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {/* Search Component */}
          <VendorSearch />
          
          {/* Vendor Listing */}
          <div className="mt-12">
            <h2 className="text-2xl font-serif text-wednest-brown mb-6">
              Featured Vendors
            </h2>
            <VendorCards />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Vendors;
