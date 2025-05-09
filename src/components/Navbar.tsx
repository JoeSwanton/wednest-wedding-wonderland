
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-4 md:px-8 flex items-center justify-between border-b border-wednest-beige">
      <Link to="/" className="flex items-center">
        <h1 className="text-2xl md:text-3xl font-cormorant font-semibold text-wednest-brown">
          WedNest
        </h1>
      </Link>
      
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
      
      <div className="flex items-center gap-3">
        <Button variant="link" className="text-wednest-brown-light hover:text-wednest-brown text-sm font-medium">
          Log In
        </Button>
        <Button className="bg-wednest-sage hover:bg-wednest-sage-dark text-white">
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
