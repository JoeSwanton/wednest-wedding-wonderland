
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const { user, signOut, userProfile, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account."
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <nav className="bg-white py-4 shadow-sm border-b border-theme-beige">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center font-semibold text-2xl text-theme-brown">
          {/* Replace with your logo */}
          <img src="/logo.svg" alt="WedNest Logo" className="h-8 w-auto mr-2" />
          WedNest
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link to="/" className="text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
            Home
          </Link>
          <Link to="/vendors" className="text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
            Vendors
          </Link>
          <Link to="/planning-tools" className="text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
            Planning Tools
          </Link>
          <Link to="/inspiration" className="text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
            Inspiration
          </Link>
          <Link to="/blog" className="text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
            Blog
          </Link>
          <Link to="/saved-vendors" className="text-theme-brown hover:text-theme-brown-dark font-medium transition-colors flex items-center gap-1">
            <Heart className="h-4 w-4" />
            Saved
          </Link>
        </div>

        {/* Authentication Buttons / User Dropdown */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userProfile?.avatar_url || user?.user_metadata?.avatar_url || `https://avatar.vercel.sh/${user?.email}.png`} alt={user?.email} />
                    <AvatarFallback>{user?.email ? user.email.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userProfile?.full_name || user?.user_metadata?.full_name || "Wedding Planner"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")} >
                  Profile
                </DropdownMenuItem>
                {userProfile?.role === 'vendor' && (
                  <DropdownMenuItem onClick={() => navigate("/vendor/dashboard")}>
                    Vendor Dashboard
                  </DropdownMenuItem>
                )}
                {userProfile?.role === 'customer' && (
                  <DropdownMenuItem onClick={() => navigate("/customer-dashboard")}>
                    Customer Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/auth?tab=signup">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? (
                <X className="h-6 w-6 text-theme-brown" />
              ) : (
                <Menu className="h-6 w-6 text-theme-brown" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-sm">
            <SheetHeader className="space-y-2 text-left">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Explore WedNest and plan your perfect wedding.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Link to="/" className="block px-3 py-2 text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
                Home
              </Link>
              <Link to="/vendors" className="block px-3 py-2 text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
                Vendors
              </Link>
              <Link to="/planning-tools" className="block px-3 py-2 text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
                Planning Tools
              </Link>
              <Link to="/inspiration" className="block px-3 py-2 text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
                Inspiration
              </Link>
              <Link to="/blog" className="block px-3 py-2 text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
                Blog
              </Link>
              <Link to="/saved-vendors" className="block px-3 py-2 text-theme-brown hover:text-theme-brown-dark font-medium transition-colors flex items-center gap-1">
                <Heart className="h-4 w-4" />
                Saved Vendors
              </Link>
              {user ? (
                <>
                  <Link to="/profile" className="block px-3 py-2 text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
                    Profile
                  </Link>
                  {userProfile?.role === 'vendor' && (
                    <Link to="/vendor/dashboard" className="block px-3 py-2 text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
                      Vendor Dashboard
                    </Link>
                  )}
                  {userProfile?.role === 'customer' && (
                    <Link to="/customer-dashboard" className="block px-3 py-2 text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
                      Customer Dashboard
                    </Link>
                  )}
                  <Link to="/dashboard" className="block px-3 py-2 text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
                    Dashboard
                  </Link>
                  <Button variant="outline" className="w-full" onClick={handleSignOut}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="block px-3 py-2 text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
                    Sign In
                  </Link>
                  <Link to="/auth?tab=signup" className="block px-3 py-2 text-theme-brown hover:text-theme-brown-dark font-medium transition-colors">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
