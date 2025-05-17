
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for location inspiration
const locationInspirations = [
  {
    id: 1,
    location: "Byron Bay",
    state: "NSW",
    description: "Coastal bohemian weddings with breathtaking ocean views",
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3",
    count: 48,
    popularStyles: ["Bohemian", "Beach", "Rustic"]
  },
  {
    id: 2,
    location: "Hunter Valley",
    state: "NSW",
    description: "Elegant vineyard ceremonies surrounded by rolling hills",
    imageUrl: "https://images.unsplash.com/photo-1522673607200-8e03134a127b?ixlib=rb-4.0.3",
    count: 36,
    popularStyles: ["Romantic", "Garden", "Classic"]
  },
  {
    id: 3,
    location: "Melbourne",
    state: "VIC",
    description: "Urban sophistication with architectural backdrops and creative spaces",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3",
    count: 57,
    popularStyles: ["Modern", "Industrial", "Minimalist"]
  }
];

const InspirationLocation = () => {
  return (
    <div className="my-12">
      <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-6">Wedding Inspiration by Location</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {locationInspirations.map((location) => (
          <Card key={location.id} className="overflow-hidden border-theme-beige hover:shadow-md transition-shadow">
            <AspectRatio ratio={4/3}>
              <img 
                src={location.imageUrl} 
                alt={location.location} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <div className="flex items-center mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <h3 className="font-serif text-xl">{location.location}, {location.state}</h3>
                </div>
                <p className="text-sm text-white/80">{location.count} weddings</p>
              </div>
            </AspectRatio>
            
            <CardContent className="p-4">
              <p className="text-sm text-slate-600 mb-3">{location.description}</p>
              
              <div className="mb-4">
                <p className="text-xs font-medium text-theme-brown mb-2">Popular Styles:</p>
                <div className="flex flex-wrap gap-2">
                  {location.popularStyles.map((style, idx) => (
                    <Badge 
                      key={idx}
                      variant="secondary" 
                      className="bg-theme-cream text-theme-brown-light"
                    >
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Link to={`/inspiration/location/${location.location.toLowerCase()}`}>
                <Button variant="outline" className="w-full border-theme-brown text-theme-brown hover:bg-theme-cream">
                  Explore {location.location} Weddings
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button variant="default" className="bg-theme-brown hover:bg-theme-brown-dark text-white">
          View All Locations
        </Button>
      </div>
    </div>
  );
};

export default InspirationLocation;
