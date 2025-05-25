
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useSavedVendors = () => {
  const [savedVendors, setSavedVendors] = useState<number[]>([]);
  const { toast } = useToast();

  // Load saved vendors from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedVendors');
    if (saved) {
      try {
        setSavedVendors(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing saved vendors:', error);
      }
    }
  }, []);

  // Save to localStorage whenever savedVendors changes
  useEffect(() => {
    localStorage.setItem('savedVendors', JSON.stringify(savedVendors));
  }, [savedVendors]);

  const toggleSaveVendor = (vendorId: number) => {
    setSavedVendors(prev => {
      const isCurrentlySaved = prev.includes(vendorId);
      const newSavedVendors = isCurrentlySaved 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId];
      
      // Show toast notification
      toast({
        title: isCurrentlySaved ? "Vendor removed" : "Vendor saved",
        description: isCurrentlySaved 
          ? "Vendor removed from your favorites"
          : "Vendor saved to your favorites",
      });
      
      return newSavedVendors;
    });
  };

  const clearAllSaved = () => {
    setSavedVendors([]);
    toast({
      title: "All vendors removed",
      description: "All saved vendors have been removed from your favorites",
    });
  };

  return {
    savedVendors,
    toggleSaveVendor,
    clearAllSaved,
    savedCount: savedVendors.length
  };
};
