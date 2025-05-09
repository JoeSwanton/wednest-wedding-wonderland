
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const tabs = ["Search Vendors", "Browse by Category"];

const VendorSearch = () => {
  return (
    <div className="w-full py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b border-wednest-beige">
          {tabs.map((tab, index) => (
            <button 
              key={index} 
              className={`px-6 py-3 text-sm font-medium ${
                index === 0 
                  ? "bg-wednest-cream text-wednest-brown" 
                  : "text-wednest-brown-light hover:bg-wednest-cream/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input 
                type="text" 
                placeholder="Search for vendors (e.g., rustic outdoor venues with mountain views)" 
                className="w-full border-wednest-beige focus-visible:ring-wednest-sage"
              />
            </div>
            <Button className="bg-wednest-sage hover:bg-wednest-sage-dark text-white">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-wednest-brown mb-3">
              Popular Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Venues", "Photographers", "Florists", "Caterers", "Wedding Planners"].map((category, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="border-wednest-beige text-wednest-brown-light hover:bg-wednest-cream hover:text-wednest-brown"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSearch;
