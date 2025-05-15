
import { HelpCircle, Mail, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const OnboardingSupport = () => {
  return (
    <div className="mt-10 bg-white rounded-lg shadow-sm border border-wednest-beige p-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-5 w-5 text-wednest-sage" />
        <h2 className="text-lg font-medium text-wednest-brown">Need Help?</h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="faq-1">
          <AccordionTrigger>How long does verification take?</AccordionTrigger>
          <AccordionContent>
            Standard verification typically takes 1-2 business days. For expedited verification, 
            ensure you've provided all required information including a valid ABN and business email.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="faq-2">
          <AccordionTrigger>Can I edit my information later?</AccordionTrigger>
          <AccordionContent>
            Yes, you can edit your business information anytime from your vendor dashboard 
            under the "Business Profile" section.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="faq-3">
          <AccordionTrigger>What photos work best for my portfolio?</AccordionTrigger>
          <AccordionContent>
            High-quality images (1200x800px minimum) that showcase your best work. 
            We recommend professional photos of real weddings you've worked on, displaying 
            different styles and settings.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="faq-4">
          <AccordionTrigger>How do I get more visibility on the platform?</AccordionTrigger>
          <AccordionContent>
            Complete your profile 100%, add high-quality photos, get verified, and collect positive 
            reviews. Vendors with complete profiles are prioritized in search results.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Mail size={16} />
          <span>Email Support</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <MessageCircle size={16} />
          <span>Live Chat Support</span>
        </Button>
      </div>
    </div>
  );
};

export default OnboardingSupport;
