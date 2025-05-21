
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GuestListCard = () => {
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
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-theme-brown">Guest List</CardTitle>
        <p className="text-sm text-theme-brown-light">Track your invitations and RSVPs</p>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-theme-brown-light">Total Guests</p>
            <p className="text-xl font-medium text-theme-brown">{guestData.total}</p>
          </div>
          
          <div>
            <p className="text-sm text-theme-brown-light">Confirmed</p>
            <p className="text-xl font-medium text-theme-brown">{guestData.confirmed}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-green-50 rounded p-2 text-center">
            <p className="text-sm text-green-600 font-medium">{guestData.confirmed}</p>
            <p className="text-xs text-green-600">Attending</p>
          </div>
          
          <div className="bg-red-50 rounded p-2 text-center">
            <p className="text-sm text-red-500 font-medium">{guestData.declined}</p>
            <p className="text-xs text-red-500">Declined</p>
          </div>
          
          <div className="bg-gray-50 rounded p-2 text-center">
            <p className="text-sm text-gray-500 font-medium">{guestData.pending}</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-theme-brown mb-2">Recent RSVPs</p>
          
          <div className="space-y-2">
            {guestData.recentRSVPs.map((rsvp, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-theme-brown">{rsvp.name}</span>
                <span 
                  className={`text-xs px-2 py-0.5 rounded ${
                    rsvp.status === 'attending' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
                  }`}
                >
                  {rsvp.status === 'attending' ? 'Attending' : 'Declined'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <button className="text-sm text-theme-sage hover:text-theme-sage-dark">
          Manage Guest List
        </button>
      </CardContent>
    </Card>
  );
};

export default GuestListCard;
