
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import BusinessBasicsStep from "./steps/BusinessBasicsStep";
import ContactLocationStep from "./steps/ContactLocationStep";
import BusinessDescriptionStep from "./steps/BusinessDescriptionStep";
import PortfolioStep from "./steps/PortfolioStep";

interface SimplifiedOnboardingStepsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onComplete: (data: any) => void;
}

const SimplifiedOnboardingSteps = ({ currentStep, setCurrentStep, onComplete }: SimplifiedOnboardingStepsProps) => {
  const [formData, setFormData] = useState<any>({});

  const steps = [
    { id: 0, title: "Business Basics", component: BusinessBasicsStep },
    { id: 1, title: "Contact & Location", component: ContactLocationStep },
    { id: 2, title: "Description", component: BusinessDescriptionStep },
    { id: 3, title: "Portfolio", component: PortfolioStep },
  ];

  const currentStepData = steps[currentStep];
  const StepComponent = currentStepData.component;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                ${index < currentStep 
                  ? 'bg-green-500 text-white' 
                  : index === currentStep 
                    ? 'bg-wednest-brown text-white' 
                    : 'bg-gray-200 text-gray-500'
                }
              `}>
                {index < currentStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current step */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-wednest-brown">
                {currentStepData.title}
              </CardTitle>
              <Badge variant="outline" className="mt-2">
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <StepComponent 
            formData={formData} 
            updateFormData={updateFormData}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          className="flex items-center gap-2 bg-wednest-brown hover:bg-wednest-brown-dark"
        >
          {isLastStep ? 'Submit for Review' : 'Continue'}
          {!isLastStep && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default SimplifiedOnboardingSteps;
