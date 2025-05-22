
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Users } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";
import ToolShareCta from "./ToolShareCta";

export const GuestListGenerator = () => {
  const { toast } = useToast();
  const methods = useForm();
  const [guestCount, setGuestCount] = useState(100);
  
  const generateExcel = () => {
    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Create main guest list worksheet
    const wsData = [
      ["Guest Name", "Email", "Phone", "Address", "Relationship", "RSVP Status", "Plus One", "Dietary Restrictions", "Notes"],
    ];
    
    // Add empty rows based on guest count
    for (let i = 0; i < guestCount; i++) {
      wsData.push(["", "", "", "", "", "", "", "", ""]);
    }
    
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Add column widths
    const colWidths = [
      { wch: 25 }, // Guest Name
      { wch: 25 }, // Email
      { wch: 15 }, // Phone
      { wch: 30 }, // Address
      { wch: 15 }, // Relationship
      { wch: 15 }, // RSVP Status
      { wch: 10 }, // Plus One
      { wch: 20 }, // Dietary Restrictions
      { wch: 30 }, // Notes
    ];
    ws['!cols'] = colWidths;
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Guest List");
    
    // Create summary worksheet
    const summaryWsData = [
      ["Wedding Guest List Summary"],
      [""],
      ["Category", "Count"],
      ["Total Invited", "=COUNTA('Guest List'!A2:A101)"],
      ["Accepted", "=COUNTIF('Guest List'!F2:F101,\"Accepted\")"],
      ["Declined", "=COUNTIF('Guest List'!F2:F101,\"Declined\")"],
      ["Pending", "=COUNTIF('Guest List'!F2:F101,\"Pending\")"],
      ["Plus Ones", "=COUNTIF('Guest List'!G2:G101,\"Yes\")"],
      ["Total Attending", "=D4+D8"],
    ];
    
    const summaryWs = XLSX.utils.aoa_to_sheet(summaryWsData);
    XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");
    
    // Generate the excel file
    XLSX.writeFile(wb, "Wedding_Guest_List.xlsx");
    
    toast({
      title: "Guest List Generated",
      description: `An Excel file with ${guestCount} rows has been created for your guest list.`
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        <Card className="border-theme-beige shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-theme-sage-dark/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-theme-sage-dark" />
              </div>
              <div>
                <CardTitle className="text-2xl font-serif text-theme-brown">Guest List Generator</CardTitle>
                <CardDescription>Create a customized Excel file to manage your wedding guests</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="max-w-md mx-auto">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guestCount">How many guests do you expect?</Label>
                  <Input 
                    id="guestCount"
                    type="number" 
                    min="10" 
                    max="500" 
                    value={guestCount} 
                    onChange={(e) => setGuestCount(parseInt(e.target.value) || 100)}
                  />
                  <p className="text-sm text-muted-foreground">This will determine how many empty rows to include in your spreadsheet.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-theme-brown mb-2">Your Excel file will include:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-theme-brown-light">
                    <li>A ready-to-use guest list template</li>
                    <li>Columns for contact information, RSVP status, and notes</li>
                    <li>A summary sheet with automatic calculations</li>
                    <li>Formulas to track total attendance</li>
                    <li>Space for plus-ones and dietary restrictions</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={generateExcel} 
                  className="w-full bg-theme-sage-dark hover:bg-theme-sage text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Generate Guest List Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <ToolShareCta 
          title="Guest List Generator" 
          description="Our free guest list generator creates a professional Excel spreadsheet to track your wedding invitations and RSVPs." 
        />
      </div>
    </FormProvider>
  );
};
