import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, Check } from "lucide-react";
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

  // Initialize with the existing portfolio images from parent formData
  const [localFormData, setLocalFormData] = useState({
    portfolioImages: formData.portfolioImages || [],
    instagramFeed: formData.instagramFeed || ""
  });

  // Keep parent formData in sync with local state
  useEffect(() => {
    updateFormData({
      portfolioImages: localFormData.portfolioImages,
      instagramFeed: localFormData.instagramFeed
    });
  }, [localFormData, updateFormData]);

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

    const newImages: PortfolioImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `${user.id}/${Date.now()}-${file.name}`;

      try {
        const { data, error } = await supabase.storage
          .from("vendor-assets")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false
          });

        if (error) {
          toast({
            title: "Upload failed",
            description: error.message,
            variant: "destructive"
          });
          console.error("Upload error:", error);
        } else {
          console.log("Upload successful:", data.path);
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
      } catch (err) {
        console.error("Unexpected upload error:", err);
        toast({
          title: "Upload error",
          description: "An unexpected error occurred during upload.",
          variant: "destructive"
        });
      }
    }

    if (newImages.length > 0) {
      const updatedImages = [...localFormData.portfolioImages, ...newImages];
      setLocalFormData(prev => ({
        ...prev,
        portfolioImages: updatedImages
      }));
      
      // Immediately update parent state as well
      updateFormData({
        portfolioImages: updatedImages
      });
      
      toast({
        title: "Upload complete",
        description: `${newImages.length} image(s) uploaded successfully.`,
        variant: "default"
      });
    }

    setIsUploading(false);
  };

  const handleRemoveImage = (index: number) => {
    const updated = [...localFormData.portfolioImages];
    updated.splice(index, 1);
    setLocalFormData(prev => ({
      ...prev,
      portfolioImages: updated
    }));
    
    // Immediately update parent state as well
    updateFormData({
      portfolioImages: updated
    });
  };

  const handleSubmit = () => {
    // Log debug info
    console.log("Submit clicked, portfolio images:", localFormData.portfolioImages);
    console.log("Image count:", localFormData.portfolioImages.length);
    
    // ✅ Validate using both local and parent state to ensure alignment
    if (localFormData.portfolioImages.length === 0) {
      toast({
        title: "Upload Required",
        description: "Please upload at least one image to continue.",
        variant: "destructive"
      });
      return;
    }

    // ✅ Sync to global form state
    updateFormData({
      portfolioImages: localFormData.portfolioImages,
      instagramFeed: localFormData.instagramFeed
    });

    // ✅ Continue to next onboarding step
    onNext();
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
        />
        <p className="text-xs text-wednest-brown-light">
          You can upload up to 10 images (JPG, PNG).
        </p>
      </div>

      {isUploading && (
        <div className="flex items-center gap-2 text-wednest-sage">
          <Loader2 className="animate-spin" /> Uploading images...
        </div>
      )}

      {localFormData.portfolioImages.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 text-wednest-sage">
            <Check size={18} />
            <span className="text-sm">{localFormData.portfolioImages.length} image(s) uploaded</span>
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
