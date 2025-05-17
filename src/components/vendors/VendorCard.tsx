
import React from "react";
import { MapPin, Heart, Star, Calendar, Info, Check } from "lucide-react";
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
  return (
    <Card className="overflow-hidden bg-white border rounded-md hover:shadow-lg transition-shadow duration-300">
      {/* Image and badges */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium z-10">
          {vendor.type}
        </div>
        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white hover:bg-gray-100 z-10">
          <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
        </button>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-1.5 py-0.5 rounded flex items-center text-xs z-10">
          <Star className="h-3.5 w-3.5 mr-0.5 fill-yellow-400 text-yellow-400" />
          <span>{vendor.rating}</span>
        </div>
        {vendor.rating > 4.2 && (
          <div className="absolute bottom-2 left-2 bg-green-700 text-white px-2 py-0.5 rounded-sm text-xs font-medium z-10 flex items-center">
            <Check className="h-3 w-3 mr-0.5" /> Top Rated
          </div>
        )}
        <img 
          src={vendor.imageUrl} 
          alt={`${vendor.name} - ${vendor.type}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-base font-medium text-gray-800">
            {vendor.name}
          </h3>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mb-1.5">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{vendor.location}</span>
        </div>
        
        <div className="text-xs mb-1.5">
          <span className="inline-block bg-blue-50 text-blue-700 rounded px-1.5 py-0.5 mb-1.5 mr-1.5">
            {vendor.availability}
          </span>
          {vendor.tags.slice(0, 2).map((tag, index) => (
            <span 
              key={index}
              className="inline-block bg-gray-100 text-gray-600 rounded px-1.5 py-0.5 mb-1.5 mr-1.5"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div>
            <div className="text-xs text-gray-500">Price from</div>
            <div className="font-bold text-gray-900">{vendor.price}</div>
          </div>
          
          <Link to={`/vendors/${vendor.id}`}>
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700 text-xs px-3 h-8"
            >
              Check Availability
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default VendorCard;
