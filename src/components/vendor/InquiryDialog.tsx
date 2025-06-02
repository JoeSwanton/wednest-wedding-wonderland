
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';
import { useVendorInquiries } from '@/hooks/useVendorInquiries';

interface InquiryDialogProps {
  vendorId: string;
  vendorName: string;
  children?: React.ReactNode;
}

const InquiryDialog = ({ vendorId, vendorName, children }: InquiryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    message: '',
    wedding_date: '',
    guest_count: '',
    budget_range: ''
  });
  const [sending, setSending] = useState(false);
  const { sendInquiry } = useVendorInquiries();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setSending(true);
    const success = await sendInquiry(vendorId, formData);
    
    if (success) {
      setFormData({
        message: '',
        wedding_date: '',
        guest_count: '',
        budget_range: ''
      });
      setOpen(false);
    }
    setSending(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-wednest-sage hover:bg-wednest-sage-dark text-white">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Vendor
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {vendorName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Tell us about your wedding and what you're looking for..."
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="wedding_date">Wedding Date</Label>
              <Input
                id="wedding_date"
                type="date"
                value={formData.wedding_date}
                onChange={(e) => setFormData(prev => ({ ...prev, wedding_date: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="guest_count">Guest Count</Label>
              <Input
                id="guest_count"
                value={formData.guest_count}
                onChange={(e) => setFormData(prev => ({ ...prev, guest_count: e.target.value }))}
                placeholder="e.g. 100-150"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="budget_range">Budget Range (Optional)</Label>
            <Input
              id="budget_range"
              value={formData.budget_range}
              onChange={(e) => setFormData(prev => ({ ...prev, budget_range: e.target.value }))}
              placeholder="e.g. $2,000-$5,000"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.message.trim() || sending}
              className="flex-1 bg-wednest-sage hover:bg-wednest-sage-dark"
            >
              {sending ? 'Sending...' : 'Send Inquiry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryDialog;
