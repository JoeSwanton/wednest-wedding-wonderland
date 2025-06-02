
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VendorLayout from "@/components/vendor/VendorLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Calendar as CalendarIcon, CheckCircle, Clock, AlertCircle } from "lucide-react";

// Sample metrics for demonstration
const sampleMetrics = {
  profileViews: 47,
  inquiries: 3,
  responseRate: "85%"
};

const sampleInquiries = [
  { 
    id: 1, 
    couple: "Emily & Michael", 
    date: "2025-06-10", 
    message: "We love your photography style! Are you available for our wedding?",
    createdAt: "2025-05-10T14:30:00Z"
  },
  { 
    id: 2, 
    couple: "Jessica & Daniel", 
    date: "2025-07-22", 
    message: "Hi! We're planning a garden wedding and would love to know more.",
    createdAt: "2025-05-12T09:15:00Z"
  },
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

        {/* Simple Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5 text-wednest-sage" />
                Profile Views
              </CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sampleMetrics.profileViews}</div>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-wednest-brown-light" />
                Inquiries
              </CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sampleMetrics.inquiries}</div>
              <p className="text-sm text-blue-600 mt-1">New couples interested</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-wednest-gold" />
                Response Rate
              </CardTitle>
              <CardDescription>Average response time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sampleMetrics.responseRate}</div>
              <p className="text-sm text-green-600 mt-1">Within 2 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-wednest-sage" />
              Recent Inquiries
            </CardTitle>
            <CardDescription>Messages from couples interested in your services</CardDescription>
          </CardHeader>
          <CardContent>
            {sampleInquiries.length > 0 ? (
              <div className="space-y-4">
                {sampleInquiries.map(inquiry => (
                  <div key={inquiry.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-wednest-brown">{inquiry.couple}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs text-wednest-gold mb-2">Wedding Date: {inquiry.date}</div>
                    <p className="text-sm text-wednest-brown-light mb-3">{inquiry.message}</p>
                    <Button size="sm" className="bg-wednest-sage hover:bg-wednest-sage-dark text-white">
                      Reply
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-wednest-brown-light">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No inquiries yet</p>
                <p className="text-sm">Complete your profile to start receiving messages from couples</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your vendor profile and services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default StreamlinedVendorDashboard;
