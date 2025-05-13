
import { format } from "date-fns";
import { CalendarCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface BookingDialogProps {
  booking: {
    id: number;
    clientName: string;
    type: string;
    status: string;
    date: Date;
    time: string;
    location: string;
    notes: string;
  } | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingDialog = ({ booking, isOpen, onOpenChange }: BookingDialogProps) => {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-wednest-brown font-serif flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-wednest-sage" />
            {booking.type}
          </DialogTitle>
          <DialogDescription>
            Booking details for {booking.clientName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Date</h4>
              <p>{format(booking.date, 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Time</h4>
              <p>{booking.time}</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-sm font-medium text-gray-500">Location</h4>
              <p>{booking.location}</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-sm font-medium text-gray-500">Status</h4>
              <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
              </Badge>
            </div>
            <div className="col-span-2">
              <h4 className="text-sm font-medium text-gray-500">Notes</h4>
              <p className="text-sm">{booking.notes}</p>
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
          {booking.status !== 'confirmed' && (
            <Button 
              className="bg-wednest-sage hover:bg-wednest-sage-dark"
            >
              Confirm Booking
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
