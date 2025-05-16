import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload } from "lucide-react";
import { VendorOnboardingData } from "@/types/vendor"; // Import the type

interface BusinessBasicsStepProps {
  onNext: () => void;
  formData: VendorOnboardingData;
  updateFormData: (data: Partial<VendorOnboardingData>) => void;
}
const BUSINESS_CATEGORIES = [{
  value: "photography",
  label: "Photography"
}, {
  value: "videography",
  label: "Videography"
}, {
  value: "catering",
  label: "Catering"
}, {
  value: "venue",
  label: "Venues"
}, {
  value: "flowers",
  label: "Flowers & Decoration"
}, {
  value: "music",
  label: "Music & Entertainment"
}, {
  value: "planning",
  label: "Wedding Planning"
}, {
  value: "dresses",
  label: "Wedding Dresses"
}, {
  value: "suits",
  label: "Suits & Attire"
}, {
  value: "cake",
  label: "Cakes & Desserts"
}, {
  value: "beauty",
  label: "Hair & Makeup"
}, {
  value: "transport",
  label: "Transport"
}, {
  value: "jewelry",
  label: "Jewelry"
}, {
  value: "invitations",
  label: "Invitations & Stationery"
}, {
  value: "other",
  label: "Other"
}];
const BusinessBasicsStep = ({
  onNext,
  formData,
  updateFormData
}: BusinessBasicsStepProps) => {
  const {
    user
  } = useAuth();
  const {
    toast
  } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [localFormData, setLocalFormData] = useState({
    businessName: formData.businessName || "",
    businessCategory: formData.businessCategory || "",
    abn: formData.abn || "",
    yearsInBusiness: formData.yearsInBusiness || "",
    logoUrl: formData.logoUrl || ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setLocalFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSelectChange = (name: string, value: string) => {
    setLocalFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/logo-${Date.now()}.${fileExt}`;
      const {
        error: uploadError
      } = await supabase.storage.from('vendor-assets').upload(filePath, file);
      if (uploadError) throw uploadError;
      const {
        data
      } = supabase.storage.from('vendor-assets').getPublicUrl(filePath);
      if (data?.publicUrl) {
        setLocalFormData(prev => ({
          ...prev,
          logoUrl: data.publicUrl
        }));
        toast({
          title: "Logo uploaded",
          description: "Your business logo has been uploaded successfully."
        });
      }
    } catch (error: any) {
      console.error("Error uploading logo:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload logo.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  const handleSubmit = () => {
    // Validate
    if (!localFormData.businessName) {
      toast({
        title: "Required field missing",
        description: "Please enter your business name.",
        variant: "destructive"
      });
      return;
    }
    if (!localFormData.businessCategory) {
      toast({
        title: "Required field missing",
        description: "Please select a business category.",
        variant: "destructive"
      });
      return;
    }

    // Update form data and proceed to next step
    updateFormData(localFormData);
    onNext();
  };
  return <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif text-wednest-brown">Business Basics</h2>
        <p className="text-wednest-brown-light">
          Let's start with some basic information about your business.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">
            Business Name <span className="text-red-500">*</span>
          </Label>
          <Input id="businessName" name="businessName" value={localFormData.businessName} onChange={handleChange} placeholder="Enter your business name" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="businessCategory">
            Business Category <span className="text-red-500">*</span>
          </Label>
          <Select value={localFormData.businessCategory} onValueChange={value => handleSelectChange("businessCategory", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your business category" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_CATEGORIES.map(category => <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          
          
          
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="yearsInBusiness">
            Years in Business
          </Label>
          <Input id="yearsInBusiness" name="yearsInBusiness" type="number" min="0" value={localFormData.yearsInBusiness} onChange={handleChange} placeholder="E.g. 5" />
        </div>
        
        <div className="space-y-2">
          <Label>Business Logo</Label>
          <div className="flex items-center gap-4">
            {localFormData.logoUrl ? <div className="relative w-24 h-24 rounded-md overflow-hidden border border-wednest-beige">
                <img src={localFormData.logoUrl} alt="Business Logo" className="object-cover w-full h-full" />
                <button type="button" onClick={() => setLocalFormData(prev => ({
              ...prev,
              logoUrl: ""
            }))} className="absolute top-1 right-1 bg-white/90 rounded-full p-1 text-red-500 hover:bg-white">
                  ×
                </button>
              </div> : <div className="w-24 h-24 bg-gray-100 rounded-md flex flex-col items-center justify-center border border-dashed border-wednest-beige">
                <Upload size={20} className="text-wednest-brown-light" />
                <span className="text-xs text-wednest-brown-light mt-1">Upload Logo</span>
              </div>}
            <div className="flex-1">
              <div className="relative">
                <Input id="logo" type="file" accept="image/*" disabled={isUploading} onChange={handleFileUpload} className="cursor-pointer" />
                {isUploading && <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <Loader2 className="h-5 w-5 animate-spin text-wednest-sage" />
                  </div>}
              </div>
              <p className="text-xs text-wednest-brown-light mt-1">
                Recommended size: 500x500 pixels. Max file size: 2MB.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button onClick={handleSubmit} className="bg-wednest-sage hover:bg-wednest-sage-dark">
          Continue
        </Button>
      </div>
    </div>;
};
export default BusinessBasicsStep;