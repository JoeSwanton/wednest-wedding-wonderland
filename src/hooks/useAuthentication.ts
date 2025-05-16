
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

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
      setUserProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  useEffect(() => {
    console.log("Setting up authentication subscription");
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Redirect only on explicit sign-in/out events
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          const userMetadata = currentSession?.user?.user_metadata;
          // Use setTimeout to ensure this runs after state updates
          setTimeout(async () => {
            await handleAuthRedirection(
              currentSession?.user ?? null,
              currentSession?.user ? {
                full_name: userMetadata?.full_name,
                user_role: userMetadata?.user_type,
                business_name: userMetadata?.business_name,
                business_category: userMetadata?.business_category
              } : null,
              event
            );
          }, 0);
        }

        setLoading(false);
      }
    );

    // Initial session load – no redirection
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session loaded:", currentSession ? "logged in" : "not logged in");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    // Add a timeout to make sure we don't get stuck in loading forever
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.log("Loading timeout reached in useAuthentication, forcing loading to false");
        setLoading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(loadingTimeout);
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
