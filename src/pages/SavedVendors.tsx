
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Trash2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useSavedVendorsDB } from "@/hooks/useSavedVendorsDB";
import InquiryDialog from "@/components/vendor/InquiryDialog";

const SavedVendors = () => {
  const { savedVendors, loading, removeSavedVendor } = useSavedVendorsDB();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-theme-beige/30 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">Loading your saved vendors...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-theme-beige/30 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-theme-brown mb-2">Saved Vendors</h1>
          <p className="text-theme-brown-light">
            Keep track of your favorite wedding vendors
          </p>
        </div>

        {savedVendors.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-theme-brown mb-2">
                No saved vendors yet
              </h3>
              <p className="text-theme-brown-light mb-6">
                Start exploring vendors and save your favorites to keep track of them here.
              </p>
              <Link to="/vendors">
                <Button className="bg-theme-brown hover:bg-theme-brown-dark">
                  Browse Vendors
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedVendors.map((savedVendor) => (
              <Card key={savedVendor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div 
                    className="h-48 bg-gray-200 bg-cover bg-center"
                    style={{
                      backgroundImage: savedVendor.vendor_profiles?.logo_url 
                        ? `url(${savedVendor.vendor_profiles.logo_url})` 
                        : undefined
                    }}
                  >
                    {!savedVendor.vendor_profiles?.logo_url && (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                      onClick={() => removeSavedVendor(savedVendor.vendor_id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-serif font-medium text-lg text-theme-brown">
                        {savedVendor.vendor_profiles?.business_name || 'Unknown Vendor'}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {savedVendor.vendor_profiles?.business_category || 'Category'}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>
                        {savedVendor.vendor_profiles?.city}, {savedVendor.vendor_profiles?.state}
                      </span>
                    </div>

                    {savedVendor.vendor_profiles?.base_price_range && (
                      <div className="text-sm font-medium text-theme-brown">
                        {savedVendor.vendor_profiles.base_price_range}
                      </div>
                    )}

                    <p className="text-sm text-theme-brown-light line-clamp-2">
                      {savedVendor.vendor_profiles?.bio || 'No description available'}
                    </p>

                    <div className="flex gap-2 pt-2">
                      <Link to={`/vendors/${savedVendor.vendor_id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      <InquiryDialog 
                        vendorId={savedVendor.vendor_id} 
                        vendorName={savedVendor.vendor_profiles?.business_name || 'Vendor'}
                      >
                        <Button size="sm" className="bg-wednest-sage hover:bg-wednest-sage-dark text-white">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </InquiryDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedVendors;
