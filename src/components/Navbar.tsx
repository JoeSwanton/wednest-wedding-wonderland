import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Navbar = () => {
  const {
    user,
    signOut,
    userProfile
  } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleSignOut = async () => {
    try {
      console.log("Navbar: Initiating sign out");
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account."
      });
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
  return <nav className="w-full py-3 px-4 md:px-8 flex items-center justify-between border-b border-theme-beige bg-[theme-brown-light] bg-theme-brown">
      <Link to="/" className="flex items-center">
        <h1 className="text-xl md:text-2xl font-serif font-semibold text-slate-50">
          Enosi
        </h1>
      </Link>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center bg-slate-50">
        <Link to="/vendors" className="text-theme-brown hover:text-theme-brown-dark text-sm">
          Browse Vendors
        </Link>
        <Link to="/planning-tools" className="text-theme-brown hover:text-theme-brown-dark text-sm">
          Planning Tools
        </Link>
        <Link to="/vendor/onboarding" className="text-theme-brown hover:text-theme-brown-dark text-sm">
          For Vendors
        </Link>
        <Link to="/blog" className="text-theme-brown hover:text-theme-brown-dark text-sm">
          Blog
        </Link>
      </div>
      
      {/* Authentication Buttons */}
      <div className="hidden md:flex items-center gap-3">
        {user ? <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-theme-brown hover:text-theme-brown-dark">
                <User className="h-4 w-4" />
                <span className="text-sm">My Profile</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/vendor/listings" className="cursor-pointer">My Listings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/vendor/bookings" className="cursor-pointer">Bookings & Inquiries</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/vendor/messages" className="cursor-pointer">Messages</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/vendor/packages" className="cursor-pointer">Packages & Pricing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/vendor/earnings" className="cursor-pointer">Payments & Earnings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/vendor/reviews" className="cursor-pointer">Reviews</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/vendor/insights" className="cursor-pointer">Performance & Insights</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/vendor/settings" className="cursor-pointer">Account Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/vendor/subscription" className="cursor-pointer">Subscription & Billing</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> : <>
            <Link to="/auth">
              <Button variant="ghost" className="text-theme-brown hover:text-theme-brown-dark">
                Log In
              </Button>
            </Link>
            <Link to="/auth?tab=signup">
              <Button className="bg-theme-blue hover:bg-theme-blue-dark text-white border-none">
                Sign Up
              </Button>
            </Link>
          </>}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <X className="h-6 w-6 text-theme-brown" /> : <Menu className="h-6 w-6 text-theme-brown" />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden fixed inset-0 top-[57px] bg-white z-50 p-4">
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-theme-brown-light hover:text-theme-brown text-lg py-2 border-b" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link to="/vendors" className="text-theme-brown-light hover:text-theme-brown text-lg py-2 border-b" onClick={toggleMobileMenu}>
              Vendors
            </Link>
            <Link to="/planning-tools" className="text-theme-brown-light hover:text-theme-brown text-lg py-2 border-b" onClick={toggleMobileMenu}>
              Planning Tools
            </Link>
            <Link to="/inspiration" className="text-theme-brown-light hover:text-theme-brown text-lg py-2 border-b" onClick={toggleMobileMenu}>
              Inspiration
            </Link>
            <Link to="/blog" className="text-theme-brown-light hover:text-theme-brown text-lg py-2 border-b" onClick={toggleMobileMenu}>
              Blog
            </Link>
            
            {user ? <div className="flex flex-col gap-2 mt-4">
                <div className="text-theme-brown font-medium mb-2 pb-2 border-b">My Profile</div>
                <Link to="/dashboard" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                  Dashboard
                </Link>
                <Link to="/vendor/listings" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                  My Listings
                </Link>
                <Link to="/vendor/bookings" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                  Bookings & Inquiries
                </Link>
                <Link to="/vendor/messages" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                  Messages
                </Link>
                <div className="border-t mt-2 pt-2"></div>
                <Link to="/vendor/packages" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                  Packages & Pricing
                </Link>
                <Link to="/vendor/earnings" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                  Payments & Earnings
                </Link>
                <Link to="/vendor/reviews" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                  Reviews
                </Link>
                <Link to="/vendor/insights" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                  Performance & Insights
                </Link>
                <div className="border-t mt-2 pt-2"></div>
                <Link to="/vendor/settings" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                  Account Settings
                </Link>
                <Link to="/vendor/subscription" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                  Subscription & Billing
                </Link>
                <Button onClick={() => {
            handleSignOut();
            toggleMobileMenu();
          }} className="mt-4 bg-wednest-sage hover:bg-wednest-sage-dark text-white">
                  Sign Out
                </Button>
              </div> : <Link to="/auth" onClick={toggleMobileMenu}>
                <Button className="w-full mt-4 bg-wednest-sage hover:bg-wednest-sage-dark text-white">
                  Sign In
                </Button>
              </Link>}
          </div>
        </div>}
    </nav>;
};
export default Navbar;