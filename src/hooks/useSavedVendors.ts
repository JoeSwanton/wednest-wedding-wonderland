
import { useState, useEffect } from 'react';
import { VendorData } from '@/components/vendors/VendorCard';

export const useSavedVendors = () => {
  const [savedVendors, setSavedVendors] = useState<VendorData[]>([]);

  // Load saved vendors from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedVendors');
    if (saved) {
      try {
        setSavedVendors(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved vendors:', error);
        setSavedVendors([]);
      }
    }
  }, []);

  // Save to localStorage whenever savedVendors changes
  useEffect(() => {
    localStorage.setItem('savedVendors', JSON.stringify(savedVendors));
  }, [savedVendors]);

  const toggleSavedVendor = (vendor: VendorData) => {
    setSavedVendors(prev => {
      const isAlreadySaved = prev.some(v => v.id === vendor.id);
      if (isAlreadySaved) {
        return prev.filter(v => v.id !== vendor.id);
      } else {
        return [...prev, vendor];
      }
    });
  };

  const isVendorSaved = (vendorId: number) => {
    return savedVendors.some(v => v.id === vendorId);
  };

  const clearSavedVendors = () => {
    setSavedVendors([]);
  };

  return {
    savedVendors,
    toggleSavedVendor,
    isVendorSaved,
    clearSavedVendors
  };
};
