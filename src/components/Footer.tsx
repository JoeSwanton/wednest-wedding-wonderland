
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-theme-cream text-theme-brown py-8 px-4 md:px-8 border-t border-theme-beige">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-base font-serif font-medium mb-3">Enosi</h3>
            <p className="text-xs text-theme-gray-dark">
              Australia's premier wedding planning platform connecting couples with trusted vendors.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-3">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Explore</h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/vendors" className="text-theme-gray-dark hover:text-theme-brown-dark">Browse Vendors</Link></li>
                  <li><Link to="/planning-tools" className="text-theme-gray-dark hover:text-theme-brown-dark">Wedding Venues</Link></li>
                  <li><Link to="/inspiration" className="text-theme-gray-dark hover:text-theme-brown-dark">Wedding Photographers</Link></li>
                  <li><Link to="/blog" className="text-theme-gray-dark hover:text-theme-brown-dark">Wedding Caterers</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">For Vendors</h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/vendor/onboarding" className="text-theme-gray-dark hover:text-theme-brown-dark">List Your Business</Link></li>
                  <li><Link to="/vendor/subscription" className="text-theme-gray-dark hover:text-theme-brown-dark">Vendor Login</Link></li>
                  <li><Link to="/blog" className="text-theme-gray-dark hover:text-theme-brown-dark">Success Stories</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">About</h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/" className="text-theme-gray-dark hover:text-theme-brown-dark">About Us</Link></li>
                  <li><Link to="/" className="text-theme-gray-dark hover:text-theme-brown-dark">Contact</Link></li>
                  <li><Link to="/" className="text-theme-gray-dark hover:text-theme-brown-dark">Privacy Policy</Link></li>
                  <li><Link to="/" className="text-theme-gray-dark hover:text-theme-brown-dark">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-theme-beige mt-6 pt-4 text-center text-xs text-theme-gray-dark">
          <p>
            © {new Date().getFullYear()} Enosi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
