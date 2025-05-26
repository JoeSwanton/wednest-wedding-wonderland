
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionContainer } from "./QuestionContainer";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";

interface LocationStepProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const LocationStep = ({ data, updateData, onNext, onBack }: LocationStepProps) => {
  const options = [
    { value: "booked", label: "We've booked a venue already", delay: 0.4 },
    { value: "city_region", label: "We have a city/region in mind", delay: 0.5 },
    { value: "destination", label: "We're considering a destination wedding", delay: 0.6 },
    { value: "exploring", label: "We're still exploring ideas", delay: 0.7 }
  ];

  return (
    <QuestionContainer 
      question="Where do you dream of getting married?"
      icon={<MapPin className="h-6 w-6 text-theme-brown" />}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <RadioGroup
          className="space-y-4 my-8"
          value={data.wedding_location_status}
          onValueChange={(value) => updateData({ wedding_location_status: value })}
        >
          {options.map((option) => (
            <motion.label
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: option.delay }}
              htmlFor={`location-${option.value}`}
              className="flex items-center space-x-3 p-4 rounded-lg border-2 border-theme-cream hover:border-theme-brown transition-colors cursor-pointer group"
            >
              <RadioGroupItem value={option.value} id={`location-${option.value}`} />
              <span className="font-medium text-theme-text-primary group-hover:text-theme-brown transition-colors">
                {option.label}
              </span>
            </motion.label>
          ))}
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

export default LocationStep;
