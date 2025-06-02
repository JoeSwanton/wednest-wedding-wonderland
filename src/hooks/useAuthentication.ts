
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useProfileManagement } from "./useProfileManagement";
import { useAuthRedirection } from "./useAuthRedirection";

export const useAuthentication = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userProfile, setUserProfile } = useProfileManagement(user);
  const { handleAuthRedirection } = useAuthRedirection();

  const signOut = async () => {
    try {
      setError(null);
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      setUser(null);
      setSession(null);
      setUserProfile(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign out';
      setError(errorMessage);
      throw error;
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        try {
          setError(null);
          setSession(currentSession);
          setUser(currentSession?.user ?? null);

          if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
            const userMetadata = currentSession?.user?.user_metadata;
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
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Authentication error occurred';
          setError(errorMessage);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session: currentSession }, error: sessionError }) => {
      if (sessionError) {
        setError(sessionError.message);
      } else {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [handleAuthRedirection]);

  return {
    session,
    user,
    userProfile,
    loading,
    error,
    signOut
  };
};
