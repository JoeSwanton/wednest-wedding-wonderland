
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

interface AuthFooterProps {
  loading: boolean;
  userType: string;
  onSwitchToSignIn: () => void;
  handleGoogleSignIn: () => void;
}

const AuthFooter = ({
  loading,
  userType,
  onSwitchToSignIn,
  handleGoogleSignIn
}: AuthFooterProps) => {
  return (
    <>
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
    </>
  );
};

export default AuthFooter;
