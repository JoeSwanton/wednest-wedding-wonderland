
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
    <div className="min-h-screen bg-wednest-beige flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6">
        <QuestionnaireStepper onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default Questionnaire;
