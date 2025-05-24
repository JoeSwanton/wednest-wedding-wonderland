
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp } from "lucide-react";

const EnhancedBudgetSummaryCard = () => {
  // Mock data - in a real app this would come from API/state
  const budget = {
    total: 32000,
    spent: 26100,
    remaining: 5900,
    topExpenses: [
      { category: "Venue", amount: 12000, color: "bg-purple-100 text-purple-700" },
      { category: "Catering", amount: 8200, color: "bg-green-100 text-green-700" }
    ]
  };
  
  // Calculate percentage spent
  const spentPercentage = Math.round((budget.spent / budget.total) * 100);
  
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
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-theme-cream/10 rounded-lg p-3">
            <p className="text-sm text-theme-brown-light">Total Budget</p>
            <p className="text-xl font-semibold text-theme-brown">${budget.total.toLocaleString()}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-sm text-green-600">Remaining</p>
            <p className="text-xl font-semibold text-green-700">${budget.remaining.toLocaleString()}</p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-theme-brown-light">Spent</span>
            <span className="text-theme-brown-light">${budget.spent.toLocaleString()} ({spentPercentage}%)</span>
          </div>
          <Progress className="h-2" value={spentPercentage} />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-theme-brown-light" />
            <p className="text-sm font-medium text-theme-brown">Top Expenses</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {budget.topExpenses.map((expense, index) => (
              <Card key={index} className="border border-theme-cream/50">
                <CardContent className="p-3 text-center">
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mb-1 ${expense.color}`}>
                    {expense.category}
                  </div>
                  <p className="text-theme-brown font-semibold">${expense.amount.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <Button className="w-full bg-theme-sage hover:bg-theme-sage-dark text-white">
          Manage Budget
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnhancedBudgetSummaryCard;
