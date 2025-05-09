
import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionContainer } from "./QuestionContainer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";

interface DateStepProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const DateStep = ({ data, updateData, onNext, onBack }: DateStepProps) => {
  const [date, setDate] = useState<Date | undefined>(
    data.selected_date ? new Date(data.selected_date) : undefined
  );
  
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      updateData({
        selected_date: newDate.toISOString(),
        wedding_date_status: "chosen"
      });
    }
  };

  const handleOptionChange = (value: string) => {
    updateData({ wedding_date_status: value });
    if (value !== "chosen") {
      updateData({ selected_date: undefined });
    }
  };

  return (
    <QuestionContainer question="When are you planning to get married?">
      <RadioGroup
        className="space-y-4 my-6"
        value={data.wedding_date_status}
        onValueChange={handleOptionChange}
      >
        <label className="flex items-start space-x-2 cursor-pointer">
          <RadioGroupItem value="chosen" id="date-chosen" />
          <div className="grid gap-1.5 leading-none">
            <div className="flex items-center">
              <span>We've chosen a date 📅</span>
              {data.wedding_date_status === "chosen" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "ml-4 w-[240px] justify-start text-left font-normal",
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
                      onSelect={handleDateChange}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="month_year" id="date-month-year" />
          <span>We have a month and year in mind</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="undecided" id="date-undecided" />
          <span>We haven't decided yet</span>
        </label>
      </RadioGroup>

      <div className="flex justify-between mt-6">
        <Button 
          onClick={onBack} 
          variant="outline"
          className="text-wednest-brown"
        >
          Back
        </Button>
        <Button 
          onClick={onNext}
          className="bg-wednest-sage hover:bg-wednest-sage-dark text-white"
        >
          ➡️ Next
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default DateStep;
