
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useProfileManagement } from "./useProfileManagement";
import { useAuthRedirection } from "./useAuthRedirection";
import { useNavigate } from "react-router-dom";

export const useAuthentication = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { userProfile, setUserProfile } = useProfileManagement(user);
  const { handleAuthRedirection } = useAuthRedirection();
  const navigate = useNavigate();

  // Handle sign out
  const signOut = async () => {
    try {
      console.log("Signing out user...");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error in signOut function:", error);
        throw error;
      }
      console.log("Sign out successful");
      setUser(null);
      setSession(null);
      setUserProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  // Set up auth state listener and check current session
  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener");
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state change event:", event);
        
        // Update the session and user state synchronously
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Use setTimeout to avoid recursive auth state changes
        setTimeout(async () => {
          try {
            // Only call handleAuthRedirection if we have session info
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
              await handleAuthRedirection(
                currentSession?.user ?? null,
                currentSession?.user ? {
                  full_name: currentSession.user.user_metadata?.full_name,
                  user_role: currentSession.user.user_metadata?.user_type as "couple" | "vendor",
                  business_name: currentSession.user.user_metadata?.business_name,
                  business_category: currentSession.user.user_metadata?.business_category
                } : null,
                event
              );
            }
          } catch (error) {
            console.error("Error in auth state change handler:", error);
          } finally {
            setLoading(false);
          }
        }, 0);
      }
    );

    // Then check for existing session
    console.log("AuthProvider: Checking for existing session");
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Session check result:", currentSession ? "Session found" : "No session");
      
      // Update the session and user state
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      setTimeout(async () => {
        try {
          // Don't trigger redirects on initial page load for the auth page
          const pathname = window.location.pathname;
          if (pathname !== '/auth' && currentSession?.user) {
            await handleAuthRedirection(
              currentSession.user,
              {
                full_name: currentSession.user.user_metadata?.full_name,
                user_role: currentSession.user.user_metadata?.user_type as "couple" | "vendor",
                business_name: currentSession.user.user_metadata?.business_name,
                business_category: currentSession.user.user_metadata?.business_category
              }
            );
          }
        } catch (error) {
          console.error("Error in getSession handler:", error);
        } finally {
          setLoading(false);
        }
      }, 0);
    });

    return () => {
      console.log("Unsubscribing from auth state changes");
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user,
    userProfile,
    loading,
    signOut
  };
};
