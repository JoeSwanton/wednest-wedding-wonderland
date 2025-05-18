
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Sample data - would be replaced with actual user data from backend
const initialCategories = [
  { id: 1, name: "Venue", budgeted: 12000, actual: 13500, color: "#7D8E74" },
  { id: 2, name: "Catering", budgeted: 8000, actual: 7800, color: "#A6B59E" },
  { id: 3, name: "Photography", budgeted: 3500, actual: 4000, color: "#D4C8BE" },
  { id: 4, name: "Attire", budgeted: 5000, actual: 3200, color: "#E6DFD2" },
  { id: 5, name: "Music", budgeted: 2500, actual: 2500, color: "#BFA58E" }
];

const BudgetTracker = () => {
  const [totalBudget, setTotalBudget] = useState(30000);
  const [categories, setCategories] = useState(initialCategories);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", budgeted: 0, actual: 0 });
  
  // Calculate totals
  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalActual = categories.reduce((sum, cat) => sum + cat.actual, 0);
  const remaining = totalBudget - totalActual;
  
  // Chart data
  const chartData = categories.map(cat => ({
    name: cat.name,
    value: cat.actual
  }));
  
  const handleAddCategory = () => {
    if (newCategory.name && newCategory.budgeted > 0) {
      setCategories([
        ...categories, 
        { 
          id: categories.length + 1, 
          name: newCategory.name, 
          budgeted: newCategory.budgeted, 
          actual: newCategory.actual,
          color: `#${Math.floor(Math.random()*16777215).toString(16)}` 
        }
      ]);
      setNewCategory({ name: "", budgeted: 0, actual: 0 });
      setShowAddForm(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Budget Summary */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Budget Summary</CardTitle>
            <CardDescription>Track your wedding expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Budget:</span>
                <div className="flex items-center gap-2">
                  <Input 
                    type="number" 
                    value={totalBudget} 
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="w-32" 
                  />
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-green-600">
                <span>Total Budgeted:</span>
                <span>${totalBudgeted.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center text-amber-600">
                <span>Total Spent:</span>
                <span>${totalActual.toLocaleString()}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center font-bold">
                <span>Remaining:</span>
                <span className={remaining >= 0 ? "text-green-600" : "text-red-600"}>
                  ${remaining.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Budget Visualization */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Budget Breakdown</CardTitle>
            <CardDescription>Expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={categories[index].color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Categories */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Manage your budget by category</CardDescription>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="bg-muted p-4 rounded-md mb-4 flex gap-2">
              <Input 
                placeholder="Category Name" 
                value={newCategory.name} 
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                className="flex-1" 
              />
              <Input 
                type="number" 
                placeholder="Budgeted" 
                value={newCategory.budgeted || ''} 
                onChange={(e) => setNewCategory({...newCategory, budgeted: Number(e.target.value)})}
                className="w-32" 
              />
              <Input 
                type="number" 
                placeholder="Actual" 
                value={newCategory.actual || ''} 
                onChange={(e) => setNewCategory({...newCategory, actual: Number(e.target.value)})}
                className="w-32" 
              />
              <Button onClick={handleAddCategory}>Add</Button>
              <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          )}
          
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-right">Budgeted</th>
                  <th className="px-4 py-2 text-right">Actual</th>
                  <th className="px-4 py-2 text-right">Remaining</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-t">
                    <td className="px-4 py-2">{category.name}</td>
                    <td className="px-4 py-2 text-right">${category.budgeted.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">${category.actual.toLocaleString()}</td>
                    <td className={`px-4 py-2 text-right ${(category.budgeted - category.actual) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${(category.budgeted - category.actual).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetTracker;
