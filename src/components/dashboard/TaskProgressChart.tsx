
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Completed", value: 12, color: "#7D8E74" },
  { name: "In Progress", value: 8, color: "#A6B59E" },
  { name: "Not Started", value: 15, color: "#E6DFD2" },
];

const TaskProgressChart = () => {
  return (
    <Card className="border border-wednest-beige shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-wednest-brown text-xl">Task Progress</CardTitle>
        <CardDescription className="text-wednest-brown-light">
          Your wedding planning progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} Tasks`, null]} 
                contentStyle={{ 
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #E6DFD2',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                iconType="circle"
                layout="horizontal" 
                formatter={(value, entry, index) => (
                  <span className="text-sm text-wednest-brown">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskProgressChart;
