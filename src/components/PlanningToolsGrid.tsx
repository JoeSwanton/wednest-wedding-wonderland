
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ListCheck, FileText, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const planningTools = [
  {
    title: "Budget Tracker",
    description: "Track your wedding expenses and stay on budget with our easy-to-use budget planning tool.",
    icon: DollarSign,
    path: "/planning-tools/budget",
    color: "bg-wednest-sage/10",
    iconColor: "text-wednest-sage",
  },
  {
    title: "Guest List Manager",
    description: "Manage your guest list, track RSVPs, and organize seating arrangements in one place.",
    icon: Users,
    path: "/planning-tools/guests",
    color: "bg-wednest-gold/10",
    iconColor: "text-wednest-gold",
  },
  {
    title: "Timeline Creator",
    description: "Create a detailed timeline for your wedding day to ensure everything runs smoothly.",
    icon: Calendar,
    path: "/planning-tools/timeline",
    color: "bg-wednest-brown-light/10",
    iconColor: "text-wednest-brown-light",
  },
  {
    title: "Checklist",
    description: "Stay organized with our comprehensive wedding planning checklist tailored to your timeline.",
    icon: ListCheck,
    path: "/planning-tools/checklist",
    color: "bg-wednest-sage-dark/10",
    iconColor: "text-wednest-sage-dark",
  },
  {
    title: "Vendor Contracts",
    description: "Store and manage all your vendor contracts and information in one secure location.",
    icon: FileText,
    path: "/planning-tools/contracts",
    color: "bg-wednest-brown/10",
    iconColor: "text-wednest-brown",
  },
];

const PlanningToolsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {planningTools.map((tool, index) => (
        <Card key={index} className="border border-wednest-beige hover:shadow-md transition-shadow">
          <CardHeader>
            <div className={`p-3 rounded-full w-fit mb-4 ${tool.color}`}>
              <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
            </div>
            <CardTitle className="text-xl font-serif text-wednest-brown">{tool.title}</CardTitle>
            <CardDescription className="text-wednest-brown-light">
              {tool.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full border-wednest-sage text-wednest-sage hover:bg-wednest-sage hover:text-white">
              <Link to={tool.path}>
                Get Started
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlanningToolsGrid;
