
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { VendorOnboardingData } from "@/types/vendor";

interface BusinessDescriptionStepProps {
  onNext: () => void;
  onBack: () => void;
  formData: VendorOnboardingData;
  updateFormData: (data: Partial<VendorOnboardingData>) => void;
}

const BusinessDescriptionStep = ({ onNext, onBack, formData, updateFormData }: BusinessDescriptionStepProps) => {
  const { toast } = useToast();
  const [localFormData, setLocalFormData] = useState({
    bio: formData.bio || "",
    tagline: formData.tagline || "",
    specialties: formData.specialties || []
  });
  
  const [specialtyInput, setSpecialtyInput] = useState("");
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddSpecialty = () => {
    if (!specialtyInput.trim()) return;
    
    if (localFormData.specialties.includes(specialtyInput.trim())) {
      toast({
        title: "Duplicate specialty",
        description: "This specialty has already been added.",
        variant: "destructive"
      });
      return;
    }
    
    if (localFormData.specialties.length >= 10) {
      toast({
        title: "Maximum reached",
        description: "You can add a maximum of 10 specialties.",
        variant: "destructive"
      });
      return;
    }
    
    setLocalFormData(prev => ({
      ...prev,
      specialties: [...prev.specialties, specialtyInput.trim()]
    }));
    setSpecialtyInput("");
  };
  
  const handleRemoveSpecialty = (specialty: string) => {
    setLocalFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(item => item !== specialty)
    }));
  };
  
  const handleSubmit = () => {
    // Validate
    if (!localFormData.bio) {
      toast({
        title: "Required field missing",
        description: "Please enter a description of your business.",
        variant: "destructive"
      });
      return;
    }
    
    // Update form data and proceed to next step
    updateFormData(localFormData);
    onNext();
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif text-wednest-brown">Business Description</h2>
        <p className="text-wednest-brown-light">
          Tell couples about your business, style, and services.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bio">
            About Your Business <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="bio"
            name="bio"
            value={localFormData.bio}
            onChange={handleChange}
            placeholder="Describe your business, experience, and what makes you unique..."
            rows={6}
            required
          />
          <p className="text-xs text-wednest-brown-light flex justify-between">
            <span>This will appear on your public profile.</span>
            <span>{localFormData.bio.length}/500 characters</span>
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tagline">Business Tagline</Label>
          <Input
            id="tagline"
            name="tagline"
            value={localFormData.tagline}
            onChange={handleChange}
            placeholder="E.g. 'Capturing timeless moments for your special day'"
            maxLength={100}
          />
          <p className="text-xs text-wednest-brown-light">
            A short, catchy phrase that defines your business (max 100 characters).
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="specialties">Specialties & Highlights</Label>
          <div className="flex gap-2">
            <Input
              id="specialtyInput"
              value={specialtyInput}
              onChange={(e) => setSpecialtyInput(e.target.value)}
              placeholder="E.g. Eco-friendly, Destination weddings, Luxury"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSpecialty();
                }
              }}
            />
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handleAddSpecialty}
            >
              Add
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {localFormData.specialties.length === 0 ? (
              <p className="text-sm text-wednest-brown-light italic">
                No specialties added yet. Add what makes your business special.
              </p>
            ) : (
              localFormData.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="px-2 py-1 bg-wednest-beige/20">
                  {specialty}
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecialty(specialty)}
                    className="ml-1 text-wednest-brown-light hover:text-wednest-brown"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))
            )}
          </div>
          <p className="text-xs text-wednest-brown-light">
            Add up to 10 specialties that highlight what makes your business unique.
          </p>
        </div>
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="button" 
          onClick={handleSubmit}
          className="bg-wednest-sage hover:bg-wednest-sage-dark"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BusinessDescriptionStep;
