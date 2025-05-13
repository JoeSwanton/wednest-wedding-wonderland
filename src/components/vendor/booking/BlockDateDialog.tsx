
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

// Form schema for blocked dates
const dateFormSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  reason: z.string().optional(),
});

type DateFormValues = z.infer<typeof dateFormSchema>;

interface BlockDateDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onBlockDate: (values: { date: Date; reason: string }) => void;
}

const BlockDateDialog = ({ isOpen, onOpenChange, onBlockDate }: BlockDateDialogProps) => {
  // Create form for blocking dates
  const form = useForm<DateFormValues>({
    resolver: zodResolver(dateFormSchema),
    defaultValues: {
      date: new Date(),
      reason: "",
    },
  });
  
  const handleSubmit = (values: DateFormValues) => {
    onBlockDate({
      date: values.date,
      reason: values.reason || "Unavailable",
    });
    
    form.reset();
    
    toast({
      title: "Date blocked",
      description: `You've blocked ${format(values.date, "MMMM d, yyyy")} in your calendar.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
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
              control={form.control}
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
  );
};

export default BlockDateDialog;
