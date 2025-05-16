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
import { logOnboardingStep, logCompleteOnboardingData } from "@/services/onboardingTracker";

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
      console.log('[OnboardingSteps] Form data updated:', updated);
      
      // Log specifically when portfolioImages are updated
      if (data.portfolioImages) {
        console.log('[OnboardingSteps] Portfolio images updated:', data.portfolioImages.length, 'images');
        console.log('[OnboardingSteps] Portfolio images data:', data.portfolioImages);
      }
      
      return updated;
    });
  };
  
  // Track step changes for analytics
  useEffect(() => {
    const stepNames = [
      'BusinessBasics',
      'ContactLocation',
      'BusinessDescription',
      'Portfolio',
      'ServicePackages',
      'SubmitReview'
    ];

    if (currentStep >= 0 && currentStep < stepNames.length) {
      const currentStepName = stepNames[currentStep];
      
      // Extract relevant data for the current step for analytics
      const relevantData: any = {};
      
      switch (currentStepName) {
        case 'BusinessBasics':
          relevantData.businessCategory = formData.businessCategory;
          relevantData.hasBusinessName = !!formData.businessName;
          relevantData.hasLogoUrl = !!formData.logoUrl;
          break;
        case 'ContactLocation':
          relevantData.hasPhone = !!formData.phone;
          relevantData.hasBusinessEmail = !!formData.businessEmail;
          relevantData.state = formData.state;
          relevantData.hasServiceRadius = !!formData.serviceRadius;
          break;
        case 'BusinessDescription':
          relevantData.hasBio = !!formData.bio;
          relevantData.hasTagline = !!formData.tagline;
          relevantData.specialtiesCount = formData.specialties?.length || 0;
          break;
        case 'Portfolio':
          relevantData.portfolioImagesCount = formData.portfolioImages?.length || 0;
          relevantData.hasInstagramFeed = !!formData.instagramFeed;
          break;
        case 'ServicePackages':
          relevantData.servicePackagesCount = formData.servicePackages?.length || 0;
          break;
      }
      
      // Log step entry for analytics
      logOnboardingStep(currentStepName, relevantData, 'started').catch(console.error);
    }
  }, [currentStep]);
  
  // For debugging in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      (window as any).VendorOnboardingData = formData;
      
      // Debug log for portfolio images
      if (currentStep === 3) {
        console.log('[OnboardingSteps] Current portfolio images:', formData.portfolioImages);
        console.log('[OnboardingSteps] Portfolio images count:', formData.portfolioImages?.length || 0);
      }
    }
  }, [formData, currentStep]);
  
  // Navigation functions
  const goToNext = () => {
    const oldStep = currentStep;
    const newStep = currentStep + 1;
    
    // Log step completion before changing step
    const stepNames = [
      'BusinessBasics',
      'ContactLocation',
      'BusinessDescription',
      'Portfolio',
      'ServicePackages',
      'SubmitReview'
    ];
    
    if (oldStep >= 0 && oldStep < stepNames.length) {
      const stepName = stepNames[oldStep];
      
      // Extract step-specific data for analytics
      const stepData = getStepDataForAnalytics(stepName, formData);
      
      // Log step completion
      logOnboardingStep(stepName, stepData, 'completed').catch(console.error);
    }
    
    setCurrentStep(newStep);
  };
  
  const goToBack = () => {
    const oldStep = currentStep;
    const newStep = currentStep - 1;
    
    // Log step skipped/back event
    const stepNames = [
      'BusinessBasics',
      'ContactLocation',
      'BusinessDescription',
      'Portfolio',
      'ServicePackages',
      'SubmitReview'
    ];
    
    if (oldStep >= 0 && oldStep < stepNames.length) {
      logOnboardingStep(stepNames[oldStep], { 
        action: 'back',
        previousStep: oldStep,
        nextStep: newStep
      }, 'skipped').catch(console.error);
    }
    
    setCurrentStep(newStep);
  };
  
  // Helper function to extract step data for analytics
  const getStepDataForAnalytics = (stepName: string, data: VendorOnboardingData): any => {
    const analyticsData: any = {};
    
    switch (stepName) {
      case 'BusinessBasics':
        analyticsData.businessCategory = data.businessCategory;
        analyticsData.hasYearsInBusiness = !!data.yearsInBusiness;
        analyticsData.hasABN = !!data.abn;
        break;
      case 'ContactLocation':
        analyticsData.state = data.state;
        analyticsData.city = data.city;
        analyticsData.hasWebsite = !!data.website;
        analyticsData.hasSocialMedia = !!(data.facebook || data.instagram);
        analyticsData.willingToTravel = data.willingToTravel;
        break;
      case 'BusinessDescription':
        analyticsData.bioLength = data.bio?.length || 0;
        analyticsData.taglineLength = data.tagline?.length || 0;
        analyticsData.specialtiesCount = data.specialties?.length || 0;
        break;
      case 'Portfolio':
        analyticsData.portfolioImagesCount = data.portfolioImages?.length || 0;
        analyticsData.hasInstagramFeed = !!data.instagramFeed;
        break;
      case 'ServicePackages':
        analyticsData.servicePackagesCount = data.servicePackages?.length || 0;
        analyticsData.hasPackageWithFeatures = data.servicePackages?.some(p => p.features && p.features.length > 0) || false;
        break;
    }
    
    return analyticsData;
  };
  
  // Handle the completion of the onboarding process
  const handleComplete = async () => {
    // Log the entire onboarding data for analytics
    await logCompleteOnboardingData(formData);
    
    // Call the original onComplete handler
    await onComplete(formData);
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
        // Portfolio validation - at least one image required
        const hasPortfolioImages = Array.isArray(formData.portfolioImages) && formData.portfolioImages.length > 0;
        console.log("[OnboardingSteps] Portfolio validation check:", hasPortfolioImages);
        console.log("[OnboardingSteps] Portfolio images in validation:", formData.portfolioImages);
        return hasPortfolioImages;
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
