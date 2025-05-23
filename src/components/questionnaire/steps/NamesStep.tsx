
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuestionContainer } from "./QuestionContainer";
import { Users, ArrowRight, ArrowLeft } from "lucide-react";

interface NamesStepProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const NamesStep = ({ data, updateData, onNext, onBack }: NamesStepProps) => {
  const handleNext = () => {
    if (data.partner1_name.trim() && data.partner2_name.trim()) {
      onNext();
    }
  };

  return (
    <QuestionContainer
      question="What are your first names?"
      description="We'll use these to personalize your wedding planning journey."
      icon={<Users className="h-6 w-6 text-theme-brown" />}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8"
      >
        <div className="space-y-2">
          <label htmlFor="partner1" className="text-sm font-medium text-theme-text-primary">Partner 1</label>
          <Input
            id="partner1"
            value={data.partner1_name}
            onChange={(e) => updateData({ partner1_name: e.target.value })}
            placeholder="First name"
            className="w-full h-12 text-lg border-2 border-theme-cream focus:border-theme-brown rounded-lg transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="partner2" className="text-sm font-medium text-theme-text-primary">Partner 2</label>
          <Input
            id="partner2"
            value={data.partner2_name}
            onChange={(e) => updateData({ partner2_name: e.target.value })}
            placeholder="First name"
            className="w-full h-12 text-lg border-2 border-theme-cream focus:border-theme-brown rounded-lg transition-colors"
          />
        </div>
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
          onClick={handleNext}
          className="flex items-center gap-2 bg-theme-brown hover:bg-theme-brown-dark text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!data.partner1_name.trim() || !data.partner2_name.trim()}
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default NamesStep;
