
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BusinessBasicsStep from "./steps/BusinessBasicsStep";
import ContactLocationStep from "./steps/ContactLocationStep";
import BusinessDescriptionStep from "./steps/BusinessDescriptionStep";
import PortfolioStep from "./steps/PortfolioStep";
import ServicePackagesStep from "./steps/ServicePackagesStep";
import SubmitReviewStep from "./steps/SubmitReviewStep";
import { VendorOnboardingData } from "@/types/vendor"; 
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface OnboardingStepsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onComplete: (formData: VendorOnboardingData) => Promise<void>;
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
    willingToTravel: false,
    
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
    setFormData(prev => {
      const updated = { ...prev, ...data };
      // For debugging in dev mode
      if (process.env.NODE_ENV === 'development') {
        console.log('Form data updated:', updated);
      }
      return updated;
    });
  };
  
  // For debugging in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      (window as any).VendorOnboardingData = formData;
    }
  }, [formData]);
  
  // Navigation functions
  const goToNext = () => setCurrentStep(currentStep + 1);
  const goToBack = () => setCurrentStep(currentStep - 1);
  
  // Handle the completion of the onboarding process
  const handleComplete = () => {
    onComplete(formData);
  };
  
  // Animation variants for step transitions
  const stepVariants = {
    enter: {
      opacity: 0,
      x: 20
    },
    center: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };
  
  // Debug function to check validation status for current step
  const getStepValidationStatus = () => {
    switch (currentStep) {
      case 0: // Business Basics
        return Boolean(formData.businessName && formData.businessCategory);
      case 1: // Contact & Location
        return Boolean(formData.phone && formData.businessEmail && formData.city && formData.state);
      case 2: // Business Description
        return Boolean(formData.bio);
      case 3: // Portfolio
        return formData.portfolioImages.length > 0;
      case 4: // Service Packages
        return formData.servicePackages.length > 0;
      default:
        return true;
    }
  };
  
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
          <SubmitReviewStep
            onBack={goToBack}
            onComplete={handleComplete}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="enter"
          animate="center"
          exit="exit"
          variants={stepVariants}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingSteps;
