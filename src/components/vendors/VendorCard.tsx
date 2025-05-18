import React from "react";
import { MapPin, Heart, Star, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
export interface VendorData {
  id: number;
  type: string;
  name: string;
  location: string;
  availability: string;
  price: string;
  description: string;
  rating: number;
  tags: string[];
  imageUrl: string;
}
interface VendorCardProps {
  vendor: VendorData;
}
const VendorCard = ({
  vendor
}: VendorCardProps) => {
  // Format the price to show "From $X" or "From $X per event/guest"
  const formatPrice = (price: string) => {
    if (price.includes('$')) return price;
    const priceNum = parseInt(price.replace(/[^0-9]/g, ''));
    if (vendor.type.toLowerCase() === 'venue' || vendor.type.toLowerCase() === 'catering') {
      return `From $${priceNum} per event`;
    } else if (vendor.type.toLowerCase() === 'photographer') {
      return `From $${priceNum * 100} per event`;
    } else {
      return `From $${priceNum * 10} per guest`;
    }
  };
  return <Card className="overflow-hidden bg-white border border-theme-beige rounded-lg hover:shadow-md transition-shadow duration-300">
      {/* Image and badges */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <div className="absolute top-2 left-2 text-white px-2 py-1 rounded text-xs font-medium z-10 bg-[theme-brown-light] bg-theme-brown">
          {vendor.type}
        </div>
        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white hover:bg-gray-100 z-10">
          <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
        </button>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded flex items-center text-xs z-10">
          <Star className="h-3.5 w-3.5 mr-0.5 fill-yellow-400 text-yellow-400" />
          <span>{vendor.rating}</span>
        </div>
        {vendor.rating > 4.5 && <div className="absolute bottom-2 left-2 text-white px-2 py-0.5 rounded-sm text-xs font-medium z-10 flex items-center bg-theme-brown bg-[theme-brown-light]">
            Top Rated
          </div>}
        {vendor.availability.includes("Limited") && <div className="absolute top-2 right-12 bg-red-500 text-white px-2 py-0.5 rounded-sm text-xs font-medium z-10">
            Limited Availability
          </div>}
        <img src={vendor.imageUrl} alt={`${vendor.name} - ${vendor.type}`} className="w-full h-full object-cover" />
      </div>
      
      {/* Content */}
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-base font-medium text-theme-brown-dark">
            {vendor.name}
          </h3>
        </div>
        
        <div className="flex items-center text-xs text-theme-gray-dark mb-1.5">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{vendor.location}</span>
        </div>
        
        {vendor.tags.length > 0 && <div className="flex flex-wrap gap-1 mb-2">
            {vendor.tags.slice(0, 2).map((tag, index) => <span key={index} className="inline-block bg-theme-cream text-theme-gray-dark rounded px-1.5 py-0.5 text-xs">
                {tag}
              </span>)}
          </div>}
        
        <div className="flex justify-between items-center mt-2">
          <div>
            <div className="text-xs text-theme-gray-dark">Price</div>
            <div className="font-bold text-theme-brown-dark">{formatPrice(vendor.price)}</div>
          </div>
          
          <Link to={`/vendors/${vendor.id}`}>
            <Button className="hover:bg-theme-blue-dark text-white text-xs px-3 h-8 bg-[theme-brown-light] bg-theme-brown">
              Check Availability
            </Button>
          </Link>
        </div>
        
        {vendor.availability.includes("High") && <div className="mt-2 text-xs text-green-600 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            High availability for your date
          </div>}
        
        {vendor.availability.includes("contacted") && <div className="mt-2 text-xs text-theme-gray-dark">
            3 couples messaged in the last 24 hours
          </div>}
      </div>
    </Card>;
};
export default VendorCard;