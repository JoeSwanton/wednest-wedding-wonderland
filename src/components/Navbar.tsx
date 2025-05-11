
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      console.log("Navbar: Initiating sign out");
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      // No need to navigate here as it's handled by onAuthStateChange
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="w-full py-4 px-4 md:px-8 flex items-center justify-between border-b border-wednest-beige">
      <Link to="/" className="flex items-center">
        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-wednest-brown">
          Enosi
        </h1>
      </Link>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        <Link to="/" className="text-wednest-brown-light hover:text-wednest-brown text-sm font-medium">
          Home
        </Link>
        <Link to="/vendors" className="text-wednest-brown-light hover:text-wednest-brown text-sm font-medium">
          Vendors
        </Link>
        <Link to="/planning-tools" className="text-wednest-brown-light hover:text-wednest-brown text-sm font-medium">
          Planning Tools
        </Link>
        <Link to="/inspiration" className="text-wednest-brown-light hover:text-wednest-brown text-sm font-medium">
          Inspiration
        </Link>
        <Link to="/blog" className="text-wednest-brown-light hover:text-wednest-brown text-sm font-medium">
          Blog
        </Link>
      </div>
      
      {/* Authentication Buttons */}
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-wednest-brown text-sm">
              {user.email}
            </span>
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              className="border-wednest-sage text-wednest-brown hover:bg-wednest-sage hover:text-white"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Link to="/auth">
            <Button className="bg-wednest-sage hover:bg-wednest-sage-dark text-white">
              Sign In
            </Button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? (
          <X className="h-6 w-6 text-wednest-brown" />
        ) : (
          <Menu className="h-6 w-6 text-wednest-brown" />
        )}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-white z-50 p-4">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-wednest-brown-light hover:text-wednest-brown text-lg py-2 border-b"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/vendors" 
              className="text-wednest-brown-light hover:text-wednest-brown text-lg py-2 border-b"
              onClick={toggleMobileMenu}
            >
              Vendors
            </Link>
            <Link 
              to="/planning-tools" 
              className="text-wednest-brown-light hover:text-wednest-brown text-lg py-2 border-b"
              onClick={toggleMobileMenu}
            >
              Planning Tools
            </Link>
            <Link 
              to="/inspiration" 
              className="text-wednest-brown-light hover:text-wednest-brown text-lg py-2 border-b"
              onClick={toggleMobileMenu}
            >
              Inspiration
            </Link>
            <Link 
              to="/blog" 
              className="text-wednest-brown-light hover:text-wednest-brown text-lg py-2 border-b"
              onClick={toggleMobileMenu}
            >
              Blog
            </Link>
            
            {user ? (
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-wednest-brown">{user.email}</span>
                <Button 
                  onClick={() => {
                    handleSignOut();
                    toggleMobileMenu();
                  }} 
                  className="bg-wednest-sage hover:bg-wednest-sage-dark text-white"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth" onClick={toggleMobileMenu}>
                <Button className="w-full mt-4 bg-wednest-sage hover:bg-wednest-sage-dark text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
