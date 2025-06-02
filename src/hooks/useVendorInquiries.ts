
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface VendorInquiry {
  id: string;
  vendor_id: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  message: string;
  wedding_date?: string;
  guest_count?: string;
  budget_range?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
  updated_at: string;
}

export const useVendorInquiries = () => {
  const [inquiries, setInquiries] = useState<VendorInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user && userProfile?.user_role === 'vendor') {
      fetchInquiries();
    }
  }, [user, userProfile]);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('vendor_inquiries')
        .select('*')
        .eq('vendor_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast({
        title: "Error",
        description: "Failed to load inquiries",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (inquiryId: string, status: VendorInquiry['status']) => {
    try {
      const { error } = await supabase
        .from('vendor_inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', inquiryId);

      if (error) throw error;
      
      setInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === inquiryId ? { ...inquiry, status } : inquiry
        )
      );

      toast({
        title: "Success",
        description: "Inquiry status updated"
      });
    } catch (error) {
      console.error('Error updating inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to update inquiry status",
        variant: "destructive"
      });
    }
  };

  const sendInquiry = async (vendorId: string, inquiryData: {
    message: string;
    wedding_date?: string;
    guest_count?: string;
    budget_range?: string;
  }) => {
    if (!user || !userProfile) {
      toast({
        title: "Authentication required",
        description: "Please sign in to send inquiries",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('vendor_inquiries')
        .insert({
          vendor_id: vendorId,
          customer_id: user.id,
          customer_name: userProfile.display_name || 'Wedding Couple',
          customer_email: user.email || '',
          ...inquiryData
        });

      if (error) throw error;

      toast({
        title: "Inquiry sent!",
        description: "Your message has been sent to the vendor"
      });
      return true;
    } catch (error) {
      console.error('Error sending inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to send inquiry",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    inquiries,
    loading,
    updateInquiryStatus,
    sendInquiry,
    refetch: fetchInquiries
  };
};
