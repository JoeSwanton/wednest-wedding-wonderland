
import { MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

const TrendingDestinations = () => {
  const destinations = [
    {
      name: "Sydney",
      vendorCount: "400+",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&h=600",
      label: "Now Booking 2025"
    },
    {
      name: "Hunter Valley",
      vendorCount: "180+",
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=800&h=600",
      label: "Peak Season"
    },
    {
      name: "Byron Bay",
      vendorCount: "95+",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800&h=600",
      label: "Limited Dates"
    },
    {
      name: "Melbourne",
      vendorCount: "320+",
      image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80&w=800&h=600",
      label: "Now Booking 2025"
    },
    {
      name: "Gold Coast",
      vendorCount: "150+",
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800&h=600",
      label: "Peak Season"
    }
  ];

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-2">
            Trending Wedding Destinations
          </h2>
          <p className="text-theme-brown-light text-lg">
            Popular locations where couples are planning their dream weddings
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {destinations.map((destination, index) => (
            <Link 
              key={index} 
              to={`/vendors?location=${destination.name.toLowerCase()}`}
              className="group block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 transform">
                <div className="relative h-48">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-theme-brown/90 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {destination.label}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/90 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                  <h3 className="text-lg font-bold mb-1 text-white drop-shadow-lg">{destination.name}</h3>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-white/90" />
                    <span className="text-white/90 text-sm font-medium drop-shadow-md">{destination.vendorCount} vendors</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingDestinations;
