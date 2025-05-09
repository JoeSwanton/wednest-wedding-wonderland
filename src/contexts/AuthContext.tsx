
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
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
            
            // Redirect new users to questionnaire
            if (isNewUser && window.location.pathname !== '/questionnaire') {
              navigate('/questionnaire');
            } else if (!isNewUser && window.location.pathname === '/auth') {
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
        
        // Redirect new users to questionnaire if not already there
        if (isNewUser && window.location.pathname !== '/questionnaire' && window.location.pathname !== '/auth') {
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
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
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
