
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import VendorSearch from "@/components/VendorSearch";
import VendorCTA from "@/components/VendorCTA";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  // Create dummy handlers for VendorSearch props
  const handleSearchChange = () => {};
  const handleCategoryChange = () => {};
  const handleLocationChange = () => {};
  const handlePriceChange = () => {};
  const handleStyleChange = () => {};
  const handleAvailabilityChange = () => {};
  const handleRatingChange = () => {};
  const handleViewChange = () => {};

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
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
      <Testimonials />
      <VendorCTA />
      <Footer />
    </div>
  );
};

export default Index;
