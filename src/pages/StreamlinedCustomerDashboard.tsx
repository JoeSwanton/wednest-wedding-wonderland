
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Search, Heart, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PersonalizedHeader from "@/components/customer/PersonalizedHeader";
import RecentlyViewedVendors from "@/components/landing/RecentlyViewedVendors";
import { useSavedVendors } from "@/hooks/useSavedVendors";

const StreamlinedCustomerDashboard = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const { savedVendors } = useSavedVendors();
  
  // Mock wedding details - in real app this would come from API
  const mockWeddingDetails = {
    partner1_name: "Emma",
    partner2_name: "David",
    selected_date: "2025-11-03T00:00:00Z",
    location_details: "Downtown Event Center",
    exact_guest_count: 120
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-theme-beige/20">
      <Navbar />
      
      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Personalized Header */}
        <PersonalizedHeader weddingDetails={mockWeddingDetails} loading={false} />
        
        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/vendors")}>
            <CardContent className="p-6 text-center">
              <Search className="h-12 w-12 text-theme-brown mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-theme-brown mb-2">Find Vendors</h3>
              <p className="text-theme-brown-light text-sm">Browse and discover wedding vendors in your area</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/saved-vendors")}>
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 text-theme-brown mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-theme-brown mb-2">Saved Vendors</h3>
              <p className="text-theme-brown-light text-sm">
                {savedVendors.length > 0 ? `View your ${savedVendors.length} saved vendors` : "Save vendors you're interested in"}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/questionnaire")}>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-theme-brown mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-theme-brown mb-2">Wedding Profile</h3>
              <p className="text-theme-brown-light text-sm">Complete your wedding details for better recommendations</p>
            </CardContent>
          </Card>
        </section>

        {/* Recently Viewed Vendors */}
        <RecentlyViewedVendors />

        {/* Saved Vendors Preview */}
        {savedVendors.length > 0 && (
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl md:text-2xl font-serif text-theme-brown">Your Saved Vendors</h3>
              <Button 
                variant="outline" 
                onClick={() => navigate("/saved-vendors")}
                className="text-theme-brown border-theme-beige hover:bg-theme-cream"
              >
                View All ({savedVendors.length})
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {savedVendors.slice(0, 4).map((vendor) => (
                <Card key={vendor.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/vendors/${vendor.id}`)}>
                  <div className="relative h-40">
                    <img 
                      src={vendor.imageUrl}
                      alt={vendor.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-theme-brown mb-1">{vendor.name}</h4>
                    <p className="text-sm text-theme-brown-light">{vendor.type} • {vendor.location}</p>
                    <div className="text-sm font-semibold text-theme-brown mt-2">{vendor.price}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Get Started CTA */}
        <Card className="bg-gradient-to-r from-theme-sage/10 to-theme-cream/10 border-theme-sage/20 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-theme-sage/20 rounded-full p-3">
                <Calendar className="h-8 w-8 text-theme-sage" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-theme-brown mb-2">Ready to Start Planning?</h3>
                <p className="text-theme-brown-light mb-4">
                  Complete your wedding profile to get personalized vendor recommendations.
                </p>
                <Button 
                  className="bg-theme-sage hover:bg-theme-sage-dark text-white px-6"
                  onClick={() => navigate("/questionnaire")}
                >
                  Complete Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default StreamlinedCustomerDashboard;
