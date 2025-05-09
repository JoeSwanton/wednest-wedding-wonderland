
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import QuestionnaireStepper from "@/components/questionnaire/QuestionnaireStepper";

const Questionnaire = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleComplete = () => {
    toast({
      title: "Questionnaire complete!",
      description: "Your preferences have been saved.",
    });
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wednest-beige/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-wednest-brown mb-2">Wedding Questionnaire</h1>
          <p className="text-wednest-brown-light">Help us personalize your wedding planning experience</p>
        </div>
        <QuestionnaireStepper onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default Questionnaire;
