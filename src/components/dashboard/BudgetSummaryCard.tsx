
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const BudgetSummaryCard = () => {
  // Mock data - in a real app this would come from API/state
  const budget = {
    total: 32000,
    spent: 26100,
    remaining: 5900,
    topExpenses: [
      { category: "Venue", amount: 12000 },
      { category: "Catering", amount: 8200 }
    ]
  };
  
  // Calculate percentage spent
  const spentPercentage = Math.round((budget.spent / budget.total) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-theme-brown">Budget Overview</CardTitle>
        <p className="text-sm text-theme-brown-light">Budget allocation and spending</p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-theme-brown-light">Total Budget</p>
            <p className="text-xl font-medium text-theme-brown">${budget.total.toLocaleString()}</p>
          </div>
          
          <div>
            <p className="text-sm text-theme-brown-light">Remaining</p>
            <p className="text-xl font-medium text-green-600">${budget.remaining.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-theme-brown-light">Spent</span>
            <span className="text-theme-brown-light">${budget.spent.toLocaleString()} ({spentPercentage}%)</span>
          </div>
          <Progress className="h-2" value={spentPercentage} />
        </div>
        
        <div className="space-y-3 mb-4">
          <p className="text-sm font-medium text-theme-brown">Top Expenses</p>
          
          {budget.topExpenses.map((expense, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-theme-cream/10 rounded p-2 text-center">
                <p className="text-theme-brown-light">{expense.category}</p>
                <p className="text-theme-brown font-medium">${expense.amount.toLocaleString()}</p>
              </div>
              
              {index === 0 && (
                <div className="bg-theme-cream/10 rounded p-2 text-center">
                  <p className="text-theme-brown-light">Recent Payment</p>
                  <p className="text-theme-brown font-medium">Catering $3,200</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button className="text-sm text-theme-sage hover:text-theme-sage-dark">
          Manage Budget
        </button>
      </CardContent>
    </Card>
  );
};

export default BudgetSummaryCard;
