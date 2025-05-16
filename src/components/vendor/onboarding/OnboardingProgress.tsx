
import { CheckIcon } from "lucide-react";

interface OnboardingProgressProps {
  currentStep: number;
}

const OnboardingProgress = ({ currentStep }: OnboardingProgressProps) => {
  const steps = [
    "Business Basics",
    "Contact & Presence",
    "Business Description",
    "Portfolio",
    "Packages",
    "Submit for Review"
  ];
  
  // Calculate completion percentage
  const completionPercentage = Math.round(((currentStep + 1) / steps.length) * 100);
  
  return (
    <div className="w-full">
      {/* Step counter and completion percentage */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-wednest-sage/10 text-wednest-sage font-semibold rounded-full px-3 py-1 text-sm">
            Step {currentStep + 1} of {steps.length}
          </div>
          <h3 className="text-lg font-medium text-wednest-brown hidden md:block">
            {steps[currentStep]}
          </h3>
        </div>
        <div className="bg-wednest-sage/10 text-wednest-sage rounded-full px-3 py-1 text-sm font-semibold">
          {completionPercentage}% Complete
        </div>
      </div>
      
      {/* Mobile step title */}
      <div className="md:hidden mb-2">
        <h3 className="text-lg font-medium text-wednest-brown">
          {steps[currentStep]}
        </h3>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-wednest-sage to-wednest-sage/80 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Step indicators - enhanced for desktop */}
      <div className="hidden md:grid grid-cols-6 gap-2 mt-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`relative flex items-center justify-center w-8 h-8 rounded-full mb-2 transition-all duration-300
                ${index < currentStep 
                  ? 'bg-wednest-sage text-white' 
                  : index === currentStep 
                    ? 'bg-wednest-sage ring-4 ring-wednest-sage/20 text-white' 
                    : 'bg-gray-100 text-gray-400'}`}
            >
              {index < currentStep ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={`absolute left-full w-full h-0.5 top-1/2 -translate-y-1/2 
                    ${index < currentStep ? 'bg-wednest-sage' : 'bg-gray-100'}`}
                ></div>
              )}
            </div>
            <span className={`text-xs w-full text-center transition-colors duration-300 
              ${index <= currentStep ? 'text-wednest-brown font-medium' : 'text-wednest-brown-light'}`}
            >
              {step.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingProgress;
