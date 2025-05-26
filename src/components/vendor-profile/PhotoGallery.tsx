
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PhotoGalleryProps {
  images: Array<{ url: string; caption: string }>;
}

const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Hero Image Gallery - Airbnb Style */}
      <div className="relative max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-4 gap-2 h-[400px] rounded-xl overflow-hidden">
          <div className="col-span-2 relative">
            <img 
              src={images[0].url} 
              alt="Main venue image"
              className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
          </div>
          <div className="grid grid-rows-2 gap-2">
            <img 
              src={images[1].url} 
              alt="Venue image 2"
              className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
            <img 
              src={images[2].url} 
              alt="Venue image 3"
              className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
          </div>
          <div className="grid grid-rows-2 gap-2">
            <img 
              src={images[3].url} 
              alt="Venue image 4"
              className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
            <div className="relative">
              <img 
                src={images[4].url} 
                alt="Venue image 5"
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer hover:bg-opacity-40 transition-all"
                onClick={() => setShowAllPhotos(true)}
              >
                <Button variant="outline" className="bg-white text-black hover:bg-gray-100">
                  Show all photos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl mx-auto p-4">
            <button 
              onClick={() => setShowAllPhotos(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="relative">
              <img 
                src={images[currentImageIndex].url}
                alt={images[currentImageIndex].caption}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                {images[currentImageIndex].caption} ({currentImageIndex + 1} of {images.length})
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
