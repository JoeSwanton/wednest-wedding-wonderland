
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PortfolioImage } from "@/types/vendor";
import { validateFileType, validateFileSize, createPreviewUrl, revokePreviewUrl } from "./fileUtils";

interface UsePortfolioUploadProps {
  initialImages: PortfolioImage[];
  userId: string | undefined;
  updateFormData: (data: { portfolioImages: PortfolioImage[] }) => void;
}

export default function usePortfolioUpload({ 
  initialImages, 
  userId, 
  updateFormData 
}: UsePortfolioUploadProps) {
  const { toast } = useToast();
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>(initialImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !userId) return;

    if (portfolioImages.length + files.length > 10) {
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

  const handleFileUpload = async (files: FileList) => {
    if (!userId) return;
    
    const newImages: PortfolioImage[] = [];
    let hasErrors = false;

    try {
      // First, create previews immediately and add them to state
      const tempPreviews = [...portfolioImages];
      
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
      setPortfolioImages(tempPreviews);
      updateFormData({ portfolioImages: tempPreviews });
      
      // Now actually upload the files to Supabase
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Skip invalid files
        if (!validateFileType(file) || !validateFileSize(file)) {
          continue;
        }
        
        const filePath = `${userId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9-_\.]/g, '')}`;

        const { data, error } = await supabase.storage
          .from("vendor-assets")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false
          });

        if (error) {
          console.error("[PortfolioUpload] Upload error:", error);
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

          console.log("[PortfolioUpload] Image uploaded successfully:", publicUrl);
          
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
        const updatedImages = portfolioImages
          .filter(img => !img.path.startsWith('temp-'))
          .concat(newImages);
        
        console.log("[PortfolioUpload] Updating portfolioImages:", updatedImages);
        
        setPortfolioImages(updatedImages);
        updateFormData({ portfolioImages: updatedImages });
        
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
      console.error("[PortfolioUpload] Unhandled upload error:", error);
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

  const handleRemoveImage = async (index: number) => {
    try {
      const imageToRemove = portfolioImages[index];
      const updatedImages = [...portfolioImages];
      updatedImages.splice(index, 1);
      
      console.log("[PortfolioUpload] Removing image at index", index);
      console.log("[PortfolioUpload] Updated portfolio after removal:", updatedImages);
      
      // Clean up URL object if it's a temporary preview
      if (imageToRemove.path.startsWith('temp-')) {
        revokePreviewUrl(imageToRemove.url);
      }
      
      setPortfolioImages(updatedImages);
      updateFormData({ portfolioImages: updatedImages });
      
      toast({
        title: "Image removed",
        description: "Portfolio image has been removed.",
      });
    } catch (error: any) {
      console.error("[PortfolioUpload] Remove image error:", error);
      toast({
        title: "Error",
        description: "Failed to remove image.",
        variant: "destructive"
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!userId || isUploading) return;
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles?.length) {
      if (portfolioImages.length + droppedFiles.length > 10) {
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
    if (!userId || isUploading) return;
    
    const items = e.clipboardData.items;
    const imageItems = Array.from(items).filter(item => item.type.startsWith('image/'));
    
    if (imageItems.length === 0) return;
    
    if (portfolioImages.length + imageItems.length > 10) {
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

  return {
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
  };
};
