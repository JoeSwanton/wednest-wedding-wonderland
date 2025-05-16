
import React, { useRef } from "react";
import { Loader2, Upload, CheckCircle2, AlertCircle } from "lucide-react";

interface UploadAreaProps {
  isUploading: boolean;
  uploadSuccess: boolean;
  uploadError: string | null;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onPaste: (e: React.ClipboardEvent) => void;
  onFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  isUploading,
  uploadSuccess,
  uploadError,
  onDrop,
  onDragOver,
  onPaste,
  onFileSelected,
  fileInputRef
}) => {
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className="relative border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ease-in-out bg-wednest-beige/5 hover:bg-wednest-beige/10"
      onDragOver={onDragOver}
      onDrop={onDrop}
      onPaste={onPaste}
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
        onChange={onFileSelected}
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
  );
};

export default UploadArea;
