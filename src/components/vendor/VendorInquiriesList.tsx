
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Calendar, Users, DollarSign } from 'lucide-react';
import { useVendorInquiries } from '@/hooks/useVendorInquiries';

const VendorInquiriesList = () => {
  const { inquiries, loading, updateInquiryStatus } = useVendorInquiries();

  if (loading) {
    return <div className="text-center py-8">Loading inquiries...</div>;
  }

  if (inquiries.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-wednest-brown-light">No inquiries yet</p>
          <p className="text-sm">Complete your profile to start receiving messages from couples</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-wednest-sage" />
          Recent Inquiries ({inquiries.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inquiries.map(inquiry => (
            <div key={inquiry.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow bg-white">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-wednest-brown">{inquiry.customer_name}</h3>
                  <p className="text-sm text-wednest-brown-light">{inquiry.customer_email}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(inquiry.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <Badge className={getStatusColor(inquiry.status)}>
                  {inquiry.status}
                </Badge>
              </div>

              <p className="text-sm text-wednest-brown-light mb-3 line-clamp-3">
                {inquiry.message}
              </p>

              {(inquiry.wedding_date || inquiry.guest_count || inquiry.budget_range) && (
                <div className="flex gap-4 text-xs text-wednest-brown-light mb-3">
                  {inquiry.wedding_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(inquiry.wedding_date).toLocaleDateString()}
                    </div>
                  )}
                  {inquiry.guest_count && (
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {inquiry.guest_count} guests
                    </div>
                  )}
                  {inquiry.budget_range && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {inquiry.budget_range}
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                {inquiry.status === 'new' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateInquiryStatus(inquiry.id, 'read')}
                  >
                    Mark as Read
                  </Button>
                )}
                {inquiry.status !== 'replied' && (
                  <Button
                    size="sm"
                    className="bg-wednest-sage hover:bg-wednest-sage-dark text-white"
                    onClick={() => updateInquiryStatus(inquiry.id, 'replied')}
                  >
                    Mark as Replied
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => updateInquiryStatus(inquiry.id, 'archived')}
                >
                  Archive
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorInquiriesList;
