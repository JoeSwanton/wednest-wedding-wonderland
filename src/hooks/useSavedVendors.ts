
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSavedVendorsDB } from './useSavedVendorsDB';
import { logger } from '@/lib/logger';

export const useSavedVendors = () => {
  const { user } = useAuth();
  const [localSavedVendors, setLocalSavedVendors] = useState<Set<string>>(new Set());
  
  // Use the DB hook with error handling
  const { 
    savedVendors: dbSavedVendors, 
    loading: dbLoading, 
    error: dbError,
    saveVendor: dbSaveVendor,
    removeSavedVendor: dbRemoveSavedVendor,
    isVendorSaved: dbIsVendorSaved,
    toggleSavedVendor: dbToggleSavedVendor
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

    const vendorId = vendor.id?.toString() || vendor.vendor_id?.toString();
    if (!vendorId) {
      logger.error('No vendor ID provided');
      return;
    }

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
      const success = await dbToggleSavedVendor(vendorId);

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
  }, [user, localSavedVendors, dbToggleSavedVendor]);

  const isVendorSaved = useCallback((vendorId: string | number) => {
    const id = vendorId.toString();
    // Use local state for immediate feedback, fallback to DB state
    return localSavedVendors.has(id) || (dbError ? false : dbIsVendorSaved(id));
  }, [localSavedVendors, dbIsVendorSaved, dbError]);

  return {
    savedVendors: dbSavedVendors || [],
    loading: dbLoading,
    error: dbError,
    toggleSavedVendor,
    isVendorSaved
  };
};
