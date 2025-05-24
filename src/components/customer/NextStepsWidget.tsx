
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Plus } from "lucide-react";

const NextStepsWidget = () => {
  const nextSteps = [
    {
      id: 1,
      title: "Finalize Cake Vendor",
      dueIn: "2 days",
      priority: "urgent",
      category: "vendors"
    },
    {
      id: 2,
      title: "Send Save-the-Dates",
      dueIn: "1 week",
      priority: "high",
      category: "invitations"
    },
    {
      id: 3,
      title: "Book Hair & Makeup Trial",
      dueIn: "2 weeks",
      priority: "medium",
      category: "beauty"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <Card className="shadow-sm border-theme-cream/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-theme-brown flex items-center gap-2">
          <Clock className="h-5 w-5 text-theme-sage" />
          Next Steps
        </CardTitle>
        <p className="text-sm text-theme-brown-light">Your upcoming wedding tasks</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {nextSteps.map((step) => (
          <div 
            key={step.id}
            className="flex items-center justify-between p-3 bg-theme-cream/5 hover:bg-theme-cream/10 rounded-lg border border-theme-cream/30 transition-colors group cursor-pointer"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-theme-brown text-sm">{step.title}</p>
                <Badge className={`text-xs ${getPriorityColor(step.priority)}`}>
                  {step.priority}
                </Badge>
              </div>
              <p className="text-xs text-theme-brown-light">Due in {step.dueIn}</p>
            </div>
            
            <ArrowRight className="h-4 w-4 text-theme-brown-light opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
        
        <Button 
          variant="outline" 
          className="w-full mt-3 border-theme-sage/30 text-theme-sage hover:bg-theme-sage/5 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </CardContent>
    </Card>
  );
};

export default NextStepsWidget;
