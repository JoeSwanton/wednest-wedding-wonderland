
import React from "react";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VendorCardBadgesProps {
  tags: string[];
  isVerified: boolean;
}

const VendorCardBadges = ({ tags, isVerified }: VendorCardBadgesProps) => {
  return (
    <>
      {/* Verified badge above tags */}
      {isVerified && (
        <div className="mb-3">
          <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-bold w-fit shadow-md">
            <CheckCircle className="h-4 w-4" />
            <span>Verified by Enosi</span>
          </div>
        </div>
      )}
      
      {/* Tags on separate line below location */}
      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {tags.slice(0, 2).map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="border-2 border-theme-brown/30 text-theme-brown text-sm px-3 py-1.5 rounded-lg bg-theme-cream/50 whitespace-nowrap font-medium hover:bg-theme-cream transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </>
  );
};

export default VendorCardBadges;
