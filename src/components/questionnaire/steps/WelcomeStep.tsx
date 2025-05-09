
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-serif text-wednest-brown"
      >
        ✨ Let's start planning your dream wedding.
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-wednest-brown-light text-lg max-w-md"
      >
        Answer a few quick questions so we can personalize your experience.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button 
          onClick={onNext}
          className="mt-6 bg-wednest-sage hover:bg-wednest-sage-dark text-white"
        >
          ➡️ Let's Begin
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;
