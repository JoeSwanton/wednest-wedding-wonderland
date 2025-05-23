
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionContainer } from "./QuestionContainer";
import { Users, ArrowRight, ArrowLeft } from "lucide-react";

interface GuestCountStepProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const GuestCountStep = ({ data, updateData, onNext, onBack }: GuestCountStepProps) => {
  const guestOptions = [
    { value: "lt_10", label: "👫 Less than 10", delay: 0.4 },
    { value: "10_to_50", label: "👨‍👩‍👧‍👦 10–50", delay: 0.5 },
    { value: "51_to_100", label: "🎪 51–100", delay: 0.6 },
    { value: "101_to_150", label: "🏛️ 101–150", delay: 0.7 },
    { value: "more_than_150", label: "🎉 More than 150", delay: 0.8 }
  ];

  return (
    <QuestionContainer 
      question="Roughly how many guests are you inviting?"
      icon={<Users className="h-6 w-6 text-theme-brown" />}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <RadioGroup
          className="space-y-4 my-8"
          value={data.guest_count}
          onValueChange={(value) => updateData({ guest_count: value })}
        >
          {guestOptions.map((option) => (
            <motion.label
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: option.delay }}
              htmlFor={`guests-${option.value}`}
              className="flex items-center space-x-3 p-4 rounded-lg border-2 border-theme-cream hover:border-theme-brown transition-colors cursor-pointer group"
            >
              <RadioGroupItem value={option.value} id={`guests-${option.value}`} />
              <span className="font-medium text-theme-text-primary group-hover:text-theme-brown transition-colors">
                {option.label}
              </span>
            </motion.label>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-3 p-4 rounded-lg border-2 border-theme-cream hover:border-theme-brown transition-colors"
          >
            <label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="exact" id="guests-exact" />
              <span className="font-medium text-theme-text-primary">🎯 We know the exact number</span>
            </label>
            
            {data.guest_count === "exact" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-7 mt-3"
              >
                <Input
                  type="number"
                  min="1"
                  placeholder="Number of guests"
                  value={data.exact_guest_count || ""}
                  onChange={(e) => updateData({ exact_guest_count: parseInt(e.target.value) || 0 })}
                  className="w-full max-w-[150px] h-10 border-2 border-theme-cream focus:border-theme-brown rounded-lg"
                />
              </motion.div>
            )}
          </motion.div>
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

export default GuestCountStep;
