
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Heart, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CreateAccountCTA = () => {
  const benefits = [
    "Save favorite vendors to your wishlist",
    "Get personalized vendor recommendations",
    "Track your wedding budget and timeline",
    "Access exclusive deals and discounts",
    "Organize all your wedding plans in one place"
  ];

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-gradient-to-br from-theme-brown to-theme-brown-dark">
      <div className="max-w-6xl mx-auto">
        <Card className="p-8 md:p-12 bg-white/95 backdrop-blur-sm border border-theme-beige rounded-2xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                <span className="text-theme-brown font-medium">Join thousands of happy couples</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif text-theme-brown mb-6 leading-tight">
                Start Planning Your Perfect Wedding Today
              </h2>
              
              <p className="text-lg text-theme-brown-light mb-8 leading-relaxed">
                Create your free account and get access to all the tools you need to plan 
                your dream wedding. Compare vendors, track your budget, and stay organized 
                throughout your planning journey.
              </p>

              {/* Benefits list */}
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-theme-brown">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    className="bg-theme-brown hover:bg-theme-brown-dark text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all group"
                  >
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link to="/vendors">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-theme-brown text-theme-brown hover:bg-theme-cream px-8 py-4 text-lg rounded-xl transition-all"
                  >
                    Browse Vendors First
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-theme-brown-light mt-4">
                No credit card required • Free forever
              </p>
            </div>

            {/* Right side - Visual elements */}
            <div className="relative">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-theme-cream/30 to-theme-beige/30 rounded-2xl transform rotate-3"></div>
              
              {/* Main card */}
              <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-theme-beige">
                <div className="text-center">
                  <div className="w-16 h-16 bg-theme-brown rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-theme-brown mb-4">
                    Your Wedding Dashboard
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Mock dashboard elements */}
                    <div className="bg-theme-cream/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-theme-brown">Budget Tracking</span>
                        <span className="text-sm font-semibold text-green-600">85% on track</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    
                    <div className="bg-theme-cream/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-theme-brown">Tasks Completed</span>
                        <span className="text-sm font-semibold text-theme-brown">12/20</span>
                      </div>
                    </div>
                    
                    <div className="bg-theme-cream/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-theme-brown" />
                        <span className="text-sm text-theme-brown">3 vendors saved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateAccountCTA;
