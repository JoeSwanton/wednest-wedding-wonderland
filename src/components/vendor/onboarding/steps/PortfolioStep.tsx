
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, Upload, ImageIcon, CheckCircle2, AlertCircle, PlusCircle } from "lucide-react";
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
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    
    if (formData.portfolioImages?.length && formData.portfolioImages.length > 0) {
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
    updateFormData({
      portfolioImages: localFormData.portfolioImages,
      instagramFeed: localFormData.instagramFeed
    });
    
  }, [localFormData, updateFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateFileType = (file: File): boolean => {
    const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!acceptedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload only JPG, PNG or WebP images",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateFileSize = (file: File): boolean => {
    // 5MB max
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload images smaller than 5MB",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Reset states
    setUploadError(null);
    setIsUploading(true);
    setUploadSuccess(false);
    
    // Process files
    await handleFileUpload(files);
    
    // Clear the file input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const createPreviewUrl = (file: File): string => {
    return URL.createObjectURL(file);
  };

  const handleFileUpload = async (files: FileList) => {
    if (!user) return;
    
    const newImages: PortfolioImage[] = [];
    let hasErrors = false;

    try {
      // First, create previews immediately and add them to state
      const tempPreviews = [...localFormData.portfolioImages];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type and size
        if (!validateFileType(file) || !validateFileSize(file)) {
          hasErrors = true;
          continue;
        }
        
        // Create a temporary preview URL
        const previewUrl = createPreviewUrl(file);
        
        // Add a temporary preview image to state
        tempPreviews.push({
          url: previewUrl,
          path: `temp-${Date.now()}-${i}`,
          caption: ""
        });
      }
      
      // Update state immediately with temporary previews
      setLocalFormData(prev => ({
        ...prev,
        portfolioImages: tempPreviews
      }));
      
      // Now actually upload the files to Supabase
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Skip invalid files
        if (!validateFileType(file) || !validateFileSize(file)) {
          continue;
        }
        
        const filePath = `${user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9-_\.]/g, '')}`;

        const { data, error } = await supabase.storage
          .from("vendor-assets")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false
          });

        if (error) {
          console.error("[PortfolioStep] Upload error:", error);
          toast({
            title: "Upload failed",
            description: error.message,
            variant: "destructive"
          });
          hasErrors = true;
        } else {
          const publicUrl = supabase
            .storage
            .from("vendor-assets")
            .getPublicUrl(data.path).data.publicUrl;

          console.log("[PortfolioStep] Image uploaded successfully:", publicUrl);
          
          newImages.push({
            url: publicUrl,
            path: data.path,
            caption: "" // Optional, you can make this user-editable later
          });
        }
      }

      // After all uploads are complete, replace the temporary previews with actual uploaded images
      if (newImages.length > 0) {
        // Remove temporary previews and add actual uploaded images
        const updatedImages = localFormData.portfolioImages
          .filter(img => !img.path.startsWith('temp-'))
          .concat(newImages);
        
        console.log("[PortfolioStep] Updating portfolioImages:", updatedImages);
        
        setLocalFormData(prev => ({
          ...prev,
          portfolioImages: updatedImages
        }));
        
        // Immediately update parent form data
        updateFormData({
          portfolioImages: updatedImages
        });
        
        setUploadSuccess(true);
        toast({
          title: "Upload successful",
          description: `${newImages.length} image${newImages.length > 1 ? 's' : ''} uploaded successfully.`,
          variant: "default"
        });
      } else if (!hasErrors) {
        // No images were processed but no errors occurred either
        setUploadError("No valid images found to upload.");
        toast({
          title: "Upload issue",
          description: "No valid images were found to upload.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error("[PortfolioStep] Unhandled upload error:", error);
      setUploadError(error.message || "An unexpected error occurred during upload.");
      toast({
        title: "Upload error",
        description: error.message || "An unexpected error occurred during upload.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user || isUploading) return;
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles?.length) {
      if (localFormData.portfolioImages.length + droppedFiles.length > 10) {
        toast({
          title: "Maximum images reached",
          description: "You can upload up to 10 portfolio images.",
          variant: "destructive"
        });
        return;
      }
      
      setIsUploading(true);
      setUploadSuccess(false);
      setUploadError(null);
      handleFileUpload(droppedFiles);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    if (!user || isUploading) return;
    
    const items = e.clipboardData.items;
    const imageItems = Array.from(items).filter(item => item.type.startsWith('image/'));
    
    if (imageItems.length === 0) return;
    
    if (localFormData.portfolioImages.length + imageItems.length > 10) {
      toast({
        title: "Maximum images reached",
        description: "You can upload up to 10 portfolio images.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    setUploadSuccess(false);
    setUploadError(null);
    
    const files = imageItems.map(item => item.getAsFile()).filter(Boolean) as File[];
    if (files.length > 0) {
      const fileList = new DataTransfer();
      files.forEach(file => fileList.items.add(file));
      await handleFileUpload(fileList.files);
    }
    
    setIsUploading(false);
  };

  const handleRemoveImage = async (index: number) => {
    try {
      const imageToRemove = localFormData.portfolioImages[index];
      const updatedImages = [...localFormData.portfolioImages];
      updatedImages.splice(index, 1);
      
      console.log("[PortfolioStep] Removing image at index", index);
      console.log("[PortfolioStep] Updated portfolio after removal:", updatedImages);
      
      // Clean up URL object if it's a temporary preview
      if (imageToRemove.path.startsWith('temp-')) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      
      setLocalFormData(prev => ({
        ...prev,
        portfolioImages: updatedImages
      }));
      
      // Immediately update parent form data
      updateFormData({
        portfolioImages: updatedImages
      });
      
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

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = () => {
    console.log("[PortfolioStep] Submit clicked");
    console.log("[PortfolioStep] Local portfolio images:", localFormData.portfolioImages);
    console.log("[PortfolioStep] Local image count:", localFormData.portfolioImages.length);
    console.log("[PortfolioStep] Parent formData images:", formData.portfolioImages);
    console.log("[PortfolioStep] Parent image count:", formData.portfolioImages?.length || 0);

    // Sync one last time
    updateFormData({
      portfolioImages: localFormData.portfolioImages,
      instagramFeed: localFormData.instagramFeed
    });

    // First check local data
    if (localFormData.portfolioImages.length === 0) {
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
          
          <div
            className="relative border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ease-in-out bg-wednest-beige/5 hover:bg-wednest-beige/10"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onPaste={handlePaste}
            onClick={triggerFileInput}
            tabIndex={0}
            role="button"
            aria-label="Click or drag images here to upload"
          >
            <input
              ref={fileInputRef}
              id="portfolioUpload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={isUploading}
              aria-hidden="true"
            />
            
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="mb-3">
                {isUploading ? (
                  <Loader2 className="w-12 h-12 text-wednest-brown animate-spin" />
                ) : uploadSuccess ? (
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                ) : uploadError ? (
                  <AlertCircle className="w-12 h-12 text-red-500" />
                ) : (
                  <Upload className="w-12 h-12 text-wednest-brown" />
                )}
              </div>
              
              <h3 className="text-lg font-medium text-wednest-brown mb-2">
                {isUploading ? "Uploading..." : "Upload Portfolio Images"}
              </h3>
              
              <p className="text-sm text-wednest-brown-light mb-2">
                Drag & drop images here, paste from clipboard, or click to browse
              </p>
              
              <p className="text-xs text-wednest-brown-light">
                You can upload up to 10 images (JPG, PNG, WebP) - Max 5MB each
              </p>
              
              {uploadError && (
                <div className="mt-2 text-sm text-red-500">
                  {uploadError}
                </div>
              )}
            </div>
          </div>
        </div>

        {localFormData.portfolioImages.length > 0 ? (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <Label className="block">Portfolio Preview ({localFormData.portfolioImages.length}/10)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={triggerFileInput}
                disabled={isUploading || localFormData.portfolioImages.length >= 10}
                className="text-xs"
              >
                <PlusCircle className="mr-1 h-3 w-3" /> Add More
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {localFormData.portfolioImages.map((image, index) => (
                <div key={index} className="relative group aspect-square overflow-hidden rounded-md border border-wednest-beige">
                  <img
                    src={image.url}
                    alt={`portfolio-${index}`}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    onError={(e) => {
                      console.error(`Image failed to load: ${image.url}`);
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error+Loading+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
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
