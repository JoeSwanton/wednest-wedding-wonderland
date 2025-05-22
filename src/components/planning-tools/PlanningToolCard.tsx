
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calculator, ListCheck, MessageSquare, Users, FileText, Calendar, FileSpreadsheet, ListChecks, FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";

interface PlanningToolCardProps {
  title: string;
  description: string;
  longDescription: string;
  bgColor: string;
  path: string;
  buttonText: string;
  iconType: 'calculator' | 'checklist' | 'message' | 'users' | 'file' | 'calendar' | 'file-spreadsheet' | 'list-checks' | 'file-question';
  featured?: boolean;
}

export const PlanningToolCard = ({
  title,
  description,
  longDescription,
  bgColor,
  path,
  buttonText,
  iconType,
  featured = false
}: PlanningToolCardProps) => {
  const getIcon = () => {
    const size = 64;
    const strokeWidth = 1.5;
    
    switch (iconType) {
      case 'calculator':
        return <Calculator size={size} strokeWidth={strokeWidth} />;
      case 'checklist':
        return <ListCheck size={size} strokeWidth={strokeWidth} />;
      case 'message':
        return <MessageSquare size={size} strokeWidth={strokeWidth} />;
      case 'users':
        return <Users size={size} strokeWidth={strokeWidth} />;
      case 'file':
        return <FileText size={size} strokeWidth={strokeWidth} />;
      case 'calendar':
        return <Calendar size={size} strokeWidth={strokeWidth} />;
      case 'file-spreadsheet':
        return <FileSpreadsheet size={size} strokeWidth={strokeWidth} />;
      case 'list-checks':
        return <ListChecks size={size} strokeWidth={strokeWidth} />;
      case 'file-question':
        return <FileQuestion size={size} strokeWidth={strokeWidth} />;
      default:
        return <Calculator size={size} strokeWidth={strokeWidth} />;
    }
  };

  return (
    <div className="border rounded-md overflow-hidden bg-white shadow-sm flex flex-col h-full">
      <div className={`h-64 ${bgColor} flex items-center justify-center`}>
        <div className="text-theme-brown w-24 h-24 flex items-center justify-center">
          {getIcon()}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-theme-brown mb-3 text-xl">{title}</h3>
        <p className="text-theme-brown-light mb-4">
          {description}
        </p>
        <p className="text-theme-brown-light mb-6 flex-grow">
          {longDescription}
        </p>
        <Button asChild variant="default" className="w-full bg-theme-brown text-white hover:bg-theme-brown-dark border-0 mt-auto">
          <Link to={path}>
            {buttonText}
          </Link>
        </Button>
      </div>
    </div>
  );
};
