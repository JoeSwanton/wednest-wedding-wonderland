
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Loader2, Mail, User } from "lucide-react";

const AccountSettings = () => {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState(userProfile?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: email !== user.email ? email : undefined,
        data: { full_name: fullName }
      });
      
      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile information.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;

      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to send reset email",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-wednest-brown">Account Settings</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userType">Account Type</Label>
          <div className="p-3 bg-gray-50 rounded border border-gray-100">
            {userProfile?.user_type === 'vendor' ? 'Wedding Vendor' : 'Couple Planning a Wedding'}
          </div>
          <p className="text-xs text-wednest-brown-light">
            This is the account type you selected during registration.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-wednest-brown-light" />
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-wednest-brown-light" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
            />
          </div>
          <p className="text-xs text-wednest-brown-light">
            Changing your email will require verification.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <Button 
          variant="outline" 
          onClick={handlePasswordReset}
          disabled={isLoading}
          className="border-wednest-sage text-wednest-brown hover:bg-wednest-sage hover:text-white w-full sm:w-auto"
        >
          Reset Password
        </Button>
        <Button 
          onClick={handleUpdateProfile}
          disabled={isLoading}
          className="bg-wednest-sage hover:bg-wednest-sage-dark text-white w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountSettings;
