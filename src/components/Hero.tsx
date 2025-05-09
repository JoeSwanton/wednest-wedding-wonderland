
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="w-full flex flex-col-reverse lg:flex-row py-8 md:py-16 px-4 md:px-8 gap-8">
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="text-wednest-sage text-sm md:text-base font-medium tracking-wide mb-2">
          Your Wedding Journey Starts Here
        </div>
        <h1 className="text-4xl md:text-6xl font-cormorant font-semibold text-wednest-brown mb-6">
          Plan Your Perfect<br />Wedding Day
        </h1>
        <p className="text-wednest-brown-light text-base md:text-lg mb-8 max-w-xl">
          Find the best wedding vendors, manage your budget, and create a 
          memorable celebration with our intelligent planning tools.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-wednest-sage hover:bg-wednest-sage-dark text-white px-6 py-2 text-base">
            Get Started
          </Button>
          <Button variant="outline" className="border-wednest-sage text-wednest-sage hover:bg-wednest-sage hover:text-white px-6 py-2 text-base">
            Browse Vendors
          </Button>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-wednest-cream rounded-md h-80 md:h-[450px] flex items-center justify-center">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white text-wednest-beige">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
