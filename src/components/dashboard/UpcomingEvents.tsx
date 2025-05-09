
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "Venue Tour",
    date: "June 15, 2025",
    time: "10:00 AM",
    location: "Dream Gardens",
  },
  {
    title: "Catering Tasting",
    date: "June 22, 2025",
    time: "2:30 PM",
    location: "Gourmet Catering Co.",
  },
  {
    title: "Wedding Dress Fitting",
    date: "July 3, 2025",
    time: "11:00 AM",
    location: "Bridal Boutique",
  },
];

const UpcomingEvents = () => {
  return (
    <Card className="border border-wednest-beige shadow-sm">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-wednest-brown text-xl">Upcoming Events</CardTitle>
          <CardDescription className="text-wednest-brown-light">
            Your next appointments and deadlines
          </CardDescription>
        </div>
        <Button variant="outline" className="text-wednest-brown text-xs h-8 px-3">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg flex justify-between items-center ${
                index === 0 ? "bg-wednest-sage bg-opacity-10" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`rounded-full p-2 ${index === 0 ? "bg-wednest-sage bg-opacity-20" : "bg-gray-100"}`}>
                  <CalendarDays className={`h-5 w-5 ${index === 0 ? "text-wednest-sage" : "text-gray-500"}`} />
                </div>
                <div>
                  <p className={`font-medium ${index === 0 ? "text-wednest-brown" : "text-gray-700"}`}>{event.title}</p>
                  <div className="flex items-center text-sm mt-1">
                    <span className={index === 0 ? "text-wednest-brown-light" : "text-gray-500"}>
                      {event.date} • {event.time}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${index === 0 ? "text-wednest-brown-light" : "text-gray-500"}`}>
                    {event.location}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
