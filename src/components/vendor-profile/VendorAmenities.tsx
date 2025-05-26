
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Music, Mic, Speaker, Zap, Camera, Volume2, CheckCircle, Shield, Star } from "lucide-react";

interface VendorAmenitiesProps {
  vendor: any;
}

const VendorAmenities = ({ vendor }: VendorAmenitiesProps) => {
  const amenities = [
    { icon: Music, label: "Professional DJ Equipment", description: "High-end mixing decks and controllers" },
    { icon: Mic, label: "Wireless Microphones", description: "Multiple wireless mic systems" },
    { icon: Speaker, label: "Premium Sound System", description: "Crystal clear audio for any venue size" },
    { icon: Zap, label: "Professional Lighting", description: "Dynamic lighting design and effects" },
    { icon: Camera, label: "Photo Booth Available", description: "Interactive photo booth setup" },
    { icon: Volume2, label: "MC Services", description: "Professional event hosting" },
    { icon: CheckCircle, label: "Backup Equipment", description: "Full backup systems for reliability" },
    { icon: Shield, label: "Fully Insured", description: "Comprehensive public liability coverage" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-serif text-theme-text-primary">About this vendor</h2>
        <p className="text-theme-text-secondary text-base leading-relaxed">
          Premier wedding DJ and entertainment specialists creating unforgettable celebrations across Sydney. With over 8 years of experience, we bring the perfect blend of music, lighting, and atmosphere to make your special day extraordinary.
        </p>
      </div>
      
      {/* Host Info - Airbnb Style */}
      <div className="flex items-center gap-4 p-6 border border-gray-200 rounded-xl">
        <div className="w-14 h-14 bg-gradient-to-br from-theme-brown to-theme-brown-dark rounded-full flex items-center justify-center text-white font-semibold text-lg">
          RM
        </div>
        <div>
          <h3 className="font-medium text-theme-text-primary">Hosted by Rhythm Masters</h3>
          <p className="text-sm text-theme-text-secondary">{vendor.yearsInBusiness} years hosting events • 200+ events completed</p>
          <div className="flex items-center gap-2 mt-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-theme-text-secondary">{vendor.reviewCount} reviews</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-theme-text-secondary">Identity verified</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* What this vendor offers - Grid Style */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif text-theme-text-primary">What this vendor offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <amenity.icon className="h-6 w-6 text-theme-brown mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-serif font-medium text-theme-text-primary">{amenity.label}</h3>
                <p className="text-sm text-theme-text-secondary">{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorAmenities;
