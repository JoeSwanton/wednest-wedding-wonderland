
import { Button } from "@/components/ui/button";
import { VendorOnboardingData } from "@/types/vendor";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

interface SubmitReviewStepProps {
  onBack: () => void;
  onComplete: (formData: VendorOnboardingData) => void;
  formData: VendorOnboardingData;
}

const SubmitReviewStep = ({ onBack, onComplete, formData }: SubmitReviewStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    onComplete(formData);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif text-wednest-brown">Submit for Review</h2>
        <p className="text-wednest-brown-light">
          Let's make sure everything is ready for review.
        </p>
      </div>
      
      <div className="bg-wednest-beige/20 p-6 rounded-lg border border-wednest-beige">
        <div className="flex items-start space-x-4">
          <div className="mt-1 text-wednest-sage">
            <CheckCircle size={24} />
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-wednest-brown">Almost there!</h3>
            <p className="text-wednest-brown">
              Thanks for completing your profile! Our team manually reviews every new vendor 
              to ensure a trusted and high-quality experience for couples.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium text-wednest-brown">What happens next:</h4>
              <ul className="list-disc list-inside space-y-1 text-wednest-brown-light">
                <li>Your profile will be reviewed within 1-2 business days</li>
                <li>You'll receive an email notification when it's approved</li>
                <li>You can continue editing your profile in the meantime</li>
                <li>Once approved, your listing will be visible to couples</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-wednest-beige pt-6">
        <h3 className="font-medium text-wednest-brown mb-4">Profile Summary</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-wednest-brown-light">Business Name</p>
              <p className="text-wednest-brown font-medium">{formData.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-wednest-brown-light">Category</p>
              <p className="text-wednest-brown font-medium">{formData.businessCategory}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-wednest-brown-light">Location</p>
              <p className="text-wednest-brown font-medium">{formData.city}, {formData.state}</p>
            </div>
            <div>
              <p className="text-sm text-wednest-brown-light">Contact</p>
              <p className="text-wednest-brown font-medium">{formData.businessEmail}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-wednest-brown-light">Portfolio Images</p>
            <p className="text-wednest-brown font-medium">{formData.portfolioImages.length} images uploaded</p>
          </div>
          
          <div>
            <p className="text-sm text-wednest-brown-light">Service Packages</p>
            <p className="text-wednest-brown font-medium">{formData.servicePackages.length} packages created</p>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button 
          type="button" 
          onClick={handleSubmit}
          className="bg-wednest-sage hover:bg-wednest-sage-dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit for Review"}
        </Button>
      </div>
    </div>
  );
};

export default SubmitReviewStep;
