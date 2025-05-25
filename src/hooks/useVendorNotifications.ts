
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVendorNotifications = () => {
  useEffect(() => {
    // Listen for vendor submission notifications
    const handleVendorSubmission = async (payload: any) => {
      try {
        const vendorData = JSON.parse(payload.payload);
        
        // Call the edge function to notify admin
        const { error } = await supabase.functions.invoke('notify-admin-vendor', {
          body: vendorData
        });
        
        if (error) {
          console.error('Error sending admin notification:', error);
        } else {
          console.log('Admin notification sent successfully');
        }
      } catch (error) {
        console.error('Error handling vendor submission notification:', error);
      }
    };

    // Subscribe to the PostgreSQL notification
    const subscription = supabase
      .channel('vendor-notifications')
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'vendor_profiles',
          filter: 'onboarding_completed=eq.true'
        }, 
        (payload) => {
          // Only trigger for new completions
          if (payload.old?.onboarding_completed === false && payload.new?.onboarding_completed === true) {
            handleVendorSubmission({
              payload: JSON.stringify({
                vendor_id: payload.new.user_id,
                business_name: payload.new.business_name,
                business_email: payload.new.business_email,
                business_category: payload.new.business_category
              })
            });
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);
};
