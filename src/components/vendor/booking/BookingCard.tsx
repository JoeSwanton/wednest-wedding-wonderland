
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface BookingCardProps {
  booking: {
    id: number;
    clientName: string;
    type: string;
    status: string;
    date: Date;
    time: string;
    location: string;
    notes: string;
  };
  onClick: () => void;
  isPast?: boolean;
}

const BookingCard = ({ booking, onClick, isPast = false }: BookingCardProps) => {
  return (
    <div 
      className={`overflow-hidden hover:shadow-md transition-shadow cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm ${isPast ? 'opacity-80' : ''}`}
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
      <div className="p-6 pt-4">
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
      </div>
    </div>
  );
};

export default BookingCard;
