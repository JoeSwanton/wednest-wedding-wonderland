
import { Session, User } from "@supabase/supabase-js";

export interface UserProfile {
  full_name?: string;
  user_role: "couple" | "vendor" | "admin"; 
  is_new_user?: boolean;
  business_name?: string;
  business_category?: string;
  bio?: string;
  is_admin?: boolean;
  display_name?: string;
}

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}
