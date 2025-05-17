
import React from "react";
import { MapPin, Heart, Star, Calendar, Info } from "lucide-react";
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
    <Card className="overflow-hidden bg-white border border-wednest-beige rounded-lg hover:shadow-md transition-shadow duration-300">
      {/* Image and badges */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <div className="absolute top-2 left-2 bg-wednest-sage text-white px-2 py-1 rounded-md text-xs font-medium z-10">
          {vendor.type}
        </div>
        <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white z-10">
          <Heart className="h-5 w-5 text-gray-500 hover:text-wednest-sage" />
        </button>
        <div className="absolute bottom-2 right-2 bg-wednest-gold/90 text-white px-2 py-1 rounded-full flex items-center text-xs z-10">
          <Star className="h-4 w-4 mr-1 fill-white text-white" />
          <span>{vendor.rating}</span>
        </div>
        {vendor.rating > 4.2 && (
          <div className="absolute bottom-2 left-2 bg-white/90 text-wednest-brown px-2 py-1 rounded-md text-xs font-medium z-10">
            Highly Rated
          </div>
        )}
        <img 
          src={vendor.imageUrl} 
          alt={`${vendor.name} - ${vendor.type}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-serif font-normal text-wednest-brown">
            {vendor.name}
          </h3>
          <div className="font-medium text-wednest-sage">
            From {vendor.price}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-wednest-brown-light mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{vendor.location}</span>
        </div>
        
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex items-center text-xs text-wednest-brown-light">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            <span>Availability: <span className="font-medium">{vendor.availability}</span></span>
          </div>
          
          <div className="flex items-center text-xs text-wednest-brown-light">
            <Info className="h-3.5 w-3.5 mr-1.5" />
            <span className="line-clamp-1">{vendor.description}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {vendor.tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="rounded-md bg-wednest-cream text-wednest-brown-light hover:bg-wednest-beige text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <Link to={`/vendors/${vendor.id}`}>
          <Button 
            className="w-full bg-wednest-sage text-white hover:bg-wednest-sage/90"
          >
            Check Availability
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default VendorCard;
