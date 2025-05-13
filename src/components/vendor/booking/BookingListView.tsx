
import { Card, CardContent } from "@/components/ui/card";
import BookingCard from "./BookingCard";

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

interface BookingListViewProps {
  bookings: Booking[];
  isPast?: boolean;
  onViewBooking: (booking: Booking) => void;
}

const BookingListView = ({ bookings, isPast = false, onViewBooking }: BookingListViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {bookings.length > 0 ? 
        bookings.map(booking => (
          <BookingCard 
            key={booking.id} 
            booking={booking} 
            onClick={() => onViewBooking(booking)}
            isPast={isPast}
          />
        ))
        : 
        <Card className="col-span-full">
          <CardContent className="py-10 text-center">
            <p>No {isPast ? 'past' : 'upcoming'} bookings found.</p>
          </CardContent>
        </Card>
      }
    </div>
  );
};

export default BookingListView;
