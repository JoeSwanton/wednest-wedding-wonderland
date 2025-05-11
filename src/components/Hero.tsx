
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-full flex flex-col-reverse lg:flex-row py-8 md:py-16 px-4 md:px-8 gap-8">
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="text-wednest-sage text-sm md:text-base font-medium tracking-wide mb-2">
          Your Wedding Journey Starts Here
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-semibold text-wednest-brown mb-6">
          Plan Your Perfect<br />Wedding Day
        </h1>
        <p className="text-wednest-brown-light text-base md:text-lg mb-8 max-w-xl">
          Find the best wedding vendors, manage your budget, and create a 
          memorable celebration with our intelligent planning tools.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button 
            className="bg-wednest-sage hover:bg-wednest-sage-dark text-white px-6 py-2 text-base"
            asChild
          >
            <Link to="/auth">Get Started</Link>
          </Button>
          <Button 
            variant="outline" 
            className="border-wednest-sage text-wednest-sage hover:bg-wednest-sage hover:text-white px-6 py-2 text-base"
            asChild
          >
            <Link to="/vendors">Browse Vendors</Link>
          </Button>
        </div>
      </div>
      <div className="w-full lg:w-1/2 rounded-md h-80 md:h-[450px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Couple on their wedding day walking hand in hand"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
