
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";
import { VendorOnboardingData } from "@/types/vendor";

interface ContactLocationStepProps {
  onNext: () => void;
  onBack: () => void;
  formData: VendorOnboardingData;
  updateFormData: (data: Partial<VendorOnboardingData>) => void;
}

const AUSTRALIAN_STATES = [
  { value: "nsw", label: "New South Wales" },
  { value: "vic", label: "Victoria" },
  { value: "qld", label: "Queensland" },
  { value: "wa", label: "Western Australia" },
  { value: "sa", label: "South Australia" },
  { value: "tas", label: "Tasmania" },
  { value: "act", label: "Australian Capital Territory" },
  { value: "nt", label: "Northern Territory" }
];

const ContactLocationStep = ({ onNext, onBack, formData, updateFormData }: ContactLocationStepProps) => {
  const { toast } = useToast();
  const [localFormData, setLocalFormData] = useState({
    phone: formData.phone || "",
    businessEmail: formData.businessEmail || "",
    website: formData.website || "",
    instagram: formData.instagram || "",
    facebook: formData.facebook || "",
    address: formData.address || "",
    city: formData.city || "",
    state: formData.state || "",
    postcode: formData.postcode || "",
    serviceRadius: formData.serviceRadius || "",
    willingToTravel: formData.willingToTravel || false,
  });

  const [emailVerified, setEmailVerified] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset email verification if email changes
    if (name === "businessEmail") {
      setEmailVerified(false);
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setLocalFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setLocalFormData(prev => ({ ...prev, willingToTravel: checked }));
  };
  
  const verifyEmail = () => {
    // Basic email format verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(localFormData.businessEmail)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would normally call an API to verify the email
    // For now, we'll just simulate verification
    setEmailVerified(true);
    toast({
      title: "Email verified",
      description: "Your business email has been verified.",
    });
  };
  
  const handleSubmit = () => {
    // Validate
    if (!localFormData.phone) {
      toast({
        title: "Required field missing",
        description: "Please enter your business phone number.",
        variant: "destructive"
      });
      return;
    }
    
    if (!localFormData.businessEmail) {
      toast({
        title: "Required field missing",
        description: "Please enter your business email.",
        variant: "destructive"
      });
      return;
    }

    if (!localFormData.state || !localFormData.city) {
      toast({
        title: "Required field missing",
        description: "Please enter your business location.",
        variant: "destructive"
      });
      return;
    }

    if (!localFormData.instagram && !localFormData.facebook) {
      toast({
        title: "Social media required",
        description: "Please provide at least one social media profile (Instagram or Facebook).",
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
        <h2 className="text-2xl font-serif text-wednest-brown">Contact & Presence</h2>
        <p className="text-wednest-brown-light">
          Share how couples can contact you and where your services are available.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              value={localFormData.phone}
              onChange={handleChange}
              placeholder="E.g. 0412 345 678"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="businessEmail">
              Public Email <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="businessEmail"
                name="businessEmail"
                type="email"
                value={localFormData.businessEmail}
                onChange={handleChange}
                placeholder="E.g. contact@yourbusiness.com"
                required
                className={emailVerified ? "border-green-500" : ""}
              />
              {emailVerified ? (
                <Button 
                  variant="outline" 
                  type="button" 
                  className="whitespace-nowrap text-green-500 border-green-500"
                  disabled
                >
                  <Check size={18} className="mr-1" />
                  Verified
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  type="button" 
                  className="whitespace-nowrap"
                  onClick={verifyEmail}
                >
                  Verify
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            name="website"
            value={localFormData.website}
            onChange={handleChange}
            placeholder="E.g. https://www.yourbusiness.com"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="instagram">
              Instagram <span className="text-red-500">*</span>
              <span className="text-wednest-brown-light text-xs ml-2">(At least one social required)</span>
            </Label>
            <Input
              id="instagram"
              name="instagram"
              value={localFormData.instagram}
              onChange={handleChange}
              placeholder="E.g. @yourbusinessname"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="facebook">
              Facebook <span className="text-red-500">*</span>
              <span className="text-wednest-brown-light text-xs ml-2">(At least one social required)</span>
            </Label>
            <Input
              id="facebook"
              name="facebook"
              value={localFormData.facebook}
              onChange={handleChange}
              placeholder="E.g. @yourbusinessname"
            />
          </div>
        </div>
        
        <div className="pt-2 border-t border-wednest-beige">
          <h3 className="text-lg font-medium text-wednest-brown mb-3">Service Location</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address (Optional)</Label>
              <Input
                id="address"
                name="address"
                value={localFormData.address}
                onChange={handleChange}
                placeholder="E.g. 123 Wedding Lane"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">
                  City/Suburb <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={localFormData.city}
                  onChange={handleChange}
                  placeholder="E.g. Sydney"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  name="postcode"
                  value={localFormData.postcode}
                  onChange={handleChange}
                  placeholder="E.g. 2000"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">
                  State <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={localFormData.state} 
                  onValueChange={(value) => handleSelectChange("state", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {AUSTRALIAN_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="serviceRadius">Service Radius (km)</Label>
                <Input
                  id="serviceRadius"
                  name="serviceRadius"
                  type="number"
                  min="0"
                  value={localFormData.serviceRadius}
                  onChange={handleChange}
                  placeholder="E.g. 50"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch 
                id="willing-to-travel" 
                checked={localFormData.willingToTravel}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="willing-to-travel" className="cursor-pointer">
                Willing to travel outside your service area
              </Label>
            </div>
          </div>
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

export default ContactLocationStep;
