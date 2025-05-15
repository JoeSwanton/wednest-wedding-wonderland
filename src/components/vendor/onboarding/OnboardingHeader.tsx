
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const OnboardingHeader = () => {
  return (
    <header className="w-full bg-wednest-sage py-4 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/vendor/dashboard" 
            className="mr-4 text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-serif text-white">
            Vendor Onboarding
          </h1>
        </div>
        <div>
          <img 
            src="/placeholder.svg" 
            alt="WedNest Logo" 
            className="h-8" 
          />
        </div>
      </div>
    </header>
  );
};

export default OnboardingHeader;
