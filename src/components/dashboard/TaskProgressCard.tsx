
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TaskProgressCard = () => {
  // Mock data - in a real app this would come from API/state
  const tasks = {
    completed: 18,
    inProgress: 12,
    notStarted: 18,
    total: 48
  };
  
  // Calculate percentages
  const completionPercentage = Math.round((tasks.completed / tasks.total) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-theme-brown">Planning Progress</CardTitle>
        <p className="text-sm text-theme-brown-light">Overall wedding planning completion</p>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center w-36 h-36">
            {/* Circular progress indicator */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke="#f0f0f0" 
                strokeWidth="12"
              />
              
              {/* Progress circle */}
              <circle 
                cx="50" 
                cy="50" 
                r="40"
                fill="none"
                stroke="#7D8E74"
                strokeWidth="12"
                strokeDasharray={`${completionPercentage * 2.51} 251`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
              />
            </svg>
            
            {/* Percentage in the center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-theme-brown">{completionPercentage}%</span>
              <span className="text-xs text-theme-brown-light mt-1">Completed</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4 w-full text-center">
            <div className="text-center">
              <p className="text-xl font-medium text-theme-brown">{tasks.completed}</p>
              <p className="text-xs text-theme-brown-light">Completed</p>
            </div>
            
            <div className="text-center">
              <p className="text-xl font-medium text-theme-brown">{tasks.inProgress}</p>
              <p className="text-xs text-theme-brown-light">In Progress</p>
            </div>
            
            <div className="text-center">
              <p className="text-xl font-medium text-theme-brown">{tasks.notStarted}</p>
              <p className="text-xs text-theme-brown-light">Not Started</p>
            </div>
          </div>
          
          <button className="mt-4 text-sm text-theme-sage hover:text-theme-sage-dark">
            View All Tasks
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskProgressCard;
