
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SimplifiedQuestionnaireStepperProps {
  onComplete: () => void;
}

const SimplifiedQuestionnaireStepper = ({ onComplete }: SimplifiedQuestionnaireStepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    partner1_name: "",
    partner2_name: "",
    wedding_date: "",
    location: "",
    guest_count: "",
    budget_range: "",
    priority_vendors: ""
  });

  const steps = [
    { id: 0, title: "Couple Details", description: "Tell us about yourselves" },
    { id: 1, title: "Wedding Details", description: "Basic wedding information" },
    { id: 2, title: "Preferences", description: "What matters most to you" },
  ];

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="partner1">Partner 1 Name</Label>
              <Input
                id="partner1"
                value={formData.partner1_name}
                onChange={(e) => updateFormData("partner1_name", e.target.value)}
                placeholder="Enter first partner's name"
              />
            </div>
            <div>
              <Label htmlFor="partner2">Partner 2 Name</Label>
              <Input
                id="partner2"
                value={formData.partner2_name}
                onChange={(e) => updateFormData("partner2_name", e.target.value)}
                placeholder="Enter second partner's name"
              />
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Wedding Date (Optional)</Label>
              <Input
                id="date"
                type="date"
                value={formData.wedding_date}
                onChange={(e) => updateFormData("wedding_date", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Wedding Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                placeholder="City, State or 'Not sure yet'"
              />
            </div>
            <div>
              <Label htmlFor="guests">Estimated Guest Count</Label>
              <Input
                id="guests"
                value={formData.guest_count}
                onChange={(e) => updateFormData("guest_count", e.target.value)}
                placeholder="e.g., 50-100 guests"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="budget">Budget Range (Optional)</Label>
              <Input
                id="budget"
                value={formData.budget_range}
                onChange={(e) => updateFormData("budget_range", e.target.value)}
                placeholder="e.g., $10,000-$20,000"
              />
            </div>
            <div>
              <Label htmlFor="priorities">What vendors are you most interested in finding? (Optional)</Label>
              <Textarea
                id="priorities"
                value={formData.priority_vendors}
                onChange={(e) => updateFormData("priority_vendors", e.target.value)}
                placeholder="e.g., Photographer, Venue, Catering..."
                rows={3}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

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
                    ? 'bg-theme-brown text-white' 
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
              <CardTitle className="text-xl text-theme-brown">
                {currentStepData.title}
              </CardTitle>
              <p className="text-sm text-theme-brown-light mt-1">{currentStepData.description}</p>
              <Badge variant="outline" className="mt-2">
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
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
          className="flex items-center gap-2 bg-theme-brown hover:bg-theme-brown-dark"
        >
          {isLastStep ? 'Complete Profile' : 'Continue'}
          {!isLastStep && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default SimplifiedQuestionnaireStepper;
