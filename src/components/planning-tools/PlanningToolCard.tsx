
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calculator, ListCheck, MessageSquare, Users, FileText, Calendar } from "lucide-react";

interface PlanningToolCardProps {
  title: string;
  description: string;
  longDescription: string;
  bgColor: string;
  path: string;
  buttonText: string;
  iconType: 'calculator' | 'checklist' | 'message' | 'users' | 'file' | 'calendar';
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
    const size = featured ? 64 : 24;
    const strokeWidth = featured ? 1.5 : 2;
    
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
      default:
        return <Calculator size={size} strokeWidth={strokeWidth} />;
    }
  };

  if (featured) {
    return (
      <div className="border rounded-md overflow-hidden bg-white shadow-sm flex flex-col h-full">
        <div className={`h-64 ${bgColor} flex items-center justify-center`}>
          <div className="text-theme-brown w-24 h-24 flex items-center justify-center">
            {getIcon()}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-serif text-theme-brown mb-3">{title}</h3>
          <p className="text-theme-brown-light mb-4">
            {description}
          </p>
          <p className="text-theme-brown-light mb-6 flex-grow">
            {longDescription}
          </p>
          <Button asChild variant="default" className="w-full bg-theme-brown text-white hover:bg-theme-brown-dark border-0 mt-auto">
            <a href={path}>
              {buttonText}
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-md overflow-hidden ${bgColor}`}>
      <div className="p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="text-theme-brown">
            {getIcon()}
          </div>
        </div>
        <h3 className="text-xl font-serif text-theme-brown mb-2">{title}</h3>
        <p className="text-theme-brown-light mb-4">
          {description}
        </p>
        <p className="text-sm text-theme-brown-light mb-6">
          {longDescription}
        </p>
        <Button asChild variant="outline" className="w-full bg-theme-brown text-white hover:bg-theme-brown-dark border-0">
          <a href={path}>
            {buttonText}
          </a>
        </Button>
      </div>
    </div>
  );
};
