
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, Upload, ImageIcon, CheckCircle2 } from "lucide-react";
import { VendorOnboardingData, PortfolioImage } from "@/types/vendor";

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
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [localFormData, setLocalFormData] = useState<{
    portfolioImages: PortfolioImage[];
    instagramFeed: string;
  }>({
    portfolioImages: formData.portfolioImages || [],
    instagramFeed: formData.instagramFeed || ""
  });

  // Sync with parent formData whenever it changes
  useEffect(() => {
    console.log("[PortfolioStep] Parent formData changed:", formData);
    console.log("[PortfolioStep] Parent portfolioImages count:", formData.portfolioImages?.length || 0);
    
    // Update local state only if parent has data and local doesn't
    if (formData.portfolioImages?.length && !localFormData.portfolioImages.length) {
      setLocalFormData(prev => ({
        ...prev,
        portfolioImages: formData.portfolioImages || [],
        instagramFeed: formData.instagramFeed || ""
      }));
    }
  }, [formData]);

  // On initial load, log the form data
  useEffect(() => {
    console.log("[PortfolioStep] Initial formData from parent:", formData);
    console.log("[PortfolioStep] Initial portfolioImages:", formData.portfolioImages);
    console.log("[PortfolioStep] Initial localFormData:", localFormData);
  }, []);

  // Whenever localFormData changes, sync to parent
  useEffect(() => {
    console.log("[PortfolioStep] Syncing with parent, localFormData:", localFormData);
    
    // Update parent form data immediately when local state changes
    if (localFormData.portfolioImages.length > 0 || localFormData.instagramFeed) {
      updateFormData({
        portfolioImages: localFormData.portfolioImages,
        instagramFeed: localFormData.instagramFeed
      });
    }
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
    setUploadSuccess(false);
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
          toast({
            title: "Upload failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          const publicUrl = supabase
            .storage
            .from("vendor-assets")
            .getPublicUrl(data.path).data.publicUrl;

          newImages.push({
            url: publicUrl,
            path: data.path,
            caption: "" // Optional, you can make this user-editable later
          });
        }
      }

      // Update local state with new images
      const updatedImages = [...localFormData.portfolioImages, ...newImages];
      
      setLocalFormData(prev => ({
        ...prev,
        portfolioImages: updatedImages
      }));
      
      // Immediately update parent form data
      updateFormData({
        portfolioImages: updatedImages
      });
      
      if (newImages.length > 0) {
        setUploadSuccess(true);
        toast({
          title: "Upload successful",
          description: `${newImages.length} image${newImages.length > 1 ? 's' : ''} uploaded successfully.`,
          variant: "default"
        });
      }
    } catch (error: any) {
      console.error("[PortfolioStep] Upload error:", error);
      toast({
        title: "Upload error",
        description: error.message || "An unexpected error occurred during upload.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async (index: number) => {
    try {
      const imageToRemove = localFormData.portfolioImages[index];
      const updatedImages = [...localFormData.portfolioImages];
      updatedImages.splice(index, 1);
      
      setLocalFormData(prev => ({
        ...prev,
        portfolioImages: updatedImages
      }));
      
      // Immediately update parent form data
      updateFormData({
        portfolioImages: updatedImages
      });

      // Optionally delete from storage (if needed)
      // await supabase.storage.from("vendor-assets").remove([imageToRemove.path]);
      
      toast({
        title: "Image removed",
        description: "Portfolio image has been removed.",
      });
    } catch (error: any) {
      console.error("[PortfolioStep] Remove image error:", error);
      toast({
        title: "Error",
        description: "Failed to remove image.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = () => {
    console.log("[PortfolioStep] Submit clicked");
    console.log("[PortfolioStep] Local portfolio images:", localFormData.portfolioImages);
    console.log("[PortfolioStep] Local image count:", localFormData.portfolioImages.length);
    console.log("[PortfolioStep] Parent formData images:", formData.portfolioImages);
    console.log("[PortfolioStep] Parent image count:", formData.portfolioImages?.length || 0);

    // First check local data
    if (localFormData.portfolioImages.length === 0) {
      toast({
        title: "Upload Required",
        description: "Please upload at least one image to continue.",
        variant: "destructive"
      });
      return;
    }

    // Then double-check with parent data (for safety)
    if (!formData.portfolioImages || formData.portfolioImages.length === 0) {
      // Try to sync one last time
      updateFormData({
        portfolioImages: localFormData.portfolioImages,
        instagramFeed: localFormData.instagramFeed
      });
      
      // If there are local images but they didn't sync, give helpful error
      if (localFormData.portfolioImages.length > 0) {
        toast({
          title: "Saving...",
          description: "Your images are being processed. Please try again in a moment.",
        });
        // Wait a brief moment to allow state to sync
        setTimeout(() => onNext(), 500);
        return;
      }
      
      toast({
        title: "Upload Required",
        description: "Please upload at least one image to continue.",
        variant: "destructive"
      });
      return;
    }

    // If all validations pass, proceed to next step
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg bg-white">
        <div className="mb-4">
          <Label htmlFor="portfolioUpload" className="block mb-2">Upload Portfolio Images</Label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                id="portfolioUpload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="relative z-20 opacity-0 cursor-pointer h-12"
                disabled={isUploading}
              />
              <div className="absolute inset-0 z-10 flex items-center justify-center px-4 py-2 border border-dashed rounded-md border-wednest-beige bg-wednest-beige/10">
                <div className="flex items-center gap-2 text-wednest-brown">
                  <Upload size={18} />
                  <span>{isUploading ? "Uploading..." : "Choose files or drag and drop"}</span>
                </div>
              </div>
            </div>
            {isUploading && <Loader2 className="animate-spin text-wednest-sage ml-2" />}
            {uploadSuccess && !isUploading && <CheckCircle2 className="text-green-500 ml-2" />}
          </div>
          <p className="text-xs text-wednest-brown-light mt-2">
            You can upload up to 10 images (JPG, PNG).
          </p>
        </div>

        {localFormData.portfolioImages.length > 0 ? (
          <div className="mt-6">
            <Label className="block mb-3">Portfolio Preview</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {localFormData.portfolioImages.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-md border border-wednest-beige">
                  <img
                    src={image.url}
                    alt={`portfolio-${index}`}
                    className="object-cover w-full h-32 transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveImage(index)}
                      className="opacity-90"
                    >
                      <Trash2 size={14} className="mr-1" /> Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 border border-dashed rounded-md border-wednest-beige/60 bg-wednest-beige/5">
            <ImageIcon className="w-12 h-12 text-wednest-beige mb-2" />
            <p className="text-wednest-brown">No portfolio images uploaded yet</p>
            <p className="text-xs text-wednest-brown-light">
              Upload at least one image to showcase your work
            </p>
          </div>
        )}
      </div>

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
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
};

export default PortfolioStep;
