
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, FileEdit, List, Settings, User } from 'lucide-react';

const QuickActions = () => {
  const quickActions = [
    {
      title: "Complete Checklist",
      description: "Tackle your wedding planning checklist",
      icon: <Check className="h-8 w-8 text-wednest-sage" />,
      link: "#",
    },
    {
      title: "Edit Guest List",
      description: "Add or remove guests to your list",
      icon: <List className="h-8 w-8 text-wednest-sage" />,
      link: "#",
    },
    {
      title: "Update Budget",
      description: "Track expenses and manage your budget",
      icon: <CreditCard className="h-8 w-8 text-wednest-sage" />,
      link: "#",
    },
    {
      title: "Manage Profile",
      description: "Update your account settings",
      icon: <User className="h-8 w-8 text-wednest-sage" />,
      link: "/profile",
    },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Easily access key wedding planning features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Link to={action.link} key={index} className="no-underline">
              <div className="border rounded-lg p-4 hover:border-wednest-sage hover:bg-wednest-cream/10 transition-colors cursor-pointer h-full flex flex-col">
                <div className="mb-3">{action.icon}</div>
                <h3 className="font-medium text-wednest-brown mb-1">{action.title}</h3>
                <p className="text-sm text-wednest-brown-light">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
