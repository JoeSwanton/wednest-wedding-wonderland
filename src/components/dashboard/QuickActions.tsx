
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Users, Settings, Heart, Search } from "lucide-react";

const quickActions = [
  {
    title: "Add Task",
    description: "Create a new wedding task",
    icon: <Plus className="h-4 w-4" />,
    color: "bg-wednest-sage text-white",
  },
  {
    title: "Guest List",
    description: "Manage your guest list",
    icon: <Users className="h-4 w-4" />,
    color: "bg-white text-wednest-brown border border-wednest-beige",
  },
  {
    title: "Find Vendors",
    description: "Discover trusted vendors",
    icon: <Search className="h-4 w-4" />,
    color: "bg-white text-wednest-brown border border-wednest-beige",
  },
  {
    title: "Timeline",
    description: "View your wedding timeline",
    icon: <Calendar className="h-4 w-4" />,
    color: "bg-white text-wednest-brown border border-wednest-beige",
  },
];

const QuickActions = () => {
  return (
    <Card className="border border-wednest-beige shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-wednest-brown text-xl">Quick Actions</CardTitle>
        <CardDescription className="text-wednest-brown-light">
          Shortcuts to common wedding planning tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              className={`h-auto py-4 justify-start ${action.color}`}
            >
              <div className="flex items-center text-left">
                <div className="mr-3">{action.icon}</div>
                <div>
                  <p className="font-medium">{action.title}</p>
                  <p className="text-xs opacity-90">{action.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
