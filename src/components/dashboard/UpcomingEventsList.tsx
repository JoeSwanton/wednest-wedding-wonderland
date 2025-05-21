
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronRight, Plus } from "lucide-react";

const UpcomingEventsList = () => {
  // Mock data - in a real app this would come from API/state
  const events = [
    {
      title: "Venue Tour",
      date: "JUN 15",
      time: "10:00 AM",
      location: "Dream Gardens",
    },
    {
      title: "Catering Tasting",
      date: "JUN 22",
      time: "2:30 PM",
      location: "Gourmet Catering Co.",
    },
    {
      title: "Wedding Dress Fitting",
      date: "JUL 3",
      time: "11:00 AM",
      location: "Bridal Boutique",
    }
  ];
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg text-theme-brown">Upcoming Events</CardTitle>
          <p className="text-sm text-theme-brown-light">Your next appointments and deadlines</p>
        </div>
        
        <Button variant="outline" size="sm" className="h-8 text-xs text-theme-brown">
          View All
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {events.map((event, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center bg-theme-cream/20 w-10 h-14 rounded-md">
                <span className="text-xs text-theme-brown-light">{event.date.split(' ')[0]}</span>
                <span className="text-lg font-medium text-theme-brown">{event.date.split(' ')[1]}</span>
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-theme-brown">{event.title}</p>
                <p className="text-xs text-theme-brown-light">{event.time} • {event.location}</p>
              </div>
              
              <ChevronRight className="h-4 w-4 text-theme-brown-light mt-1" />
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-theme-brown hover:bg-theme-brown-dark text-white flex items-center justify-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Add New Event</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingEventsList;
