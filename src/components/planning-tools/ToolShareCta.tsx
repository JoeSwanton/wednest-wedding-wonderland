
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ToolShareCtaProps {
  title: string;
  description: string;
}

const ToolShareCta = ({ title, description }: ToolShareCtaProps) => {
  const { toast } = useToast();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Tool link copied to clipboard. Share it with others who might find it useful!"
      });
    }
  };

  return (
    <Card className="bg-theme-cream/10 border-theme-beige p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-serif text-theme-brown mb-2">Find this tool helpful?</h3>
          <p className="text-theme-brown-light">Share it with friends who are planning their wedding.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
            Share This Tool
          </Button>

          <Button className="bg-theme-brown hover:bg-theme-brown-dark text-white">
            Create Free Account
          </Button>
        </div>
      </div>

      <p className="text-xs text-theme-brown-light mt-4 text-center md:text-right">
        Sign up for free to save your progress and access all our planning tools.
      </p>
    </Card>
  );
};

export default ToolShareCta;
