
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

const GuestListWidget = () => {
  const guestData = {
    total: 120,
    confirmed: 68,
    declined: 12,
    pending: 40
  };

  const confirmationRate = Math.round((guestData.confirmed / guestData.total) * 100);
  const declineRate = Math.round((guestData.declined / guestData.total) * 100);
  const pendingRate = Math.round((guestData.pending / guestData.total) * 100);

  return (
    <Card className="shadow-sm border-theme-cream/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-theme-brown flex items-center gap-2">
          <Users className="h-5 w-5 text-theme-sage" />
          Guest List
        </CardTitle>
        <p className="text-sm text-theme-brown-light">RSVP status overview</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-theme-brown">{guestData.total}</p>
          <p className="text-sm text-theme-brown-light">Total Invited</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-theme-brown-light">Response Progress</span>
            <span className="text-theme-brown-light">{100 - pendingRate}% responded</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-full flex">
              <div 
                className="bg-green-500 transition-all duration-500" 
                style={{ width: `${confirmationRate}%` }}
              />
              <div 
                className="bg-red-400 transition-all duration-500" 
                style={{ width: `${declineRate}%` }}
              />
              <div 
                className="bg-gray-400 transition-all duration-500" 
                style={{ width: `${pendingRate}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-green-50 rounded-lg">
            <UserCheck className="h-4 w-4 text-green-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-green-700">{guestData.confirmed}</p>
            <p className="text-xs text-green-600">Attending</p>
          </div>
          
          <div className="p-2 bg-red-50 rounded-lg">
            <UserX className="h-4 w-4 text-red-500 mx-auto mb-1" />
            <p className="text-sm font-medium text-red-600">{guestData.declined}</p>
            <p className="text-xs text-red-500">Declined</p>
          </div>
          
          <div className="p-2 bg-gray-50 rounded-lg">
            <Clock className="h-4 w-4 text-gray-500 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-600">{guestData.pending}</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
        </div>
        
        <Button className="w-full bg-theme-sage hover:bg-theme-sage-dark text-white">
          <Users className="h-4 w-4 mr-2" />
          Manage Guest List
        </Button>
      </CardContent>
    </Card>
  );
};

export default GuestListWidget;
