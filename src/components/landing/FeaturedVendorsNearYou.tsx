
import { useState } from "react";
import { Star, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSavedVendors } from "@/hooks/useSavedVendors";
import { useRecentlyViewedVendors } from "@/hooks/useRecentlyViewedVendors";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import VendorFilterTabs from "./VendorFilterTabs";
import FeaturedVendorCard from "./FeaturedVendorCard";

const FeaturedVendorsNearYou = () => {
  const [activeFilter, setActiveFilter] = useState("top-rated");
  const { userProfile } = useAuth();
  const { toggleSavedVendor, isVendorSaved } = useSavedVendors();
  const { addRecentlyViewed } = useRecentlyViewedVendors();
  const isCouple = userProfile?.user_role === 'couple';
  
  const filters = [
    { id: "top-rated", label: "Top Rated", icon: Star },
    { id: "recently-added", label: "Recently Added", icon: TrendingUp },
    { id: "fast-responders", label: "Fast Responders", icon: Zap }
  ];
  
  const vendors = [
    {
      id: 1,
      name: "Grand Ballroom Sydney",
      type: "Venue",
      rating: 4.9,
      reviewCount: 87,
      review: "Absolutely stunning venue with incredible service",
      price: "From $150 per person",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800&h=600",
      location: "Sydney CBD",
      badge: "Couple Favourite",
      socialProof: "Booked 6x this week",
      urgency: "Limited Dates Left",
      responseTime: "Responds in 2 hours"
    },
    {
      id: 2,
      name: "Emma Rose Photography",
      type: "Photographer",
      rating: 4.8,
      reviewCount: 124,
      review: "Captured every moment perfectly, couldn't be happier",
      price: "From $2,800 per event",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&q=80&w=800&h=600",
      location: "Sydney",
      badge: "Top Rated",
      socialProof: "Booked 4x this month",
      urgency: "3 spots left this year",
      responseTime: "Responds instantly"
    },
    {
      id: 3,
      name: "Bloom & Botanical",
      type: "Florist",
      rating: 4.7,
      reviewCount: 56,
      review: "The most beautiful arrangements we've ever seen",
      price: "From $180 per arrangement",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800&h=600",
      location: "Inner West",
      badge: "Recently Booked",
      socialProof: "Booked 8x this week",
      urgency: "Available this weekend",
      responseTime: "Responds in 1 hour"
    }
  ];

  const handleSaveVendor = (e: React.MouseEvent, vendor: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCouple) {
      try {
        toggleSavedVendor(vendor);
      } catch (error) {
        // Silently handle save errors to prevent UI issues
      }
    }
  };

  const handleVendorClick = (vendor: any) => {
    try {
      // Track the vendor view
      addRecentlyViewed({
        id: vendor.id,
        name: vendor.name,
        type: vendor.type,
        location: vendor.location,
        rating: vendor.rating,
        priceRange: vendor.price,
        image: vendor.image
      });
    } catch (error) {
      // Silently handle tracking errors
    }
  };

  return (
    <ErrorBoundary>
      <div className="w-full py-16 px-4 md:px-8 bg-theme-cream/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-2">
              Featured Vendors Near You
            </h2>
            <p className="text-theme-brown-light text-lg">
              Popular in Sydney • Highly rated by couples
            </p>
          </div>
          
          <VendorFilterTabs 
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <FeaturedVendorCard
                key={vendor.id}
                vendor={vendor}
                isCouple={isCouple}
                isVendorSaved={isVendorSaved}
                onSaveVendor={handleSaveVendor}
                onVendorClick={handleVendorClick}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/vendors">
              <Button 
                variant="outline" 
                size="lg"
                className="border-theme-brown text-theme-brown hover:bg-theme-cream px-8 py-3 rounded-xl hover:scale-105 hover:shadow-lg transition-all"
              >
                View All Featured Vendors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default FeaturedVendorsNearYou;
