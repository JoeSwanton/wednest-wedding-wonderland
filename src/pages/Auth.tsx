
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  
  // We'll completely remove the effect that was causing the redirect
  // The auth state change handler in useAuthentication will
  // handle redirects when signing in
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // If already authenticated and trying to access the auth page,
  // we won't auto-redirect. Let the user choose to navigate away manually.
  
  return (
    <div className="min-h-screen flex">
      {/* Back button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-10"
        onClick={() => navigate('/')}
        asChild
      >
        <Link to="/">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to home</span>
        </Link>
      </Button>

      {/* Left side - Image background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          alt="Wedding ceremony under floral arch"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-16 left-16 text-white max-w-md">
          <p className="text-3xl font-serif italic">
            "Every love story is beautiful, but yours should be unique."
          </p>
        </div>
      </div>
      
      {/* Right side - Auth forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-wednest-brown mb-2">
              {activeTab === "signin" ? "Sign in" : "Create Account"}
            </h1>
            <p className="text-wednest-brown-light">
              {activeTab === "signin" 
                ? "Enter your email and password to access your account" 
                : "Join Enosi to start planning your perfect wedding"}
            </p>
          </div>
          
          {activeTab === "signin" ? (
            <SignInForm onSwitchToSignUp={() => setActiveTab("signup")} />
          ) : (
            <SignUpForm onSwitchToSignIn={() => setActiveTab("signin")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
