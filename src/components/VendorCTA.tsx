
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
    <div className="w-full py-16 px-4 md:px-8 bg-gradient-to-br from-wednest-sage-light to-wednest-sage text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-cormorant font-semibold mb-4">
            Wedding Professionals, Grow Your Business
          </h2>
          <p className="mb-6 opacity-90 text-lg">
            Join WedNest to showcase your services to engaged couples who are actively planning their wedding.
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
