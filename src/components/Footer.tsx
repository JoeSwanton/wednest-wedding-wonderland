
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-wednest-cream py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-cormorant font-semibold text-wednest-brown mb-4">Enosi</h3>
            <p className="text-sm text-wednest-brown-light">
              Your all-in-one Australian wedding planning platform.
            </p>
          </div>
          
          <div>
            <h4 className="text-wednest-brown font-medium mb-3">For Couples</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-wednest-brown-light hover:text-wednest-brown">Find Vendors</Link></li>
              <li><Link to="/" className="text-wednest-brown-light hover:text-wednest-brown">Planning Tools</Link></li>
              <li><Link to="/" className="text-wednest-brown-light hover:text-wednest-brown">Inspiration Gallery</Link></li>
              <li><Link to="/" className="text-wednest-brown-light hover:text-wednest-brown">Wedding Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-wednest-brown font-medium mb-3">For Vendors</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-wednest-brown-light hover:text-wednest-brown">Join as Vendor</Link></li>
              <li><Link to="/" className="text-wednest-brown-light hover:text-wednest-brown">Pricing Plans</Link></li>
              <li><Link to="/" className="text-wednest-brown-light hover:text-wednest-brown">Vendor Resources</Link></li>
              <li><Link to="/" className="text-wednest-brown-light hover:text-wednest-brown">Success Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-wednest-brown font-medium mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-wednest-brown-light hover:text-wednest-brown">About Us</Link></li>
              <li><Link to="/" className="text-wednest-brown-light hover:text-wednest-brown">Contact</Link></li>
              <li><Link to="/" className="text-wednest-brown-light hover:text-wednest-brown">Privacy Policy</Link></li>
              <li><Link to="/" className="text-wednest-brown-light hover:text-wednest-brown">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-wednest-beige mt-8 pt-8 text-center">
          <p className="text-sm text-wednest-brown-light">
            © {new Date().getFullYear()} Enosi. All rights reserved. Australia's premier wedding planning platform.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
