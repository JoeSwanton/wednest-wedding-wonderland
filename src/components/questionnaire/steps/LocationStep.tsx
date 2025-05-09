
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionContainer } from "./QuestionContainer";

interface LocationStepProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const LocationStep = ({ data, updateData, onNext, onBack }: LocationStepProps) => {
  return (
    <QuestionContainer question="Where do you dream of getting married?">
      <RadioGroup
        className="space-y-4 my-6"
        value={data.wedding_location_status}
        onValueChange={(value) => updateData({ wedding_location_status: value })}
      >
        <label className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="booked" id="location-booked" />
          <span>We've booked a venue already</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="city_region" id="location-city-region" />
          <span>We have a city/region in mind</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="destination" id="location-destination" />
          <span>We're considering a destination wedding ✈️</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="exploring" id="location-exploring" />
          <span>We're still exploring ideas</span>
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

export default LocationStep;
