import { useState } from "react";
import { Star, Heart, MapPin, MessageCircle, DollarSign, Filter, Zap, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSavedVendors } from "@/hooks/useSavedVendors";
import { useRecentlyViewedVendors } from "@/hooks/useRecentlyViewedVendors";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

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
          
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-full px-4 py-2 text-sm transition-all flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? "bg-theme-brown text-white shadow-lg transform scale-105"
                      : "border-theme-beige text-theme-brown hover:bg-theme-cream hover:scale-105 hover:shadow-md"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {filter.label}
                </Button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <ErrorBoundary key={vendor.id}>
                <Card className="overflow-hidden bg-white border border-theme-beige rounded-2xl hover:shadow-xl transition-all duration-300 group hover:scale-105 hover:-translate-y-2 transform">
                  <div className="relative h-48">
                    <img 
                      src={vendor.image} 
                      alt={vendor.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback image on error
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-theme-brown text-white px-3 py-1 rounded-lg text-sm shadow-lg">
                        {vendor.type}
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {isCouple && (
                        <button 
                          onClick={(e) => handleSaveVendor(e, vendor)}
                          className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
                        >
                          <Heart className={`h-4 w-4 transition-colors ${
                            isVendorSaved(vendor.id) 
                              ? 'text-red-500 fill-red-500' 
                              : 'text-theme-brown-light hover:text-red-500'
                          }`} />
                        </button>
                      )}
                      {vendor.badge && (
                        <Badge className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs shadow-lg">
                          {vendor.badge}
                        </Badge>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                      {vendor.socialProof}
                    </div>

                    <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg flex items-center text-sm">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      <span>{vendor.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-theme-brown">{vendor.name}</h3>
                      <Badge className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-xs">
                        {vendor.urgency}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-sm text-theme-brown-light mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{vendor.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-green-600 mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{vendor.responseTime}</span>
                    </div>

                    <div className="bg-theme-cream/50 rounded-lg p-3 mb-4">
                      <div className="flex items-center mb-2">
                        <MessageCircle className="h-4 w-4 text-theme-brown-light mr-2" />
                        <span className="text-sm text-theme-brown-light">"{vendor.review}"</span>
                      </div>
                      <div className="text-xs text-theme-brown-light">
                        {vendor.reviewCount} reviews
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-theme-brown">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-semibold text-sm">{vendor.price}</span>
                      </div>
                      <Link to={`/vendors/${vendor.id}`} onClick={() => handleVendorClick(vendor)}>
                        <Button className="bg-theme-brown hover:bg-theme-brown-dark text-white text-sm px-4 py-2 rounded-xl hover:scale-105 hover:shadow-lg transition-all">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </ErrorBoundary>
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
