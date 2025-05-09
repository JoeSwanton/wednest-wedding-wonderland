
import { Heart, Search, Calendar, Presentation, Package, Award } from "lucide-react";
import VendorCards from "./VendorCards";

const featuresList = [
  {
    icon: <Search className="w-6 h-6 text-wednest-sage" />,
    title: "Find Verified Vendors",
    description: "Connect with trusted local photographers, venues, florists, and more."
  },
  {
    icon: <Calendar className="w-6 h-6 text-wednest-sage" />,
    title: "Planning Tools",
    description: "Track your budget, manage guest lists, and organize tasks in one place."
  },
  {
    icon: <Heart className="w-6 h-6 text-wednest-sage" />,
    title: "AI Recommendations",
    description: "Get personalized vendor suggestions based on your style and budget."
  },
  {
    icon: <Presentation className="w-6 h-6 text-wednest-sage" />,
    title: "Seamless Communication",
    description: "Message vendors directly and keep all wedding communications organized."
  },
  {
    icon: <Package className="w-6 h-6 text-wednest-sage" />,
    title: "Vendor Packages",
    description: "Choose from pre-built packages to save time and money."
  },
  {
    icon: <Award className="w-6 h-6 text-wednest-sage" />,
    title: "Mobile Friendly",
    description: "Plan your wedding anytime, anywhere from any device."
  }
];

const Features = () => {
  return (
    <div className="w-full py-16 px-4 md:px-8 bg-wednest-cream">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-normal text-wednest-brown mb-4">
          Say "I Do" to Stress-Free Planning
        </h2>
        <p className="text-wednest-brown-light text-lg">
          Discover and connect with the best wedding professionals tailored to your vision and budget.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {featuresList.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-serif font-normal text-wednest-brown mb-2">
              {feature.title}
            </h3>
            <p className="text-wednest-brown-light">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-serif font-normal text-wednest-brown mb-6 text-center md:text-left">
          Featured Wedding Professionals
        </h3>
        <VendorCards />
      </div>
    </div>
  );
};

export default Features;
