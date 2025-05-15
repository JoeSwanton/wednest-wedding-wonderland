
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
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-wednest-brown font-medium">
          Step {currentStep + 1} of {steps.length}
        </p>
        <p className="text-sm text-wednest-brown">
          {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-wednest-beige/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-wednest-sage rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Step indicators */}
      <div className="mt-6 grid grid-cols-6 gap-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep 
                  ? 'bg-wednest-sage text-white' 
                  : 'bg-wednest-beige/30 text-wednest-brown-light'
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-xs mt-1 text-center ${
              index <= currentStep 
                ? 'text-wednest-brown font-medium' 
                : 'text-wednest-brown-light'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingProgress;
