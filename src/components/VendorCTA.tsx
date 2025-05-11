
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const features = [
  "Showcase your services to engaged couples",
  "Direct booking and communication",
  "Verified vendor badge",
  "Premium listing options",
  "Client testimonials and reviews"
];

const VendorCTA = () => {
  return (
    <div className="w-full py-16 px-4 md:px-8 relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Wedding venue backdrop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-wednest-sage/80 backdrop-blur-sm"></div>
      </div>
      
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 relative z-10 text-white">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-cormorant font-semibold mb-4">
            Wedding Professionals, Grow Your Business
          </h2>
          <p className="mb-6 opacity-90 text-lg">
            Join Enosi to showcase your services to engaged couples who are actively planning their wedding.
          </p>
          <Button className="bg-white text-wednest-sage hover:bg-wednest-cream">
            Join as a Vendor
          </Button>
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 font-cormorant">
              Benefits for Vendors
            </h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 min-w-5 text-white" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCTA;
