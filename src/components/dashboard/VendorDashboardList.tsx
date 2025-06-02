
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const VendorDashboardList = () => {
  // Mock data - in a real app this would come from API/state
  const vendors = {
    booked: [
      {
        id: 1,
        name: "Dream Gardens",
        type: "Venue",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=100&q=80",
        status: "confirmed"
      }
    ],
    inquiries: [
      {
        id: 2,
        name: "Gourmet Celebrations",
        type: "Caterer",
        image: "",
        status: "deposit paid"
      }
    ],
    favorites: [
      {
        id: 3,
        name: "Bloom & Petal",
        type: "Florist",
        image: "https://images.unsplash.com/photo-1553701275-1d6118df733e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=100&q=80",
        status: "confirmed"
      }
    ]
  };
  
  const renderVendorCards = (vendorList) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vendorList.map((vendor) => (
          <ErrorBoundary key={vendor.id}>
            <Card className="overflow-hidden">
              <div 
                className="h-28 bg-gray-200 bg-cover bg-center" 
                style={{
                  backgroundImage: vendor.image ? `url(${vendor.image})` : undefined
                }}
              >
                {!vendor.image && (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <CardContent className="pt-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-theme-brown">{vendor.name}</h3>
                    <p className="text-xs text-theme-brown-light">{vendor.type}</p>
                  </div>
                  {vendor.status && (
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                      {vendor.status}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="text-xs flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs flex-1">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ErrorBoundary>
        ))}
      </div>
    );
  };
  
  return (
    <ErrorBoundary>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg text-theme-brown">Your Vendors</CardTitle>
            <p className="text-sm text-theme-brown-light">Manage your wedding vendors</p>
          </div>
          
          <Button className="bg-theme-sage hover:bg-theme-sage-dark text-white flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Vendor</span>
          </Button>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="booked" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="booked">Booked ({vendors.booked.length})</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries ({vendors.inquiries.length})</TabsTrigger>
              <TabsTrigger value="favorites">Favorites ({vendors.favorites.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="booked">
              {renderVendorCards(vendors.booked)}
            </TabsContent>
            
            <TabsContent value="inquiries">
              {renderVendorCards(vendors.inquiries)}
            </TabsContent>
            
            <TabsContent value="favorites">
              {renderVendorCards(vendors.favorites)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};

export default VendorDashboardList;
