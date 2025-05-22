
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Copy, Printer, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ToolShareCta from "./ToolShareCta";

interface QuestionCategory {
  id: string;
  label: string;
  questions: string[];
}

export const VendorQuestionGenerator = () => {
  const { toast } = useToast();
  const [vendorType, setVendorType] = useState<string>("photographer");
  const [customQuestion, setCustomQuestion] = useState<string>("");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  
  // Question data by vendor type
  const questionData: Record<string, QuestionCategory[]> = {
    photographer: [
      {
        id: "experience",
        label: "Experience & Style",
        questions: [
          "How many years have you been photographing weddings?",
          "How would you describe your photography style?",
          "Can we see a full gallery from a recent wedding?",
          "Have you shot at our venue before?",
          "What makes your work different from other photographers?"
        ]
      },
      {
        id: "packages",
        label: "Packages & Pricing",
        questions: [
          "What packages do you offer and what is included in each?",
          "Do you offer engagement shoots?",
          "How many hours of coverage do you typically recommend?",
          "What is the payment schedule?",
          "Do you charge travel fees?"
        ]
      },
      {
        id: "logistics",
        label: "Logistics & Delivery",
        questions: [
          "Do you bring an assistant or second shooter?",
          "How many photos can we expect to receive?",
          "When and how will we receive our photos?",
          "Do you provide raw files or only edited images?",
          "What is your backup plan if something happens to you or your equipment?"
        ]
      }
    ],
    venue: [
      {
        id: "availability",
        label: "Availability & Logistics",
        questions: [
          "Is our preferred date available?",
          "What is the venue capacity?",
          "What is the rental timeframe?",
          "What spaces are included in the rental?",
          "What is your rain/weather backup plan?"
        ]
      },
      {
        id: "pricing",
        label: "Pricing & Inclusions",
        questions: [
          "What is the rental fee and what's included?",
          "Are there different rates for different days or seasons?",
          "What is the payment and cancellation policy?",
          "Are there any required vendors we must use?",
          "Are there any hidden fees we should know about?"
        ]
      },
      {
        id: "amenities",
        label: "Amenities & Restrictions",
        questions: [
          "Is there a bridal suite or getting-ready rooms?",
          "What parking options are available for guests?",
          "What are your noise restrictions or curfew times?",
          "Do you provide any decor items or furniture?",
          "Are there restrictions on decorations, candles, or confetti?"
        ]
      }
    ],
    catering: [
      {
        id: "food",
        label: "Food & Menu",
        questions: [
          "Can we schedule a tasting before finalizing our menu?",
          "What are your most popular menu items?",
          "Can you accommodate dietary restrictions and allergies?",
          "Do you provide wedding cakes or desserts?",
          "How is the food prepared (on-site or off-site)?"
        ]
      },
      {
        id: "service",
        label: "Service & Staffing",
        questions: [
          "What is your staff-to-guest ratio?",
          "Do you provide bartenders and bar service?",
          "How are servers dressed?",
          "Who will be our point of contact on the day?",
          "Do you handle table settings and rentals?"
        ]
      },
      {
        id: "logistics",
        label: "Logistics & Pricing",
        questions: [
          "What is included in your standard catering package?",
          "How far in advance do you need final guest count?",
          "Do you charge a service fee or gratuity?",
          "Is there a cake cutting fee?",
          "What is your payment schedule and cancellation policy?"
        ]
      }
    ],
    florist: [
      {
        id: "style",
        label: "Style & Vision",
        questions: [
          "Can you show me a portfolio of your past wedding work?",
          "Can you work with my color scheme and theme?",
          "Do you have experience with the style I'm looking for?",
          "What flowers will be in season during my wedding?",
          "Can you create a mock-up of my bouquet before the wedding?"
        ]
      },
      {
        id: "services",
        label: "Services & Delivery",
        questions: [
          "What specific arrangements do you recommend for my venue?",
          "Do you provide ceremony and reception décor besides flowers?",
          "Do you provide vases and containers or are they rented?",
          "Who will set up the flowers on the wedding day?",
          "Can you repurpose ceremony flowers for the reception?"
        ]
      },
      {
        id: "pricing",
        label: "Pricing & Policies",
        questions: [
          "What is the average cost for bridal bouquets and centerpieces?",
          "Is there a minimum order requirement?",
          "What is your payment schedule and cancellation policy?",
          "Do you charge a delivery or setup fee?",
          "What happens to the flowers after the wedding?"
        ]
      }
    ],
    dj: [
      {
        id: "experience",
        label: "Experience & Style",
        questions: [
          "How long have you been a wedding DJ?",
          "What is your approach to MCing?",
          "Can we hear recordings of your work?",
          "How would you describe your performance style?",
          "How do you keep guests engaged and on the dance floor?"
        ]
      },
      {
        id: "music",
        label: "Music & Equipment",
        questions: [
          "Can we provide a must-play and do-not-play list?",
          "How do you handle song requests from guests?",
          "What kind of equipment do you use?",
          "Do you bring backup equipment?",
          "Do you provide microphones for speeches and ceremonies?"
        ]
      },
      {
        id: "logistics",
        label: "Logistics & Planning",
        questions: [
          "How far in advance do you arrive for setup?",
          "Do you provide lighting services?",
          "Will you be the DJ at our wedding or could it be someone else?",
          "How do you handle the timeline of events?",
          "What is your attire for the wedding day?"
        ]
      }
    ],
    planner: [
      {
        id: "experience",
        label: "Experience & Approach",
        questions: [
          "How many weddings have you planned?",
          "Have you worked at our venue before?",
          "What is your planning philosophy or style?",
          "Can you share references from past clients?",
          "Do you have a portfolio of past weddings?"
        ]
      },
      {
        id: "services",
        label: "Services & Communication",
        questions: [
          "What planning packages do you offer?",
          "Will you be present on the wedding day?",
          "How available are you for meetings and calls?",
          "Do you have preferred vendors you work with?",
          "How do you handle last-minute changes or problems?"
        ]
      },
      {
        id: "logistics",
        label: "Logistics & Team",
        questions: [
          "Will you manage all vendor communications?",
          "How large is your team and who will be there on the day?",
          "How do you create and manage our timeline?",
          "Will you handle the setup and breakdown?",
          "Do you offer design services in addition to coordination?"
        ]
      }
    ],
    attire: [
      {
        id: "selection",
        label: "Selection & Process",
        questions: [
          "What designers do you carry?",
          "What is the price range of your dresses/suits?",
          "How far in advance should I order my attire?",
          "How many fittings are included?",
          "Can you accommodate custom design elements?"
        ]
      },
      {
        id: "alterations",
        label: "Alterations & Services",
        questions: [
          "Do you provide in-house alterations?",
          "What is the cost of typical alterations?",
          "Do you provide steaming/pressing before pickup?",
          "Do you offer preservation services after the wedding?",
          "Can you help coordinate wedding party attire?"
        ]
      },
      {
        id: "policies",
        label: "Policies & Timeline",
        questions: [
          "What is the deposit requirement?",
          "What is your cancellation policy?",
          "When will my attire be ready for pickup?",
          "What happens if the attire doesn't fit upon arrival?",
          "Do you charge rush fees for expedited orders?"
        ]
      }
    ],
  };
  
  // Get question categories for selected vendor type
  const questionCategories = questionData[vendorType] || [];
  
  // Add a custom question to selected questions
  const addCustomQuestion = () => {
    if (customQuestion.trim() !== "") {
      setSelectedQuestions([...selectedQuestions, customQuestion]);
      setCustomQuestion("");
      
      toast({
        title: "Question Added",
        description: "Your custom question has been added to the list."
      });
    }
  };
  
  // Toggle selection of a question
  const toggleQuestion = (question: string) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter(q => q !== question));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };
  
  // Copy questions to clipboard
  const copyToClipboard = () => {
    const text = selectedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Copied to Clipboard",
      description: "Your vendor questions have been copied to the clipboard."
    });
  };
  
  // Print questions
  const printQuestions = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const vendorName = vendorType.charAt(0).toUpperCase() + vendorType.slice(1);
    const title = `Questions for Wedding ${vendorName}`;
    
    const content = `
      <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #7D5A50; }
          ol { padding-left: 20px; }
          li { margin-bottom: 15px; color: #333; }
          .footer { margin-top: 30px; font-size: 12px; color: #999; text-align: center; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <ol>
          ${selectedQuestions.map(q => `<li>${q}</li>`).join('')}
        </ol>
        <div class="footer">Generated with WedNest - Free Wedding Planning Tools</div>
      </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.onload = function() {
      printWindow.print();
    };
  };
  
  // Download questions as PDF (simulated with text file)
  const downloadQuestions = () => {
    const text = selectedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\r\n\r\n');
    const vendorName = vendorType.charAt(0).toUpperCase() + vendorType.slice(1);
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `Questions_for_${vendorName}.txt`;
    link.href = url;
    link.click();
    
    toast({
      title: "Questions Downloaded",
      description: "Your vendor questions have been downloaded as a text file."
    });
  };

  return (
    <div className="space-y-8">
      <Card className="border-theme-beige shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-theme-brown/10 p-3 rounded-full">
              <FileText className="h-6 w-6 text-theme-brown" />
            </div>
            <div>
              <CardTitle className="text-2xl font-serif text-theme-brown">Vendor Question Generator</CardTitle>
              <CardDescription>Generate key questions to ask when interviewing wedding vendors</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <FormLabel>Select Vendor Type</FormLabel>
            <Select value={vendorType} onValueChange={setVendorType}>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Select vendor type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="photographer">Photographer</SelectItem>
                <SelectItem value="venue">Venue</SelectItem>
                <SelectItem value="catering">Catering</SelectItem>
                <SelectItem value="florist">Florist</SelectItem>
                <SelectItem value="dj">DJ/Entertainment</SelectItem>
                <SelectItem value="planner">Wedding Planner</SelectItem>
                <SelectItem value="attire">Wedding Attire</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-medium text-lg text-theme-brown">Select Questions to Include</h3>
              
              {questionCategories.map((category) => (
                <div key={category.id} className="space-y-3">
                  <h4 className="font-medium text-theme-brown">{category.label}</h4>
                  {category.questions.map((question, i) => (
                    <div className="flex items-start gap-3 group" key={i}>
                      <Checkbox 
                        id={`${category.id}-q-${i}`}
                        checked={selectedQuestions.includes(question)}
                        onCheckedChange={() => toggleQuestion(question)}
                        className="mt-1 data-[state=checked]:bg-theme-brown data-[state=checked]:border-theme-brown"
                      />
                      <label
                        htmlFor={`${category.id}-q-${i}`}
                        className="text-sm text-theme-brown cursor-pointer"
                      >
                        {question}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
              
              <div className="pt-2">
                <h4 className="font-medium text-theme-brown mb-3">Add Your Own Questions</h4>
                <div className="flex items-start gap-2">
                  <Textarea 
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="Type your custom question here..."
                    className="flex-1"
                  />
                  <Button 
                    onClick={addCustomQuestion}
                    disabled={customQuestion.trim() === ""}
                    className="bg-theme-brown hover:bg-theme-brown-dark text-white mt-1"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg text-theme-brown">Your Question List</h3>
                <span className="text-sm text-theme-brown-light">{selectedQuestions.length} questions</span>
              </div>
              
              {selectedQuestions.length === 0 ? (
                <div className="bg-theme-cream/10 border border-theme-beige rounded-md p-8 text-center">
                  <p className="text-theme-brown-light">Select questions from the left or add your own custom questions.</p>
                </div>
              ) : (
                <div className="bg-theme-cream/10 border border-theme-beige rounded-md p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
                  <ol className="list-decimal pl-5 space-y-3">
                    {selectedQuestions.map((question, index) => (
                      <li key={index} className="text-theme-brown">
                        {question}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              
              <div className="pt-4 flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white"
                  onClick={copyToClipboard}
                  disabled={selectedQuestions.length === 0}
                >
                  <Copy className="h-4 w-4" />
                  Copy to Clipboard
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white"
                  onClick={printQuestions}
                  disabled={selectedQuestions.length === 0}
                >
                  <Printer className="h-4 w-4" />
                  Print Questions
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white"
                  onClick={downloadQuestions}
                  disabled={selectedQuestions.length === 0}
                >
                  <Download className="h-4 w-4" />
                  Download as Text
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ToolShareCta 
        title="Vendor Interview Question Generator" 
        description="Generate customized interview questions for different wedding vendors to help you make informed decisions when booking services for your wedding day." 
      />
    </div>
  );
};
