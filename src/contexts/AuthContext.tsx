import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";

interface UserProfile {
  full_name?: string;
  user_type?: "couple" | "vendor";
  is_new_user?: boolean;
  business_name?: string;
  business_category?: string;
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
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const nonRedirectPaths = ['/questionnaire', '/auth', '/profile'];

  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener");
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state change event:", event);
        setSession(currentSession);
        const currentUser = currentSession?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          console.log("User is authenticated:", currentUser.id);
          // Extract user metadata
          const { full_name, user_type, business_name, business_category } = currentUser.user_metadata || {};
          console.log("User metadata:", { full_name, user_type, business_name, business_category });
          
          // Check if user has completed the questionnaire
          if (event === 'SIGNED_IN') {
            try {
              const { data: weddingDetails, error } = await supabase
                .from('wedding_details')
                .select('*')
                .eq('user_id', currentUser.id)
                .maybeSingle();
                
              if (error) {
                console.error("Error fetching wedding details:", error);
              }
                
              // If no wedding details, mark as new user
              const isNewUser = weddingDetails === null;
              console.log("Is new user:", isNewUser);
              setUserProfile({ full_name, user_type, is_new_user: isNewUser, business_name, business_category });
              
              // Only redirect new users if they're not already on the questionnaire page
              // and not on the auth page (to prevent loops after initial sign-in)
              if (isNewUser && 
                  user_type === 'couple' &&
                  !nonRedirectPaths.includes(location.pathname) &&
                  location.pathname !== '/') {
                // Use setTimeout to avoid rendering issues
                console.log("Redirecting new user to questionnaire");
                setTimeout(() => navigate('/questionnaire'), 0);
              } else if (!isNewUser && location.pathname === '/auth') {
                // Only redirect from auth page to dashboard if user is not new
                console.log("Redirecting existing user to dashboard");
                if (user_type === 'vendor') {
                  navigate('/vendor');
                } else {
                  navigate('/dashboard');
                }
              }
            } catch (error) {
              console.error("Error in auth state change handler:", error);
            }
          } else {
            setUserProfile({ full_name, user_type, business_name, business_category });
          }
        } else {
          console.log("No authenticated user");
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
    console.log("AuthProvider: Checking for existing session");
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log("Session check result:", currentSession ? "Session found" : "No session");
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        console.log("User found in session:", currentUser.id);
        // Extract user metadata
        const { full_name, user_type, business_name, business_category } = currentUser.user_metadata || {};
        console.log("User metadata from session:", { full_name, user_type, business_name, business_category });
        
        try {
          // Check if user has completed the questionnaire
          const { data: weddingDetails, error } = await supabase
            .from('wedding_details')
            .select('*')
            .eq('user_id', currentUser.id)
            .maybeSingle();
            
          if (error) {
            console.error("Error fetching wedding details:", error);
          }
            
          // If no wedding details, mark as new user
          const isNewUser = weddingDetails === null;
          console.log("Is new user (from session check):", isNewUser);
          setUserProfile({ full_name, user_type, is_new_user: isNewUser, business_name, business_category });
          
          // Only redirect new users if they're not already on the questionnaire page
          // and not on the auth page (to prevent loops)
          if (isNewUser && 
              !nonRedirectPaths.includes(location.pathname) && 
              location.pathname !== '/') {
            console.log("Redirecting new user to questionnaire from session check");
            setTimeout(() => navigate('/questionnaire'), 0);
          }
        } catch (error) {
          console.error("Error in getSession handler:", error);
        }
      } else {
        console.log("No user in session");
        setUserProfile(null);
      }
      
      setLoading(false);
      setInitialCheckDone(true);
      console.log("Initial auth check complete");
    });

    return () => {
      console.log("Unsubscribing from auth state changes");
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
