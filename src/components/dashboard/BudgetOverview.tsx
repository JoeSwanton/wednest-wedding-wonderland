
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Venue", budget: 15000, spent: 12000 },
  { name: "Catering", budget: 8000, spent: 6500 },
  { name: "Photography", budget: 3000, spent: 3000 },
  { name: "Attire", budget: 4000, spent: 2800 },
  { name: "Flowers", budget: 2000, spent: 1800 },
];

const BudgetOverview = () => {
  // Calculate total budget and spent amounts
  const totalBudget = data.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = data.reduce((sum, item) => sum + item.spent, 0);
  const remainingBudget = totalBudget - totalSpent;
  const spentPercentage = Math.round((totalSpent / totalBudget) * 100);
  
  return (
    <Card className="border border-wednest-beige shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-wednest-brown text-xl">Budget Overview</CardTitle>
        <CardDescription className="text-wednest-brown-light">
          Budget allocation and spending
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-wednest-beige/20 rounded-md">
            <p className="text-sm text-wednest-brown-light">Total Budget</p>
            <p className="text-xl font-medium text-wednest-brown">${totalBudget.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-wednest-beige/20 rounded-md">
            <p className="text-sm text-wednest-brown-light">Spent</p>
            <p className="text-xl font-medium text-wednest-brown">${totalSpent.toLocaleString()} ({spentPercentage}%)</p>
          </div>
          <div className="p-4 bg-wednest-beige/20 rounded-md">
            <p className="text-sm text-wednest-brown-light">Remaining</p>
            <p className="text-xl font-medium text-wednest-brown">${remainingBudget.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#695F4C', fontSize: 12 }}
                tickLine={{ stroke: '#E6DFD2' }}
                axisLine={{ stroke: '#E6DFD2' }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fill: '#695F4C', fontSize: 12 }}
                tickLine={{ stroke: '#E6DFD2' }}
                axisLine={{ stroke: '#E6DFD2' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, null]}
                contentStyle={{ 
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #E6DFD2',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              />
              <Bar dataKey="budget" fill="#A6B59E" name="Budget" />
              <Bar dataKey="spent" fill="#7D8E74" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
