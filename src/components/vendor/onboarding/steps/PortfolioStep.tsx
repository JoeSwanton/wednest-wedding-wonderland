
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { VendorOnboardingData } from "@/types/vendor";
import UploadArea from "./portfolio/UploadArea";
import PortfolioGrid from "./portfolio/PortfolioGrid";
import EmptyPortfolio from "./portfolio/EmptyPortfolio";
import usePortfolioUpload from "./portfolio/usePortfolioUpload";

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
  const [instagramFeed, setInstagramFeed] = useState(formData.instagramFeed || "");

  // Initialize with form data from parent
  const {
    portfolioImages,
    isUploading,
    uploadSuccess,
    uploadError,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    handleDragOver,
    handleDrop,
    handlePaste
  } = usePortfolioUpload({
    initialImages: formData.portfolioImages || [],
    userId: user?.id,
    updateFormData: (data) => updateFormData(data)
  });

  // Sync with parent formData whenever it changes
  useEffect(() => {
    console.log("[PortfolioStep] Parent formData changed:", formData);
    console.log("[PortfolioStep] Parent portfolioImages count:", formData.portfolioImages?.length || 0);
    
    if (formData.portfolioImages?.length && formData.portfolioImages.length > 0) {
      setInstagramFeed(formData.instagramFeed || "");
    }
  }, [formData]);

  // Handle instagram feed change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstagramFeed(e.target.value);
    updateFormData({ instagramFeed: e.target.value });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = () => {
    console.log("[PortfolioStep] Submit clicked");
    console.log("[PortfolioStep] Local portfolio images:", portfolioImages);
    console.log("[PortfolioStep] Local image count:", portfolioImages.length);
    console.log("[PortfolioStep] Parent formData images:", formData.portfolioImages);
    console.log("[PortfolioStep] Parent image count:", formData.portfolioImages?.length || 0);

    // First check local data
    if (portfolioImages.length === 0) {
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
          
          <UploadArea
            isUploading={isUploading}
            uploadSuccess={uploadSuccess}
            uploadError={uploadError}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onPaste={handlePaste}
            onFileSelected={handleFileChange}
            fileInputRef={fileInputRef}
          />
        </div>

        {portfolioImages.length > 0 ? (
          <PortfolioGrid
            images={portfolioImages}
            onRemoveImage={handleRemoveImage}
            onAddMoreClick={triggerFileInput}
            isUploading={isUploading}
          />
        ) : (
          <EmptyPortfolio />
        )}
      </div>

      <div className="space-y-2 pt-4 border-t border-wednest-beige">
        <Label htmlFor="instagramFeed">Instagram Gallery (Optional)</Label>
        <Input
          id="instagramFeed"
          name="instagramFeed"
          value={instagramFeed}
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
