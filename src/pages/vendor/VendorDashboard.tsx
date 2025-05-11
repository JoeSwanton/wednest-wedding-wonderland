
import { useAuth } from "@/contexts/AuthContext";
import VendorLayout from "@/components/vendor/VendorLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, Eye, Users, Star, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const VendorDashboard = () => {
  const { user, userProfile } = useAuth();

  return (
    <VendorLayout title="Vendor Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif text-wednest-brown mb-2">
          Welcome back, {userProfile?.display_name || "Vendor"}
        </h2>
        <p className="text-gray-600">
          Here's an overview of your business performance and recent activity
        </p>
      </div>

      {/* Profile Completion */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Profile Completion</CardTitle>
          <CardDescription>Complete your profile to increase visibility to couples</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={65} className="h-2" />
          <p className="mt-2 text-sm text-gray-600">65% complete</p>
        </CardContent>
        <CardFooter className="text-sm text-gray-600 flex justify-between">
          <span>Missing: Gallery images, pricing details</span>
          <a href="/vendor/settings" className="text-wednest-sage hover:underline">Complete Now</a>
        </CardFooter>
      </Card>

      {/* Key Metrics */}
      <h3 className="text-xl font-semibold text-wednest-brown mb-4">Key Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Profile Views</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">248</CardTitle>
              <Eye className="text-wednest-sage h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs flex items-center text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" /> 
              <span>+12% from last week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>New Inquiries</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">16</CardTitle>
              <MessageSquare className="text-wednest-sage h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs flex items-center text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" /> 
              <span>+5 from last week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Confirmed Bookings</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">8</CardTitle>
              <Calendar className="text-wednest-sage h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs flex items-center text-amber-600">
              <span>Same as last week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Rating</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">4.8</CardTitle>
              <Star className="text-wednest-sage h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs flex items-center">
              <span>Based on 24 reviews</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Your scheduled events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Sample bookings */}
            <div className="border-l-4 border-wednest-sage pl-4 py-2">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">Johnson & Smith Wedding</h4>
                  <p className="text-sm text-gray-600">Photography Package</p>
                </div>
                <div className="text-sm text-right">
                  <div className="font-medium">Aug 15, 2023</div>
                  <div>Sydney, NSW</div>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-wednest-sage-light pl-4 py-2">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">Taylor Engagement Shoot</h4>
                  <p className="text-sm text-gray-600">1hr Session</p>
                </div>
                <div className="text-sm text-right">
                  <div className="font-medium">Aug 22, 2023</div>
                  <div>Melbourne Beach</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <a href="/vendor/bookings" className="text-wednest-sage hover:underline">View All Bookings</a>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>New couples interested in your services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 border p-3 rounded-md">
              <div className="w-10 h-10 rounded-full bg-wednest-brown-light flex items-center justify-center text-white">
                JM
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium">James & Maria</h4>
                <p className="text-xs text-gray-600 truncate">Looking for full day coverage for our wedding in December...</p>
              </div>
              <div className="text-xs text-gray-500">2 hours ago</div>
            </div>
            
            <div className="flex items-center gap-4 border p-3 rounded-md">
              <div className="w-10 h-10 rounded-full bg-wednest-brown-light flex items-center justify-center text-white">
                SK
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium">Sarah & Kevin</h4>
                <p className="text-xs text-gray-600 truncate">Hi, we're interested in your premium package. Is it available...</p>
              </div>
              <div className="text-xs text-gray-500">8 hours ago</div>
            </div>
          </CardContent>
          <CardFooter>
            <a href="/vendor/messages" className="text-wednest-sage hover:underline">View All Messages</a>
          </CardFooter>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;
