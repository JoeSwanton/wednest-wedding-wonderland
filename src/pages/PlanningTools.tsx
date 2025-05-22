
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import PlanningToolsGrid from "@/components/PlanningToolsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetCalculator } from "@/components/planning-tools/BudgetCalculator";
import { WeddingChecklist } from "@/components/planning-tools/WeddingChecklist";
import { SaveTheDateComposer } from "@/components/planning-tools/SaveTheDateComposer";
import { GuestListGenerator } from "@/components/planning-tools/GuestListGenerator";
import { VendorQuestionGenerator } from "@/components/planning-tools/VendorQuestionGenerator";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PlanningTools = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('tools-grid');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <Separator className="bg-theme-brown h-[1px] w-full" />
      
      <div className="bg-theme-cream py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-theme-brown text-center mb-4">
            Wedding Planning Tools
          </h1>
          <p className="text-theme-brown-light text-center max-w-2xl mx-auto mb-8">
            Free wedding planning tools to help you organize your perfect day - no signup required.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 mb-8">
            <TabsTrigger value="tools-grid">All Tools</TabsTrigger>
            <TabsTrigger value="budget">Budget Calculator</TabsTrigger>
            <TabsTrigger value="checklist">Wedding Checklist</TabsTrigger>
            <TabsTrigger value="save-date">Save the Date</TabsTrigger>
            <TabsTrigger value="guest-list">Guest List Excel</TabsTrigger>
            <TabsTrigger value="vendor-questions">Vendor Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tools-grid">
            <div className="mb-12">
              <h2 className="text-2xl font-serif text-theme-brown mb-4">Free Wedding Planning Tools</h2>
              <p className="text-theme-brown-light mb-6">
                All our planning tools are completely free to use, no signup required. Try them out to make your wedding planning easier!
              </p>
              <PlanningToolsGrid />
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
