
import { useState, useEffect } from 'react';

interface RecentlyViewedVendor {
  id: number;
  name: string;
  type: string;
  location: string;
  rating: number;
  priceRange: string;
  image: string;
  viewedAt: number;
}

const STORAGE_KEY = 'recentlyViewedVendors';
const MAX_RECENT_VENDORS = 4;

export const useRecentlyViewedVendors = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedVendor[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentlyViewed(parsed);
      }
    } catch (error) {
      console.error('Error loading recently viewed vendors:', error);
    }
  }, []);

  // Save to localStorage whenever recentlyViewed changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error('Error saving recently viewed vendors:', error);
    }
  }, [recentlyViewed]);

  const addRecentlyViewed = (vendor: Omit<RecentlyViewedVendor, 'viewedAt'>) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(v => v.id !== vendor.id);
      
      // Add to beginning with current timestamp
      const updated = [{
        ...vendor,
        viewedAt: Date.now()
      }, ...filtered];

      // Keep only the most recent MAX_RECENT_VENDORS
      return updated.slice(0, MAX_RECENT_VENDORS);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    recentlyViewed,
    addRecentlyViewed,
    clearRecentlyViewed
  };
};
