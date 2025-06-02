
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import InquiryDialog from "@/components/vendor/InquiryDialog";
import { useSavedVendorsDB } from "@/hooks/useSavedVendorsDB";

interface VendorCardProps {
  vendor: {
    id: number;
    name: string;
    type: string;
    location: string;
    image: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    tags: string[];
    verified: boolean;
    featured?: boolean;
  };
}

const SimplifiedVendorCard = ({ vendor }: VendorCardProps) => {
  const { isVendorSaved, toggleSavedVendor } = useSavedVendorsDB();
  const isSaved = isVendorSaved(vendor.id.toString());

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSavedVendor(vendor.id.toString());
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 shadow-sm">
      <div className="relative">
        <div 
          className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundImage: `url(${vendor.image})` }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          
          {/* Save button */}
          <button
            onClick={handleSaveToggle}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
              }`} 
            />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {vendor.verified && (
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                Verified
              </Badge>
            )}
            {vendor.featured && (
              <Badge className="bg-wednest-gold text-white">
                Featured
              </Badge>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div>
            <h3 className="font-serif font-medium text-lg text-theme-brown line-clamp-1">
              {vendor.name}
            </h3>
            <p className="text-sm text-theme-brown-light">{vendor.type}</p>
          </div>

          {/* Rating and location */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{vendor.rating}</span>
              <span className="text-gray-500">({vendor.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="h-3 w-3" />
              <span className="text-xs">{vendor.location}</span>
            </div>
          </div>

          {/* Price range */}
          <div className="text-sm">
            <span className="font-medium text-theme-brown">{vendor.priceRange}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {vendor.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {vendor.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{vendor.tags.length - 2} more
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Link to={`/vendors/${vendor.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </Link>
            <InquiryDialog vendorId={vendor.id.toString()} vendorName={vendor.name}>
              <Button size="sm" className="bg-wednest-sage hover:bg-wednest-sage-dark text-white">
                Contact
              </Button>
            </InquiryDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimplifiedVendorCard;
