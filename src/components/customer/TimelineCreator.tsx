
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Clock, Download, User, X, GripVertical } from "lucide-react";

// Sample data - would be replaced with actual user data from backend
const initialEvents = [
  { 
    id: 1, 
    time: "09:00", 
    title: "Hair & Makeup", 
    description: "For bride and bridesmaids", 
    location: "Bridal Suite",
    assignedTo: "Beauty Team"
  },
  { 
    id: 2, 
    time: "13:00", 
    title: "First Look Photos", 
    description: "Private moment with photographer", 
    location: "Garden Gazebo",
    assignedTo: "Photographer"
  },
  { 
    id: 3, 
    time: "15:00", 
    title: "Ceremony", 
    description: "Wedding ceremony begins", 
    location: "Main Hall",
    assignedTo: "All Vendors"
  },
  { 
    id: 4, 
    time: "16:00", 
    title: "Cocktail Hour", 
    description: "Drinks and canapés", 
    location: "Terrace",
    assignedTo: "Caterer"
  },
  { 
    id: 5, 
    time: "17:30", 
    title: "Reception Dinner", 
    description: "Formal dinner service", 
    location: "Ballroom",
    assignedTo: "Catering Team"
  },
];

const TimelineCreator = () => {
  const [events, setEvents] = useState(initialEvents);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ 
    time: "", 
    title: "", 
    description: "", 
    location: "", 
    assignedTo: ""
  });
  const [timelineDate, setTimelineDate] = useState("2024-06-15"); // Example wedding date
  
  const handleAddEvent = () => {
    if (newEvent.time && newEvent.title) {
      setEvents([
        ...events.sort((a, b) => a.time.localeCompare(b.time)),
        {
          id: events.length + 1,
          ...newEvent
        }
      ].sort((a, b) => a.time.localeCompare(b.time)));
      
      setNewEvent({ time: "", title: "", description: "", location: "", assignedTo: "" });
      setShowAddForm(false);
    }
  };
  
  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };
  
  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Wedding Day Timeline</h3>
              <div className="flex items-center">
                <Label htmlFor="timeline-date" className="mr-2">Date:</Label>
                <Input 
                  id="timeline-date"
                  type="date" 
                  value={timelineDate}
                  onChange={(e) => setTimelineDate(e.target.value)}
                  className="w-auto"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
              <Button onClick={() => setShowAddForm(!showAddForm)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Add Event Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Timeline Event</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-time">Time</Label>
                <Input 
                  id="event-time"
                  type="time" 
                  value={newEvent.time} 
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input 
                  id="event-title"
                  placeholder="What's happening?" 
                  value={newEvent.title} 
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="event-description">Description</Label>
                <Input 
                  id="event-description"
                  placeholder="Additional details" 
                  value={newEvent.description} 
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-location">Location</Label>
                <Input 
                  id="event-location"
                  placeholder="Where is this happening?" 
                  value={newEvent.location} 
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assigned-to">Assigned To</Label>
                <Input 
                  id="assigned-to"
                  placeholder="Who is responsible?" 
                  value={newEvent.assignedTo} 
                  onChange={(e) => setNewEvent({...newEvent, assignedTo: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button onClick={handleAddEvent}>Add to Timeline</Button>
            <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Timeline View */}
      <Card>
        <CardHeader>
          <CardTitle>Wedding Day Schedule</CardTitle>
          <CardDescription>
            Timeline for {new Date(timelineDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No events added yet. Create your first timeline event.</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[29px] top-0 bottom-0 w-[2px] bg-muted" />
              
              {/* Timeline events */}
              <div className="space-y-4">
                {events.sort((a, b) => a.time.localeCompare(b.time)).map((event, index) => (
                  <div key={event.id}>
                    <div className="flex gap-4">
                      {/* Time marker */}
                      <div className="relative">
                        <Clock className="h-6 w-6 text-theme-brown z-10 bg-white rounded-full p-1 border" />
                      </div>
                      
                      {/* Event card */}
                      <div className="bg-muted/40 border rounded-md p-3 flex-1 ml-2">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-bold">
                                {event.time.split(':').map((part, i) => 
                                  parseInt(part)).join(':')
                                }
                              </span>
                              <h3 className="font-medium">{event.title}</h3>
                            </div>
                            {event.description && (
                              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                            )}
                          </div>
                          
                          <div className="flex items-center">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-move">
                              <GripVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 mt-2">
                          {event.location && (
                            <div className="text-xs text-muted-foreground">
                              <span className="font-medium">Location:</span> {event.location}
                            </div>
                          )}
                          
                          {event.assignedTo && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <User className="h-3 w-3 mr-1" />
                              {event.assignedTo}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Connect to next event */}
                    {index < events.length - 1 && (
                      <div className="pl-[29px] py-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="ml-4">
                            {calculateTimeDifference(event.time, events[index + 1].time)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper to calculate time difference between events
const calculateTimeDifference = (startTime: string, endTime: string) => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  let diffHours = endHours - startHours;
  let diffMinutes = endMinutes - startMinutes;
  
  if (diffMinutes < 0) {
    diffHours -= 1;
    diffMinutes += 60;
  }
  
  if (diffHours === 0) {
    return `${diffMinutes} min`;
  } else if (diffMinutes === 0) {
    return `${diffHours} hr`;
  } else {
    return `${diffHours} hr ${diffMinutes} min`;
  }
};

export default TimelineCreator;
