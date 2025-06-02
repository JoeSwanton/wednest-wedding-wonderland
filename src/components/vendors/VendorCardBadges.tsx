
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
        <div className="mb-2">
          <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium w-fit">
            <CheckCircle className="h-3 w-3" />
            <span>Verified by Enosi</span>
          </div>
        </div>
      )}
      
      {/* Tags on separate line below location */}
      {tags.length > 0 && (
        <div className="flex gap-1 flex-wrap mb-3">
          {tags.slice(0, 2).map((tag, index) => (
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
    </>
  );
};

export default VendorCardBadges;
