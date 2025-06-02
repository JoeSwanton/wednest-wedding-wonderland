
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSavedVendorsDB } from './useSavedVendorsDB';
import { logger } from '@/lib/logger';

export const useSavedVendors = () => {
  const { user } = useAuth();
  const [localSavedVendors, setLocalSavedVendors] = useState<Set<number>>(new Set());
  
  // Use the DB hook with error handling
  const { 
    savedVendors: dbSavedVendors, 
    loading: dbLoading, 
    error: dbError,
    saveVendor: dbSaveVendor,
    removeSavedVendor: dbRemoveSavedVendor,
    isVendorSaved: dbIsVendorSaved
  } = useSavedVendorsDB();

  // Sync local state with DB state
  useEffect(() => {
    if (dbSavedVendors && Array.isArray(dbSavedVendors)) {
      const vendorIds = new Set(dbSavedVendors.map(vendor => vendor.vendor_id));
      setLocalSavedVendors(vendorIds);
    }
  }, [dbSavedVendors]);

  const toggleSavedVendor = useCallback(async (vendor: any) => {
    if (!user) {
      logger.warn('Cannot save vendor: user not authenticated');
      return;
    }

    const vendorId = vendor.id;
    const isCurrentlySaved = localSavedVendors.has(vendorId);

    try {
      // Optimistic update
      const newSavedVendors = new Set(localSavedVendors);
      if (isCurrentlySaved) {
        newSavedVendors.delete(vendorId);
      } else {
        newSavedVendors.add(vendorId);
      }
      setLocalSavedVendors(newSavedVendors);

      // Attempt DB operation
      let success = false;
      if (isCurrentlySaved) {
        success = await dbRemoveSavedVendor(vendorId);
      } else {
        success = await dbSaveVendor(vendor);
      }

      // Revert on failure
      if (!success) {
        setLocalSavedVendors(localSavedVendors);
        logger.error('Failed to toggle saved vendor, reverting local state');
      }
      
    } catch (error) {
      // Revert optimistic update on error
      setLocalSavedVendors(localSavedVendors);
      logger.error('Error toggling saved vendor', { error });
    }
  }, [user, localSavedVendors, dbSaveVendor, dbRemoveSavedVendor]);

  const isVendorSaved = useCallback((vendorId: number) => {
    // Use local state for immediate feedback, fallback to DB state
    return localSavedVendors.has(vendorId) || (dbError ? false : dbIsVendorSaved(vendorId));
  }, [localSavedVendors, dbIsVendorSaved, dbError]);

  return {
    savedVendors: dbSavedVendors || [],
    loading: dbLoading,
    error: dbError,
    toggleSavedVendor,
    isVendorSaved
  };
};
