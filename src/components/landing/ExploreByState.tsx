
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ExploreByState = () => {
  const states = [
    {
      name: "New South Wales",
      shortName: "NSW",
      vendorCount: "450+",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600&h=400",
      popularAreas: ["Sydney", "Hunter Valley", "Blue Mountains"]
    },
    {
      name: "Victoria", 
      shortName: "VIC",
      vendorCount: "380+",
      image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80&w=600&h=400",
      popularAreas: ["Melbourne", "Yarra Valley", "Mornington Peninsula"]
    },
    {
      name: "Queensland",
      shortName: "QLD", 
      vendorCount: "320+",
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=600&h=400",
      popularAreas: ["Brisbane", "Gold Coast", "Sunshine Coast"]
    },
    {
      name: "Western Australia",
      shortName: "WA",
      vendorCount: "180+", 
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=600&h=400",
      popularAreas: ["Perth", "Margaret River", "Swan Valley"]
    }
  ];

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-theme-cream/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-2">
            Explore Wedding Vendors by State
          </h2>
          <p className="text-theme-brown-light text-lg">
            Discover amazing wedding professionals across Australia
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {states.map((state, index) => (
            <Link 
              key={index}
              to={`/vendors?location=${state.shortName.toLowerCase()}`}
              className="group block"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={state.image} 
                    alt={state.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                    <h3 className="text-lg font-bold mb-1">{state.name}</h3>
                    <div className="flex items-center gap-2 text-white/90">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{state.vendorCount} vendors</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-theme-brown-light mb-3">Popular areas:</p>
                  <div className="flex flex-wrap gap-1">
                    {state.popularAreas.map((area, areaIndex) => (
                      <span 
                        key={areaIndex}
                        className="px-2 py-1 bg-theme-beige/50 text-theme-brown text-xs rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/vendors">
            <Button 
              variant="outline" 
              size="lg"
              className="border-theme-brown text-theme-brown hover:bg-theme-cream px-8 py-3 rounded-xl group"
            >
              View All Locations
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreByState;
