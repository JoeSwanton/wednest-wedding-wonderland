
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Github, UserCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const categories = [
    { value: "photography", label: "Photography" },
    { value: "videography", label: "Videography" },
    { value: "catering", label: "Catering" },
    { value: "venue", label: "Venue" },
    { value: "music", label: "Music & Entertainment" },
    { value: "flowers", label: "Flowers & Décor" },
    { value: "officiant", label: "Celebrant/Officiant" },
    { value: "planner", label: "Wedding Planner" },
    { value: "dress", label: "Bridal Wear" },
    { value: "suit", label: "Suits & Attire" },
    { value: "bakery", label: "Cake & Bakery" },
    { value: "transport", label: "Transportation" },
    { value: "jewelry", label: "Jewelry" },
    { value: "beauty", label: "Hair & Beauty" },
    { value: "other", label: "Other Services" }
  ];

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
        
        // Short delay before navigation to ensure Supabase processes are complete
        setTimeout(() => {
          if (userType === 'vendor') {
            navigate("/vendor");
          } else {
            navigate("/");
          }
        }, 500);
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
          <div className="bg-wednest-beige/20 p-4 rounded-md mb-2">
            <h3 className="text-lg font-medium flex items-center gap-2 text-wednest-brown">
              <UserCheck size={18} />
              <span>Couple Account Benefits</span>
            </h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-wednest-brown-light">
              <li>Create and manage your wedding planning checklist</li>
              <li>Build and share your wedding website</li>
              <li>Track your budget and guest list</li>
              <li>Find and message vendors directly</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="vendor" className="space-y-4">
          <div className="bg-wednest-beige/20 p-4 rounded-md mb-2">
            <h3 className="text-lg font-medium flex items-center gap-2 text-wednest-brown">
              <UserCheck size={18} />
              <span>Vendor Account Benefits</span>
            </h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-wednest-brown-light">
              <li>Create and manage your business listing</li>
              <li>Showcase your portfolio and reviews</li>
              <li>Receive booking inquiries</li>
              <li>Manage your availability calendar</li>
              <li>Connect with engaged couples</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
      
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-wednest-brown">
            {userType === "vendor" ? "Your Name" : "Full Name"}
          </label>
          <Input 
            id="fullName"
            type="text" 
            placeholder={userType === "vendor" ? "Your Name" : "Your Name"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full"
            required
          />
        </div>

        {userType === "vendor" && (
          <>
            <div className="space-y-2">
              <label htmlFor="businessName" className="block text-sm font-medium text-wednest-brown">Business Name</label>
              <Input 
                id="businessName"
                type="text" 
                placeholder="Your Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="businessCategory" className="block text-sm font-medium text-wednest-brown">Business Category</label>
              <select
                id="businessCategory"
                value={businessCategory}
                onChange={(e) => setBusinessCategory(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wednest-sage focus:border-transparent"
                required
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-wednest-brown">Email</label>
          <Input 
            id="email"
            type="email" 
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-wednest-brown">Password</label>
          <Input 
            id="password"
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-wednest-brown">Confirm Password</label>
          <Input 
            id="confirmPassword"
            type="password" 
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-wednest-sage hover:bg-wednest-sage-dark text-white" 
          disabled={loading}
        >
          {loading ? "Creating account..." : `Register as ${userType === 'vendor' ? 'Vendor' : 'Couple'}`}
        </Button>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or continue with</span>
          </div>
        </div>
        
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
        >
          <Github className="h-4 w-4" />
          Sign up with Google
        </Button>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-wednest-sage hover:text-wednest-sage-dark font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
