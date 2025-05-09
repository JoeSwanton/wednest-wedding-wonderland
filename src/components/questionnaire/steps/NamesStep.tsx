
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuestionContainer } from "./QuestionContainer";

interface NamesStepProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const NamesStep = ({ data, updateData, onNext, onBack }: NamesStepProps) => {
  const handleNext = () => {
    // Simple validation
    if (data.partner1_name.trim() && data.partner2_name.trim()) {
      onNext();
    }
  };

  return (
    <QuestionContainer
      question="What are your first names?"
      description="We'll use these to personalize your wedding planning journey."
    >
      <div className="grid grid-cols-2 gap-4 my-8">
        <div>
          <label htmlFor="partner1" className="text-sm text-wednest-brown mb-1 block">Partner 1</label>
          <Input
            id="partner1"
            value={data.partner1_name}
            onChange={(e) => updateData({ partner1_name: e.target.value })}
            placeholder="First name"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="partner2" className="text-sm text-wednest-brown mb-1 block">Partner 2</label>
          <Input
            id="partner2"
            value={data.partner2_name}
            onChange={(e) => updateData({ partner2_name: e.target.value })}
            placeholder="First name"
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button 
          onClick={onBack} 
          variant="outline"
          className="text-wednest-brown"
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-wednest-sage hover:bg-wednest-sage-dark text-white"
          disabled={!data.partner1_name.trim() || !data.partner2_name.trim()}
        >
          ➡️ Next
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default NamesStep;
