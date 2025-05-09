
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionContainer } from "./QuestionContainer";

interface GuestCountStepProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const GuestCountStep = ({ data, updateData, onNext, onBack }: GuestCountStepProps) => {
  return (
    <QuestionContainer question="Roughly how many guests are you inviting?">
      <RadioGroup
        className="space-y-4 my-6"
        value={data.guest_count}
        onValueChange={(value) => updateData({ guest_count: value })}
      >
        <label className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="lt_10" id="guests-lt-10" />
          <span>{"< 10"}</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="10_to_50" id="guests-10-50" />
          <span>10–50</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="51_to_100" id="guests-51-100" />
          <span>51–100</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="101_to_150" id="guests-101-150" />
          <span>101–150</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="more_than_150" id="guests-more-than-150" />
          <span>More than 150</span>
        </label>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="exact" id="guests-exact" />
            <span>We know the exact number</span>
          </label>
          
          {data.guest_count === "exact" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-6 mt-2"
            >
              <Input
                type="number"
                min="1"
                placeholder="Number of guests"
                value={data.exact_guest_count || ""}
                onChange={(e) => updateData({ exact_guest_count: parseInt(e.target.value) || 0 })}
                className="w-full max-w-[120px]"
              />
            </motion.div>
          )}
        </div>
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

export default GuestCountStep;
