
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp } from "lucide-react";

const BudgetOverviewWidget = () => {
  const budget = {
    total: 32000,
    spent: 26100,
    remaining: 5900,
    percentage: 82
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (budget.percentage / 100) * circumference;

  return (
    <Card className="shadow-sm border-theme-cream/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-theme-brown flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-theme-sage" />
          Budget Overview
        </CardTitle>
        <p className="text-sm text-theme-brown-light">Track your wedding expenses</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="text-theme-sage transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-semibold text-theme-brown">{budget.percentage}%</p>
                <p className="text-xs text-theme-brown-light">Used</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-theme-cream/10 rounded-lg">
            <p className="text-xs text-theme-brown-light">Total Budget</p>
            <p className="font-semibold text-theme-brown">${budget.total.toLocaleString()}</p>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-600">Remaining</p>
            <p className="font-semibold text-green-700">${budget.remaining.toLocaleString()}</p>
          </div>
        </div>
        
        <Button className="w-full bg-theme-sage hover:bg-theme-sage-dark text-white">
          <TrendingUp className="h-4 w-4 mr-2" />
          Manage Budget
        </Button>
      </CardContent>
    </Card>
  );
};

export default BudgetOverviewWidget;
