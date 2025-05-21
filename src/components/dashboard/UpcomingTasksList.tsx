
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Plus, Clock, Calendar } from "lucide-react";

const UpcomingTasksList = () => {
  // Mock data - in a real app this would come from API/state
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Book Photographer",
      dueIn: "3 days",
      priority: "high",
      completed: false,
      category: "vendors"
    },
    {
      id: 2,
      title: "Finalize Menu Selection",
      dueIn: "5 days",
      priority: "medium",
      completed: false,
      category: "food"
    },
    {
      id: 3,
      title: "Send Save-the-Dates",
      dueIn: "7 days",
      priority: "high",
      completed: false,
      category: "invitations"
    },
    {
      id: 4,
      title: "Schedule Hair Trial",
      dueIn: "10 days",
      priority: "medium",
      completed: false,
      category: "beauty"
    }
  ]);
  
  // Function to toggle task completion status
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };
  
  return (
    <Card className="shadow-sm border-theme-cream/30 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-lg text-theme-brown flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-theme-brown-light" />
            Upcoming Tasks
          </CardTitle>
          <p className="text-sm text-theme-brown-light">Your next wedding planning tasks</p>
        </div>
        
        <Button variant="outline" size="sm" className="h-8 text-xs text-theme-brown border-theme-brown-light/30 hover:bg-theme-cream/10">
          View All
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`flex justify-between items-center p-3 rounded-md border ${
                task.completed 
                  ? 'bg-gray-50/80 border-gray-200' 
                  : 'bg-theme-cream/5 hover:bg-theme-cream/10 border-theme-cream/40 hover:border-theme-cream/80 shadow-sm'
              } cursor-pointer group transition-all duration-200`}
            >
              <div className="flex items-start gap-3 flex-1">
                <Checkbox 
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className={`font-medium text-sm ${task.completed ? 'text-theme-brown-light line-through' : 'text-theme-brown'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-theme-brown-light flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> 
                      Due in {task.dueIn}
                    </p>
                    <Badge className={`text-[10px] px-1.5 py-0.5 ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 border-theme-brown-light/20 text-theme-brown-light">
                      {task.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-theme-brown-light opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-theme-brown hover:bg-theme-brown-dark text-white flex items-center justify-center gap-1.5 shadow-sm">
          <Plus className="h-4 w-4" />
          <span>Add New Task</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasksList;
