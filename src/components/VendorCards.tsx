
import React from "react";
import { MapPin, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock business data
const mockBusinesses = [
  {
    id: 1,
    type: "DJ",
    name: "Rhythm Masters Entertainment",
    location: "Chicago, IL",
    availability: "Medium",
    price: "$$$",
    description: "High-energy DJs who specialize in reading the crowd and creating the perfect dance floor atmosphere.",
    rating: 4.9,
    tags: ["High Energy", "Dance Floor Experts"]
  },
  {
    id: 2,
    type: "Venue",
    name: "Elegant Gardens Estate",
    location: "Napa Valley, CA",
    availability: "Medium",
    price: "$$$$",
    description: "A beautiful garden estate with indoor and outdoor ceremony options.",
    rating: 4.8,
    tags: ["Garden", "Outdoor", "Indoor"]
  },
  {
    id: 3,
    type: "Photographer",
    name: "Captured Moments Studio",
    location: "Melbourne, Australia",
    availability: "High",
    price: "$$",
    description: "Award-winning photography team specializing in candid, natural wedding photos.",
    rating: 4.7,
    tags: ["Candid", "Natural", "Documentary"]
  },
  {
    id: 4,
    type: "Florist",
    name: "Bloom & Willow Designs",
    location: "Sydney, Australia",
    availability: "Low",
    price: "$$$",
    description: "Bespoke floral arrangements using locally sourced, seasonal blooms.",
    rating: 4.9,
    tags: ["Sustainable", "Local", "Custom"]
  }
];

const VendorCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockBusinesses.map((business) => (
        <Card key={business.id} className="overflow-hidden bg-white border border-wednest-beige rounded-lg">
          {/* Image placeholder */}
          <div className="relative h-48 bg-muted flex items-center justify-center">
            <div className="absolute top-2 left-2 bg-gray-700 text-white px-2 py-1 rounded-md text-xs font-medium">
              {business.type}
            </div>
            <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white">
              <Heart className="h-5 w-5 text-gray-500 hover:text-wednest-sage" />
            </button>
            <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full flex items-center text-xs">
              <Star className="h-4 w-4 text-wednest-gold mr-1 fill-wednest-gold" />
              <span>{business.rating}</span>
            </div>
            <span className="text-gray-400">Image placeholder</span>
          </div>
          
          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-serif font-normal text-wednest-brown mb-1">
              {business.name}
            </h3>
            <div className="flex items-center text-sm text-wednest-brown-light mb-3">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{business.location}</span>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-wednest-brown-light">
                Availability: <span className="font-medium">{business.availability}</span>
              </div>
              <div className="font-medium text-wednest-brown">
                {business.price}
              </div>
            </div>
            
            <p className="text-sm text-wednest-brown-light mb-3">
              {business.description}
            </p>
            
            <div className="flex flex-wrap gap-1.5 mb-4">
              {business.tags.map((tag, index) => (
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
      ))}
    </div>
  );
};

export default VendorCards;
