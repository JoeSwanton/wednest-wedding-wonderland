
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-wednest-brown text-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Enosi</h3>
            <p className="text-sm text-white/70">
              Your all-in-one Australian wedding planning platform.
            </p>
          </div>
          
          <div>
            <h4 className="text-white/90 font-medium mb-2 text-sm">For Couples</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/vendors" className="text-white/70 hover:text-white">Find Vendors</Link></li>
              <li><Link to="/planning-tools" className="text-white/70 hover:text-white">Planning Tools</Link></li>
              <li><Link to="/inspiration" className="text-white/70 hover:text-white">Inspiration Gallery</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white/90 font-medium mb-2 text-sm">For Vendors</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/" className="text-white/70 hover:text-white">Join as Vendor</Link></li>
              <li><Link to="/" className="text-white/70 hover:text-white">Pricing Plans</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white/90 font-medium mb-2 text-sm">Company</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/" className="text-white/70 hover:text-white">About Us</Link></li>
              <li><Link to="/" className="text-white/70 hover:text-white">Contact</Link></li>
              <li><Link to="/" className="text-white/70 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/" className="text-white/70 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-6 pt-6 text-center text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} Enosi. All rights reserved. Australia's premier wedding planning platform.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
