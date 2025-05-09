
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface FinalStepProps {
  onComplete: () => void;
  onBack: () => void;
}

const FinalStep = ({ onComplete, onBack }: FinalStepProps) => {
  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
      <motion.h2 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="text-3xl font-serif text-wednest-brown"
      >
        🎉 Perfect! We're all set.
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-wednest-brown-light text-lg max-w-md"
      >
        Your wedding journey begins now. We've personalized your dashboard based on your preferences.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex space-x-4"
      >
        <Button 
          onClick={onBack}
          variant="outline" 
          className="text-wednest-brown"
        >
          Back
        </Button>
        <Button 
          onClick={onComplete}
          className="bg-wednest-sage hover:bg-wednest-sage-dark text-white"
        >
          Take me to my dashboard ✨
        </Button>
      </motion.div>
    </div>
  );
};

export default FinalStep;
