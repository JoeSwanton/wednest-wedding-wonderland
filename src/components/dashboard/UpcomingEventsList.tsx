
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronRight, Plus, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const UpcomingEventsList = () => {
  // Mock data - in a real app this would come from API/state
  const events = [
    {
      id: 1,
      title: "Venue Tour",
      date: "JUN 15",
      time: "10:00 AM",
      location: "Dream Gardens",
      category: "venue",
      confirmed: true
    },
    {
      id: 2,
      title: "Catering Tasting",
      date: "JUN 22",
      time: "2:30 PM",
      location: "Gourmet Catering Co.",
      category: "food",
      confirmed: true
    },
    {
      id: 3,
      title: "Wedding Dress Fitting",
      date: "JUL 3",
      time: "11:00 AM",
      location: "Bridal Boutique",
      category: "attire",
      confirmed: false
    },
    {
      id: 4,
      title: "Florist Consultation",
      date: "JUL 10",
      time: "1:00 PM",
      location: "Bloom Designs",
      category: "decor",
      confirmed: false
    }
  ];
  
  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'venue':
        return 'bg-purple-100 text-purple-600';
      case 'food':
        return 'bg-green-100 text-green-600';
      case 'attire':
        return 'bg-blue-100 text-blue-600';
      case 'decor':
        return 'bg-pink-100 text-pink-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  return (
    <Card className="shadow-sm border-theme-cream/30 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-lg text-theme-brown flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-theme-brown-light" />
            Upcoming Events
          </CardTitle>
          <p className="text-sm text-theme-brown-light">Your next appointments and deadlines</p>
        </div>
        
        <Button variant="outline" size="sm" className="h-8 text-xs text-theme-brown border-theme-brown-light/30 hover:bg-theme-cream/10">
          View All
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer group transition-all duration-200"
            >
              <div className="flex flex-col items-center justify-center bg-theme-cream/30 w-12 h-16 rounded-md border border-theme-cream/50 shadow-sm">
                <span className="text-xs text-theme-brown-light font-medium">{event.date.split(' ')[0]}</span>
                <span className="text-lg font-bold text-theme-brown">{event.date.split(' ')[1]}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm text-theme-brown">{event.title}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                      <p className="text-xs text-theme-brown-light flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 
                        {event.time}
                      </p>
                      <p className="text-xs text-theme-brown-light flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> 
                        {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <Badge className={`text-[10px] px-1.5 py-0.5 ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </Badge>
                    {event.confirmed ? (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 border-green-200 text-green-600 bg-green-50">
                        confirmed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 border-orange-200 text-orange-500 bg-orange-50">
                        pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <ChevronRight className="h-4 w-4 text-theme-brown-light opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-theme-brown hover:bg-theme-brown-dark text-white flex items-center justify-center gap-1.5 shadow-sm">
          <Plus className="h-4 w-4" />
          <span>Add New Event</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingEventsList;
