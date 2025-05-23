
import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionContainer } from "./QuestionContainer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, ArrowRight, ArrowLeft } from "lucide-react";

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
    <QuestionContainer 
      question="When are you planning to get married?"
      icon={<CalendarIcon className="h-6 w-6 text-theme-brown" />}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <RadioGroup
          className="space-y-4 my-8"
          value={data.wedding_date_status}
          onValueChange={handleOptionChange}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start space-x-3 p-4 rounded-lg border-2 border-theme-cream hover:border-theme-brown transition-colors cursor-pointer"
          >
            <RadioGroupItem value="chosen" id="date-chosen" className="mt-1" />
            <div className="flex-1">
              <label htmlFor="date-chosen" className="flex items-center gap-2 cursor-pointer font-medium text-theme-text-primary">
                📅 We've chosen a date
              </label>
              {data.wedding_date_status === "chosen" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3"
                >
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-12 text-lg border-2",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5" />
                        {date ? format(date, "PPP") : <span>Pick your wedding date</span>}
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
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.label
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            htmlFor="date-month-year"
            className="flex items-center space-x-3 p-4 rounded-lg border-2 border-theme-cream hover:border-theme-brown transition-colors cursor-pointer"
          >
            <RadioGroupItem value="month_year" id="date-month-year" />
            <span className="font-medium text-theme-text-primary">📆 We have a month and year in mind</span>
          </motion.label>

          <motion.label
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            htmlFor="date-undecided"
            className="flex items-center space-x-3 p-4 rounded-lg border-2 border-theme-cream hover:border-theme-brown transition-colors cursor-pointer"
          >
            <RadioGroupItem value="undecided" id="date-undecided" />
            <span className="font-medium text-theme-text-primary">🤔 We haven't decided yet</span>
          </motion.label>
        </RadioGroup>
      </motion.div>

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-theme-cream">
        <Button 
          onClick={onBack} 
          variant="outline"
          className="flex items-center gap-2 px-6 py-3 border-2 border-theme-cream hover:border-theme-brown text-theme-brown"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={onNext}
          className="flex items-center gap-2 bg-theme-brown hover:bg-theme-brown-dark text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default DateStep;
