
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye } from "lucide-react";

interface VendorListItem {
  user_id: string;
  business_name: string;
  business_category: string;
  business_email: string;
  application_status: string;
  created_at: string;
  city: string;
  state: string;
  verified_vendor: boolean;
}

const VendorList = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<VendorListItem[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<VendorListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    filterVendors();
  }, [vendors, searchQuery, statusFilter]);

  const fetchVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('vendor_profiles')
        .select(`
          user_id,
          business_name,
          business_category,
          business_email,
          application_status,
          created_at,
          city,
          state,
          verified_vendor
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterVendors = () => {
    let filtered = vendors;

    if (searchQuery) {
      filtered = filtered.filter(vendor =>
        vendor.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.business_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.business_email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(vendor => vendor.application_status === statusFilter);
    }

    setFilteredVendors(filtered);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_review':
        return <Badge variant="secondary">Pending Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-wednest-sage border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-serif text-wednest-brown mb-4">Vendor Applications</h1>
        
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending_review">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold">{vendors.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold">
                {vendors.filter(v => v.application_status === 'pending_review').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {vendors.filter(v => v.application_status === 'approved').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {vendors.filter(v => v.application_status === 'rejected').length}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vendor List */}
      <div className="space-y-4">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.user_id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{vendor.business_name}</h3>
                    {vendor.verified_vendor && (
                      <Badge className="bg-green-600">Verified</Badge>
                    )}
                    {getStatusBadge(vendor.application_status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Category:</span> {vendor.business_category}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {vendor.city}, {vendor.state}
                    </div>
                    <div>
                      <span className="font-medium">Applied:</span> {new Date(vendor.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {vendor.business_email}
                  </div>
                </div>
                
                <Button
                  onClick={() => navigate(`/admin/vendor-review/${vendor.user_id}`)}
                  variant="outline"
                  size="sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredVendors.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No vendors found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VendorList;
