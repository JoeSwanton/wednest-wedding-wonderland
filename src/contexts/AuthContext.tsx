
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";

interface UserProfile {
  full_name?: string;
  user_type?: "couple" | "vendor";
  is_new_user?: boolean;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state change event:", event);
        setSession(currentSession);
        const currentUser = currentSession?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          // Extract user metadata
          const { full_name, user_type } = currentUser.user_metadata || {};
          
          // Check if user has completed the questionnaire
          if (event === 'SIGNED_IN') {
            const { data: weddingDetails } = await supabase
              .from('wedding_details')
              .select('*')
              .eq('user_id', currentUser.id)
              .maybeSingle();
              
            // If no wedding details, mark as new user
            const isNewUser = weddingDetails === null;
            setUserProfile({ full_name, user_type, is_new_user: isNewUser });
            
            // Only redirect new users if they're not already on the questionnaire page
            // and not on the auth page (to prevent loops after initial sign-in)
            if (isNewUser && 
                location.pathname !== '/questionnaire' && 
                location.pathname !== '/auth') {
              // Use setTimeout to avoid rendering issues
              setTimeout(() => navigate('/questionnaire'), 0);
            } else if (!isNewUser && location.pathname === '/auth') {
              // Only redirect from auth page to dashboard if user is not new
              navigate('/dashboard');
            }
          } else {
            setUserProfile({ full_name, user_type });
          }
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
        
        if (event === 'SIGNED_OUT') {
          console.log("User signed out, redirecting to /auth");
          navigate('/auth');
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        // Extract user metadata
        const { full_name, user_type } = currentUser.user_metadata || {};
        
        // Check if user has completed the questionnaire
        const { data: weddingDetails } = await supabase
          .from('wedding_details')
          .select('*')
          .eq('user_id', currentUser.id)
          .maybeSingle();
          
        // If no wedding details, mark as new user
        const isNewUser = weddingDetails === null;
        setUserProfile({ full_name, user_type, is_new_user: isNewUser });
        
        // Only redirect new users if they're not already on the questionnaire page
        // and not on the auth page (to prevent loops)
        if (isNewUser && 
            location.pathname !== '/questionnaire' && 
            location.pathname !== '/auth' &&
            location.pathname !== '/') {  // Added check for home page
          setTimeout(() => navigate('/questionnaire'), 0);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]); // Added location.pathname to dependencies

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
      // The navigation is handled by the onAuthStateChange listener
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, userProfile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
