
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VendorLayout from "@/components/vendor/VendorLayout";
import VendorInquiriesList from "@/components/vendor/VendorInquiriesList";
import VendorAnalyticsCard from "@/components/vendor/VendorAnalyticsCard";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Calendar as CalendarIcon, CheckCircle, Clock, AlertCircle, TrendingUp, Users, DollarSign } from "lucide-react";

// Sample metrics for demonstration
const performanceMetrics = [
  { label: "This Week", value: 47, change: 12, period: "vs last week" },
  { label: "This Month", value: 156, change: -5, period: "vs last month" }
];

const inquiryMetrics = [
  { label: "New Inquiries", value: 8, change: 25, period: "this week" },
  { label: "Response Rate", value: "85%", change: 5, period: "avg 2hrs" }
];

const conversionMetrics = [
  { label: "Inquiry to Booking", value: "15%", change: 3, period: "this month" },
  { label: "Total Bookings", value: 12, change: 20, period: "this year" }
];

const StreamlinedVendorDashboard = () => {
  const { userProfile } = useAuth();
  const businessName = userProfile?.business_name || "Your Business";
  
  // Application status - in production this would come from database
  const applicationStatus = "approved"; // Could be: pending_review, approved, needs_changes

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "pending_review":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending Review</Badge>;
      case "needs_changes":
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" />Needs Changes</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <VendorLayout title="Dashboard">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-serif text-wednest-brown">Welcome, {businessName}</h2>
            <p className="text-wednest-brown-light">Manage your wedding services and connect with couples.</p>
          </div>
          {getStatusBadge(applicationStatus)}
        </div>

        {/* Application Status Card */}
        {applicationStatus !== "approved" && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Profile Under Review</h3>
                  <p className="text-yellow-700 text-sm">
                    We're reviewing your vendor profile. You'll receive an email once it's approved and live on the platform.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <VendorAnalyticsCard
            title="Profile Views"
            metrics={performanceMetrics}
            icon={<Eye className="h-5 w-5 text-wednest-sage" />}
          />
          
          <VendorAnalyticsCard
            title="Inquiries"
            metrics={inquiryMetrics}
            icon={<MessageSquare className="h-5 w-5 text-wednest-brown-light" />}
          />
          
          <VendorAnalyticsCard
            title="Conversions"
            metrics={conversionMetrics}
            icon={<TrendingUp className="h-5 w-5 text-wednest-gold" />}
          />
        </div>

        {/* Recent Inquiries */}
        <VendorInquiriesList />

        {/* Business Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>Your business performance this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">New Customers</p>
                      <p className="text-sm text-gray-600">Couples who contacted you</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">12</p>
                    <p className="text-sm text-green-600">+25% from last month</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-medium">Revenue Goal</p>
                      <p className="text-sm text-gray-600">Progress towards monthly target</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">75%</p>
                    <p className="text-sm text-gray-600">$15,000 / $20,000</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your vendor profile and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Update Business Profile</div>
                    <div className="text-sm text-gray-500">Edit your business information and photos</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Manage Availability</div>
                    <div className="text-sm text-gray-500">Update your calendar and booking status</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Portfolio Gallery</div>
                    <div className="text-sm text-gray-500">Add new photos and showcase your work</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </VendorLayout>
  );
};

export default StreamlinedVendorDashboard;
