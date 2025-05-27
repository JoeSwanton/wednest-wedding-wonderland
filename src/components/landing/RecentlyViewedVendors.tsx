
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRecentlyViewedVendors } from "@/hooks/useRecentlyViewedVendors";

const RecentlyViewedVendors = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewedVendors();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl md:text-2xl font-serif text-theme-brown">
          Recently Viewed
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-theme-brown border-theme-beige hover:bg-theme-cream"
          onClick={clearRecentlyViewed}
        >
          Clear History
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {recentlyViewed.map((vendor) => (
          <Link 
            key={vendor.id} 
            to={`/vendors/${vendor.id}`}
            className="rounded-xl overflow-hidden border border-theme-beige hover:shadow-lg transition-all duration-300 group bg-white block"
          >
            <div className="relative h-40">
              <img 
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full flex items-center text-xs">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                {vendor.rating}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-theme-brown group-hover:text-theme-brown-dark transition-colors">
                  {vendor.name}
                </h4>
              </div>
              <div className="text-sm text-theme-brown-light mb-3 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {vendor.type} • {vendor.location}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm font-semibold text-theme-brown">{vendor.price}</div>
                <Button size="sm" className="bg-theme-brown hover:bg-theme-brown-dark text-white text-xs px-3">
                  View Details
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedVendors;
