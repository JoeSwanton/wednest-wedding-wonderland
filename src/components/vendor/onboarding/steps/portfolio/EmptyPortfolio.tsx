
import React from "react";
import { ImageIcon } from "lucide-react";

interface EmptyPortfolioProps {
  onUploadClick?: () => void;
}

const EmptyPortfolio: React.FC<EmptyPortfolioProps> = ({ onUploadClick }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center py-8 border border-dashed rounded-md border-wednest-beige/60 bg-wednest-beige/5 cursor-pointer hover:bg-wednest-beige/10 transition-colors"
      onClick={onUploadClick}
    >
      <ImageIcon className="w-12 h-12 text-wednest-beige mb-2" />
      <p className="text-wednest-brown">No portfolio images uploaded yet</p>
      <p className="text-xs text-wednest-brown-light">
        Upload at least one image to showcase your work
      </p>
      <button className="mt-4 text-sm text-wednest-sage hover:text-wednest-sage-dark">
        Click to upload
      </button>
    </div>
  );
};

export default EmptyPortfolio;
