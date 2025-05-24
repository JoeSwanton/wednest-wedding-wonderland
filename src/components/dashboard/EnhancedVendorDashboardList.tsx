
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, MessageSquare, Eye, MapPin } from "lucide-react";

const EnhancedVendorDashboardList = () => {
  // Mock data - in a real app this would come from API/state
  const vendors = {
    booked: [
      {
        id: 1,
        name: "Dream Gardens",
        type: "Venue",
        location: "Downtown",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=100&q=80",
        status: "confirmed",
        statusColor: "bg-green-100 text-green-700"
      }
    ],
    inquiries: [
      {
        id: 2,
        name: "Gourmet Celebrations",
        type: "Caterer",
        location: "Midtown",
        image: "",
        status: "pending",
        statusColor: "bg-yellow-100 text-yellow-700"
      }
    ],
    favorites: [
      {
        id: 3,
        name: "Bloom & Petal",
        type: "Florist",
        location: "Garden District",
        image: "https://images.unsplash.com/photo-1553701275-1d6118df733e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=100&q=80",
        status: "favorited",
        statusColor: "bg-pink-100 text-pink-700"
      }
    ]
  };
  
  const renderVendorCards = (vendorList) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {vendorList.map((vendor) => (
          <Card key={vendor.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow border-theme-cream/30">
            <div className="relative">
              <div 
                className="h-32 bg-gray-200 bg-cover bg-center" 
                style={{
                  backgroundImage: vendor.image ? `url(${vendor.image})` : undefined
                }}
              >
                {!vendor.image && (
                  <div className="h-full w-full flex items-center justify-center text-gray-400 bg-theme-cream/20">
                    No image
                  </div>
                )}
              </div>
              <Badge className={`absolute top-2 right-2 ${vendor.statusColor} border-0`}>
                {vendor.status}
              </Badge>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-theme-brown">{vendor.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <Badge variant="outline" className="text-xs border-theme-sage/30 text-theme-sage">
                      {vendor.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-theme-brown-light">
                      <MapPin className="h-3 w-3" />
                      {vendor.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs border-theme-sage/30 hover:bg-theme-sage/5">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Message
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-xs hover:bg-theme-cream/20">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  return (
    <Card className="shadow-sm border-theme-cream/30">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg text-theme-brown">Your Vendors</CardTitle>
          <p className="text-sm text-theme-brown-light">Manage your wedding vendors</p>
        </div>
        
        <Button className="bg-theme-sage hover:bg-theme-sage-dark text-white flex items-center gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          <span>Add Vendor</span>
        </Button>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="booked" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 bg-theme-cream/20">
            <TabsTrigger value="booked" className="text-sm data-[state=active]:bg-white data-[state=active]:text-theme-brown">
              Booked ({vendors.booked.length})
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="text-sm data-[state=active]:bg-white data-[state=active]:text-theme-brown">
              Inquiries ({vendors.inquiries.length})
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-sm data-[state=active]:bg-white data-[state=active]:text-theme-brown">
              Favorites ({vendors.favorites.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="booked" className="mt-0">
            {renderVendorCards(vendors.booked)}
          </TabsContent>
          
          <TabsContent value="inquiries" className="mt-0">
            {renderVendorCards(vendors.inquiries)}
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-0">
            {renderVendorCards(vendors.favorites)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedVendorDashboardList;
