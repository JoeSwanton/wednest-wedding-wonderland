
import { useState } from "react";
import { format, isSameMonth, isToday } from "date-fns";
import { Calendar as CalendarIcon, CalendarCheck, CalendarClock, Clock, User, XCircle, CheckCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: number;
  clientName: string;
  type: string;
  status: string;
  date: Date;
  time: string;
  location: string;
  notes: string;
}

interface BlockedDate {
  id: number;
  reason: string;
  date: Date;
}

interface CalendarViewProps {
  bookings: Booking[];
  blockedDates: BlockedDate[];
  onViewBooking: (booking: Booking) => void;
}

const CalendarView = ({ bookings, blockedDates, onViewBooking }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  
  // Get all important dates for highlighting on calendar
  const bookedDates = bookings.map(booking => booking.date);
  const unavailableDates = blockedDates.map(blocked => blocked.date);
  
  // Filter bookings based on selected month
  const filteredBookings = bookings.filter(booking => 
    isSameMonth(booking.date, selectedMonth)
  );
  
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
            className="rounded-md border shadow-sm"
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
                    onClick={() => onViewBooking(booking)}
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
  );
};

export default CalendarView;
