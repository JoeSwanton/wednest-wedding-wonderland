import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check } from "lucide-react";

export const SaveTheDateComposer = () => {
  const { toast } = useToast();
  const [names, setNames] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const templates = [
    {
      id: 1,
      title: "Classic",
      content: "Save the Date! [Names] are getting married on [Date] in [Location]. Formal invitation to follow."
    },
    {
      id: 2,
      title: "Casual",
      content: "We're tying the knot! Join [Names] on [Date] in [Location] to celebrate. More details coming soon!"
    },
    {
      id: 3,
      title: "Destination",
      content: "Pack your bags! [Names] are getting married in [Location] on [Date]. Formal invitation with travel details to follow."
    },
    {
      id: 4,
      title: "Minimalist",
      content: "[Names]. [Date]. [Location]. Save the Date."
    }
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  const generateMessage = () => {
    let generatedMessage = selectedTemplate.content;
    generatedMessage = generatedMessage.replace("[Names]", names || "...");
    generatedMessage = generatedMessage.replace("[Date]", date || "...");
    generatedMessage = generatedMessage.replace("[Location]", location || "...");
    setMessage(generatedMessage);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "The message has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-8">
      <Card className="border-theme-beige shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-theme-brown">Save the Date Composer</CardTitle>
          <CardDescription>Compose a save the date message to send to your guests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-theme-brown-light mb-2">Names</label>
              <Input
                type="text"
                placeholder="Your Names"
                value={names}
                onChange={(e) => setNames(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-brown-light mb-2">Date</label>
              <Input
                type="text"
                placeholder="Wedding Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-brown-light mb-2">Location</label>
              <Input
                type="text"
                placeholder="Wedding Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-brown-light mb-2">Template</label>
              <Select value={selectedTemplate.id.toString()} onValueChange={(value) => {
                const template = templates.find(t => t.id === parseInt(value));
                if (template) {
                  setSelectedTemplate(template);
                }
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id.toString()}>{template.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="bg-theme-sage hover:bg-theme-sage-dark text-white w-full" onClick={generateMessage}>
            Generate Message
          </Button>
          <div>
            <label className="block text-sm font-medium text-theme-brown-light mb-2">Message</label>
            <Textarea
              readOnly
              value={message}
              className="resize-none bg-theme-cream/40 text-theme-brown"
              rows={4}
            />
            <Button
              variant="outline"
              className="mt-2 w-full border-theme-sage-dark text-theme-sage-dark hover:bg-theme-sage-dark hover:text-white relative"
              onClick={copyToClipboard}
              disabled={copied || !message}
            >
              {copied ? (
                <div className="flex items-center justify-center gap-2">
                  <Check className="h-4 w-4" />
                  Copied!
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Copy className="h-4 w-4" />
                  Copy to Clipboard
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
