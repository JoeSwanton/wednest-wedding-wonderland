
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ToolShareCta from "./ToolShareCta";

export const VendorQuestionGenerator = () => {
  const methods = useForm();
  const { toast } = useToast();
  const [vendorType, setVendorType] = useState<string>("photographer");
  const [questions, setQuestions] = useState<string[]>([]);
  
  // Questions for different vendor types
  const questionsByType: Record<string, string[]> = {
    photographer: [
      "How would you describe your photography style?",
      "Can we see a full gallery from a recent wedding you've shot?",
      "What is included in your standard package and pricing?",
      "Do you have backup equipment in case of technical issues?",
      "How many hours of coverage do you provide?",
      "Will you be the one photographing our wedding or do you have associates?",
      "How long after the wedding until we receive our photos?",
      "Do you provide an online gallery and/or physical prints?",
      "What is your payment schedule and cancellation policy?",
      "Have you worked at our venue before?",
      "How do you handle low-light situations during the reception?",
      "What do you need from us to ensure the best photos on our wedding day?",
      "Do you offer engagement sessions?",
      "How do you coordinate with other vendors like the videographer?",
      "What is your approach to posed vs. candid shots?"
    ],
    venue: [
      "What dates are available in our preferred month?",
      "What is the rental fee and what's included in that price?",
      "How many guests can the space accommodate?",
      "What is your payment schedule and cancellation policy?",
      "Are there any noise restrictions or curfews?",
      "Do you provide catering or do we need to hire an external caterer?",
      "Are tables, chairs, linens, and tableware included?",
      "Is there a bridal suite or getting-ready rooms available?",
      "What are the options for ceremony locations?",
      "Do you have sufficient parking for our guests?",
      "Are there any decoration restrictions?",
      "Do you have liability insurance?",
      "What's your rain contingency plan for outdoor spaces?",
      "Do you have preferred vendors we need to work with?",
      "Can we schedule a tasting if catering is provided?"
    ],
    caterer: [
      "Do you offer tastings before we book?",
      "What is your price per person, and what's included?",
      "Do you provide staff for serving and cleanup?",
      "Can you accommodate dietary restrictions and special meal requests?",
      "How do you handle meal service (buffet, plated, family-style)?",
      "What is your cancellation policy?",
      "Do you provide alcohol and bar service?",
      "Are tables, chairs, linens, and tableware included?",
      "How many servers will be present for our guest count?",
      "Do you provide cake cutting services?",
      "When do you need the final guest count?",
      "Can you provide a sample menu?",
      "What's your policy on leftovers?",
      "Have you worked at our venue before?",
      "Do you provide a coordinator for the day of the event?"
    ],
    florist: [
      "Can you work within our budget and aesthetic preferences?",
      "Can I see examples of your previous wedding work?",
      "What flowers will be in season during our wedding?",
      "How far in advance should we book with you?",
      "What is your delivery and setup process on the wedding day?",
      "Do you provide rentals like arches, vases, or candelabras?",
      "Can you create sample arrangements before the wedding?",
      "How do you ensure flowers stay fresh throughout the day?",
      "What happens to the flowers after the wedding?",
      "What is your payment schedule and cancellation policy?",
      "How do you handle last-minute changes or requests?",
      "Have you worked at our venue before?",
      "Do you provide flowers for the wedding party, family members, and cake?",
      "Can you recommend ways to repurpose ceremony flowers at the reception?",
      "What are some ways to maximize our floral budget?"
    ],
    dj: [
      "Can we provide a must-play and do-not-play list?",
      "What is your approach to MCing the event?",
      "How do you keep the dance floor energized?",
      "What equipment do you provide?",
      "Do you have backup equipment?",
      "Can we meet our specific DJ before booking?",
      "How long have you been DJing weddings?",
      "Can you provide ceremony music as well?",
      "Do you take song requests from guests?",
      "What is your attire for the wedding day?",
      "What is your payment schedule and cancellation policy?",
      "Have you worked at our venue before?",
      "How do you handle music for different parts of the reception?",
      "Can you provide microphones for toasts?",
      "How do you coordinate with other vendors for timeline events?"
    ]
  };
  
  const generateQuestions = () => {
    setQuestions(questionsByType[vendorType] || []);
    
    toast({
      title: "Questions Generated",
      description: `${questionsByType[vendorType]?.length || 0} questions have been generated for your ${vendorType}.`
    });
  };
  
  const copyToClipboard = () => {
    const text = questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Copied to Clipboard",
      description: "Questions have been copied to your clipboard."
    });
  };
  
  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        <Card className="border-theme-beige shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-theme-brown/10 p-3 rounded-full">
                <FileText className="h-6 w-6 text-theme-brown" />
              </div>
              <div>
                <CardTitle className="text-2xl font-serif text-theme-brown">Vendor Question Generator</CardTitle>
                <CardDescription>Generate a list of essential questions to ask potential wedding vendors</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="max-w-md mx-auto">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor-type">Select Vendor Type</Label>
                  <Select value={vendorType} onValueChange={setVendorType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photographer">Photographer</SelectItem>
                      <SelectItem value="venue">Venue</SelectItem>
                      <SelectItem value="caterer">Caterer</SelectItem>
                      <SelectItem value="florist">Florist</SelectItem>
                      <SelectItem value="dj">DJ / Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Choose the type of vendor you're interviewing.</p>
                </div>
                
                <Button 
                  onClick={generateQuestions} 
                  className="w-full bg-theme-brown hover:bg-theme-brown-dark text-white"
                >
                  Generate Questions
                </Button>
              </div>
              
              {questions.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-theme-brown">Questions for your {vendorType.charAt(0).toUpperCase() + vendorType.slice(1)}</h3>
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-slate-50 max-h-[400px] overflow-y-auto">
                    <ol className="space-y-3 list-decimal list-inside text-theme-brown-light">
                      {questions.map((question, index) => (
                        <li key={index}>{question}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <ToolShareCta 
          title="Vendor Question Generator" 
          description="Be prepared for vendor meetings with our comprehensive list of questions for each type of wedding vendor." 
        />
      </div>
    </FormProvider>
  );
};
