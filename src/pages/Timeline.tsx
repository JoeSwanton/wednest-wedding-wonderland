
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Plus, Users, Camera, Music } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  duration: number; // in minutes
  category: "ceremony" | "reception" | "photos" | "transport" | "preparation" | "party";
  attendees?: string[];
  notes?: string;
}

const Timeline = () => {
  const { user } = useAuth();
  
  // Empty timeline events - no mock data
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ceremony": return <Calendar className="h-4 w-4" />;
      case "reception": return <Users className="h-4 w-4" />;
      case "photos": return <Camera className="h-4 w-4" />;
      case "transport": return <MapPin className="h-4 w-4" />;
      case "preparation": return <Clock className="h-4 w-4" />;
      case "party": return <Music className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ceremony": return "bg-red-100 text-red-800 border-red-200";
      case "reception": return "bg-blue-100 text-blue-800 border-blue-200";
      case "photos": return "bg-purple-100 text-purple-800 border-purple-200";
      case "transport": return "bg-green-100 text-green-800 border-green-200";
      case "preparation": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "party": return "bg-pink-100 text-pink-800 border-pink-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const totalDuration = events.reduce((sum, event) => sum + event.duration, 0);
  const totalHours = Math.floor(totalDuration / 60);
  const remainingMins = totalDuration % 60;

  return (
    <div className="min-h-screen flex bg-theme-cream/10">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-serif font-semibold text-theme-brown mb-2">Wedding Day Timeline</h1>
            <p className="text-theme-brown-light">Plan your perfect wedding day schedule</p>
          </div>

          {/* Timeline Overview */}
          <Card className="mb-6 bg-white border-theme-cream shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-theme-brown">{events.length}</div>
                  <div className="text-sm text-theme-brown-light">Total Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-theme-brown">{totalHours}h {remainingMins}m</div>
                  <div className="text-sm text-theme-brown-light">Total Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-theme-brown">{events[0]?.time || "TBD"}</div>
                  <div className="text-sm text-theme-brown-light">Start Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-theme-brown">{events[events.length - 1]?.time || "TBD"}</div>
                  <div className="text-sm text-theme-brown-light">End Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-white border-theme-cream shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-theme-brown">Wedding Day Schedule</CardTitle>
              <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-theme-brown-light mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-theme-brown mb-2">No events scheduled yet</h3>
                  <p className="text-theme-brown-light mb-4">Create your perfect wedding day timeline by adding your first event.</p>
                  <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Event
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {events.map((event, index) => (
                    <div key={event.id} className="relative">
                      {/* Timeline connector */}
                      {index < events.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-theme-cream"></div>
                      )}
                      
                      <div className="flex gap-4">
                        {/* Time marker */}
                        <div className="flex flex-col items-center min-w-[60px]">
                          <div className="bg-theme-brown text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold text-sm">
                            {event.time}
                          </div>
                          <div className="text-xs text-theme-brown-light mt-1">
                            {formatDuration(event.duration)}
                          </div>
                        </div>
                        
                        {/* Event details */}
                        <div className="flex-1 border border-theme-cream/50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold text-theme-brown">{event.title}</h4>
                              <Badge variant="outline" className={getCategoryColor(event.category)}>
                                <span className="mr-1">{getCategoryIcon(event.category)}</span>
                                {event.category}
                              </Badge>
                            </div>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                          
                          <p className="text-theme-brown-light mb-3">{event.description}</p>
                          
                          {event.location && (
                            <div className="flex items-center gap-2 text-sm text-theme-brown-light mb-2">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          
                          {event.attendees && event.attendees.length > 0 && (
                            <div className="flex items-center gap-2 text-sm text-theme-brown-light mb-2">
                              <Users className="h-4 w-4" />
                              <span>{event.attendees.join(", ")}</span>
                            </div>
                          )}
                          
                          {event.notes && (
                            <div className="mt-3 p-3 bg-theme-cream/20 rounded-md">
                              <p className="text-sm text-theme-brown-light">
                                <strong>Notes:</strong> {event.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
