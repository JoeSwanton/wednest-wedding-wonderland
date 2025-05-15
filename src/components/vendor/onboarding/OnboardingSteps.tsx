
import { useState, useEffect } from "react";
import BusinessBasicsStep from "./steps/BusinessBasicsStep";
import ContactLocationStep from "./steps/ContactLocationStep";
import BusinessDescriptionStep from "./steps/BusinessDescriptionStep";
import PortfolioStep from "./steps/PortfolioStep";
import ServicePackagesStep from "./steps/ServicePackagesStep";
import PreviewPublishStep from "./steps/PreviewPublishStep";
import { VendorOnboardingData } from "@/types/vendor";

interface OnboardingStepsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onComplete: () => void;
}

const OnboardingSteps = ({ 
  currentStep, 
  setCurrentStep,
  onComplete
}: OnboardingStepsProps) => {
  // Initialize form data
  const [formData, setFormData] = useState<VendorOnboardingData>({
    // Business Basics
    businessName: "",
    businessCategory: "",
    abn: "",
    yearsInBusiness: "",
    logoUrl: "",
    
    // Contact & Location
    phone: "",
    businessEmail: "",
    website: "",
    instagram: "",
    facebook: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    serviceRadius: "",
    
    // Business Description
    bio: "",
    tagline: "",
    specialties: [],
    
    // Portfolio
    portfolioImages: [],
    instagramFeed: "",
    
    // Service Packages
    servicePackages: []
  });
  
  // Function to update form data
  const updateFormData = (data: Partial<VendorOnboardingData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  
  // Navigation functions
  const goToNext = () => setCurrentStep(currentStep + 1);
  const goToBack = () => setCurrentStep(currentStep - 1);
  
  // For debugging in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Using window with proper TypeScript declaration
      (window as any).VendorOnboardingData = formData;
    }
  }, [formData]);
  
  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BusinessBasicsStep
            onNext={goToNext}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 1:
        return (
          <ContactLocationStep
            onNext={goToNext}
            onBack={goToBack}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <BusinessDescriptionStep
            onNext={goToNext}
            onBack={goToBack}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <PortfolioStep
            onNext={goToNext}
            onBack={goToBack}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <ServicePackagesStep
            onNext={goToNext}
            onBack={goToBack}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 5:
        return (
          <PreviewPublishStep
            onBack={goToBack}
            onComplete={onComplete}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-[400px]">
      {renderStep()}
    </div>
  );
};

export default OnboardingSteps;
