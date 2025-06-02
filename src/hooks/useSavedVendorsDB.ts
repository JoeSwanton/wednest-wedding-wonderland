
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface SavedVendor {
  id: string;
  vendor_id: string;
  created_at: string;
  vendor_profiles: {
    business_name: string;
    business_category: string;
    city: string;
    state: string;
    bio: string;
    logo_url?: string;
    base_price_range?: string;
  };
}

export const useSavedVendorsDB = () => {
  const [savedVendors, setSavedVendors] = useState<SavedVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchSavedVendors();
    }
  }, [user]);

  const fetchSavedVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_vendors')
        .select(`
          id,
          vendor_id,
          created_at,
          vendor_profiles:vendor_profiles!saved_vendors_vendor_id_fkey (
            business_name,
            business_category,
            city,
            state,
            bio,
            logo_url,
            base_price_range
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedVendors(data || []);
    } catch (error) {
      console.error('Error fetching saved vendors:', error);
      toast({
        title: "Error",
        description: "Failed to load saved vendors",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSavedVendor = async (vendorId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save vendors",
        variant: "destructive"
      });
      return;
    }

    const isAlreadySaved = savedVendors.some(sv => sv.vendor_id === vendorId);

    try {
      if (isAlreadySaved) {
        const { error } = await supabase
          .from('saved_vendors')
          .delete()
          .eq('user_id', user.id)
          .eq('vendor_id', vendorId);

        if (error) throw error;
        
        setSavedVendors(prev => prev.filter(sv => sv.vendor_id !== vendorId));
        toast({
          title: "Vendor removed",
          description: "Vendor removed from your saved list"
        });
      } else {
        const { error } = await supabase
          .from('saved_vendors')
          .insert({
            user_id: user.id,
            vendor_id: vendorId
          });

        if (error) throw error;
        
        await fetchSavedVendors(); // Refresh to get the vendor details
        toast({
          title: "Vendor saved!",
          description: "Vendor added to your saved list"
        });
      }
    } catch (error) {
      console.error('Error toggling saved vendor:', error);
      toast({
        title: "Error",
        description: "Failed to update saved vendors",
        variant: "destructive"
      });
    }
  };

  const isVendorSaved = (vendorId: string) => {
    return savedVendors.some(sv => sv.vendor_id === vendorId);
  };

  return {
    savedVendors,
    loading,
    toggleSavedVendor,
    isVendorSaved,
    refetch: fetchSavedVendors
  };
};
