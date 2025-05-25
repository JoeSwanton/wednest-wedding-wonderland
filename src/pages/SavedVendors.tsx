
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VendorCard from '@/components/vendors/VendorCard';
import { useSavedVendors } from '@/hooks/useSavedVendors';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedVendors = () => {
  const { savedVendors, clearSavedVendors } = useSavedVendors();
  const { userProfile } = useAuth();

  // Redirect if not a couple
  if (userProfile?.user_role !== 'couple') {
    return (
      <div className="min-h-screen bg-theme-cream py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-serif text-theme-brown mb-4">Access Restricted</h1>
            <p className="text-theme-brown-light mb-6">
              Saved vendors feature is only available for couples.
            </p>
            <Link to="/vendors">
              <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                Browse Vendors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-cream py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500 fill-red-500" />
              <h1 className="text-4xl font-serif text-theme-brown">Saved Vendors</h1>
            </div>
            {savedVendors.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearSavedVendors}
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
          <p className="text-theme-brown-light text-lg">
            Keep track of your favorite vendors for your special day.
          </p>
        </div>

        {/* Content */}
        {savedVendors.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <CardTitle className="text-2xl text-theme-brown mb-2">No Saved Vendors Yet</CardTitle>
              <CardDescription className="text-lg mb-6">
                Start exploring vendors and save your favorites by clicking the heart icon.
              </CardDescription>
              <Link to="/vendors">
                <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                  Browse Vendors
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-6">
              <Card>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-theme-brown">
                        {savedVendors.length} Saved Vendor{savedVendors.length !== 1 ? 's' : ''}
                      </h3>
                      <p className="text-theme-brown-light">
                        Keep building your dream vendor list
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-theme-brown-light">
                        Categories saved: {new Set(savedVendors.map(v => v.type)).size}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Saved Vendors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <Card>
                <CardContent className="py-8">
                  <h3 className="text-xl font-semibold text-theme-brown mb-2">
                    Ready to reach out?
                  </h3>
                  <p className="text-theme-brown-light mb-4">
                    Contact your saved vendors to check availability and get quotes.
                  </p>
                  <Link to="/vendors">
                    <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark mr-4">
                      Browse More Vendors
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SavedVendors;
