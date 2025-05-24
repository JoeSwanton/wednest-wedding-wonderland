
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetCalculator } from "@/components/planning-tools/BudgetCalculator";
import { WeddingChecklist } from "@/components/planning-tools/WeddingChecklist";
import { SaveTheDateComposer } from "@/components/planning-tools/SaveTheDateComposer";
import { GuestListGenerator } from "@/components/planning-tools/GuestListGenerator";
import { VendorQuestionGenerator } from "@/components/planning-tools/VendorQuestionGenerator";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Testimonials } from "@/components/Testimonials";
import { PlanningToolCard } from "@/components/planning-tools/PlanningToolCard";

const PlanningTools = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('tools-grid');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const planningTools = [
    {
      title: "Wedding Budget Calculator",
      description: "Estimate and manage your wedding expenses with our detailed budget calculator.",
      longDescription: "Track expenses, set realistic budgets, and get insights on where your money is going. Perfect for keeping your wedding costs under control.",
      bgColor: "bg-green-50",
      path: "/planning-tools/budget-calculator",
      buttonText: "Use Budget Calculator",
      iconType: "calculator" as const
    }, 
    {
      title: "Wedding Checklist Generator",
      description: "Generate a customized wedding planning checklist tailored to your timeline.",
      longDescription: "Generate a personalized checklist based on your wedding date. Never miss a deadline or important task with our comprehensive planning tool.",
      bgColor: "bg-pink-50",
      path: "/planning-tools/checklist",
      buttonText: "Create Checklist",
      iconType: "checklist" as const
    }, 
    {
      title: "Save-the-Date SMS Composer",
      description: "Create and send beautiful save-the-date messages to your guests via SMS.",
      longDescription: "Craft the perfect save-the-date message and easily share it with your guests. A modern alternative to traditional paper invitations.",
      bgColor: "bg-gray-100",
      path: "/planning-tools/save-date",
      buttonText: "Compose Message",
      iconType: "message" as const
    }, 
    {
      title: "Guest List Excel Download",
      description: "Create and download a comprehensive guest list spreadsheet to manage your invitations.",
      longDescription: "Organize your guest information, track RSVPs, and manage dietary requirements with our easy-to-use guest list template.",
      bgColor: "bg-yellow-50",
      path: "/planning-tools/guest-list",
      buttonText: "Create Guest List",
      iconType: "file-spreadsheet" as const
    }, 
    {
      title: "Vendor Question Generator",
      description: "Get a list of questions to ask your wedding vendors.",
      longDescription: "Be prepared with professional and tailored questions for photographers, venues, caterers, and more. Make informed decisions for your special day.",
      bgColor: "bg-green-50",
      path: "/planning-tools/vendor-questions",
      buttonText: "Generate Questions",
      iconType: "file-question" as const
    }, 
    {
      title: "More Tools Coming Soon",
      description: "We're constantly adding new tools to help with your wedding planning.",
      longDescription: "Sign up for a free account to be the first to know when we release new planning tools and features.",
      bgColor: "bg-pink-50",
      path: "#",
      buttonText: "Create Free Account",
      iconType: "calendar" as const
    }
  ];

  const testimonials = [
    {
      quote: "The budget calculator was a lifesaver! It helped us stay on track and avoid overspending on our wedding.",
      author: "Sarah & Michael",
      location: "Melbourne"
    }, 
    {
      quote: "I loved how easy it was to create a custom checklist. It made planning our wedding so much less stressful.",
      author: "Emma & James",
      location: "Melbourne"
    }, 
    {
      quote: "The vendor question generator gave us confidence when meeting with potential vendors. We knew exactly what to ask!",
      author: "Jessica & David",
      location: "Brisbane"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <Separator className="bg-theme-brown h-[1px] w-full" />
      
      <div className="bg-theme-brown py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white text-center mb-4">
            Free Wedding Planning Tools
          </h1>
          <p className="text-white/90 text-center max-w-2xl mx-auto">
            Plan your perfect day with our suite of free wedding planning tools. No signup required!
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="hidden">
            <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 mb-8">
              <TabsTrigger value="tools-grid">All Tools</TabsTrigger>
              <TabsTrigger value="budget">Budget Calculator</TabsTrigger>
              <TabsTrigger value="checklist">Wedding Checklist</TabsTrigger>
              <TabsTrigger value="save-date">Save the Date</TabsTrigger>
              <TabsTrigger value="guest-list">Guest List Excel</TabsTrigger>
              <TabsTrigger value="vendor-questions">Vendor Questions</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="tools-grid">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-theme-brown mb-4">Everything You Need to Plan Your Wedding</h2>
              <p className="text-theme-brown-light max-w-3xl mx-auto">
                Our free tools help you stay organized, on budget, and stress-free throughout your wedding planning journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {planningTools.map((tool, index) => (
                <PlanningToolCard 
                  key={index} 
                  title={tool.title} 
                  description={tool.description} 
                  longDescription={tool.longDescription} 
                  bgColor={tool.bgColor} 
                  path={tool.path} 
                  buttonText={tool.buttonText} 
                  iconType={tool.iconType} 
                />
              ))}
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-serif text-theme-brown text-center mb-8">What Couples Say About Our Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="border p-6 rounded-md">
                    <div className="flex justify-center mb-4">
                      <div className="text-4xl text-theme-brown-light">"</div>
                    </div>
                    <p className="text-theme-brown mb-6 text-center italic">
                      {testimonial.quote}
                    </p>
                    <div className="text-center">
                      <div className="inline-block bg-theme-cream rounded-full w-10 h-10 mb-2"></div>
                      <p className="font-medium text-theme-brown">{testimonial.author}</p>
                      <p className="text-sm text-theme-brown-light">{testimonial.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-theme-brown via-theme-brown to-theme-brown-dark text-white p-10 md:p-12 rounded-lg shadow-lg border border-theme-brown/20">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">
                  Ready to Take Your Wedding Planning to the Next Level?
                </h2>
                <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed font-medium">
                  Create a free account to save your progress, access premium tools, and connect with top wedding vendors in your area.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                  <Button className="bg-white text-theme-brown hover:bg-theme-cream font-semibold px-8 py-3 text-lg rounded-md shadow-sm transition-all duration-200 hover:shadow-md">
                    Create Free Account
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white font-semibold px-8 py-3 text-lg rounded-md transition-all duration-200"
                  >
                    Learn More
                  </Button>
                </div>
                <p className="text-sm text-white/70 mt-6 font-medium">
                  Join thousands of couples planning their perfect day
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="budget">
            <BudgetCalculator />
          </TabsContent>
          
          <TabsContent value="checklist">
            <WeddingChecklist />
          </TabsContent>
          
          <TabsContent value="save-date">
            <SaveTheDateComposer />
          </TabsContent>
          
          <TabsContent value="guest-list">
            <GuestListGenerator />
          </TabsContent>
          
          <TabsContent value="vendor-questions">
            <VendorQuestionGenerator />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default PlanningTools;
