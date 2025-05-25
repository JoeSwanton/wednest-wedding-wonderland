
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, ArrowLeft, Mail, Phone, Globe, Instagram, Facebook } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface VendorProfile {
  user_id: string;
  business_name: string;
  business_category: string;
  business_email: string;
  phone: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  bio: string;
  tagline?: string;
  city: string;
  state: string;
  address?: string;
  postcode?: string;
  years_in_business?: number;
  service_radius?: number;
  specialties?: string[];
  application_status: string;
  logo_url?: string;
  created_at: string;
}

interface VendorPortfolio {
  id: string;
  image_url: string;
  caption?: string;
  display_order: number;
}

const VendorReview = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [vendor, setVendor] = useState<VendorProfile | null>(null);
  const [portfolio, setPortfolio] = useState<VendorPortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!vendorId) return;
    fetchVendorData();
  }, [vendorId]);

  const fetchVendorData = async () => {
    try {
      // Fetch vendor profile
      const { data: vendorData, error: vendorError } = await supabase
        .from('vendor_profiles')
        .select('*')
        .eq('user_id', vendorId)
        .single();

      if (vendorError) throw vendorError;

      // Fetch portfolio images
      const { data: portfolioData, error: portfolioError } = await supabase
        .from('vendor_portfolio')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('display_order');

      if (portfolioError) throw portfolioError;

      setVendor(vendorData);
      setPortfolio(portfolioData || []);
    } catch (error) {
      console.error('Error fetching vendor data:', error);
      toast({
        title: "Error",
        description: "Failed to load vendor data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!vendor || !user) return;
    
    setProcessing(true);
    try {
      // Update vendor status
      const { error: updateError } = await supabase
        .from('vendor_profiles')
        .update({ 
          application_status: newStatus,
          feedback: feedback || null,
          is_published: newStatus === 'approved'
        })
        .eq('user_id', vendor.user_id);

      if (updateError) throw updateError;

      // Send notification email to vendor
      const { error: emailError } = await supabase.functions.invoke('notify-vendor-status', {
        body: {
          vendor_email: vendor.business_email,
          business_name: vendor.business_name,
          status: newStatus,
          feedback: feedback
        }
      });

      if (emailError) {
        console.error('Error sending notification email:', emailError);
        // Don't fail the whole operation if email fails
      }

      toast({
        title: "Success",
        description: `Vendor ${newStatus === 'approved' ? 'approved' : 'rejected'} successfully`,
      });

      navigate('/admin/vendors');
    } catch (error) {
      console.error('Error updating vendor status:', error);
      toast({
        title: "Error",
        description: "Failed to update vendor status",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Vendor not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/admin/vendors')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Vendor List
        </Button>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-serif text-wednest-brown">Review Vendor Application</h1>
          <Badge variant={vendor.application_status === 'pending_review' ? 'secondary' : 'default'}>
            {vendor.application_status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vendor.logo_url && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={vendor.logo_url} 
                    alt={`${vendor.business_name} logo`}
                    className="h-24 w-24 object-contain rounded-lg border"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Business Name</label>
                  <p className="font-medium">{vendor.business_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="font-medium">{vendor.business_category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Years in Business</label>
                  <p className="font-medium">{vendor.years_in_business || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Service Radius</label>
                  <p className="font-medium">{vendor.service_radius ? `${vendor.service_radius}km` : 'Not specified'}</p>
                </div>
              </div>

              {vendor.tagline && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Tagline</label>
                  <p className="font-medium">{vendor.tagline}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Bio</label>
                <p className="text-sm">{vendor.bio}</p>
              </div>

              {vendor.specialties && vendor.specialties.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Specialties</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {vendor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">{specialty}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Portfolio */}
          {portfolio.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {portfolio.map((image) => (
                    <div key={image.id} className="aspect-square">
                      <img 
                        src={image.image_url} 
                        alt={image.caption || 'Portfolio image'}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {image.caption && (
                        <p className="text-xs text-gray-500 mt-1">{image.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{vendor.business_email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{vendor.phone}</span>
              </div>
              
              {vendor.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a href={vendor.website} target="_blank" rel="noopener noreferrer" 
                     className="text-sm text-blue-600 hover:underline">
                    Website
                  </a>
                </div>
              )}
              
              {vendor.instagram && (
                <div className="flex items-center gap-3">
                  <Instagram className="h-4 w-4 text-gray-500" />
                  <a href={`https://instagram.com/${vendor.instagram}`} target="_blank" rel="noopener noreferrer"
                     className="text-sm text-blue-600 hover:underline">
                    @{vendor.instagram}
                  </a>
                </div>
              )}
              
              {vendor.facebook && (
                <div className="flex items-center gap-3">
                  <Facebook className="h-4 w-4 text-gray-500" />
                  <a href={vendor.facebook} target="_blank" rel="noopener noreferrer"
                     className="text-sm text-blue-600 hover:underline">
                    Facebook
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vendor.address && <p className="text-sm">{vendor.address}</p>}
                <p className="text-sm">{vendor.city}, {vendor.state} {vendor.postcode}</p>
              </div>
            </CardContent>
          </Card>

          {/* Review Actions */}
          {vendor.application_status === 'pending_review' && (
            <Card>
              <CardHeader>
                <CardTitle>Review Decision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Feedback (optional)</label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Add feedback for the vendor..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleStatusUpdate('approved')}
                    disabled={processing}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  
                  <Button
                    onClick={() => handleStatusUpdate('rejected')}
                    disabled={processing}
                    variant="destructive"
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorReview;
