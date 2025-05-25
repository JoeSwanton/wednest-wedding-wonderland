
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/auth.types";

export const useProfileManagement = (user: User | null) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Extract profile data from user metadata
  const extractProfileFromMetadata = (user: User | null) => {
    if (!user) return null;
    
    const { full_name, user_type, business_name, business_category, is_admin } = user.user_metadata || {};
    
    // Handle admin users
    if (is_admin || user_type === 'admin') {
      return { 
        full_name, 
        user_role: 'admin' as "couple" | "vendor" | "admin", 
        is_admin: true
      };
    }
    
    return { 
      full_name, 
      user_role: user_type as "couple" | "vendor", 
      business_name, 
      business_category 
    };
  };

  // Update profile with additional data from Supabase
  const fetchAdditionalProfileData = async (userId: string, userRole: "couple" | "vendor" | "admin") => {
    try {
      // Skip additional data fetch for admin users
      if (userRole === 'admin') {
        return;
      }
      
      if (userRole === 'couple') {
        const { data: weddingDetails, error } = await supabase
          .from('wedding_details')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
          
        if (error) {
          console.error("Error fetching wedding details:", error);
          return;
        }
          
        // If no wedding details, mark as new user
        const isNewUser = weddingDetails === null;
        setUserProfile(prev => prev ? { ...prev, is_new_user: isNewUser } : null);
      }
    } catch (error) {
      console.error("Error fetching additional profile data:", error);
    }
  };

  // Update user profile when user changes
  useEffect(() => {
    if (user) {
      const basicProfile = extractProfileFromMetadata(user);
      setUserProfile(basicProfile);
      
      // Fetch additional profile data asynchronously
      if (basicProfile?.user_role) {
        fetchAdditionalProfileData(user.id, basicProfile.user_role);
      }
    } else {
      setUserProfile(null);
    }
  }, [user]);

  return { userProfile, setUserProfile };
};
