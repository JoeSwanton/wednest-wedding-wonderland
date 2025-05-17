
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 py-8 px-4 md:px-8 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">Enosi</h3>
            <p className="text-xs text-gray-500">
              Your all-in-one Australian wedding planning platform.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-medium mb-2">For Couples</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/vendors" className="text-gray-500 hover:text-gray-700">Find Vendors</Link></li>
              <li><Link to="/planning-tools" className="text-gray-500 hover:text-gray-700">Planning Tools</Link></li>
              <li><Link to="/inspiration" className="text-gray-500 hover:text-gray-700">Inspiration Gallery</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-medium mb-2">For Vendors</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/" className="text-gray-500 hover:text-gray-700">Join as Vendor</Link></li>
              <li><Link to="/" className="text-gray-500 hover:text-gray-700">Pricing Plans</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-medium mb-2">Company</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/" className="text-gray-500 hover:text-gray-700">About Us</Link></li>
              <li><Link to="/" className="text-gray-500 hover:text-gray-700">Contact</Link></li>
              <li><Link to="/" className="text-gray-500 hover:text-gray-700">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-4 text-center text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} Enosi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
