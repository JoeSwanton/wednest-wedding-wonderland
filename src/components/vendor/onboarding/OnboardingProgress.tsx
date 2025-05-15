
import { CheckIcon } from "lucide-react";

interface OnboardingProgressProps {
  currentStep: number;
}

const OnboardingProgress = ({ currentStep }: OnboardingProgressProps) => {
  const steps = [
    "Business Basics",
    "Contact & Location",
    "Business Description",
    "Portfolio",
    "Service Packages",
    "Preview & Publish"
  ];
  
  return (
    <div className="w-full">
      {/* Step counter and completion percentage */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-medium text-wednest-brown">
          Step {currentStep + 1} of {steps.length}
        </p>
        <p className="text-sm text-wednest-brown">
          {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div 
          className="h-full bg-wednest-sage rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Step indicators - simplified to dots with hover labels */}
      <div className="hidden md:flex justify-between items-center px-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center group relative">
            <div 
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all 
                ${index < currentStep 
                  ? 'bg-wednest-sage text-white' 
                  : index === currentStep 
                    ? 'bg-wednest-sage ring-4 ring-wednest-sage/20 text-white' 
                    : 'bg-gray-100 text-gray-400'}`}
            >
              {index < currentStep ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <span className="text-xs">{index + 1}</span>
              )}
            </div>
            <span className={`absolute top-full mt-2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
              index <= currentStep ? 'text-wednest-brown font-medium' : 'text-wednest-brown-light'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
      
      {/* Mobile step indicator */}
      <div className="md:hidden mt-2">
        <p className="font-medium text-wednest-brown">{steps[currentStep]}</p>
      </div>
    </div>
  );
};

export default OnboardingProgress;
