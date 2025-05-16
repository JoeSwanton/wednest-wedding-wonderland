
import React from "react";
import { ImageIcon } from "lucide-react";

const EmptyPortfolio: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 border border-dashed rounded-md border-wednest-beige/60 bg-wednest-beige/5">
      <ImageIcon className="w-12 h-12 text-wednest-beige mb-2" />
      <p className="text-wednest-brown">No portfolio images uploaded yet</p>
      <p className="text-xs text-wednest-brown-light">
        Upload at least one image to showcase your work
      </p>
    </div>
  );
};

export default EmptyPortfolio;
