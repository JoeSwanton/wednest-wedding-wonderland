
import React from "react";
import { MapPin, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <Card className="overflow-hidden bg-white border border-wednest-beige rounded-lg hover:shadow-md transition-shadow duration-300">
      {/* Image and badges */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <div className="absolute top-2 left-2 bg-gray-700 text-white px-2 py-1 rounded-md text-xs font-medium z-10">
          {vendor.type}
        </div>
        <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white z-10">
          <Heart className="h-5 w-5 text-gray-500 hover:text-wednest-sage" />
        </button>
        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full flex items-center text-xs z-10">
          <Star className="h-4 w-4 text-wednest-gold mr-1 fill-wednest-gold" />
          <span>{vendor.rating}</span>
        </div>
        <img 
          src={vendor.imageUrl} 
          alt={`${vendor.name} - ${vendor.type}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-serif font-normal text-wednest-brown mb-1">
          {vendor.name}
        </h3>
        <div className="flex items-center text-sm text-wednest-brown-light mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{vendor.location}</span>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-wednest-brown-light">
            Availability: <span className="font-medium">{vendor.availability}</span>
          </div>
          <div className="font-medium text-wednest-brown">
            {vendor.price}
          </div>
        </div>
        
        <p className="text-sm text-wednest-brown-light mb-3 line-clamp-2">
          {vendor.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {vendor.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="rounded-md bg-wednest-cream text-wednest-brown-light hover:bg-wednest-beige"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-wednest-sage text-wednest-sage hover:bg-wednest-cream"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default VendorCard;
