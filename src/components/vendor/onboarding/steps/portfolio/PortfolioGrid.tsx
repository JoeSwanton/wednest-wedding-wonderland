
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, PlusCircle } from "lucide-react";
import { PortfolioImage } from "@/types/vendor";

interface PortfolioGridProps {
  images: PortfolioImage[];
  onRemoveImage: (index: number) => void;
  onAddMoreClick: () => void;
  isUploading: boolean;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  images,
  onRemoveImage,
  onAddMoreClick,
  isUploading
}) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <Label className="block">Portfolio Preview ({images.length}/10)</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddMoreClick}
          disabled={isUploading || images.length >= 10}
          className="text-xs"
        >
          <PlusCircle className="mr-1 h-3 w-3" /> Add More
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group aspect-square overflow-hidden rounded-md border border-wednest-beige">
            <img
              src={image.url}
              alt={`portfolio-${index}`}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
              onError={(e) => {
                console.error(`Image failed to load: ${image.url}`);
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error+Loading+Image';
              }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveImage(index);
                }}
                className="opacity-90"
              >
                <Trash2 size={14} className="mr-1" /> Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioGrid;
