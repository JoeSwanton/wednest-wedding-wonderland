
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  // Use optional chaining to safely access auth context properties
  const {
    user,
    signOut,
    userProfile,
    loading
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

  // Determine if the user is a vendor or a couple
  const isVendor = userProfile?.user_role === 'vendor';

  // If auth is loading, show a simplified navbar
  if (loading) {
    return (
      <nav className="w-full py-3 px-4 md:px-8 flex items-center justify-between border-b border-theme-beige bg-theme-brown">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/0dc2310f-640e-4fc8-9bd8-2aca741d4c9b.png" 
            alt="Enosi" 
            className="h-8 md:h-10 w-auto"
          />
        </Link>
      </nav>
    );
  }

  return <nav className="w-full py-3 px-4 md:px-8 flex items-center justify-between border-b border-theme-beige bg-theme-brown">
      <Link to="/" className="flex items-center">
        <img 
          src="/lovable-uploads/0dc2310f-640e-4fc8-9bd8-2aca741d4c9b.png" 
          alt="Enosi" 
          className="h-8 md:h-10 w-auto"
        />
      </Link>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        <Link to="/vendors" className="text-slate-50 hover:text-theme-cream text-sm">
          Browse Vendors
        </Link>
        <Link to="/planning-tools" className="text-slate-50 hover:text-theme-cream text-sm">
          Planning Tools
        </Link>
        <Link to="/inspiration" className="text-slate-50 hover:text-theme-cream text-sm">
          Inspiration
        </Link>
        <Link to="/vendor/onboarding" className="text-slate-50 hover:text-theme-cream text-sm">
          For Vendors
        </Link>
        <Link to="/blog" className="text-slate-50 hover:text-theme-cream text-sm">
          Blog
        </Link>
      </div>
      
      {/* Authentication Buttons */}
      <div className="hidden md:flex items-center gap-3">
        {user ? <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-slate-50 hover:text-theme-cream">
                <User className="h-4 w-4" />
                <span className="text-sm">My Profile</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isVendor ? (
                // Vendor menu items
                <>
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
                </>
              ) : (
                // Couple menu items - updated as requested
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="font-medium text-sm p-2">
                    My Planning Tools
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="pl-4">
                    <Link to="/customer-dashboard?tab=budget" className="cursor-pointer">Budget Tracker</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="pl-4">
                    <Link to="/customer-dashboard?tab=guests" className="cursor-pointer">Guest List</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="pl-4">
                    <Link to="/customer-dashboard?tab=timeline" className="cursor-pointer">Timeline</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="pl-4">
                    <Link to="/customer-dashboard?tab=checklist" className="cursor-pointer">Checklist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="pl-4">
                    <Link to="/customer-dashboard?tab=contracts" className="cursor-pointer">Vendor Contracts</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/saved-vendors" className="cursor-pointer">Saved Vendors</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/inquiries" className="cursor-pointer">My Inquiries & Messages</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wedding-details" className="cursor-pointer">Wedding Details</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Account Settings</Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> : <>
            <Link to="/auth">
              <Button variant="ghost" className="bg-slate-50 text-[theme-brown-dark] text-theme-brown">
                Log In
              </Button>
            </Link>
            <Link to="/auth?tab=signup">
              <Button className="hover:bg-theme-blue-dark border-none text-[theme-brown-light] text-theme-brown bg-slate-50">
                Sign Up
              </Button>
            </Link>
          </>}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <X className="h-6 w-6 text-slate-50" /> : <Menu className="h-6 w-6 text-slate-50" />}
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
                {isVendor ? (
                  // Vendor mobile menu items
                  <>
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
                  </>
                ) : (
                  // Couple mobile menu items - updated as requested
                  <>
                    <Link to="/dashboard" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                      Dashboard
                    </Link>
                    <div className="text-theme-brown pl-2 py-2 font-medium">My Planning Tools</div>
                    <Link to="/customer-dashboard?tab=budget" className="text-theme-brown-light pl-6 py-2" onClick={toggleMobileMenu}>
                      Budget Tracker
                    </Link>
                    <Link to="/customer-dashboard?tab=guests" className="text-theme-brown-light pl-6 py-2" onClick={toggleMobileMenu}>
                      Guest List
                    </Link>
                    <Link to="/customer-dashboard?tab=timeline" className="text-theme-brown-light pl-6 py-2" onClick={toggleMobileMenu}>
                      Timeline
                    </Link>
                    <Link to="/customer-dashboard?tab=checklist" className="text-theme-brown-light pl-6 py-2" onClick={toggleMobileMenu}>
                      Checklist
                    </Link>
                    <Link to="/customer-dashboard?tab=contracts" className="text-theme-brown-light pl-6 py-2" onClick={toggleMobileMenu}>
                      Vendor Contracts
                    </Link>
                    <div className="border-t mt-2 pt-2"></div>
                    <Link to="/saved-vendors" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                      Saved Vendors
                    </Link>
                    <Link to="/inquiries" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                      My Inquiries & Messages
                    </Link>
                    <Link to="/wedding-details" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                      Wedding Details
                    </Link>
                    <Link to="/profile" className="text-theme-brown-light pl-2 py-2" onClick={toggleMobileMenu}>
                      Account Settings
                    </Link>
                  </>
                )}
                <Button onClick={() => {
            handleSignOut();
            toggleMobileMenu();
          }} className="mt-4 bg-theme-brown hover:bg-theme-brown-dark text-white">
                  Sign Out
                </Button>
              </div> : <Link to="/auth" onClick={toggleMobileMenu}>
                <Button className="w-full mt-4 bg-theme-brown hover:bg-theme-brown-dark text-white">
                  Sign In
                </Button>
              </Link>}
          </div>
        </div>}
    </nav>;
};

export default Navbar;
