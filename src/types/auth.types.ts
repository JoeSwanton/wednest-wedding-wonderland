
import { Session, User } from "@supabase/supabase-js";

export interface UserProfile {
  full_name?: string;
  user_role: "couple" | "vendor"; 
  is_new_user?: boolean;
  business_name?: string;
  business_category?: string;
  bio?: string;
}

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}
