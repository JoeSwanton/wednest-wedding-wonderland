
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Plus, Minus, Calculator, PieChart, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  percentage: number;
}

const Budget = () => {
  const { user } = useAuth();
  const [totalBudget, setTotalBudget] = useState(0);
  
  // Empty budget categories - no mock data
  const [categories, setCategories] = useState<BudgetCategory[]>([]);

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const remainingBudget = totalBudget - totalSpent;
  const spentPercentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  const updateCategorySpent = (id: string, newSpent: number) => {
    setCategories(cats =>
      cats.map(cat =>
        cat.id === id ? { ...cat, spent: Math.max(0, newSpent) } : cat
      )
    );
  };

  const getProgressColor = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage > 100) return "bg-red-500";
    if (percentage > 90) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen flex bg-theme-cream/10">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-serif font-semibold text-theme-brown mb-2">Wedding Budget</h1>
            <p className="text-theme-brown-light">Track your wedding expenses and stay on budget</p>
          </div>

          {/* Budget Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white border-theme-cream shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-theme-brown/10 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-theme-brown" />
                  </div>
                  <div>
                    <p className="text-sm text-theme-brown-light">Total Budget</p>
                    <p className="text-xl font-semibold text-theme-brown">${totalBudget.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-theme-cream shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Minus className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-theme-brown-light">Total Spent</p>
                    <p className="text-xl font-semibold text-red-600">${totalSpent.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-theme-cream shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Plus className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-theme-brown-light">Remaining</p>
                    <p className="text-xl font-semibold text-green-600">${remainingBudget.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-theme-cream shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-theme-brown-light">Spent</p>
                    <p className="text-xl font-semibold text-blue-600">{spentPercentage}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overall Progress */}
          <Card className="mb-6 bg-white border-theme-cream shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-theme-brown">Budget Progress</h3>
                <span className="text-sm text-theme-brown-light">{spentPercentage}% of total budget used</span>
              </div>
              <Progress value={spentPercentage} className="h-3" />
            </CardContent>
          </Card>

          {/* Budget Categories */}
          <Card className="bg-white border-theme-cream shadow-sm">
            <CardHeader>
              <CardTitle className="text-theme-brown">Budget Categories</CardTitle>
            </CardHeader>
            <CardContent>
              {categories.length === 0 ? (
                <div className="text-center py-8">
                  <Calculator className="h-12 w-12 text-theme-brown-light mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-theme-brown mb-2">No budget categories yet</h3>
                  <p className="text-theme-brown-light mb-4">Start by setting your total budget and adding categories to track your expenses.</p>
                  <div className="space-y-4 max-w-md mx-auto">
                    <div>
                      <Label htmlFor="total-budget" className="text-theme-brown">Set Your Total Budget</Label>
                      <Input
                        id="total-budget"
                        type="number"
                        placeholder="Enter total budget"
                        value={totalBudget || ''}
                        onChange={(e) => setTotalBudget(parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Category
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {categories.map((category) => (
                    <div key={category.id} className="border-b border-theme-cream/50 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-theme-brown">{category.name}</h4>
                        <div className="text-sm text-theme-brown-light">
                          {category.percentage}% of budget
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <Label className="text-xs text-theme-brown-light">Budgeted</Label>
                          <div className="text-lg font-semibold text-theme-brown">
                            ${category.budgeted.toLocaleString()}
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-xs text-theme-brown-light">Spent</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={category.spent}
                              onChange={(e) => updateCategorySpent(category.id, parseInt(e.target.value) || 0)}
                              className="w-24 h-8 text-sm"
                            />
                            <span className="text-sm text-theme-brown-light">
                              / ${category.budgeted.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-xs text-theme-brown-light">Remaining</Label>
                          <div className={`text-lg font-semibold ${
                            category.budgeted - category.spent < 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            ${(category.budgeted - category.spent).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Progress 
                          value={Math.min((category.spent / category.budgeted) * 100, 100)}
                          className="h-2"
                        />
                        {category.spent > category.budgeted && (
                          <div className="absolute top-0 left-0 w-full h-2 bg-red-500 rounded-full animate-pulse opacity-50" />
                        )}
                      </div>
                      
                      <div className="flex justify-between mt-1 text-xs text-theme-brown-light">
                        <span>0</span>
                        <span>{Math.round((category.spent / category.budgeted) * 100)}%</span>
                        <span>${category.budgeted.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 pt-4 border-t border-theme-cream/50">
                <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Budget;
