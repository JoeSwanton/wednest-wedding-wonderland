
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import WelcomeStep from "./steps/WelcomeStep";
import NamesStep from "./steps/NamesStep";
import DateStep from "./steps/DateStep";
import LocationStep from "./steps/LocationStep";
import GuestCountStep from "./steps/GuestCountStep";
import FinalStep from "./steps/FinalStep";
import { Card, CardContent } from "@/components/ui/card";

interface QuestionnaireStepperProps {
  onComplete: () => void;
}

interface QuestionnaireData {
  partner1_name: string;
  partner2_name: string;
  wedding_date_status: "chosen" | "month_year" | "undecided";
  selected_date?: string;
  wedding_location_status: "booked" | "city_region" | "destination" | "exploring";
  location_details?: string;
  guest_count: "lt_10" | "10_to_50" | "51_to_100" | "101_to_150" | "more_than_150" | "exact";
  exact_guest_count?: number;
}

const QuestionnaireStepper = ({ onComplete }: QuestionnaireStepperProps) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuestionnaireData>({
    partner1_name: "",
    partner2_name: "",
    wedding_date_status: "undecided",
    wedding_location_status: "exploring",
    guest_count: "10_to_50",
  });
  
  const steps = [
    "welcome",
    "names",
    "date",
    "location",
    "guests",
    "final"
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const updateFormData = (data: Partial<QuestionnaireData>) => {
    setFormData({...formData, ...data});
  };
  
  const handleSubmit = async () => {
    try {
      if (!user) return;
      
      const weddingData = {
        user_id: user.id,
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      await supabase.from('wedding_details').upsert(weddingData);
      onComplete();
    } catch (error) {
      console.error("Error saving questionnaire data:", error);
    }
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "welcome":
        return <WelcomeStep onNext={handleNext} />;
      case "names":
        return (
          <NamesStep 
            data={formData}
            updateData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "date":
        return (
          <DateStep 
            data={formData}
            updateData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "location":
        return (
          <LocationStep 
            data={formData}
            updateData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "guests":
        return (
          <GuestCountStep 
            data={formData}
            updateData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "final":
        return <FinalStep onComplete={handleSubmit} onBack={handleBack} />;
      default:
        return <WelcomeStep onNext={handleNext} />;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border-2 border-theme-cream">
      <CardContent className="p-0">
        {/* Progress Bar */}
        <div className="bg-gradient-to-r from-theme-brown to-theme-brown-light p-1">
          <div className="bg-white bg-opacity-20 rounded-full h-2 mx-4">
            <motion.div 
              className="bg-white h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
        
        <div className="px-6 md:px-12 py-6 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="min-h-[500px] flex flex-col"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
          
          {/* Progress Dots */}
          <div className="flex justify-center pt-4">
            <div className="flex space-x-3">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep ? "bg-theme-brown scale-125" : 
                    index < currentStep ? "bg-theme-brown-light" : "bg-theme-cream"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionnaireStepper;
