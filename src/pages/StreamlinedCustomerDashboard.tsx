
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Search, 
  User, 
  CheckCircle, 
  Clock,
  ArrowRight
} from "lucide-react";
import { useSavedVendorsDB } from "@/hooks/useSavedVendorsDB";
import { useRecentlyViewedVendors } from "@/hooks/useRecentlyViewedVendors";

const StreamlinedCustomerDashboard = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const { savedVendors, loading: savedLoading } = useSavedVendorsDB();
  const { recentlyViewed } = useRecentlyViewedVendors();

  const firstName = userProfile?.display_name?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-theme-beige/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-theme-brown mb-2">
            Welcome back, {firstName}!
          </h1>
          <p className="text-theme-brown-light">
            Continue planning your perfect wedding day
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/vendors')}>
            <CardContent className="p-6 text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-wednest-sage" />
              <h3 className="font-serif text-lg text-theme-brown mb-2">Find Vendors</h3>
              <p className="text-sm text-theme-brown-light">
                Discover amazing wedding vendors in your area
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/saved-vendors')}>
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <h3 className="font-serif text-lg text-theme-brown mb-2">Saved Vendors</h3>
              <p className="text-sm text-theme-brown-light">
                Review your favorite vendors ({savedVendors.length} saved)
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/questionnaire')}>
            <CardContent className="p-6 text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-wednest-gold" />
              <h3 className="font-serif text-lg text-theme-brown mb-2">Wedding Profile</h3>
              <p className="text-sm text-theme-brown-light">
                Complete your wedding details for better matches
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Saved Vendors */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-theme-brown">
                  <Heart className="h-5 w-5 text-red-500" />
                  Saved Vendors
                </CardTitle>
                <p className="text-sm text-theme-brown-light mt-1">
                  Your favorite wedding vendors
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/saved-vendors')}>
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              {savedLoading ? (
                <div className="text-center py-8 text-theme-brown-light">
                  Loading saved vendors...
                </div>
              ) : savedVendors.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                  <p className="text-theme-brown-light mb-4">No saved vendors yet</p>
                  <Button size="sm" onClick={() => navigate('/vendors')}>
                    Start Exploring
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedVendors.slice(0, 3).map((savedVendor) => (
                    <div key={savedVendor.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                        {savedVendor.vendor_profiles.logo_url ? (
                          <img 
                            src={savedVendor.vendor_profiles.logo_url} 
                            alt={savedVendor.vendor_profiles.business_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-theme-brown truncate">
                          {savedVendor.vendor_profiles.business_name}
                        </h4>
                        <p className="text-sm text-theme-brown-light">
                          {savedVendor.vendor_profiles.business_category}
                        </p>
                      </div>
                    </div>
                  ))}
                  {savedVendors.length > 3 && (
                    <p className="text-xs text-center text-theme-brown-light pt-2">
                      +{savedVendors.length - 3} more saved
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recently Viewed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-theme-brown">
                <Clock className="h-5 w-5 text-wednest-sage" />
                Recently Viewed
              </CardTitle>
              <p className="text-sm text-theme-brown-light">
                Vendors you've looked at recently
              </p>
            </CardHeader>
            <CardContent>
              {recentlyViewed.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                  <p className="text-theme-brown-light mb-4">No recently viewed vendors</p>
                  <Button size="sm" onClick={() => navigate('/vendors')}>
                    Start Browsing
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentlyViewed.slice(0, 3).map((vendor) => (
                    <div key={vendor.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={vendor.image} 
                          alt={vendor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-theme-brown truncate">{vendor.name}</h4>
                        <p className="text-sm text-theme-brown-light">{vendor.type}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {vendor.priceRange}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StreamlinedCustomerDashboard;
