
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ListCheck, Calendar, Download, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ToolShareCta from "./ToolShareCta";

type ChecklistItem = {
  id: string;
  task: string;
  timeframe: string;
  category: string;
  completed: boolean;
};

export const WeddingChecklist = () => {
  const { toast } = useToast();
  const [weddingDate, setWeddingDate] = useState<string>("6");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Sample checklist items
  const initialChecklist: ChecklistItem[] = [
    // 12+ Months
    { id: "1", task: "Set a budget", timeframe: "12+ months", category: "planning", completed: false },
    { id: "2", task: "Create guest list", timeframe: "12+ months", category: "planning", completed: false },
    { id: "3", task: "Choose wedding party", timeframe: "12+ months", category: "planning", completed: false },
    { id: "4", task: "Book venue", timeframe: "12+ months", category: "venue", completed: false },
    { id: "5", task: "Book photographer", timeframe: "12+ months", category: "vendors", completed: false },
    { id: "6", task: "Book caterer", timeframe: "12+ months", category: "food", completed: false },
    
    // 9-12 Months
    { id: "7", task: "Shop for wedding dress", timeframe: "9-12 months", category: "attire", completed: false },
    { id: "8", task: "Book florist", timeframe: "9-12 months", category: "vendors", completed: false },
    { id: "9", task: "Book DJ/band", timeframe: "9-12 months", category: "vendors", completed: false },
    { id: "10", task: "Block hotel rooms", timeframe: "9-12 months", category: "planning", completed: false },
    { id: "11", task: "Create wedding website", timeframe: "9-12 months", category: "planning", completed: false },
    
    // 6-9 Months
    { id: "12", task: "Send save-the-dates", timeframe: "6-9 months", category: "stationery", completed: false },
    { id: "13", task: "Book transportation", timeframe: "6-9 months", category: "vendors", completed: false },
    { id: "14", task: "Schedule cake tastings", timeframe: "6-9 months", category: "food", completed: false },
    { id: "15", task: "Book hair and makeup trials", timeframe: "6-9 months", category: "beauty", completed: false },
    { id: "16", task: "Shop for wedding rings", timeframe: "6-9 months", category: "attire", completed: false },
    
    // 4-6 Months
    { id: "17", task: "Order invitations", timeframe: "4-6 months", category: "stationery", completed: false },
    { id: "18", task: "Plan honeymoon", timeframe: "4-6 months", category: "planning", completed: false },
    { id: "19", task: "Book officiant", timeframe: "4-6 months", category: "ceremony", completed: false },
    { id: "20", task: "Purchase wedding party gifts", timeframe: "4-6 months", category: "gifts", completed: false },
    
    // 2-4 Months
    { id: "21", task: "Mail invitations", timeframe: "2-4 months", category: "stationery", completed: false },
    { id: "22", task: "Finalize menu", timeframe: "2-4 months", category: "food", completed: false },
    { id: "23", task: "Write vows", timeframe: "2-4 months", category: "ceremony", completed: false },
    { id: "24", task: "Purchase wedding accessories", timeframe: "2-4 months", category: "attire", completed: false },
    
    // 1-2 Months
    { id: "25", task: "Track RSVPs", timeframe: "1-2 months", category: "planning", completed: false },
    { id: "26", task: "Create seating chart", timeframe: "1-2 months", category: "planning", completed: false },
    { id: "27", task: "Final dress fitting", timeframe: "1-2 months", category: "attire", completed: false },
    { id: "28", task: "Confirm details with vendors", timeframe: "1-2 months", category: "vendors", completed: false },
    
    // 2-4 Weeks
    { id: "29", task: "Pick up wedding rings", timeframe: "2-4 weeks", category: "attire", completed: false },
    { id: "30", task: "Confirm final guest count", timeframe: "2-4 weeks", category: "planning", completed: false },
    { id: "31", task: "Break in wedding shoes", timeframe: "2-4 weeks", category: "attire", completed: false },
    { id: "32", task: "Create wedding day timeline", timeframe: "2-4 weeks", category: "planning", completed: false },
    
    // 1 Week
    { id: "33", task: "Pack for honeymoon", timeframe: "1 week", category: "planning", completed: false },
    { id: "34", task: "Prepare payment envelopes for vendors", timeframe: "1 week", category: "planning", completed: false },
    { id: "35", task: "Get manicure and pedicure", timeframe: "1 week", category: "beauty", completed: false },
    { id: "36", task: "Attend rehearsal dinner", timeframe: "1 week", category: "events", completed: false },
  ];
  
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  
  const timeframeOrder = [
    "12+ months",
    "9-12 months",
    "6-9 months",
    "4-6 months",
    "2-4 months",
    "1-2 months", 
    "2-4 weeks",
    "1 week"
  ];
  
  // Filter checklist by time and category
  const filteredChecklist = checklist.filter(item => {
    // Show relevant timeframes based on wedding date
    const timeframeIndex = timeframeOrder.indexOf(item.timeframe);
    const showTimeframe = weddingDate === "12" ? true : timeframeIndex >= (8 - parseInt(weddingDate));
    
    // Filter by category if not "all"
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
    
    return showTimeframe && categoryMatch;
  });
  
  // Group by timeframe
  const groupedChecklist = filteredChecklist.reduce((acc, item) => {
    if (!acc[item.timeframe]) {
      acc[item.timeframe] = [];
    }
    acc[item.timeframe].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);
  
  // Sort timeframes
  const sortedTimeframes = Object.keys(groupedChecklist).sort(
    (a, b) => timeframeOrder.indexOf(a) - timeframeOrder.indexOf(b)
  );
  
  const handleToggleItem = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  const downloadChecklist = () => {
    // Create CSV content
    let csvContent = "Task,Timeframe,Category,Completed\n";
    checklist.forEach(item => {
      csvContent += `"${item.task}","${item.timeframe}","${item.category}",${item.completed ? "Yes" : "No"}\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "wedding_checklist.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Checklist Downloaded",
      description: "Your wedding checklist has been downloaded as a CSV file."
    });
  };
  
  // Categories for filtering
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "planning", label: "Planning & Coordination" },
    { value: "venue", label: "Venue & Rentals" },
    { value: "vendors", label: "Vendors" },
    { value: "food", label: "Food & Beverage" },
    { value: "attire", label: "Attire & Accessories" },
    { value: "beauty", label: "Beauty & Health" },
    { value: "ceremony", label: "Ceremony" },
    { value: "stationery", label: "Stationery" },
    { value: "gifts", label: "Gifts & Favors" },
    { value: "events", label: "Events" },
  ];
  
  // Calculate progress
  const totalTasks = filteredChecklist.length;
  const completedTasks = filteredChecklist.filter(item => item.completed).length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-8">
      <Card className="border-theme-beige shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-theme-gold/10 p-3 rounded-full">
              <ListCheck className="h-6 w-6 text-theme-gold" />
            </div>
            <div>
              <CardTitle className="text-2xl font-serif text-theme-brown">Wedding Checklist Generator</CardTitle>
              <CardDescription>Stay organized with a customized wedding planning checklist</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-theme-brown block mb-2">When is your wedding?</label>
              <Select value={weddingDate} onValueChange={setWeddingDate}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12+ months away</SelectItem>
                  <SelectItem value="9">9-12 months away</SelectItem>
                  <SelectItem value="6">6-9 months away</SelectItem>
                  <SelectItem value="4">4-6 months away</SelectItem>
                  <SelectItem value="3">2-4 months away</SelectItem>
                  <SelectItem value="2">1-2 months away</SelectItem>
                  <SelectItem value="1">Less than 1 month away</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-theme-brown block mb-2">Filter by category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-theme-cream/20 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-theme-brown">Checklist Progress</span>
              <span className="text-sm text-theme-brown">{completedTasks} of {totalTasks} tasks ({Math.round(progressPercentage)}%)</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-theme-gold transition-all duration-300 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
            {sortedTimeframes.map(timeframe => (
              <div key={timeframe} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-theme-brown-light" />
                  <h3 className="font-medium text-theme-brown">{timeframe} before wedding</h3>
                </div>
                <div className="space-y-2 pl-6">
                  {groupedChecklist[timeframe].map(item => (
                    <div key={item.id} className="flex items-start gap-3 group">
                      <Checkbox 
                        id={`task-${item.id}`}
                        checked={item.completed}
                        onCheckedChange={() => handleToggleItem(item.id)}
                        className="mt-1 data-[state=checked]:bg-theme-gold data-[state=checked]:border-theme-gold"
                      />
                      <div className="space-y-1 flex-1">
                        <label
                          htmlFor={`task-${item.id}`}
                          className={`text-sm font-medium cursor-pointer ${
                            item.completed ? "line-through text-theme-brown-light" : "text-theme-brown"
                          }`}
                        >
                          {item.task}
                        </label>
                        <p className="text-xs text-theme-brown-light capitalize">{item.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredChecklist.length === 0 && (
              <div className="text-center py-8">
                <p className="text-theme-brown-light">No tasks found for the selected filters.</p>
                <p className="text-sm text-theme-brown-light mt-2">Try adjusting your wedding date or category selection.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between pt-4">
            <Button 
              variant="outline" 
              className="border-theme-gold text-theme-gold hover:bg-theme-gold hover:text-white flex items-center gap-2"
              onClick={downloadChecklist}
            >
              <Download className="h-4 w-4" />
              Download Checklist
            </Button>
            
            <Button 
              variant="outline" 
              className="border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white flex items-center gap-2"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Wedding Checklist Generator',
                    text: 'Check out this free wedding checklist generator!',
                    url: window.location.href
                  });
                } else {
                  // Fallback - copy to clipboard
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "Link Copied",
                    description: "Checklist generator link copied to clipboard."
                  });
                }
              }}
            >
              <Share className="h-4 w-4" />
              Share Checklist
            </Button>
          </div>
        </CardContent>
      </Card>

      <ToolShareCta 
        title="Wedding Checklist Generator" 
        description="Our free wedding checklist helps you stay organized with a customized timeline of tasks based on your wedding date." 
      />
    </div>
  );
};
