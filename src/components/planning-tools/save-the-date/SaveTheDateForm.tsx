
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SaveTheDateFormProps {
  names: string;
  setNames: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  location: string;
  setLocation: (value: string) => void;
  personalMessage: string;
  setPersonalMessage: (value: string) => void;
  onGenerate: () => void;
}

export const SaveTheDateForm = ({
  names,
  setNames,
  date,
  setDate,
  location,
  setLocation,
  personalMessage,
  setPersonalMessage,
  onGenerate
}: SaveTheDateFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="names">Couple Names</Label>
        <Input 
          id="names" 
          value={names} 
          onChange={(e) => setNames(e.target.value)} 
          placeholder="e.g. Sarah & Michael" 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="date">Wedding Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Wedding Location</Label>
        <Input 
          id="location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          placeholder="e.g. The Grand Hotel, New York" 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="personalMessage">Personal Message</Label>
        <Textarea 
          id="personalMessage" 
          value={personalMessage} 
          onChange={(e) => setPersonalMessage(e.target.value)} 
          placeholder="Add a personal note to your guests" 
          rows={4} 
        />
      </div>
      
      <Button 
        onClick={onGenerate}
        className="w-full bg-theme-brown-light hover:bg-theme-brown text-white"
      >
        Generate Message
      </Button>
    </div>
  );
};
