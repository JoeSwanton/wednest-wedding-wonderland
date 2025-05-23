
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
  // Category color mapping
  const getCategoryColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      'venue': 'border-l-emerald-500 bg-emerald-50',
      'photographer': 'border-l-purple-500 bg-purple-50',
      'catering': 'border-l-orange-500 bg-orange-50',
      'florist': 'border-l-pink-500 bg-pink-50',
      'entertainment': 'border-l-blue-500 bg-blue-50',
      'planner': 'border-l-indigo-500 bg-indigo-50',
      'makeup': 'border-l-rose-500 bg-rose-50',
      'transport': 'border-l-gray-500 bg-gray-50'
    };
    return colorMap[type.toLowerCase()] || 'border-l-theme-brown bg-theme-cream';
  };

  const getCategoryIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      'venue': '🏛️',
      'photographer': '📸',
      'catering': '🍽️',
      'florist': '💐',
      'entertainment': '🎧',
      'planner': '📋',
      'makeup': '💄',
      'transport': '🚗'
    };
    return iconMap[type.toLowerCase()] || '🎯';
  };

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
    <Card className={`overflow-hidden bg-white border-l-4 ${getCategoryColor(vendor.type)} rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] group`}>
      {/* Enhanced Image and badges */}
      <div className="relative h-56 bg-muted overflow-hidden">
        <div className="absolute top-3 left-3 text-white px-3 py-2 rounded-full text-sm font-semibold z-10 bg-theme-brown-dark shadow-lg flex items-center gap-2">
          <span>{getCategoryIcon(vendor.type)}</span>
          {vendor.type}
        </div>
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white z-10 shadow-lg transition-all duration-200 hover:scale-110">
          <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
        </button>
        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-full flex items-center text-sm z-10 shadow-lg">
          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{vendor.rating}</span>
        </div>
        {vendor.rating > 4.5 && (
          <div className="absolute bottom-3 left-3 text-white px-3 py-1 rounded-full text-sm font-semibold z-10 flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg">
            ⭐ Top Rated
          </div>
        )}
        {vendor.availability.includes("Limited") && (
          <div className="absolute top-3 right-16 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10 shadow-lg">
            ⚡ Limited Availability
          </div>
        )}
        <img 
          src={vendor.imageUrl} 
          alt={`${vendor.name} - ${vendor.type}`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      
      {/* Enhanced Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-theme-brown-dark group-hover:text-theme-brown transition-colors font-serif">
            {vendor.name}
          </h3>
        </div>
        
        <div className="flex items-center text-sm text-theme-gray-dark mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="font-medium">{vendor.location}</span>
        </div>
        
        {vendor.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {vendor.tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index} 
                className="inline-block bg-theme-cream text-theme-gray-dark rounded-full px-3 py-1 text-sm font-medium hover:bg-theme-beige transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-3 py-2 rounded-full border border-emerald-200">
            <div className="font-bold text-theme-brown-dark text-base">
              {formatPrice(vendor.price)}
            </div>
          </div>
          
          <Link to={`/vendors/${vendor.id}`}>
            <Button 
              className="bg-theme-brown hover:bg-theme-brown-dark text-white text-sm px-5 py-2 font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Check Availability
            </Button>
          </Link>
        </div>
        
        {vendor.availability.includes("High") && (
          <div className="mt-3 text-sm text-emerald-600 flex items-center font-medium">
            <Calendar className="h-4 w-4 mr-2" />
            High availability for your date
          </div>
        )}
        
        {vendor.availability.includes("contacted") && (
          <div className="mt-3 text-sm text-theme-gray-dark font-medium">
            💬 3 couples messaged in the last 24 hours
          </div>
        )}
      </div>
    </Card>
  );
};

export default VendorCard;
