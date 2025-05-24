
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckSquare, Calendar, FileText, Settings, MessageSquare } from "lucide-react";

const PlanningToolsWidget = () => {
  const tools = [
    {
      name: "Budget",
      icon: CreditCard,
      description: "Track expenses",
      color: "bg-green-100 text-green-700 hover:bg-green-200"
    },
    {
      name: "Checklist",
      icon: CheckSquare,
      description: "Task management",
      color: "bg-blue-100 text-blue-700 hover:bg-blue-200"
    },
    {
      name: "Timeline",
      icon: Calendar,
      description: "Wedding schedule",
      color: "bg-purple-100 text-purple-700 hover:bg-purple-200"
    },
    {
      name: "Contracts",
      icon: FileText,
      description: "Vendor agreements",
      color: "bg-orange-100 text-orange-700 hover:bg-orange-200"
    }
  ];

  return (
    <Card className="shadow-sm border-theme-cream/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-theme-brown flex items-center gap-2">
          <Settings className="h-5 w-5 text-theme-sage" />
          Planning Tools
        </CardTitle>
        <p className="text-sm text-theme-brown-light">Quick access to your tools</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            
            return (
              <Button
                key={index}
                variant="outline"
                className={`h-20 flex flex-col items-center justify-center gap-1 border-theme-cream/30 hover:shadow-sm transition-all ${tool.color}`}
              >
                <IconComponent className="h-5 w-5" />
                <span className="text-xs font-medium">{tool.name}</span>
                <span className="text-xs opacity-70">{tool.description}</span>
              </Button>
            );
          })}
        </div>
        
        <div className="pt-2 border-t border-theme-cream/30">
          <Button 
            className="w-full bg-theme-brown hover:bg-theme-brown-dark text-white flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Need Help? Ask Eva
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanningToolsWidget;
