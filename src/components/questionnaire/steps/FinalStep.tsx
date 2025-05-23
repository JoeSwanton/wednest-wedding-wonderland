
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { PartyPopper, Sparkles, ArrowLeft } from "lucide-react";

interface FinalStepProps {
  onComplete: () => void;
  onBack: () => void;
}

const FinalStep = ({ onComplete, onBack }: FinalStepProps) => {
  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7a6954', '#f8f5f0', '#e6e0d3', '#a99983']
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 text-center py-12">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="relative"
      >
        <div className="flex items-center justify-center space-x-3 mb-6">
          <PartyPopper className="h-12 w-12 text-theme-brown animate-bounce" />
          <Sparkles className="h-8 w-8 text-theme-brown-light animate-pulse" />
        </div>
      </motion.div>

      <motion.h2 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.4 }}
        className="text-4xl md:text-5xl font-serif text-theme-brown leading-tight"
      >
        Perfect! We're all set.
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-lg text-theme-text-secondary max-w-lg leading-relaxed"
      >
        Your wedding journey begins now. We've personalized your dashboard based on your preferences to help you plan the perfect day.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
      >
        <Button 
          onClick={onBack}
          variant="outline" 
          className="flex items-center gap-2 px-6 py-3 border-2 border-theme-cream hover:border-theme-brown text-theme-brown"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={onComplete}
          className="flex items-center gap-2 bg-theme-brown hover:bg-theme-brown-dark text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Sparkles className="h-5 w-5" />
          Take me to my dashboard
        </Button>
      </motion.div>
    </div>
  );
};

export default FinalStep;
