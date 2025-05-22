
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, CheckSquare } from "lucide-react";
import ToolShareCta from "./ToolShareCta";

type Task = {
  id: string;
  description: string;
  completed: boolean;
  timeframe: "12-10 months" | "9-6 months" | "5-3 months" | "2-1 months" | "1 week" | "day before" | "wedding day";
};

export const WeddingChecklist = () => {
  const methods = useForm();
  
  // Example tasks - would be expanded to a comprehensive list
  const tasks: Task[] = [
    // 12-10 months
    { id: "1", description: "Set a budget", completed: false, timeframe: "12-10 months" },
    { id: "2", description: "Create guest list", completed: false, timeframe: "12-10 months" },
    { id: "3", description: "Choose wedding date", completed: false, timeframe: "12-10 months" },
    { id: "4", description: "Book venue", completed: false, timeframe: "12-10 months" },
    { id: "5", description: "Start looking for vendors", completed: false, timeframe: "12-10 months" },
    
    // 9-6 months
    { id: "6", description: "Choose wedding party", completed: false, timeframe: "9-6 months" },
    { id: "7", description: "Shop for wedding attire", completed: false, timeframe: "9-6 months" },
    { id: "8", description: "Book photographer", completed: false, timeframe: "9-6 months" },
    { id: "9", description: "Book caterer", completed: false, timeframe: "9-6 months" },
    { id: "10", description: "Book florist", completed: false, timeframe: "9-6 months" },
    
    // 5-3 months
    { id: "11", description: "Send save-the-dates", completed: false, timeframe: "5-3 months" },
    { id: "12", description: "Book transportation", completed: false, timeframe: "5-3 months" },
    { id: "13", description: "Order invitations", completed: false, timeframe: "5-3 months" },
    { id: "14", description: "Plan honeymoon", completed: false, timeframe: "5-3 months" },
    
    // 2-1 months
    { id: "15", description: "Send invitations", completed: false, timeframe: "2-1 months" },
    { id: "16", description: "Final dress fitting", completed: false, timeframe: "2-1 months" },
    { id: "17", description: "Write vows", completed: false, timeframe: "2-1 months" },
    { id: "18", description: "Confirm details with vendors", completed: false, timeframe: "2-1 months" },
    
    // 1 week
    { id: "19", description: "Final guest count to caterer", completed: false, timeframe: "1 week" },
    { id: "20", description: "Create seating chart", completed: false, timeframe: "1 week" },
    { id: "21", description: "Pack for honeymoon", completed: false, timeframe: "1 week" },
    
    // day before
    { id: "22", description: "Rehearsal dinner", completed: false, timeframe: "day before" },
    { id: "23", description: "Get beauty rest", completed: false, timeframe: "day before" },
    
    // wedding day
    { id: "24", description: "Eat breakfast", completed: false, timeframe: "wedding day" },
    { id: "25", description: "Hair and makeup", completed: false, timeframe: "wedding day" },
    { id: "26", description: "Enjoy your special day!", completed: false, timeframe: "wedding day" },
  ];
  
  const timeframes = ["12-10 months", "9-6 months", "5-3 months", "2-1 months", "1 week", "day before", "wedding day"];
  
  const downloadChecklist = () => {
    // Implementation for downloading checklist
    // (would create a formatted PDF or document)
    alert("Checklist download functionality would be implemented here");
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        <Card className="border-theme-beige shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-theme-gold/10 p-3 rounded-full">
                <CheckSquare className="h-6 w-6 text-theme-gold" />
              </div>
              <div>
                <CardTitle className="text-2xl font-serif text-theme-brown">Wedding Planning Checklist</CardTitle>
                <CardDescription>Keep track of your wedding planning tasks with our comprehensive checklist</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-theme-brown-light">Use this checklist to stay organized during your wedding planning journey.</p>
              </div>
              <Button 
                variant="outline" 
                className="border-theme-gold text-theme-gold hover:bg-theme-gold hover:text-white flex items-center gap-2"
                onClick={downloadChecklist}
              >
                <Download className="h-4 w-4" />
                Download Checklist
              </Button>
            </div>
            
            <div className="space-y-8">
              {timeframes.map((timeframe) => (
                <div key={timeframe}>
                  <h3 className="text-lg font-medium text-theme-brown mb-4">{timeframe}</h3>
                  <div className="space-y-2">
                    {tasks
                      .filter(task => task.timeframe === timeframe)
                      .map(task => (
                        <div key={task.id} className="flex items-start space-x-2 p-2 hover:bg-slate-50 rounded-md transition-colors">
                          <Checkbox id={task.id} />
                          <label
                            htmlFor={task.id}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {task.description}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <ToolShareCta 
          title="Wedding Planning Checklist" 
          description="Stay organized with our comprehensive wedding planning checklist, covering everything from 12 months before to your wedding day." 
        />
      </div>
    </FormProvider>
  );
};
