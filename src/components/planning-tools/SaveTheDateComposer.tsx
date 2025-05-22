
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ToolShareCta from "./ToolShareCta";
import { SaveTheDateForm } from "./save-the-date/SaveTheDateForm";
import { SaveTheDatePreview } from "./save-the-date/SaveTheDatePreview";

export const SaveTheDateComposer = () => {
  const methods = useForm();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date(new Date().setMonth(new Date().getMonth() + 9)));
  const [names, setNames] = useState<string>("Sarah & Michael");
  const [location, setLocation] = useState<string>("The Grand Hotel, New York");
  const [personalMessage, setPersonalMessage] = useState<string>(
    "We're excited to announce that we're getting married! Please save the date and stay tuned for a formal invitation with all the details."
  );
  
  const [generatedMessage, setGeneratedMessage] = useState<string>("");
  
  const generateMessage = () => {
    // Generate the message based on user inputs
    const formattedDate = date ? new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date) : "";
    
    const message = `
💍 SAVE THE DATE 💍

${names} are getting married!

🗓️ ${formattedDate}
📍 ${location}

${personalMessage}

Reply to let us know if you can make it!
    `.trim();
    
    setGeneratedMessage(message);
    
    toast({
      title: "Message Generated",
      description: "Your save-the-date message has been created. You can copy it or customize it further."
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        <Card className="border-theme-beige shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-theme-brown-light/10 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-theme-brown-light" />
              </div>
              <div>
                <CardTitle className="text-2xl font-serif text-theme-brown">Save-the-Date Composer</CardTitle>
                <CardDescription>Create a beautiful save-the-date message to share with your guests</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input Form */}
              <SaveTheDateForm 
                names={names}
                setNames={setNames}
                date={date}
                setDate={setDate}
                location={location}
                setLocation={setLocation}
                personalMessage={personalMessage}
                setPersonalMessage={setPersonalMessage}
                onGenerate={generateMessage}
              />
              
              {/* Preview */}
              <SaveTheDatePreview 
                generatedMessage={generatedMessage}
                onCopy={() => {
                  if (generatedMessage) {
                    navigator.clipboard.writeText(generatedMessage);
                    
                    toast({
                      title: "Copied to Clipboard",
                      description: "Your save-the-date message has been copied to your clipboard."
                    });
                  }
                }}
                onSendSms={() => {
                  // Would integrate with SMS service in real implementation
                  toast({
                    title: "SMS Feature",
                    description: "In a production app, this would integrate with an SMS service to send your message."
                  });
                }}
              />
            </div>
          </CardContent>
        </Card>
        
        <ToolShareCta 
          title="Save-the-Date Composer" 
          description="Create and send beautiful save-the-date messages to your guests with our free message composer." 
        />
      </div>
    </FormProvider>
  );
};
