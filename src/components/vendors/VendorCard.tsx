import React from "react";
import { MapPin, Heart, Star, Calendar, Clock, CheckCircle, TrendingUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  // Format the price to show "From $X"
  const formatPrice = (price: string) => {
    if (price.includes('$')) return price;
    const priceNum = parseInt(price.replace(/[^0-9]/g, ''));
    if (vendor.type.toLowerCase() === 'venue' || vendor.type.toLowerCase() === 'catering') {
      return `From $${priceNum}`;
    } else if (vendor.type.toLowerCase() === 'photographer') {
      return `From $${priceNum * 100}`;
    } else {
      return `From $${priceNum * 10}`;
    }
  };

  // Get response time
  const getResponseTime = () => {
    const times = ["1h", "2h", "24h", "48h"];
    return times[Math.floor(Math.random() * times.length)];
  };

  // Get booking urgency
  const getBookingUrgency = () => {
    const urgencies = [
      "Booked 3x this week",
      "Booked 2x this week", 
      "5 inquiries today",
      "Popular this month"
    ];
    return urgencies[Math.floor(Math.random() * urgencies.length)];
  };

  const responseTime = getResponseTime();
  const bookingUrgency = getBookingUrgency();
  const isTopRated = vendor.rating > 4.5;
  const isHighDemand = vendor.availability.includes("High") || Math.random() > 0.7;
  const isVerified = Math.random() > 0.6;

  return (
    <Card className="overflow-hidden bg-white border border-theme-beige rounded-2xl hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1">
      {/* Image section with simplified overlay */}
      <div className="relative h-56 bg-theme-cream overflow-hidden">
        {/* Simplified header line - condensed badges */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
          <div className="flex items-center gap-2 text-sm">
            <Badge className="bg-theme-brown text-white px-2 py-1 rounded-md text-xs font-medium">
              {vendor.type}
            </Badge>
            <div className="flex items-center gap-1 bg-black/80 text-white px-2 py-1 rounded-md backdrop-blur-sm">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{vendor.rating}</span>
            </div>
            {isTopRated && isHighDemand && (
              <div className="flex items-center gap-1 bg-red-500/90 text-white px-2 py-1 rounded-md text-xs font-medium">
                <Award className="h-3 w-3" />
                <TrendingUp className="h-3 w-3" />
              </div>
            )}
          </div>
          
          {/* Favorite button - only on hover */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                  <Heart className="h-4 w-4 text-theme-brown-light hover:text-red-500 transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save to favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Image with hover effect and fallback */}
        <img 
          src={vendor.imageUrl} 
          alt={`${vendor.name} - ${vendor.type}`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800&h=600`;
          }}
        />
      </div>
      
      {/* Simplified content section */}
      <div className="p-4">
        {/* Title and pricing */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-theme-brown group-hover:text-theme-brown-dark transition-colors line-clamp-1 mb-1">
            {vendor.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="text-sm text-theme-brown-light font-medium">
              {formatPrice(vendor.price)}
            </div>
            {/* Verified badge moved to pricing line */}
            {isVerified && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="h-3 w-3" />
                      <span>Verified</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verified by Enosi</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        
        {/* Location - full width on its own line */}
        <div className="flex items-center text-sm text-theme-brown-light mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">{vendor.location}</span>
        </div>
        
        {/* Tags on separate line below location */}
        {vendor.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap mb-3">
            {vendor.tags.slice(0, 2).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="border-theme-beige text-theme-brown-light text-xs px-2 py-0.5 rounded-full bg-theme-cream/30 whitespace-nowrap"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Single key signal - response time OR booking activity */}
        <div className="flex items-center justify-between text-xs mb-4">
          <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <Clock className="h-3 w-3 mr-1" />
            <span>Responds in {responseTime}</span>
          </div>
          <div className="text-theme-brown-light bg-theme-cream px-2 py-1 rounded-full">
            {bookingUrgency}
          </div>
        </div>
        
        {/* Full-width subtle CTA button */}
        <Link to={`/vendors/${vendor.id}`} className="block">
          <Button className="w-full bg-theme-cream text-theme-brown border border-theme-beige hover:bg-theme-brown hover:text-white text-sm py-2.5 rounded-xl transition-all duration-300">
            Check Availability
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default VendorCard;
