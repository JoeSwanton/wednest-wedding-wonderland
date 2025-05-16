
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { VendorLayout } from "@/components/vendor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle } from "lucide-react";

// Admin page that shows onboarding analytics data
// This is only accessible to admin users
const OnboardingAnalytics = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Check if current user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return;
      
      try {
        // Call the is_admin function via RPC
        const { data, error } = await supabase.rpc('is_admin', {
          uid: user.id
        });
        
        if (error) throw error;
        
        setIsAdmin(!!data);
      } catch (error: any) {
        console.error("Error checking admin status:", error);
        setError("Error checking admin access. You may not have permission to view this page.");
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [user]);
  
  // Fetch onboarding data if user is admin
  useEffect(() => {
    const fetchOnboardingData = async () => {
      if (!isAdmin) return;
      
      try {
        const { data, error } = await supabase
          .from('onboarding_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);
          
        if (error) throw error;
        
        setData(data || []);
      } catch (error: any) {
        console.error("Error fetching onboarding data:", error);
        setError("Error fetching onboarding data. Please try again later.");
      }
    };
    
    if (isAdmin) {
      fetchOnboardingData();
    }
  }, [isAdmin]);
  
  // Loading state
  if (loading) {
    return (
      <VendorLayout title="Admin Analytics">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-wednest-sage" />
        </div>
      </VendorLayout>
    );
  }
  
  // Not admin state
  if (!isAdmin) {
    return (
      <VendorLayout title="Admin Access Required">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You do not have permission to view this page. Please contact an administrator if you believe this is an error.
          </AlertDescription>
        </Alert>
      </VendorLayout>
    );
  }
  
  // Error state
  if (error) {
    return (
      <VendorLayout title="Admin Analytics">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </VendorLayout>
    );
  }
  
  return (
    <VendorLayout title="Onboarding Analytics">
      <div className="space-y-6">
        <Alert>
          <AlertDescription>
            This page shows analytics data from the vendor onboarding process. 
            This information is only visible to administrators.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="logs">
          <TabsList>
            <TabsTrigger value="logs">All Logs</TabsTrigger>
            <TabsTrigger value="completions">Completions</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="logs" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Onboarding Activities</CardTitle>
                <CardDescription>Latest 100 onboarding events from all users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Step</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.map((log) => (
                        <tr key={log.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(log.created_at).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {log.user_id.substring(0, 8)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {log.step_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${log.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              log.status === 'error' ? 'bg-red-100 text-red-800' :
                              log.status === 'skipped' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'}`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <details>
                              <summary className="cursor-pointer">View Data</summary>
                              <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-auto max-h-40">
                                {JSON.stringify(log.step_data, null, 2)}
                              </pre>
                            </details>
                          </td>
                        </tr>
                      ))}
                      {data.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                            No onboarding data available yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Onboardings</CardTitle>
                <CardDescription>Users who have completed the entire onboarding process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolio Images</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Packages</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data
                        .filter(log => log.step_name === 'CompleteOnboarding' && log.status === 'completed')
                        .map(log => (
                          <tr key={log.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(log.created_at).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {log.user_id.substring(0, 8)}...
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {log.step_data.businessCategory || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {log.step_data.portfolioImagesCount || 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {log.step_data.servicePackagesCount || 0}
                            </td>
                          </tr>
                        ))}
                      {data.filter(log => log.step_name === 'CompleteOnboarding' && log.status === 'completed').length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                            No completed onboardings available yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="errors" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Errors</CardTitle>
                <CardDescription>Issues encountered during onboarding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Step</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error Details</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data
                        .filter(log => log.status === 'error')
                        .map(log => (
                          <tr key={log.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(log.created_at).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {log.user_id.substring(0, 8)}...
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {log.step_name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <details>
                                <summary className="cursor-pointer">View Error</summary>
                                <pre className="mt-2 p-2 bg-red-50 rounded text-xs overflow-auto max-h-40">
                                  {JSON.stringify(log.step_data, null, 2)}
                                </pre>
                              </details>
                            </td>
                          </tr>
                        ))}
                      {data.filter(log => log.status === 'error').length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                            No errors recorded yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
};

export default OnboardingAnalytics;
