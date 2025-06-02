
import { Star, Users, Award, Clock } from "lucide-react";

const SocialProofBanner = () => {
  return (
    <div className="w-full py-8 px-4 md:px-8 bg-gradient-to-r from-theme-cream/50 to-theme-beige/30 border-b border-theme-beige/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold text-theme-brown">4.8</span>
            </div>
            <p className="text-sm text-theme-brown-light">Average Rating</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-2">
              <Users className="h-5 w-5 text-theme-brown" />
              <span className="text-2xl font-bold text-theme-brown">15,000+</span>
            </div>
            <p className="text-sm text-theme-brown-light">Happy Couples</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-2">
              <Award className="h-5 w-5 text-theme-brown" />
              <span className="text-2xl font-bold text-theme-brown">1,200+</span>
            </div>
            <p className="text-sm text-theme-brown-light">Verified Vendors</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-2">
              <Clock className="h-5 w-5 text-theme-brown" />
              <span className="text-2xl font-bold text-theme-brown">2hrs</span>
            </div>
            <p className="text-sm text-theme-brown-light">Avg Response Time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofBanner;
