
import { Button } from "@/components/ui/button";
import { Copy, Send } from "lucide-react";

interface SaveTheDatePreviewProps {
  generatedMessage: string;
  onCopy: () => void;
  onSendSms: () => void;
}

export const SaveTheDatePreview = ({
  generatedMessage,
  onCopy,
  onSendSms
}: SaveTheDatePreviewProps) => {
  return (
    <div>
      <div className="border rounded-md p-4 h-full bg-slate-50">
        <h3 className="font-medium text-theme-brown mb-2">Preview</h3>
        
        {generatedMessage ? (
          <div className="space-y-4">
            <div className="whitespace-pre-wrap bg-white p-4 rounded border min-h-[250px] text-theme-brown-light">
              {generatedMessage}
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white"
                onClick={onCopy}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Text
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 border-theme-brown-light text-theme-brown-light hover:bg-theme-brown-light hover:text-white"
                onClick={onSendSms}
              >
                <Send className="mr-2 h-4 w-4" />
                Send via SMS
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[250px] text-theme-brown-light text-center">
            <p>Fill out the form and click "Generate Message" to see your save-the-date message here</p>
          </div>
        )}
      </div>
    </div>
  );
};
