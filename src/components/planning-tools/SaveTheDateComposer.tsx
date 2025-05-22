
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Copy, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import ToolShareCta from "./ToolShareCta";

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
    const formattedDate = date ? format(date, "EEEE, MMMM do, yyyy") : "";
    
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
  
  const copyToClipboard = () => {
    if (generatedMessage) {
      navigator.clipboard.writeText(generatedMessage);
      
      toast({
        title: "Copied to Clipboard",
        description: "Your save-the-date message has been copied to your clipboard."
      });
    }
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="names">Couple Names</Label>
                  <Input 
                    id="names" 
                    value={names} 
                    onChange={(e) => setNames(e.target.value)} 
                    placeholder="e.g. Sarah & Michael" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Wedding Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Wedding Location</Label>
                  <Input 
                    id="location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="e.g. The Grand Hotel, New York" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="personalMessage">Personal Message</Label>
                  <Textarea 
                    id="personalMessage" 
                    value={personalMessage} 
                    onChange={(e) => setPersonalMessage(e.target.value)} 
                    placeholder="Add a personal note to your guests" 
                    rows={4} 
                  />
                </div>
                
                <Button 
                  onClick={generateMessage}
                  className="w-full bg-theme-brown-light hover:bg-theme-brown text-white"
                >
                  Generate Message
                </Button>
              </div>
              
              {/* Preview */}
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
                          onClick={copyToClipboard}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Text
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex-1 border-theme-brown-light text-theme-brown-light hover:bg-theme-brown-light hover:text-white"
                          onClick={() => {
                            // Would integrate with SMS service in real implementation
                            toast({
                              title: "SMS Feature",
                              description: "In a production app, this would integrate with an SMS service to send your message."
                            });
                          }}
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
