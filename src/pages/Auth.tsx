
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  
  // Prevent authenticated users from accessing the auth page
  useEffect(() => {
    if (!loading && user) {
      // Navigate based on user role, but don't auto-redirect to onboarding here
      if (userProfile?.user_role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, userProfile, loading, navigate]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex">
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
