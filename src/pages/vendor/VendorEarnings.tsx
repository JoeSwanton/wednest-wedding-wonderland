
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import VendorLayout from "@/components/vendor/VendorLayout";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar, Download, ArrowDown, ArrowUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Mock data for earnings
const earningsData = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 1800 },
  { month: "Mar", amount: 2200 },
  { month: "Apr", amount: 1900 },
  { month: "May", amount: 2800 },
  { month: "Jun", amount: 3100 },
];

// Mock data for transactions
const transactionData = [
  { 
    id: 1, 
    couple: "Emma & James", 
    date: "2025-05-15", 
    amount: 2500, 
    package: "Premium Wedding Photography", 
    status: "Paid" 
  },
  { 
    id: 2, 
    couple: "Sophia & William", 
    date: "2025-06-22", 
    amount: 1800, 
    package: "Basic Wedding Photography", 
    status: "Pending" 
  },
  { 
    id: 3, 
    couple: "Olivia & Noah", 
    date: "2025-07-08", 
    amount: 3200, 
    package: "Ultimate Wedding Package", 
    status: "Paid" 
  }
];

const VendorEarnings = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  
  // Calculate total earnings
  const totalEarnings = earningsData.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <VendorLayout title="Payments & Earnings">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif text-wednest-brown">Earnings Overview</h2>
          <p className="text-wednest-brown-light">Track your income and manage payments</p>
        </div>
        
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-wednest-sage" />
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${totalEarnings.toLocaleString()}</p>
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +15% from last year
              </span>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-wednest-brown-light" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${earningsData[earningsData.length - 1].amount.toLocaleString()}</p>
              <div className="flex items-center">
                <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+10% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-wednest-gold" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$1,800</p>
              <p className="text-sm text-wednest-brown-light">Expected within 7 days</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Earnings chart */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Earnings History</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant={selectedPeriod === "month" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedPeriod("month")}
                >
                  Monthly
                </Button>
                <Button 
                  variant={selectedPeriod === "quarter" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedPeriod("quarter")}
                >
                  Quarterly
                </Button>
                <Button 
                  variant={selectedPeriod === "year" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedPeriod("year")}
                >
                  Yearly
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7D8E74" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7D8E74" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Earnings"]} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#7D8E74" 
                    fillOpacity={1} 
                    fill="url(#colorEarnings)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Transactions */}
        <div>
          <h2 className="text-xl font-serif text-wednest-brown mb-4">Recent Transactions</h2>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Couple</th>
                    <th className="py-3 px-4 text-left font-medium">Date</th>
                    <th className="py-3 px-4 text-left font-medium">Package</th>
                    <th className="py-3 px-4 text-right font-medium">Amount</th>
                    <th className="py-3 px-4 text-center font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{transaction.couple}</td>
                      <td className="py-3 px-4">{transaction.date}</td>
                      <td className="py-3 px-4 max-w-xs truncate">{transaction.package}</td>
                      <td className="py-3 px-4 text-right font-medium">${transaction.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className={`text-center text-xs rounded-full py-1 px-2 font-medium 
                          ${transaction.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                            'bg-amber-100 text-amber-800'}`}>
                          {transaction.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t flex justify-between items-center">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" /> Download CSV
              </Button>
              <Button size="sm">View All Transactions</Button>
            </div>
          </Card>
        </div>
        
        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Settings</CardTitle>
            <CardDescription>Manage how you receive your earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-background">
                <h3 className="font-medium mb-1">Bank Account</h3>
                <p className="text-sm text-wednest-brown-light mb-3">••••••••1234 (Direct Deposit)</p>
                <Button variant="outline" size="sm">Update Payment Method</Button>
              </div>
              <div className="p-4 border rounded-md bg-background">
                <h3 className="font-medium mb-1">Payout Schedule</h3>
                <p className="text-sm text-wednest-brown-light mb-3">Payouts are processed within 7 days after the event</p>
                <Button variant="outline" size="sm">Update Schedule</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorEarnings;
