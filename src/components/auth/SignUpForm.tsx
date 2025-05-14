
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoupleSignUpInfo from "./CoupleSignUpInfo";
import VendorSignUpInfo from "./VendorSignUpInfo";
import VendorSignUpFields from "./VendorSignUpFields";
import CommonSignUpFields from "./CommonSignUpFields";
import AuthFooter from "./AuthFooter";

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

const SignUpForm = ({ onSwitchToSignIn }: SignUpFormProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("couple");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Vendor specific fields
  const [businessName, setBusinessName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("photography");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      console.log("Starting sign up process");
      console.log("User type selected:", userType);
      
      // Prepare metadata based on user type
      const metadata = {
        full_name: fullName,
        user_type: userType,
        ...(userType === 'vendor' && {
          business_name: businessName,
          business_category: businessCategory
        })
      };
      
      console.log("User metadata:", metadata);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        console.error("Signup error:", error);
        throw error;
      }
      
      console.log("Sign up successful:", data);
      
      if (data.user) {
        toast({
          title: "Registration successful!",
          description: "Please check your email to confirm your account.",
        });
        
        // Let the auth state change listener handle the redirection
        // Setting a small timeout to ensure the toast is visible
        setTimeout(() => {
          // We don't navigate here anymore - this is handled by the auth context
        }, 1500);
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during sign up");
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message || "Error signing in with Google");
      console.error("Google sign in error:", error);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* User type selector */}
      <Tabs 
        defaultValue={userType} 
        className="w-full" 
        onValueChange={setUserType}
      >
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="couple" className="text-center">Couple</TabsTrigger>
          <TabsTrigger value="vendor" className="text-center">Vendor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="couple" className="space-y-4">
          <CoupleSignUpInfo />
        </TabsContent>
        
        <TabsContent value="vendor" className="space-y-4">
          <VendorSignUpInfo />
        </TabsContent>
      </Tabs>
      
      <form onSubmit={handleSignUp} className="space-y-4">
        <CommonSignUpFields 
          fullName={fullName}
          setFullName={setFullName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          userType={userType}
        />

        {userType === "vendor" && (
          <VendorSignUpFields 
            businessName={businessName}
            setBusinessName={setBusinessName}
            businessCategory={businessCategory}
            setBusinessCategory={setBusinessCategory}
          />
        )}
        
        <AuthFooter 
          loading={loading}
          userType={userType}
          onSwitchToSignIn={onSwitchToSignIn}
          handleGoogleSignIn={handleGoogleSignIn}
        />
      </form>
    </div>
  );
};

export default SignUpForm;
