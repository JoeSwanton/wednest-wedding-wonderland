
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

const VendorCard = ({ vendor }: VendorCardProps) => {
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

  return (
    <Card className="overflow-hidden bg-white border border-theme-beige rounded-xl hover:shadow-md transition-all duration-300 group">
      {/* Image and badges */}
      <div className="relative h-48 bg-theme-cream overflow-hidden">
        <div className="absolute top-3 left-3 text-white px-3 py-1 rounded-md text-sm font-medium z-10 bg-theme-brown">
          {vendor.type}
        </div>
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-theme-cream z-10 transition-colors">
          <Heart className="h-4 w-4 text-theme-brown-light hover:text-red-500" />
        </button>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md flex items-center text-sm z-10">
          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
          <span>{vendor.rating}</span>
        </div>
        {vendor.rating > 4.5 && (
          <div className="absolute bottom-3 left-3 text-white px-2 py-1 rounded-md text-sm font-medium z-10 bg-theme-brown">
            Top Rated
          </div>
        )}
        {vendor.availability.includes("Limited") && (
          <div className="absolute top-3 right-14 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium z-10">
            Limited Availability
          </div>
        )}
        <img 
          src={vendor.imageUrl} 
          alt={`${vendor.name} - ${vendor.type}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-theme-brown group-hover:text-theme-brown-dark transition-colors">
            {vendor.name}
          </h3>
        </div>
        
        <div className="flex items-center text-sm text-theme-brown-light mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{vendor.location}</span>
        </div>
        
        {vendor.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {vendor.tags.slice(0, 2).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="border-theme-beige text-theme-brown-light text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <div className="text-xs text-theme-brown-light">Starting from</div>
            <div className="font-bold text-theme-brown">{formatPrice(vendor.price)}</div>
          </div>
          
          <Link to={`/vendors/${vendor.id}`}>
            <Button className="bg-theme-brown hover:bg-theme-brown-dark text-white text-sm px-4 h-9">
              Check Availability
            </Button>
          </Link>
        </div>
        
        {vendor.availability.includes("High") && (
          <div className="mt-3 text-xs text-green-600 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            High availability for your date
          </div>
        )}
        
        {vendor.availability.includes("contacted") && (
          <div className="mt-2 text-xs text-theme-brown-light">
            3 couples messaged in the last 24 hours
          </div>
        )}
      </div>
    </Card>
  );
};

export default VendorCard;
