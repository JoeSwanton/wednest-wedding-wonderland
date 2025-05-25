
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VendorLayout from "@/components/vendor/VendorLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar } from "@/components/ui/calendar";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Eye, MessageSquare, Calendar as CalendarIcon } from "lucide-react";

// Mock data for charts
const profileViewsData = [
  { name: "Mon", views: 4 },
  { name: "Tue", views: 6 },
  { name: "Wed", views: 8 },
  { name: "Thu", views: 12 },
  { name: "Fri", views: 14 },
  { name: "Sat", views: 20 },
  { name: "Sun", views: 16 },
];

const inquiryData = [
  { name: "Jan", count: 3 },
  { name: "Feb", count: 5 },
  { name: "Mar", count: 2 },
  { name: "Apr", count: 7 },
  { name: "May", count: 4 },
  { name: "Jun", count: 8 },
];

// Mock data for bookings
const mockBookings = [
  { id: 1, couple: "Emma & James", date: new Date(2025, 5, 15), service: "Photography" },
  { id: 2, couple: "Sophia & William", date: new Date(2025, 5, 22), service: "Engagement Shoot" },
];

// Mock data for inquiries
const mockInquiries = [
  { 
    id: 1, 
    couple: "Emily & Michael", 
    date: "2025-06-10", 
    message: "We love your photography style! Are you available for our wedding in June next year?",
    createdAt: "2025-05-10T14:30:00Z"
  },
  { 
    id: 2, 
    couple: "Jessica & Daniel", 
    date: "2025-07-22", 
    message: "Hi there! We're planning a garden wedding and would love to know more about your packages.",
    createdAt: "2025-05-12T09:15:00Z"
  },
];

const VendorDashboard = () => {
  const { userProfile, loading, user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(new Date());
  
  console.log("VendorDashboard: userProfile:", userProfile);
  console.log("VendorDashboard: loading:", loading);
  console.log("VendorDashboard: user:", user);

  // Show loading state
  if (loading) {
    console.log("VendorDashboard: showing loading state");
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If no user or not a vendor, show error state
  if (!user) {
    console.log("VendorDashboard: no user found");
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please sign in to access the vendor dashboard.</p>
        </div>
      </div>
    );
  }

  if (userProfile?.user_role !== 'vendor') {
    console.log("VendorDashboard: user is not a vendor, role:", userProfile?.user_role);
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-gray-600">This area is only accessible to vendors.</p>
        </div>
      </div>
    );
  }

  const businessName = userProfile?.business_name || "Your Business";
  
  // Create array of dates for bookings to highlight on calendar
  const bookedDates = mockBookings.map(booking => booking.date);

  console.log("VendorDashboard: rendering dashboard for:", businessName);

  return (
    <VendorLayout title="Dashboard">
      <div className="space-y-6">
        <h2 className="text-3xl font-serif text-wednest-brown">Welcome, {businessName}</h2>
        <p className="text-wednest-brown-light max-w-2xl">
          Manage your wedding services, respond to inquiries, and grow your business with Enosi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5 text-wednest-sage" />
                Profile Views
              </CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-3xl font-bold">80</p>
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
              </div>
              <div className="h-20 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={profileViewsData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7D8E74" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#7D8E74" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="views" stroke="#7D8E74" fillOpacity={1} fill="url(#colorViews)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-wednest-brown-light" />
                Inquiries
              </CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-3xl font-bold">12</p>
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">+4%</span>
              </div>
              <div className="h-20 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inquiryData.slice(-4)} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <Bar dataKey="count" fill="#8A7F66" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-wednest-gold" />
                Conversion Rate
              </CardTitle>
              <CardDescription>Views to inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-3xl font-bold">15%</p>
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">+2%</span>
              </div>
              <div className="flex items-center justify-center h-20 mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-wednest-gold h-2.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-wednest-sage" />
                Upcoming Bookings
              </CardTitle>
              <CardDescription>Your schedule for this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    onMonthChange={setSelectedMonth}
                    className="rounded-md border shadow"
                    modifiers={{
                      booked: bookedDates,
                    }}
                    modifiersStyles={{
                      booked: { 
                        fontWeight: 'bold',
                        backgroundColor: '#E6DFD2', 
                        color: '#695F4C',
                        borderRadius: '4px'
                      }
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-2">Bookings</h3>
                  {mockBookings.length > 0 ? (
                    <div className="space-y-4">
                      {mockBookings.map(booking => (
                        <div key={booking.id} className="border rounded-md p-3 bg-white">
                          <div className="font-medium">{booking.couple}</div>
                          <div className="text-sm text-wednest-brown">{booking.service}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {booking.date.toLocaleDateString('en-US', { 
                              weekday: 'short',
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-wednest-brown-light">No upcoming bookings</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-wednest-sage" />
                Recent Inquiries
              </CardTitle>
              <CardDescription>Your latest messages and conversations</CardDescription>
            </CardHeader>
            <CardContent>
              {mockInquiries.length > 0 ? (
                <div className="space-y-4">
                  {mockInquiries.map(inquiry => (
                    <div key={inquiry.id} className="border rounded-md p-3 hover:shadow-md transition-shadow bg-white">
                      <div className="flex justify-between">
                        <span className="font-medium">{inquiry.couple}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-wednest-gold mt-1">Wedding Date: {inquiry.date}</div>
                      <p className="text-sm mt-2 line-clamp-2 text-wednest-brown">{inquiry.message}</p>
                      <div className="mt-2">
                        <button className="text-xs text-wednest-sage hover:text-wednest-sage-dark">
                          Reply →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-wednest-brown-light">No messages yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;
