
import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VendorCard from "@/components/vendors/VendorCard";
import { useSavedVendors } from "@/hooks/useSavedVendors";
import { mockBusinesses } from "@/data/mockVendors";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const SavedVendors = () => {
  const { savedVendors, clearAllSaved, savedCount } = useSavedVendors();

  // Get the actual vendor data for saved vendor IDs
  const savedVendorData = useMemo(() => {
    return mockBusinesses.filter(vendor => savedVendors.includes(vendor.id));
  }, [savedVendors]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        {/* Header */}
        <div className="bg-theme-cream py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-theme-brown mb-2 flex items-center gap-3">
                  <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                  Saved Vendors
                </h1>
                <p className="text-theme-brown-light text-lg">
                  {savedCount} vendor{savedCount !== 1 ? 's' : ''} saved to your favorites
                </p>
              </div>
              
              {savedCount > 0 && (
                <Button 
                  onClick={clearAllSaved}
                  variant="outline" 
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {savedVendorData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedVendorData.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-theme-brown-light mx-auto mb-4" />
              <h2 className="text-2xl font-serif text-theme-brown mb-2">No saved vendors yet</h2>
              <p className="text-theme-brown-light mb-6 max-w-md mx-auto">
                Start exploring vendors and click the heart icon to save your favorites for easy access later.
              </p>
              <Link to="/vendors">
                <Button className="bg-theme-brown hover:bg-theme-brown-dark text-white px-6 py-3">
                  Explore Vendors
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SavedVendors;
