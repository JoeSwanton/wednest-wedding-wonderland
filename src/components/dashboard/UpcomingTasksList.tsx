
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Plus } from "lucide-react";

const UpcomingTasksList = () => {
  // Mock data - in a real app this would come from API/state
  const tasks = [
    {
      title: "Book Photographer",
      dueIn: "3 days",
    },
    {
      title: "Finalize Menu Selection",
      dueIn: "5 days",
    },
    {
      title: "Send Save-the-Dates",
      dueIn: "7 days",
    }
  ];
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg text-theme-brown">Upcoming Tasks</CardTitle>
          <p className="text-sm text-theme-brown-light">Your next wedding planning tasks</p>
        </div>
        
        <Button variant="outline" size="sm" className="h-8 text-xs text-theme-brown">
          View All
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <div>
                <p className="font-medium text-theme-brown">{task.title}</p>
                <p className="text-xs text-theme-brown-light">Due in {task.dueIn}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-theme-brown-light" />
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-theme-brown hover:bg-theme-brown-dark text-white flex items-center justify-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Add New Task</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasksList;
