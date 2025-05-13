
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import VendorLayout from "@/components/vendor/VendorLayout";
import CalendarView from "@/components/vendor/booking/CalendarView";
import BookingListView from "@/components/vendor/booking/BookingListView";
import BookingDialog from "@/components/vendor/booking/BookingDialog";
import BlockDateDialog from "@/components/vendor/booking/BlockDateDialog";
import { useBookingsData } from "@/hooks/useBookingsData";
import { XCircle } from "lucide-react";

const VendorBookings = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isViewBookingDialogOpen, setIsViewBookingDialogOpen] = useState(false);
  
  const { bookings, blockedDates, upcomingBookings, pastBookings, addBlockedDate } = useBookingsData();

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsViewBookingDialogOpen(true);
  };
  
  const handleBlockDate = (values) => {
    addBlockedDate(values);
    setIsBlockDialogOpen(false);
  };

  return (
    <VendorLayout title="Bookings & Calendar">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-serif text-wednest-brown">Manage Your Schedule</h2>
          <Button 
            variant="outline"
            className="border-wednest-sage text-wednest-sage hover:bg-wednest-sage hover:text-white"
            onClick={() => setIsBlockDialogOpen(true)}
          >
            <XCircle className="h-4 w-4 mr-2" /> Block Date
          </Button>
        </div>
        
        <Tabs defaultValue="calendar" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
            <TabsTrigger value="past">Past Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <CalendarView 
              bookings={bookings} 
              blockedDates={blockedDates} 
              onViewBooking={handleViewBooking}
            />
          </TabsContent>
          
          <TabsContent value="upcoming">
            <BookingListView 
              bookings={upcomingBookings}
              onViewBooking={handleViewBooking}
            />
          </TabsContent>
          
          <TabsContent value="past">
            <BookingListView 
              bookings={pastBookings}
              isPast
              onViewBooking={handleViewBooking}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <BookingDialog
        booking={selectedBooking}
        isOpen={isViewBookingDialogOpen}
        onOpenChange={setIsViewBookingDialogOpen}
      />
      
      <BlockDateDialog
        isOpen={isBlockDialogOpen}
        onOpenChange={setIsBlockDialogOpen}
        onBlockDate={handleBlockDate}
      />
    </VendorLayout>
  );
};

export default VendorBookings;
