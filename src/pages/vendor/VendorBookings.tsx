import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VendorLayout from "@/components/vendor/VendorLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, User, Clock, CheckCircle, XCircle, Calendar as CalendarCheck, CalendarClock } from "lucide-react";
import { format, addDays, isToday, isSameMonth, parse, isWithinInterval } from "date-fns";

// Mock data for bookings
const mockBookings = [
  { 
    id: 1, 
    clientName: "Emma & James",
    type: "Wedding Photography", 
    status: "confirmed", 
    date: new Date(2025, 5, 15),
    time: "11:00 AM - 7:00 PM",
    location: "Rosewood Estate, Hunter Valley",
    notes: "Outdoor ceremony followed by reception in the main hall."
  },
  { 
    id: 2, 
    clientName: "Sophia & William",
    type: "Engagement Session", 
    status: "pending", 
    date: new Date(2025, 5, 22),
    time: "4:00 PM - 6:00 PM",
    location: "Botanical Gardens, Sydney",
    notes: "Couple prefers natural, candid shots. Bring extra lighting for sunset."
  },
  { 
    id: 3, 
    clientName: "Oliver & Charlotte",
    type: "Wedding Photography", 
    status: "confirmed", 
    date: new Date(2025, 6, 8),
    time: "12:00 PM - 8:00 PM",
    location: "Harborview Hotel, Sydney",
    notes: "Indoor ceremony and reception. Requested extra focus on family portraits."
  }
];

// Mock data for blocked dates
const mockBlockedDates = [
  { id: 1, reason: "Personal Time Off", date: new Date(2025, 5, 18) },
  { id: 2, reason: "Equipment Maintenance", date: new Date(2025, 5, 19) },
  { id: 3, reason: "Holiday", date: new Date(2025, 7, 1) }
];

// Form schema for booking and blocked dates
const dateFormSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  reason: z.string().optional(),
});

const VendorBookings = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [bookings, setBookings] = useState(mockBookings);
  const [blockedDates, setBlockedDates] = useState(mockBlockedDates);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isViewBookingDialogOpen, setIsViewBookingDialogOpen] = useState(false);

  // Get all important dates for highlighting on calendar
  const bookedDates = bookings.map(booking => booking.date);
  const unavailableDates = blockedDates.map(blocked => blocked.date);
  
  // Create form for blocking dates
  const blockDateForm = useForm({
    resolver: zodResolver(dateFormSchema),
    defaultValues: {
      date: new Date(),
      reason: "",
    },
  });
  
  const handleBlockDateSubmit = (values) => {
    const newBlockedDate = {
      id: blockedDates.length + 1,
      date: values.date,
      reason: values.reason || "Unavailable",
    };
    
    setBlockedDates([...blockedDates, newBlockedDate]);
    setIsBlockDialogOpen(false);
    blockDateForm.reset();
    
    toast({
      title: "Date blocked",
      description: `You've blocked ${format(values.date, "MMMM d, yyyy")} in your calendar.`,
    });
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsViewBookingDialogOpen(true);
  };
  
  // Filter bookings based on selected month
  const filteredBookings = bookings.filter(booking => 
    isSameMonth(booking.date, selectedMonth)
  );
  
  // Check if a date has a booking or is blocked
  const getDateDetails = (date: Date) => {
    const hasBooking = bookings.some(booking => 
      date.toDateString() === booking.date.toDateString()
    );
    
    const isBlocked = blockedDates.some(blocked => 
      date.toDateString() === blocked.date.toDateString()
    );
    
    return { hasBooking, isBlocked };
  };
  
  // Get events for the selected date
  const dateEvents = {
    bookings: bookings.filter(booking => 
      booking.date.toDateString() === selectedDate?.toDateString()
    ),
    blockedDate: blockedDates.find(blocked => 
      blocked.date.toDateString() === selectedDate?.toDateString()
    ),
  };

  return (
    <VendorLayout title="Bookings & Calendar">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-serif text-wednest-brown">Manage Your Schedule</h2>
          <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline"
                className="border-wednest-sage text-wednest-sage hover:bg-wednest-sage hover:text-white"
              >
                <XCircle className="h-4 w-4 mr-2" /> Block Date
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-wednest-brown font-serif">Block a Date</DialogTitle>
                <DialogDescription>
                  Select a date you want to mark as unavailable in your calendar.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...blockDateForm}>
                <form onSubmit={blockDateForm.handleSubmit(handleBlockDateSubmit)} className="space-y-4">
                  <FormField
                    control={blockDateForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <div className="border rounded-md p-2">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={blockDateForm.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Personal time off" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      className="bg-wednest-sage hover:bg-wednest-sage-dark"
                    >
                      Block Date
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="calendar" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
            <TabsTrigger value="past">Past Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-wednest-sage" />
                    Calendar
                  </CardTitle>
                  <CardDescription>
                    Your schedule for {format(selectedMonth, 'MMMM yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    onMonthChange={setSelectedMonth}
                    className="rounded-md border shadow-sm pointer-events-auto"
                    modifiers={{
                      booked: bookedDates,
                      blocked: unavailableDates,
                      today: [new Date()],
                    }}
                    modifiersStyles={{
                      booked: { 
                        backgroundColor: '#E6DFD2', 
                        color: '#695F4C',
                        fontWeight: 'bold',
                      },
                      blocked: { 
                        backgroundColor: '#F8C4B4', 
                        color: '#8B5A4C',
                        textDecoration: 'line-through',
                      },
                      today: {
                        border: '2px solid #7D8E74',
                      }
                    }}
                    classNames={{
                      day_today: "bg-wednest-sage-light text-white",
                    }}
                  />
                </CardContent>
              </Card>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarCheck className="h-5 w-5 text-wednest-sage" />
                      {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'No Date Selected'}
                    </CardTitle>
                    <CardDescription>
                      {isToday(selectedDate) ? 'Today' : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {dateEvents.bookings.length > 0 ? (
                      <div className="space-y-4">
                        {dateEvents.bookings.map(booking => (
                          <div 
                            key={booking.id} 
                            className="p-3 border rounded-md cursor-pointer hover:border-wednest-sage transition-colors"
                            onClick={() => handleViewBooking(booking)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-wednest-sage" />
                                <span className="font-medium">{booking.clientName}</span>
                              </div>
                              <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}>
                                {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                              </Badge>
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="mt-1 text-sm text-gray-600">
                              {booking.type}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : dateEvents.blockedDate ? (
                      <div className="p-3 border border-red-200 rounded-md bg-red-50">
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="h-4 w-4" />
                          <span className="font-medium">Date Unavailable</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {dateEvents.blockedDate.reason}
                        </p>
                      </div>
                    ) : (
                      <p className="text-center py-6 text-wednest-brown-light">
                        No events scheduled for this date.
                      </p>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CalendarClock className="h-5 w-5 text-wednest-sage" />
                      This Month
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {filteredBookings.length > 0 ? (
                      <div className="space-y-3">
                        {filteredBookings.map(booking => (
                          <div key={booking.id} className="flex items-center justify-between text-sm border-b pb-2 last:border-b-0">
                            <div>
                              <span className="font-medium">{format(booking.date, 'd')}</span>
                              <span className="text-gray-500"> - {booking.clientName}</span>
                            </div>
                            {booking.status === 'confirmed' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <CalendarClock className="h-4 w-4 text-amber-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-4 text-wednest-brown-light">
                        No bookings this month.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {bookings.filter(b => b.date >= new Date()).length > 0 ? 
                bookings
                  .filter(b => b.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map(booking => (
                    <BookingCard 
                      key={booking.id} 
                      booking={booking} 
                      onClick={() => handleViewBooking(booking)}
                    />
                  ))
                : 
                <Card className="col-span-full">
                  <CardContent className="py-10 text-center">
                    <p>No upcoming bookings found.</p>
                  </CardContent>
                </Card>
              }
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {bookings.filter(b => b.date < new Date()).length > 0 ? 
                bookings
                  .filter(b => b.date < new Date())
                  .sort((a, b) => b.date.getTime() - a.date.getTime())
                  .map(booking => (
                    <BookingCard 
                      key={booking.id} 
                      booking={booking} 
                      onClick={() => handleViewBooking(booking)}
                      isPast
                    />
                  ))
                : 
                <Card className="col-span-full">
                  <CardContent className="py-10 text-center">
                    <p>No past bookings found.</p>
                  </CardContent>
                </Card>
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* View Booking Dialog */}
      <Dialog open={isViewBookingDialogOpen} onOpenChange={setIsViewBookingDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle className="text-wednest-brown font-serif flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-wednest-sage" />
                  {selectedBooking.type}
                </DialogTitle>
                <DialogDescription>
                  Booking details for {selectedBooking.clientName}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date</h4>
                    <p>{format(selectedBooking.date, 'MMMM d, yyyy')}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Time</h4>
                    <p>{selectedBooking.time}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p>{selectedBooking.location}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <Badge className={selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                      {selectedBooking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                    <p className="text-sm">{selectedBooking.notes}</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex justify-between items-center">
                <Button 
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  Cancel Booking
                </Button>
                {selectedBooking.status !== 'confirmed' && (
                  <Button 
                    className="bg-wednest-sage hover:bg-wednest-sage-dark"
                  >
                    Confirm Booking
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </VendorLayout>
  );
};

const BookingCard = ({ booking, onClick, isPast = false }) => {
  return (
    <Card 
      className={`overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${isPast ? 'opacity-80' : ''}`}
      onClick={onClick}
    >
      <div className={`p-3 text-white ${booking.status === 'confirmed' ? 'bg-wednest-sage' : 'bg-wednest-brown-light'}`}>
        <div className="flex justify-between items-center">
          <div className="font-medium">{format(booking.date, 'MMMM d, yyyy')}</div>
          <Badge className={booking.status === 'confirmed' 
            ? 'bg-white text-wednest-sage hover:bg-gray-100' 
            : 'bg-white text-wednest-brown hover:bg-gray-100'
          }>
            {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
          </Badge>
        </div>
        <div className="text-sm">{booking.time}</div>
      </div>
      <CardContent className="pt-4">
        <h3 className="font-medium text-wednest-brown">{booking.clientName}</h3>
        <p className="text-sm text-gray-500 mt-1">{booking.type}</p>
        <div className="text-sm mt-3 flex items-start gap-2">
          <span className="flex-shrink-0 mt-1">📍</span>
          <span>{booking.location}</span>
        </div>
        <div className="border-t mt-4 pt-2 text-sm">
          <div className="line-clamp-2 text-gray-600">
            {booking.notes}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorBookings;
