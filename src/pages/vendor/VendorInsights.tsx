
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
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Eye, TrendingUp, Users, Tag, Calendar, ArrowRight, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for profile views
const profileViewsData = [
  { date: "05/01", views: 45 },
  { date: "05/02", views: 38 },
  { date: "05/03", views: 52 },
  { date: "05/04", views: 48 },
  { date: "05/05", views: 61 },
  { date: "05/06", views: 55 },
  { date: "05/07", views: 67 },
  { date: "05/08", views: 51 },
  { date: "05/09", views: 42 },
  { date: "05/10", views: 49 },
  { date: "05/11", views: 58 },
  { date: "05/12", views: 62 },
  { date: "05/13", views: 76 },
  { date: "05/14", views: 80 },
];

// Mock data for traffic sources
const trafficSourcesData = [
  { name: 'Search', value: 45 },
  { name: 'Direct', value: 25 },
  { name: 'Referral', value: 15 },
  { name: 'Social', value: 15 },
];

// Colors for pie chart
const COLORS = ['#7D8E74', '#8A7F66', '#E6DFD2', '#D6B17D'];

// Mock data for inquiries by package
const inquiriesByPackageData = [
  { name: "Basic Package", inquiries: 12 },
  { name: "Standard Package", inquiries: 18 },
  { name: "Premium Package", inquiries: 24 },
  { name: "Custom Package", inquiries: 8 },
];

// Mock data for conversion funnel
const conversionFunnelData = [
  { name: "Profile Views", value: 520 },
  { name: "Inquiries", value: 82 },
  { name: "Messages", value: 64 },
  { name: "Bookings", value: 28 },
];

const VendorInsights = () => {
  const [timeRange, setTimeRange] = useState("2weeks");
  
  // Calculate total views
  const totalProfileViews = profileViewsData.reduce((sum, item) => sum + item.views, 0);
  
  return (
    <VendorLayout title="Performance & Insights">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-serif text-wednest-brown">Performance Analytics</h2>
            <p className="text-wednest-brown-light">Understand how your vendor profile is performing</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="2weeks">Last 2 Weeks</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Data</Button>
          </div>
        </div>
        
        {/* Stats summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Eye className="h-4 w-4 mr-2 text-wednest-sage" />
                Total Profile Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">{totalProfileViews}</p>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Users className="h-4 w-4 mr-2 text-wednest-brown" />
                Inquiry Conversion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">15.8%</p>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+2.4%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-wednest-gold" />
                Booking Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">34.1%</p>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+5%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Tag className="h-4 w-4 mr-2 text-wednest-brown-light" />
                Average Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">$1,975</p>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+$125</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Profile Views Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Views Over Time</CardTitle>
            <CardDescription>See how traffic to your profile has changed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profileViewsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#7D8E74" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Traffic Sources and Inquiry Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSourcesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficSourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Inquiries by Package</CardTitle>
              <CardDescription>Which packages generate the most interest</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={inquiriesByPackageData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="inquiries" fill="#8A7F66" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Track your visitor-to-booking pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={conversionFunnelData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7D8E74" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-sm">
                <span>Visitor-to-Inquiry Rate: <strong>15.8%</strong></span>
                <span>Inquiry-to-Booking Rate: <strong>34.1%</strong></span>
                <span>Overall Conversion: <strong>5.4%</strong></span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recommendations */}
        <Card className="bg-wednest-brown/5 border-wednest-brown/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-wednest-gold" />
              Growth Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border">
                <h3 className="font-medium">Improve Profile Completion</h3>
                <p className="text-sm text-wednest-brown-light mt-1">
                  Adding at least 3 more sample photos can increase your profile views by up to 15%.
                </p>
                <div className="mt-2">
                  <Button variant="link" className="p-0 h-auto text-wednest-sage">
                    Update Profile <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-lg border">
                <h3 className="font-medium">Optimize Standard Package</h3>
                <p className="text-sm text-wednest-brown-light mt-1">
                  Your Standard Package has high views but lower conversion. Consider adjusting pricing or adding more value.
                </p>
                <div className="mt-2">
                  <Button variant="link" className="p-0 h-auto text-wednest-sage">
                    Edit Packages <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-lg border">
                <h3 className="font-medium">Respond to Inquiries Faster</h3>
                <p className="text-sm text-wednest-brown-light mt-1">
                  Vendors who respond within 6 hours have a 40% higher booking rate.
                </p>
                <div className="mt-2">
                  <Button variant="link" className="p-0 h-auto text-wednest-sage">
                    View Pending Inquiries <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorInsights;
