
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { ApplicationStatus as ApplicationStatusType } from "@/types/vendor";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ApplicationStatus = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [status, setStatus] = useState<{
    status: ApplicationStatusType;
    message?: string;
    updatedAt?: string;
    feedback?: string;
    requiredActions?: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('vendor_profiles')
          .select('application_status, feedback, required_actions, updated_at')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error) throw error;
        
        if (data) {
          setStatus({
            status: data.application_status as ApplicationStatusType || 'pending_review',
            updatedAt: data.updated_at,
            feedback: data.feedback,
            requiredActions: data.required_actions
          });
        }
      } catch (error) {
        console.error("Error fetching application status:", error);
        toast({
          title: "Error",
          description: "Could not fetch your application status.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplicationStatus();
  }, [user]);

  const getStatusIcon = () => {
    switch (status?.status) {
      case 'approved':
        return <CheckCircle className="text-green-500" />;
      case 'rejected':
        return <XCircle className="text-red-500" />;
      case 'changes_requested':
        return <AlertCircle className="text-amber-500" />;
      case 'verification_in_progress':
      case 'pending_review':
      default:
        return <Clock className="text-wednest-sage" />;
    }
  };

  const getStatusLabel = () => {
    switch (status?.status) {
      case 'approved':
        return "Approved";
      case 'rejected':
        return "Rejected";
      case 'changes_requested':
        return "Changes Requested";
      case 'verification_in_progress':
        return "Verification in Progress";
      case 'pending_review':
      default:
        return "Pending Review";
    }
  };

  const getStatusMessage = () => {
    switch (status?.status) {
      case 'approved':
        return "Congratulations! Your vendor application has been approved. Your listing is now visible to couples.";
      case 'rejected':
        return "Unfortunately, your vendor application has been rejected. Please review the feedback below.";
      case 'changes_requested':
        return "Your application requires some changes before it can be approved. Please review the feedback below.";
      case 'verification_in_progress':
        return "Our team is currently reviewing your application. We'll notify you when the review is complete.";
      case 'pending_review':
      default:
        return "Your application has been received and is waiting for review. We typically complete reviews within 1-2 business days.";
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
          <CardDescription>Loading your application status...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!status) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Current status of your vendor application</CardDescription>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border">
            {getStatusIcon()}
            <span className="font-medium">{getStatusLabel()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{getStatusMessage()}</p>
        
        {status.updatedAt && (
          <p className="text-sm text-wednest-brown-light">
            Last updated: {new Date(status.updatedAt).toLocaleDateString()} at {new Date(status.updatedAt).toLocaleTimeString()}
          </p>
        )}
        
        {status.feedback && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Feedback from our review team:</h4>
            <div className="bg-wednest-beige/10 p-3 rounded border border-wednest-beige">
              <p className="text-wednest-brown">{status.feedback}</p>
            </div>
          </div>
        )}
        
        {status.requiredActions && status.requiredActions.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Required actions:</h4>
            <ul className="list-disc list-inside space-y-1 ml-2">
              {status.requiredActions.map((action, index) => (
                <li key={index} className="text-wednest-brown">{action}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationStatus;
