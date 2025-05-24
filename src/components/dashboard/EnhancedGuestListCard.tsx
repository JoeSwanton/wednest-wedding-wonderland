
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, UserCheck, UserX } from "lucide-react";

const EnhancedGuestListCard = () => {
  // Mock data - in a real app this would come from API/state
  const guestData = {
    total: 120,
    confirmed: 68,
    declined: 12,
    pending: 40,
    recentRSVPs: [
      { name: "Emma & James", status: "attending" },
      { name: "David Johnson", status: "declined" }
    ]
  };
  
  const confirmationRate = Math.round((guestData.confirmed / guestData.total) * 100);
  
  return (
    <Card className="shadow-sm border-theme-cream/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-theme-brown flex items-center gap-2">
          <Users className="h-5 w-5 text-theme-sage" />
          Guest List
        </CardTitle>
        <p className="text-sm text-theme-brown-light">Track invitations and RSVPs</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-theme-cream/10 rounded-lg p-3">
            <p className="text-sm text-theme-brown-light">Total Invited</p>
            <p className="text-xl font-semibold text-theme-brown">{guestData.total}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-sm text-green-600">Confirmed</p>
            <p className="text-xl font-semibold text-green-700">{guestData.confirmed}</p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-theme-brown-light">Response Rate</span>
            <span className="text-theme-brown-light">{confirmationRate}%</span>
          </div>
          <Progress className="h-2" value={confirmationRate} />
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3 text-center">
              <UserCheck className="h-4 w-4 text-green-600 mx-auto mb-1" />
              <p className="text-sm font-medium text-green-700">{guestData.confirmed}</p>
              <p className="text-xs text-green-600">Attending</p>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-3 text-center">
              <UserX className="h-4 w-4 text-red-500 mx-auto mb-1" />
              <p className="text-sm font-medium text-red-600">{guestData.declined}</p>
              <p className="text-xs text-red-500">Declined</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-3 text-center">
              <Users className="h-4 w-4 text-gray-500 mx-auto mb-1" />
              <p className="text-sm font-medium text-gray-600">{guestData.pending}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </CardContent>
          </Card>
        </div>
        
        <Button className="w-full bg-theme-sage hover:bg-theme-sage-dark text-white">
          Manage Guest List
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnhancedGuestListCard;
