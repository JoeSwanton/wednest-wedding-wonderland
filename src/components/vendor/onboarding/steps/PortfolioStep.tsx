
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, Upload } from "lucide-react";

interface PortfolioStepProps {
  onNext: () => void;
  onBack: () => void;
  formData: VendorOnboardingData;
  updateFormData: (data: Partial<VendorOnboardingData>) => void;
}

const PortfolioStep = ({ onNext, onBack, formData, updateFormData }: PortfolioStepProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [localFormData, setLocalFormData] = useState({
    portfolioImages: formData.portfolioImages || [],
    instagramFeed: formData.instagramFeed || ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !user) return;
    
    if (localFormData.portfolioImages.length + files.length > 10) {
      toast({
        title: "Maximum images reached",
        description: "You can upload a maximum of 10 portfolio images.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const newImages = [...localFormData.portfolioImages];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const filePath = `${user.id}/portfolio-${Date.now()}-${i}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('vendor-assets')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage
          .from('vendor-assets')
          .getPublicUrl(filePath);
          
        if (data?.publicUrl) {
          newImages.push({
            url: data.publicUrl,
            path: filePath,
            caption: ""
          });
        }
      }
      
      setLocalFormData(prev => ({ ...prev, portfolioImages: newImages }));
      toast({
        title: "Images uploaded",
        description: `Successfully uploaded ${files.length} image(s).`
      });
    } catch (error: any) {
      console.error("Error uploading portfolio images:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload images.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRemoveImage = async (index: number) => {
    if (!user) return;
    
    const imageToRemove = localFormData.portfolioImages[index];
    
    try {
      // Delete from storage
      const { error } = await supabase.storage
        .from('vendor-assets')
        .remove([imageToRemove.path]);
        
      if (error) throw error;
      
      // Update local state
      const updatedImages = localFormData.portfolioImages.filter((_, i) => i !== index);
      setLocalFormData(prev => ({ ...prev, portfolioImages: updatedImages }));
      
      toast({
        title: "Image removed",
        description: "Portfolio image has been removed."
      });
    } catch (error: any) {
      console.error("Error removing image:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to remove image.",
        variant: "destructive"
      });
    }
  };
  
  const updateCaption = (index: number, caption: string) => {
    const updatedImages = [...localFormData.portfolioImages];
    updatedImages[index].caption = caption;
    setLocalFormData(prev => ({ ...prev, portfolioImages: updatedImages }));
  };
  
  const handleSubmit = () => {
    // Validate
    if (localFormData.portfolioImages.length === 0) {
      toast({
        title: "Portfolio images required",
        description: "Please upload at least one portfolio image to continue.",
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
        <h2 className="text-2xl font-serif text-wednest-brown">Portfolio</h2>
        <p className="text-wednest-brown-light">
          Showcase your best work to attract more couples.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>
            Portfolio Images <span className="text-red-500">*</span>
          </Label>
          <div className="border-2 border-dashed border-wednest-beige rounded-lg p-6 text-center">
            <div className="relative">
              <Input
                id="portfolioUpload"
                type="file"
                accept="image/*"
                multiple
                disabled={isUploading}
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                  <Loader2 className="h-6 w-6 animate-spin text-wednest-sage" />
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center justify-center flex-col">
              <Upload className="h-8 w-8 text-wednest-brown-light mb-2" />
              <p className="text-wednest-brown">
                Drag & drop or click to upload images
              </p>
              <p className="text-wednest-brown-light text-sm mt-1">
                Upload up to 10 high-quality images (Max 5MB each)
              </p>
            </div>
          </div>
        </div>
        
        {localFormData.portfolioImages.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-wednest-brown">
              Uploaded Images ({localFormData.portfolioImages.length}/10)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {localFormData.portfolioImages.map((image, index) => (
                <div key={index} className="border rounded-md overflow-hidden bg-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 space-y-2">
                    <Input
                      placeholder="Add a caption (optional)"
                      value={image.caption}
                      onChange={(e) => updateCaption(index, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-2 pt-4 border-t border-wednest-beige">
          <Label htmlFor="instagramFeed">Instagram Gallery (Optional)</Label>
          <Input
            id="instagramFeed"
            name="instagramFeed"
            value={localFormData.instagramFeed}
            onChange={handleChange}
            placeholder="E.g. @yourbusinessname"
          />
          <p className="text-xs text-wednest-brown-light">
            Add your Instagram handle to display your Instagram feed on your profile.
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

export default PortfolioStep;
