
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, ListCheck, FileText, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const planningTools = [
  {
    title: "Budget Calculator",
    description: "Estimate your wedding expenses with our free interactive budget calculator.",
    icon: Calculator,
    path: "/planning-tools?tab=budget",
    color: "bg-theme-sage/10",
    iconColor: "text-theme-sage",
  },
  {
    title: "Wedding Checklist",
    description: "Stay organized with our comprehensive wedding planning checklist customized to your timeline.",
    icon: ListCheck,
    path: "/planning-tools?tab=checklist",
    color: "bg-theme-gold/10",
    iconColor: "text-theme-gold",
  },
  {
    title: "Save-the-Date Composer",
    description: "Create and share beautiful save-the-date messages with your guests via SMS.",
    icon: MessageSquare,
    path: "/planning-tools?tab=save-date",
    color: "bg-theme-brown-light/10",
    iconColor: "text-theme-brown-light",
  },
  {
    title: "Guest List Generator",
    description: "Easily create and download a guest list Excel file to manage your wedding invitations.",
    icon: Users,
    path: "/planning-tools?tab=guest-list",
    color: "bg-theme-sage-dark/10",
    iconColor: "text-theme-sage-dark",
  },
  {
    title: "Vendor Questions",
    description: "Generate customized interview questions for different types of wedding vendors.",
    icon: FileText,
    path: "/planning-tools?tab=vendor-questions",
    color: "bg-theme-brown/10",
    iconColor: "text-theme-brown",
  },
];

const PlanningToolsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {planningTools.map((tool, index) => (
        <Card key={index} className="border border-theme-beige hover:shadow-md transition-shadow group">
          <CardHeader>
            <div className={`p-3 rounded-full w-fit mb-4 ${tool.color} group-hover:scale-110 transition-transform`}>
              <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
            </div>
            <CardTitle className="text-xl font-serif text-theme-brown">{tool.title}</CardTitle>
            <CardDescription className="text-theme-brown-light">
              {tool.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full border-theme-sage text-theme-sage hover:bg-theme-sage hover:text-white">
              <Link to={tool.path}>
                Use This Tool
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlanningToolsGrid;
