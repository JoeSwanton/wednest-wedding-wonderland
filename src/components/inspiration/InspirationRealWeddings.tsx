
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Mock data for real weddings
const realWeddings = [
  {
    id: 1,
    title: "Sarah & Michael's Garden Celebration",
    location: "Byron Bay Estates",
    description: "An elegant outdoor ceremony with natural greenery and vintage elements",
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    vendors: [
      { name: "Flora Designs", type: "Florist", id: "101" },
      { name: "Byron Bay Estates", type: "Venue", id: "102" },
      { name: "Perfect Moments", type: "Photographer", id: "103" }
    ],
    style: "Garden",
    budget: "25-35K"
  },
  {
    id: 2,
    title: "Emma & James' Beach Wedding",
    location: "Gold Coast",
    description: "A breathtaking sunset ceremony on the shores with coastal-inspired decor",
    imageUrl: "https://images.unsplash.com/photo-1522673607200-8e03134a127b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    vendors: [
      { name: "Coastal Events", type: "Planner", id: "104" },
      { name: "Sands Resort", type: "Venue", id: "105" },
      { name: "Capture Magic", type: "Photographer", id: "106" }
    ],
    style: "Coastal",
    budget: "20-30K"
  },
  {
    id: 3,
    title: "Jessica & David's Urban Celebration",
    location: "Melbourne",
    description: "A modern, chic wedding in a converted warehouse with industrial touches",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    vendors: [
      { name: "Urban Spaces", type: "Venue", id: "107" },
      { name: "Metro Catering", type: "Catering", id: "108" },
      { name: "City Lights Photo", type: "Photographer", id: "109" }
    ],
    style: "Modern",
    budget: "30-40K"
  }
];

const InspirationRealWeddings = () => {
  return (
    <div className="my-10">
      <h2 className="text-2xl md:text-3xl font-serif text-theme-brown mb-6">Real Weddings from Enosi Couples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {realWeddings.map((wedding) => (
          <Card key={wedding.id} className="overflow-hidden border-theme-beige hover:shadow-md transition-shadow">
            <AspectRatio ratio={16/9}>
              <img 
                src={wedding.imageUrl} 
                alt={wedding.title} 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-serif text-xl text-theme-brown">{wedding.title}</h3>
                <Badge className="bg-theme-cream text-theme-brown-dark">{wedding.style}</Badge>
              </div>
              
              <p className="text-sm text-theme-brown-light mb-3">{wedding.location}</p>
              <p className="text-sm text-slate-600 mb-4">{wedding.description}</p>
              
              <div className="mb-4">
                <p className="text-xs text-theme-brown-light mb-2">Featured Vendors:</p>
                <div className="flex flex-wrap gap-2">
                  {wedding.vendors.map((vendor, idx) => (
                    <Link to={`/vendors/${vendor.id}`} key={idx}>
                      <Badge variant="outline" className="text-xs border-theme-beige hover:bg-theme-cream">
                        {vendor.name} • {vendor.type}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-brown-light">Budget: {wedding.budget}</span>
                <Button size="sm" variant="default" className="bg-theme-brown hover:bg-theme-brown-dark text-white">
                  View Full Gallery
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="border-theme-brown text-theme-brown hover:bg-theme-cream">
          Explore More Real Weddings
        </Button>
      </div>
    </div>
  );
};

export default InspirationRealWeddings;
