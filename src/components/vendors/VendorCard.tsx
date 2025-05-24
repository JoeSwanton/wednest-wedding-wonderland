
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

  // Get response time badge
  const getResponseTime = () => {
    const times = ["Within 1 hour", "Within 2 hours", "Within 24 hours", "Within 48 hours"];
    return times[Math.floor(Math.random() * times.length)];
  };

  // Get booking urgency
  const getBookingUrgency = () => {
    const urgencies = [
      "3 couples messaged today",
      "Booked 2 times this week", 
      "5 inquiries in last 24 hours",
      "Popular choice this month"
    ];
    return urgencies[Math.floor(Math.random() * urgencies.length)];
  };

  const responseTime = getResponseTime();
  const bookingUrgency = getBookingUrgency();
  const isTopRated = vendor.rating > 4.5;
  const isHighDemand = vendor.availability.includes("High") || Math.random() > 0.7;
  const isVerified = Math.random() > 0.6; // 40% are verified

  return (
    <Card className="overflow-hidden bg-white border border-theme-beige rounded-2xl hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1">
      {/* Enhanced image section with overlays */}
      <div className="relative h-56 bg-theme-cream overflow-hidden">
        {/* Vendor type badge */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-theme-brown text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg">
            {vendor.type}
          </Badge>
        </div>
        
        {/* Enhanced badges in top right */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {/* Favorite button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2.5 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all group-hover:scale-110">
                  <Heart className="h-4 w-4 text-theme-brown-light hover:text-red-500 transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save to favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Verified badge */}
          {isVerified && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified by Enosi</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Enhanced bottom badges */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
          {/* Left side badges */}
          <div className="flex flex-col gap-2">
            {isTopRated && (
              <div className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg">
                <Award className="h-4 w-4 mr-1" />
                Top Rated
              </div>
            )}
            {isHighDemand && (
              <div className="flex items-center bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg">
                <TrendingUp className="h-4 w-4 mr-1" />
                In Demand
              </div>
            )}
          </div>
          
          {/* Rating badge */}
          <div className="bg-black/80 text-white px-3 py-1.5 rounded-lg flex items-center text-sm font-medium shadow-lg backdrop-blur-sm">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>{vendor.rating}</span>
          </div>
        </div>

        {/* Image with enhanced hover effect */}
        <img 
          src={vendor.imageUrl} 
          alt={`${vendor.name} - ${vendor.type}`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Enhanced content section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-theme-brown group-hover:text-theme-brown-dark transition-colors line-clamp-1">
            {vendor.name}
          </h3>
        </div>
        
        {/* Location with enhanced styling */}
        <div className="flex items-center text-sm text-theme-brown-light mb-3">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{vendor.location}</span>
        </div>
        
        {/* Enhanced tags */}
        {vendor.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {vendor.tags.slice(0, 2).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="border-theme-beige text-theme-brown-light text-xs px-2 py-1 rounded-full bg-theme-cream/50"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Response time indicator */}
        <div className="flex items-center text-xs text-green-600 mb-3 bg-green-50 px-2 py-1 rounded-full w-fit">
          <Clock className="h-3 w-3 mr-1" />
          <span>Responds {responseTime.toLowerCase()}</span>
        </div>
        
        {/* Enhanced price and CTA section */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-theme-beige">
          <div>
            <div className="text-xs text-theme-brown-light mb-1">Starting from</div>
            <div className="font-bold text-lg text-theme-brown">{formatPrice(vendor.price)}</div>
          </div>
          
          <Link to={`/vendors/${vendor.id}`}>
            <Button className="bg-theme-brown hover:bg-theme-brown-dark text-white text-sm px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              Check Availability
            </Button>
          </Link>
        </div>
        
        {/* Enhanced availability and social proof */}
        <div className="mt-3 space-y-2">
          {vendor.availability.includes("High") && (
            <div className="text-xs text-green-600 flex items-center bg-green-50 px-2 py-1 rounded-lg">
              <Calendar className="h-3 w-3 mr-2" />
              High availability for your date
            </div>
          )}
          
          {/* Booking urgency */}
          <div className="text-xs text-theme-brown-light bg-theme-cream px-2 py-1 rounded-lg">
            {bookingUrgency}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VendorCard;
