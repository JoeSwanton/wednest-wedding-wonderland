
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image or gradient background */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-wednest-beige to-wednest-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
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
                : "Join WedNest to start planning your perfect wedding"}
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
