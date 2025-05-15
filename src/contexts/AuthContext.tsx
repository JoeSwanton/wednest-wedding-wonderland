
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";

interface UserProfile {
  full_name?: string;
  user_role: "couple" | "vendor"; 
  is_new_user?: boolean;
  business_name?: string;
  business_category?: string;
  bio?: string;
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

  const nonRedirectPaths = ['/questionnaire', '/auth', '/profile', '/vendor/onboarding'];

  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener");
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state change event:", event);
        
        // Update the session and user state synchronously
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Handle user profile update and redirects asynchronously
        if (currentSession?.user) {
          const currentUser = currentSession.user;
          console.log("User is authenticated:", currentUser.id);
          
          // Extract user metadata
          const { full_name, user_type, business_name, business_category } = currentUser.user_metadata || {};
          console.log("User metadata:", { full_name, user_type, business_name, business_category });
          
          // Update user profile synchronously with available metadata
          // Convert user_type to user_role for consistency with our interface
          setUserProfile({ full_name, user_role: user_type as "couple" | "vendor", business_name, business_category });
          
          // Use setTimeout to avoid recursive auth state changes
          setTimeout(async () => {
            try {
              // Skip any redirects if we're already on the auth page
              if (location.pathname === '/auth') {
                setLoading(false);
                return;
              }
              
              // Handle newly signed in vendors
              if (user_type === 'vendor' && event === 'SIGNED_IN') {
                const { data: vendorProfile, error } = await supabase
                  .from('vendor_profiles')
                  .select('onboarding_completed')
                  .eq('user_id', currentUser.id)
                  .maybeSingle();
                
                if (error) {
                  console.error("Error checking vendor onboarding status:", error);
                }
                
                // Only redirect to onboarding if:
                // 1. This is a vendor
                // 2. We're on the auth page (just signed in)
                // 3. Onboarding is not completed or no vendor profile exists
                if (location.pathname === '/auth' && (!vendorProfile || !vendorProfile.onboarding_completed)) {
                  console.log("Vendor needs onboarding, redirecting");
                  navigate('/vendor/onboarding');
                  setLoading(false);
                  return;
                }
              }
              
              // For couples only: check if they've completed the questionnaire
              if (user_type === 'couple') {
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
                setUserProfile(prev => ({ ...prev, is_new_user: isNewUser }));
                
                // Only redirect new users if they're not already on the questionnaire page
                // and not on the auth page (to prevent loops after initial sign-in)
                if (isNewUser && 
                    !nonRedirectPaths.includes(location.pathname) &&
                    location.pathname !== '/') {
                  console.log("Redirecting new user to questionnaire");
                  navigate('/questionnaire');
                }
              }
              
              // Handle sign-in event specifically - but only if not already on auth page
              if (event === 'SIGNED_IN' && location.pathname === '/auth') {
                console.log("Signed in, redirecting from auth page");
                if (user_type === 'vendor') {
                  navigate('/vendor');
                } else {
                  navigate('/dashboard');
                }
              }
            } catch (error) {
              console.error("Error in auth state change handler:", error);
            } finally {
              setLoading(false);
            }
          }, 0);
        } else {
          console.log("No authenticated user");
          setUserProfile(null);
          setLoading(false);
        }
        
        // Handle sign-out event
        if (event === 'SIGNED_OUT') {
          console.log("User signed out, redirecting to /auth");
          navigate('/auth');
        }
      }
    );

    // Then check for existing session
    console.log("AuthProvider: Checking for existing session");
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Session check result:", currentSession ? "Session found" : "No session");
      
      // Update the session and user state
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        const currentUser = currentSession.user;
        console.log("User found in session:", currentUser.id);
        
        // Extract user metadata
        const { full_name, user_type, business_name, business_category } = currentUser.user_metadata || {};
        console.log("User metadata from session:", { full_name, user_type, business_name, business_category });
        
        // Update profile with basic info first - convert user_type to user_role
        setUserProfile({ full_name, user_role: user_type as "couple" | "vendor", business_name, business_category });
        
        // CRITICAL: Don't perform redirects if on the auth page
        if (location.pathname === '/auth') {
          setLoading(false);
          return; 
        }
        
        // Use setTimeout to avoid recursive auth state changes
        setTimeout(async () => {
          try {
            // Check if vendor has completed onboarding
            if (user_type === 'vendor' && location.pathname !== '/vendor/onboarding') {
              const { data: vendorProfile, error } = await supabase
                .from('vendor_profiles')
                .select('onboarding_completed')
                .eq('user_id', currentUser.id)
                .maybeSingle();
              
              if (error) {
                console.error("Error checking vendor onboarding status:", error);
              }
              
              // Only redirect to onboarding if:
              // 1. Not already on the onboarding page
              // 2. Not on the auth page
              // 3. Onboarding is not completed or no vendor profile exists
              if (location.pathname !== '/auth' && 
                  location.pathname !== '/vendor/onboarding' &&
                  (!vendorProfile || !vendorProfile.onboarding_completed)) {
                console.log("Vendor needs onboarding, redirecting");
                navigate('/vendor/onboarding');
                setLoading(false);
                return;
              }
            }
            
            // For couples only: check if they've completed the questionnaire
            let isNewUser = false;
            
            if (user_type === 'couple') {
              const { data: weddingDetails, error } = await supabase
                .from('wedding_details')
                .select('*')
                .eq('user_id', currentUser.id)
                .maybeSingle();
                
              if (error) {
                console.error("Error fetching wedding details:", error);
              }
                
              // If no wedding details, mark as new user
              isNewUser = weddingDetails === null;
            }
            
            console.log("Is new user (from session check):", isNewUser);
            setUserProfile(prev => ({ ...prev, is_new_user: isNewUser }));
            
            // Only redirect new couple users if not on excepted paths
            if (isNewUser && 
                user_type === 'couple' &&
                !nonRedirectPaths.includes(location.pathname) && 
                location.pathname !== '/') {
              console.log("Redirecting new user to questionnaire from session check");
              navigate('/questionnaire');
            }
          } catch (error) {
            console.error("Error in getSession handler:", error);
          } finally {
            setLoading(false);
          }
        }, 0);
      } else {
        console.log("No user in session");
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => {
      console.log("Unsubscribing from auth state changes");
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

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
