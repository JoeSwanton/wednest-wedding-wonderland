
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import SimplifiedQuestionnaireStepper from "@/components/questionnaire/SimplifiedQuestionnaireStepper";

const Questionnaire = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleComplete = () => {
    toast({
      title: "Profile complete!",
      description: "Your wedding details have been saved.",
    });
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-theme-beige/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-theme-brown mb-2">Wedding Profile</h1>
          <p className="text-theme-brown-light">Help us find the perfect vendors for your special day</p>
        </div>
        <SimplifiedQuestionnaireStepper onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default Questionnaire;
