
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 text-center py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="relative"
      >
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Sparkles className="h-8 w-8 text-theme-brown animate-pulse" />
          <Heart className="h-6 w-6 text-red-400 animate-bounce" />
          <Sparkles className="h-8 w-8 text-theme-brown animate-pulse" />
        </div>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-serif text-theme-brown leading-tight"
      >
        Let's start planning your
        <span className="block text-theme-brown-light italic">dream wedding</span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-theme-text-secondary max-w-md leading-relaxed"
      >
        Answer a few quick questions so we can personalize your wedding planning journey just for you.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="pt-4"
      >
        <Button 
          onClick={onNext}
          className="bg-theme-brown hover:bg-theme-brown-dark text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Let's Begin
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;
