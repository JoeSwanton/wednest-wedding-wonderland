
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useSavedVendors } from "@/hooks/useSavedVendors";

interface VendorCardActionsProps {
  vendorId: number;
  onSaveVendor: (e: React.MouseEvent) => void;
}

const VendorCardActions = ({ vendorId, onSaveVendor }: VendorCardActionsProps) => {
  const { isVendorSaved } = useSavedVendors();
  const [showTooltip, setShowTooltip] = useState(false);
  const isSaved = isVendorSaved(vendorId);

  return (
    <div className="relative">
      <button 
        onClick={onSaveVendor}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all"
      >
        <Heart className={`h-4 w-4 transition-colors ${
          isSaved 
            ? 'text-red-500 fill-red-500' 
            : 'text-theme-brown-light hover:text-red-500'
        }`} />
      </button>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded backdrop-blur-sm z-50 whitespace-nowrap">
          {isSaved ? 'Remove from saved' : 'Save vendor'}
          <div className="absolute -top-1 right-3 w-2 h-2 bg-black/80 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default VendorCardActions;
