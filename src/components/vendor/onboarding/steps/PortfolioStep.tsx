import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, Check, AlertCircle } from "lucide-react";
import { PortfolioImage, VendorOnboardingData } from "@/types/vendor";

interface PortfolioStepProps {
  onNext: () => void;
  onBack: () => void;
  formData: VendorOnboardingData;
  updateFormData: (data: Partial<VendorOnboardingData>) => void;
}

const PortfolioStep = ({
  onNext,
  onBack,
  formData,
  updateFormData
}: PortfolioStepProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Initialize with the existing portfolio images from parent formData
  const [localFormData, setLocalFormData] = useState({
    portfolioImages: formData.portfolioImages || [],
    instagramFeed: formData.instagramFeed || ""
  });

  // Log initial state for debugging
  useEffect(() => {
    console.log("[PortfolioStep] Initial formData from parent:", formData);
    console.log("[PortfolioStep] Initial portfolioImages:", formData.portfolioImages);
    console.log("[PortfolioStep] Initial localFormData:", localFormData);
  }, []);

  // Keep parent formData in sync with local state
  useEffect(() => {
    console.log("[PortfolioStep] Syncing with parent, localFormData:", localFormData);
    
    // Ensure we have a clean array of PortfolioImage objects
    if (localFormData.portfolioImages && localFormData.portfolioImages.length > 0) {
      // Clear validation errors if we have images
      setValidationError(null);
      setUploadSuccess(true);
      
      updateFormData({
        portfolioImages: localFormData.portfolioImages,
        instagramFeed: localFormData.instagramFeed
      });
      
      console.log("[PortfolioStep] Updated parent with images count:", localFormData.portfolioImages.length);
    }
  }, [localFormData]);

  // Additional effect to track parent formData changes
  useEffect(() => {
    // This ensures we get updates when the parent's formData changes
    console.log("[PortfolioStep] Parent formData changed:", formData);
    console.log("[PortfolioStep] Parent portfolioImages count:", formData.portfolioImages?.length || 0);
    
    // Update local state if parent data changes and there's a difference
    if (JSON.stringify(formData.portfolioImages) !== JSON.stringify(localFormData.portfolioImages)) {
      setLocalFormData(prev => ({
        ...prev,
        portfolioImages: formData.portfolioImages || []
      }));
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !user) return;

    if (localFormData.portfolioImages.length + files.length > 10) {
      toast({
        title: "Maximum images reached",
        description: "You can upload up to 10 portfolio images.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setValidationError(null);
    
    const newImages: PortfolioImage[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = `${user.id}/${Date.now()}-${file.name}`;
  
        const { data, error } = await supabase.storage
          .from("vendor-assets")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false
          });
  
        if (error) {
          console.error("[PortfolioStep] Upload error:", error);
          throw error;
        }
        
        console.log("[PortfolioStep] Upload successful:", data.path);
        const publicUrl = supabase
          .storage
          .from("vendor-assets")
          .getPublicUrl(data.path).data.publicUrl;
  
        // Create a proper PortfolioImage object
        newImages.push({
          url: publicUrl,
          path: data.path,
          caption: ""
        });
      }
  
      const updatedImages = [...localFormData.portfolioImages, ...newImages];
      console.log("[PortfolioStep] Updated images array:", updatedImages);
      
      // Update local state
      setLocalFormData(prev => ({
        ...prev,
        portfolioImages: updatedImages
      }));
      
      // Immediately update parent state as well
      updateFormData({
        portfolioImages: updatedImages
      });
      
      setUploadSuccess(true);
      
      toast({
        title: "Upload complete",
        description: `${newImages.length} image(s) uploaded successfully.`,
        variant: "default"
      });
    } catch (err) {
      console.error("[PortfolioStep] Unexpected upload error:", err);
      setUploadError("An error occurred during upload. Please try again.");
      toast({
        title: "Upload error",
        description: "An unexpected error occurred during upload.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = [...localFormData.portfolioImages];
    updated.splice(index, 1);
    
    console.log("[PortfolioStep] Images after removal:", updated);
    
    // Update local state
    setLocalFormData(prev => ({
      ...prev,
      portfolioImages: updated
    }));
    
    // Immediately update parent state as well
    updateFormData({
      portfolioImages: updated
    });
    
    if (updated.length === 0) {
      setUploadSuccess(false);
    }
  };

  const handleSubmit = () => {
    // Log debug info
    console.log("[PortfolioStep] Submit clicked");
    console.log("[PortfolioStep] Local portfolio images:", localFormData.portfolioImages);
    console.log("[PortfolioStep] Local image count:", localFormData.portfolioImages.length);
    console.log("[PortfolioStep] Parent formData images:", formData.portfolioImages);
    console.log("[PortfolioStep] Parent image count:", formData.portfolioImages?.length || 0);
    
    // Clear any previous error
    setUploadError(null);
    setValidationError(null);
    
    // Validate using both local and parent state to ensure alignment
    if (localFormData.portfolioImages.length === 0) {
      const errorMsg = "Please upload at least one image to continue.";
      setValidationError(errorMsg);
      toast({
        title: "Upload Required",
        description: errorMsg,
        variant: "destructive"
      });
      return;
    }

    // Verify that images exist in parent state too
    if (!formData.portfolioImages || formData.portfolioImages.length === 0) {
      console.log("[PortfolioStep] WARNING: Images in local state but not in parent state");
      
      // Force sync to global form state one more time to be sure
      updateFormData({
        portfolioImages: localFormData.portfolioImages,
        instagramFeed: localFormData.instagramFeed
      });
      
      // Check if we need to delay to let state update
      setTimeout(() => {
        // Continue to next onboarding step
        onNext();
      }, 100);
    } else {
      // Continue to next onboarding step
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="portfolioUpload">Upload Portfolio Images</Label>
        <Input
          id="portfolioUpload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <p className="text-xs text-wednest-brown-light mt-1">
          You can upload up to 10 images (JPG, PNG). At least one image is required.
        </p>
      </div>

      {isUploading && (
        <div className="flex items-center gap-2 text-wednest-sage">
          <Loader2 className="animate-spin" /> Uploading images...
        </div>
      )}

      {(uploadError || validationError) && (
        <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-md">
          <AlertCircle size={18} />
          <span className="text-sm">{uploadError || validationError}</span>
        </div>
      )}

      {uploadSuccess && localFormData.portfolioImages.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 text-wednest-sage">
            <Check size={18} />
            <span className="text-sm">
              {localFormData.portfolioImages.length} image(s) uploaded
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
            {localFormData.portfolioImages.map((image, index) => (
              <div key={index} className="relative border rounded">
                <img
                  src={image.url}
                  alt={`portfolio-${index}`}
                  className="object-cover w-full h-32 rounded"
                />
                <div className="absolute top-1 right-1">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <Trash2 size={14} />
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

      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>Back</Button>
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
