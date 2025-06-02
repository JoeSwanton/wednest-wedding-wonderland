
import { Star, Heart, MapPin, MessageCircle, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

interface Vendor {
  id: number;
  name: string;
  type: string;
  rating: number;
  reviewCount: number;
  review: string;
  price: string;
  image: string;
  location: string;
  badge: string;
  socialProof: string;
  urgency: string;
  responseTime: string;
}

interface FeaturedVendorCardProps {
  vendor: Vendor;
  isCouple: boolean;
  isVendorSaved: (id: number) => boolean;
  onSaveVendor: (e: React.MouseEvent, vendor: Vendor) => void;
  onVendorClick: (vendor: Vendor) => void;
}

const FeaturedVendorCard = ({ 
  vendor, 
  isCouple, 
  isVendorSaved, 
  onSaveVendor, 
  onVendorClick 
}: FeaturedVendorCardProps) => {
  return (
    <ErrorBoundary>
      <Card className="overflow-hidden bg-white border border-theme-beige rounded-2xl hover:shadow-xl transition-all duration-300 group hover:scale-105 hover:-translate-y-2 transform">
        <div className="relative h-48">
          <img 
            src={vendor.image} 
            alt={vendor.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
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
                onClick={(e) => onSaveVendor(e, vendor)}
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
            <Link to={`/vendors/${vendor.id}`} onClick={() => onVendorClick(vendor)}>
              <Button className="bg-theme-brown hover:bg-theme-brown-dark text-white text-sm px-4 py-2 rounded-xl hover:scale-105 hover:shadow-lg transition-all">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </ErrorBoundary>
  );
};

export default FeaturedVendorCard;
