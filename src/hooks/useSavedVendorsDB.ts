
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/lib/logger';

export interface SavedVendor {
  id: string;
  vendor_id: string;
  user_id: string;
  created_at: string;
  vendor_data?: any;
  vendor_profiles?: {
    business_name: string;
    business_category: string;
    city: string;
    state: string;
    logo_url?: string;
    bio?: string;
    base_price_range?: string;
  };
}

// Circuit breaker to prevent infinite retries
class CircuitBreaker {
  private failures = 0;
  private readonly threshold = 3;
  private readonly timeout = 30000; // 30 seconds
  private nextAttempt = 0;

  canAttempt(): boolean {
    return this.failures < this.threshold || Date.now() > this.nextAttempt;
  }

  onSuccess(): void {
    this.failures = 0;
    this.nextAttempt = 0;
  }

  onFailure(): void {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}

export const useSavedVendorsDB = () => {
  const { user } = useAuth();
  const [savedVendors, setSavedVendors] = useState<SavedVendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const circuitBreaker = useRef(new CircuitBreaker());
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const fetchSavedVendors = useCallback(async () => {
    if (!user || !circuitBreaker.current.canAttempt()) {
      logger.info('Skipping fetch: no user or circuit breaker open');
      return;
    }

    if (!mounted.current) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('saved_vendors')
        .select(`
          *,
          vendor_profiles!saved_vendors_vendor_id_fkey (
            business_name,
            business_category,
            city,
            state,
            logo_url,
            bio,
            base_price_range
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!mounted.current) return;

      if (fetchError) {
        throw fetchError;
      }

      setSavedVendors(data || []);
      circuitBreaker.current.onSuccess();
      
    } catch (error) {
      if (!mounted.current) return;
      
      circuitBreaker.current.onFailure();
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch saved vendors';
      logger.error('Error fetching saved vendors', { error: errorMessage });
      setError(errorMessage);
      
      // Graceful degradation - don't throw, just log and continue
      setSavedVendors([]);
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, [user]);

  const saveVendor = useCallback(async (vendorData: any) => {
    if (!user || !circuitBreaker.current.canAttempt()) return false;

    try {
      const { error: saveError } = await supabase
        .from('saved_vendors')
        .insert({
          user_id: user.id,
          vendor_id: vendorData.id.toString(),
          vendor_data: vendorData
        });

      if (saveError) throw saveError;

      circuitBreaker.current.onSuccess();
      await fetchSavedVendors();
      return true;
      
    } catch (error) {
      circuitBreaker.current.onFailure();
      logger.error('Error saving vendor', { error });
      return false;
    }
  }, [user, fetchSavedVendors]);

  const removeSavedVendor = useCallback(async (vendorId: string) => {
    if (!user || !circuitBreaker.current.canAttempt()) return false;

    try {
      const { error: deleteError } = await supabase
        .from('saved_vendors')
        .delete()
        .eq('user_id', user.id)
        .eq('vendor_id', vendorId);

      if (deleteError) throw deleteError;

      circuitBreaker.current.onSuccess();
      await fetchSavedVendors();
      return true;
      
    } catch (error) {
      circuitBreaker.current.onFailure();
      logger.error('Error removing saved vendor', { error });
      return false;
    }
  }, [user, fetchSavedVendors]);

  const isVendorSaved = useCallback((vendorId: string) => {
    return savedVendors.some(saved => saved.vendor_id === vendorId);
  }, [savedVendors]);

  const toggleSavedVendor = useCallback(async (vendorId: string) => {
    if (!user) return false;

    const isCurrentlySaved = isVendorSaved(vendorId);
    
    if (isCurrentlySaved) {
      return await removeSavedVendor(vendorId);
    } else {
      // For toggling, we need minimal vendor data
      const vendorData = { id: vendorId };
      return await saveVendor(vendorData);
    }
  }, [user, isVendorSaved, removeSavedVendor, saveVendor]);

  // Only fetch when user is available and circuit breaker allows it
  useEffect(() => {
    if (user && circuitBreaker.current.canAttempt()) {
      fetchSavedVendors();
    }
  }, [user, fetchSavedVendors]);

  return {
    savedVendors,
    loading,
    error,
    saveVendor,
    removeSavedVendor,
    isVendorSaved,
    toggleSavedVendor,
    refetch: fetchSavedVendors
  };
};
