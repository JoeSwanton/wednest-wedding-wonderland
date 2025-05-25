
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckSquare, Clock, Plus, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  completed: boolean;
  description?: string;
}

const Checklist = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  
  // Empty checklist - no mock data
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);

  const toggleItem = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const filteredItems = checklistItems.filter(item => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  const completedCount = checklistItems.filter(item => item.completed).length;
  const totalCount = checklistItems.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen flex bg-theme-cream/10">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-serif font-semibold text-theme-brown mb-2">Wedding Checklist</h1>
            <p className="text-theme-brown-light">Keep track of all your wedding planning tasks</p>
          </div>

          {/* Progress Overview */}
          <Card className="mb-6 bg-white border-theme-cream shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-theme-brown">Planning Progress</h3>
                  <p className="text-theme-brown-light">{completedCount} of {totalCount} tasks completed</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-theme-brown">{completionPercentage}%</div>
                  <p className="text-sm text-theme-brown-light">Complete</p>
                </div>
              </div>
              <Progress value={completionPercentage} className="h-3" />
            </CardContent>
          </Card>

          {/* Filter Buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="bg-theme-brown text-white hover:bg-theme-brown-dark"
            >
              All Tasks ({totalCount})
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              onClick={() => setFilter("pending")}
              className="bg-theme-brown text-white hover:bg-theme-brown-dark"
            >
              Pending ({totalCount - completedCount})
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              className="bg-theme-brown text-white hover:bg-theme-brown-dark"
            >
              Completed ({completedCount})
            </Button>
          </div>

          {/* Checklist Items */}
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <Card className="bg-white border-theme-cream shadow-sm">
                <CardContent className="p-8 text-center">
                  <CheckSquare className="h-12 w-12 text-theme-brown-light mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-theme-brown mb-2">No tasks yet</h3>
                  <p className="text-theme-brown-light mb-4">Start planning your perfect wedding by adding your first task.</p>
                  <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Task
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredItems.map((item) => (
                <Card key={item.id} className={`bg-white border-theme-cream shadow-sm transition-all ${
                  item.completed ? 'opacity-75' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-medium ${
                            item.completed ? 'line-through text-theme-brown-light' : 'text-theme-brown'
                          }`}>
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getPriorityColor(item.priority)}>
                              {item.priority} priority
                            </Badge>
                            <Badge variant="outline" className="border-theme-beige text-theme-brown-light">
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                        {item.description && (
                          <p className="text-sm text-theme-brown-light mb-2">{item.description}</p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-theme-brown-light">
                          <Clock className="h-4 w-4" />
                          <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Add Task Button */}
          <div className="mt-8 text-center">
            <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checklist;
