
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MapPin, Share2, Heart, Shield, Award } from "lucide-react";
import { VendorData } from "@/components/vendors/VendorCard";

interface VendorHeaderProps {
  vendor: VendorData;
  onReviewCountClick: () => void;
}

const VendorHeader = ({ vendor, onReviewCountClick }: VendorHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-theme-brown hover:bg-gray-50 p-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to vendors
        </Button>
      </div>

      {/* Header Section - Airbnb Style */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-3xl font-serif text-theme-text-primary">{vendor.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-black text-black" />
                  <span className="font-medium text-black">{vendor.rating}</span>
                  <button 
                    onClick={onReviewCountClick}
                    className="underline hover:text-theme-brown transition-colors cursor-pointer"
                  >
                    ({vendor.reviewCount} reviews)
                  </button>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="underline">{vendor.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified Vendor
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  <Award className="h-3 w-3 mr-1" />
                  Super Vendor
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-theme-brown hover:bg-gray-50 border border-theme-brown bg-theme-brown text-white hover:bg-theme-brown-dark">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" className="text-theme-brown hover:bg-gray-50 border border-theme-brown bg-theme-brown text-white hover:bg-theme-brown-dark">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorHeader;
