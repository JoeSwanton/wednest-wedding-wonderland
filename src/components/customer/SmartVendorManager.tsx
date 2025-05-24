
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Camera, MapPin, Music, Utensils, Flower, Car, Building } from "lucide-react";

const SmartVendorManager = () => {
  const vendorCategories = [
    {
      name: "Venue",
      icon: Building,
      status: "booked",
      vendor: "Dream Gardens",
      color: "bg-green-100 text-green-700"
    },
    {
      name: "Photographer",
      icon: Camera,
      status: "inquired",
      vendor: "Snapshot Studios",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      name: "Caterer",
      icon: Utensils,
      status: "none",
      vendor: null,
      color: "bg-gray-100 text-gray-600"
    },
    {
      name: "Florist",
      icon: Flower,
      status: "none",
      vendor: null,
      color: "bg-gray-100 text-gray-600"
    },
    {
      name: "Music/DJ",
      icon: Music,
      status: "none",
      vendor: null,
      color: "bg-gray-100 text-gray-600"
    },
    {
      name: "Transport",
      icon: Car,
      status: "none",
      vendor: null,
      color: "bg-gray-100 text-gray-600"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'booked':
        return '✅';
      case 'inquired':
        return '📥';
      case 'favorited':
        return '💖';
      default:
        return '➕';
    }
  };

  const getActionText = (status: string, categoryName: string) => {
    switch (status) {
      case 'booked':
        return 'Manage';
      case 'inquired':
        return 'Follow Up';
      case 'favorited':
        return 'Inquire';
      default:
        return `Add ${categoryName}`;
    }
  };

  return (
    <Card className="shadow-sm border-theme-cream/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-theme-brown flex items-center gap-2">
          <Building className="h-5 w-5 text-theme-sage" />
          Manage My Vendors
        </CardTitle>
        <p className="text-sm text-theme-brown-light">Track your wedding vendor bookings</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {vendorCategories.map((category, index) => {
          const IconComponent = category.icon;
          
          return (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-theme-cream/5 hover:bg-theme-cream/10 rounded-lg border border-theme-cream/30 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-theme-sage/10 rounded-full p-2">
                  <IconComponent className="h-4 w-4 text-theme-sage" />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-theme-brown">{category.name}</span>
                    <span className="text-lg">{getStatusIcon(category.status)}</span>
                  </div>
                  
                  {category.vendor ? (
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-theme-brown-light">{category.vendor}</p>
                      <Badge className={`text-xs ${category.color} border-0`}>
                        {category.status}
                      </Badge>
                    </div>
                  ) : (
                    <p className="text-xs text-theme-brown-light">No vendor selected</p>
                  )}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="border-theme-sage/30 text-theme-sage hover:bg-theme-sage/5 opacity-80 group-hover:opacity-100 transition-opacity"
              >
                {getActionText(category.status, category.name)}
              </Button>
            </div>
          );
        })}
        
        <Button className="w-full mt-4 bg-theme-sage hover:bg-theme-sage-dark text-white">
          <Plus className="h-4 w-4 mr-2" />
          Browse All Vendors
        </Button>
      </CardContent>
    </Card>
  );
};

export default SmartVendorManager;
