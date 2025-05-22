
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MessageSquare, Copy, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ToolShareCta from "./ToolShareCta";

export const SaveTheDateComposer = () => {
  const { toast } = useToast();
  const [names, setNames] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [template, setTemplate] = useState<string>("formal");
  const [message, setMessage] = useState<string>("");

  // Template options
  const templates = {
    formal: `Save the Date!\n\n[names] are getting married on [date] in [location].\n\nFormal invitation to follow.`,
    casual: `Hey there! Mark your calendar!\n\n[names] are tying the knot on [date] in [location].\n\nMore details coming soon!`,
    fun: `WOOHOO! IT'S HAPPENING!\n\n[names] are saying "I do" on [date] in [location].\n\nGet ready to celebrate with us! Details to follow.`,
    minimal: `SAVE THE DATE\n[names]\n[date]\n[location]`
  };

  // Update message when inputs change
  const updateMessage = () => {
    let template = templates[template as keyof typeof templates] || templates.formal;
    
    // Replace placeholders with actual values
    let newMessage = template
      .replace("[names]", names || "[your names]")
      .replace("[date]", date || "[wedding date]")
      .replace("[location]", location || "[wedding location]");
    
    setMessage(newMessage);
  };

  // Update message when template changes
  const handleTemplateChange = (value: string) => {
    setTemplate(value);
    setTimeout(updateMessage, 0);
  };

  // Update message when inputs change
  const handleInputChange = () => {
    setTimeout(updateMessage, 0);
  };

  // Initialize message on component load
  useState(() => {
    updateMessage();
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    toast({
      title: "Copied to clipboard",
      description: "Your message has been copied to the clipboard."
    });
  };

  const sendSMS = () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter a phone number to send the SMS.",
        variant: "destructive"
      });
      return;
    }

    // Format phone number for SMS link
    const formattedPhone = phoneNumber.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(message);
    
    // Create SMS link
    const smsLink = `sms:${formattedPhone}?body=${encodedMessage}`;
    
    // Open SMS link
    window.open(smsLink, "_blank");
  };

  return (
    <div className="space-y-8">
      <Card className="border-theme-beige shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-theme-brown-light/10 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-theme-brown-light" />
            </div>
            <div>
              <CardTitle className="text-2xl font-serif text-theme-brown">Save-the-Date SMS Composer</CardTitle>
              <CardDescription>Create and send save-the-date messages to your guests via SMS</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormItem>
                <FormLabel>Your Names</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. John & Jane" 
                    value={names}
                    onChange={(e) => { 
                      setNames(e.target.value);
                      handleInputChange();
                    }}
                  />
                </FormControl>
                <FormDescription>Enter both your names</FormDescription>
              </FormItem>
              
              <FormItem>
                <FormLabel>Wedding Date</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. September 21, 2025" 
                    value={date}
                    onChange={(e) => { 
                      setDate(e.target.value);
                      handleInputChange();
                    }}
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel>Wedding Location</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Sydney, Australia" 
                    value={location}
                    onChange={(e) => { 
                      setLocation(e.target.value);
                      handleInputChange();
                    }}
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel>Message Style</FormLabel>
                <RadioGroup 
                  value={template} 
                  onValueChange={handleTemplateChange}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="formal" id="formal" />
                    <label htmlFor="formal" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Formal</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="casual" id="casual" />
                    <label htmlFor="casual" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Casual</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fun" id="fun" />
                    <label htmlFor="fun" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Fun</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minimal" id="minimal" />
                    <label htmlFor="minimal" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Minimal</label>
                  </div>
                </RadioGroup>
              </FormItem>
            </div>
            
            <div className="space-y-4">
              <FormItem>
                <FormLabel>Preview Message</FormLabel>
                <Textarea 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[200px]"
                />
                <FormDescription>Customize this message as needed</FormDescription>
              </FormItem>
              
              <Button 
                variant="outline" 
                className="border-theme-brown-light text-theme-brown-light hover:bg-theme-brown-light hover:text-white flex items-center gap-2 w-full"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </Button>
            </div>
          </div>
          
          <div className="border-t border-theme-beige pt-6">
            <h3 className="text-lg font-medium text-theme-brown mb-4">Send via SMS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <FormItem>
                <FormLabel>Recipient Phone Number</FormLabel>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input 
                      placeholder="e.g. +61 123 456 789" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </FormControl>
                  <Button 
                    variant="default" 
                    className="bg-theme-brown hover:bg-theme-brown-dark text-white"
                    onClick={sendSMS}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Send SMS
                  </Button>
                </div>
                <FormDescription>
                  This will open your default SMS app with the message ready to send
                </FormDescription>
              </FormItem>
            </div>
          </div>
        </CardContent>
      </Card>

      <ToolShareCta 
        title="Save-the-Date SMS Composer" 
        description="Create and send beautiful save-the-date messages to your guests via SMS. Choose from multiple templates and customize your message." 
      />
    </div>
  );
};
