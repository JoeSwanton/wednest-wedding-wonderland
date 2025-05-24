
import React, { useState, useEffect } from 'react';

interface DynamicTextOverlayProps {
  backgroundImage: string;
  children: React.ReactNode;
  className?: string;
}

const DynamicTextOverlay: React.FC<DynamicTextOverlayProps> = ({ 
  backgroundImage, 
  children, 
  className = "" 
}) => {
  const [textColor, setTextColor] = useState('text-white');
  const [overlayOpacity, setOverlayOpacity] = useState('bg-black/40');

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(img, 0, 0, 100, 100);
      
      const imageData = ctx.getImageData(0, 0, 100, 100);
      const data = imageData.data;
      let totalBrightness = 0;
      
      // Calculate average brightness
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Use luminance formula for perceived brightness
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
        totalBrightness += brightness;
      }
      
      const avgBrightness = totalBrightness / (data.length / 4);
      
      // Adjust text color and overlay based on brightness
      if (avgBrightness > 128) {
        // Light background - use dark text with light overlay
        setTextColor('text-gray-900');
        setOverlayOpacity('bg-white/30');
      } else {
        // Dark background - use light text with dark overlay
        setTextColor('text-white');
        setOverlayOpacity('bg-black/40');
      }
    };
    
    img.onerror = () => {
      // Fallback for images that can't be loaded
      setTextColor('text-white');
      setOverlayOpacity('bg-black/50');
    };
    
    img.src = backgroundImage;
  }, [backgroundImage]);

  return (
    <div className={`relative ${className}`}>
      <div className={`absolute inset-0 ${overlayOpacity} z-10`}></div>
      <div className={`relative z-20 ${textColor}`}>
        {children}
      </div>
    </div>
  );
};

export default DynamicTextOverlay;
