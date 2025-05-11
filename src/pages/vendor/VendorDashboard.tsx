
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VendorLayout from "@/components/vendor/VendorLayout";
import { useAuth } from "@/contexts/AuthContext";

const VendorDashboard = () => {
  const { userProfile } = useAuth();
  const businessName = userProfile?.business_name || "Your Business";

  return (
    <VendorLayout title="Dashboard">
      <div className="space-y-6">
        <h2 className="text-3xl font-serif text-wednest-brown">Welcome, {businessName}</h2>
        <p className="text-wednest-brown-light max-w-2xl">
          Manage your wedding services, respond to inquiries, and grow your business with Enosi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Profile Views</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Inquiries</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Conversion Rate</CardTitle>
              <CardDescription>Views to inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0%</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Events and consultations in the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-wednest-brown-light">No upcoming bookings</p>
            </CardContent>
          </Card>
          
          {/* Recent messages */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Your latest inquiries and conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-wednest-brown-light">No messages yet</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;
