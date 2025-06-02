
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface RecommendedVendor {
  id: number;
  name: string;
  type: string;
  location: string;
  rating: number;
  priceRange: string;
  image: string;
  matchReason: string;
}

const mockRecommendations: RecommendedVendor[] = [
  {
    id: 1,
    name: "Elegant Moments Photography",
    type: "Photography",
    location: "Sydney, NSW",
    rating: 4.9,
    priceRange: "$2,500 - $4,000",
    image: "/placeholder.svg",
    matchReason: "Perfect for outdoor weddings"
  },
  {
    id: 2,
    name: "Blooming Beautiful",
    type: "Florist",
    location: "Melbourne, VIC",
    rating: 4.8,
    priceRange: "$800 - $1,500",
    image: "/placeholder.svg",
    matchReason: "Specializes in garden themes"
  }
];

const RecommendationsWidget = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-theme-brown">Recommended for You</CardTitle>
          <p className="text-sm text-theme-brown-light mt-1">
            Based on your wedding preferences
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/vendors">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRecommendations.map((vendor) => (
            <div key={vendor.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-theme-brown truncate">{vendor.name}</h4>
                <p className="text-sm text-theme-brown-light">{vendor.type}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{vendor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">{vendor.location}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs mt-1">
                  {vendor.matchReason}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-theme-brown">{vendor.priceRange}</p>
                <Button size="sm" variant="outline" className="mt-2" asChild>
                  <Link to={`/vendors/${vendor.id}`}>View</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsWidget;
