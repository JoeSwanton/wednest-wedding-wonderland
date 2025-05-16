
import { toast } from "@/hooks/use-toast";

/**
 * Validates if the file is of an accepted image type
 */
export const validateFileType = (file: File): boolean => {
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

/**
 * Validates if the file size is within accepted limits
 */
export const validateFileSize = (file: File): boolean => {
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

/**
 * Creates a preview URL for a file
 */
export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Revokes a preview URL to free memory
 */
export const revokePreviewUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};
