
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Plus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { format } from "date-fns";

// Mock payment data - in a real app, this would come from your backend
const mockPaymentHistory = [
  {
    id: "pay_1N2j3k4L5m6n7",
    date: new Date(2024, 3, 15),
    amount: 249.99,
    description: "Wedding Planning Package",
    status: "completed"
  },
  {
    id: "pay_8o9P0q1R2s3T",
    date: new Date(2024, 2, 1),
    amount: 99.99,
    description: "Vendor Directory Access",
    status: "completed"
  }
];

// Mock payment methods - in a real app, this would come from your payment provider
const mockPaymentMethods = [
  {
    id: "pm_1a2B3c4D5e",
    type: "credit_card",
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true
  }
];

const PaymentManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false);

  const handleAddPaymentMethod = () => {
    // In a real implementation, this would open a Stripe Elements form
    // or redirect to a Stripe Checkout page
    setIsAddingPaymentMethod(false);
    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully.",
    });
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    // In a real implementation, this would call your backend
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    });
  };

  const handleRemovePaymentMethod = (id: string) => {
    // In a real implementation, this would call your backend
    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed.",
    });
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-wednest-brown">Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          {mockPaymentMethods.map(method => (
            <div 
              key={method.id} 
              className={`flex items-center justify-between p-4 border rounded-md mb-3 ${
                method.isDefault ? 'border-wednest-sage bg-wednest-cream/20' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-wednest-brown" />
                <div>
                  <p className="font-medium text-wednest-brown">
                    {method.brand} •••• {method.last4}
                  </p>
                  <p className="text-sm text-wednest-brown-light">
                    Expires {method.expMonth}/{method.expYear}
                    {method.isDefault && <span className="ml-2 text-wednest-sage">(Default)</span>}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {!method.isDefault && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-wednest-sage text-wednest-brown hover:bg-wednest-sage hover:text-white"
                    onClick={() => handleSetDefaultPaymentMethod(method.id)}
                  >
                    Set as default
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-300 text-red-500 hover:bg-red-100 hover:text-red-600"
                  onClick={() => handleRemovePaymentMethod(method.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          
          <Dialog open={isAddingPaymentMethod} onOpenChange={setIsAddingPaymentMethod}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full mt-2 border-dashed border-wednest-sage text-wednest-brown hover:bg-wednest-cream"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add payment method
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add payment method</DialogTitle>
                <DialogDescription>
                  Add a new credit card or payment method to your account.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {/* In a real app, this would be a Stripe Elements form */}
                <p className="text-center text-wednest-brown-light mb-4">
                  This would be a secure payment form in a real implementation.
                </p>
                <Button 
                  className="w-full bg-wednest-sage hover:bg-wednest-sage-dark text-white"
                  onClick={handleAddPaymentMethod}
                >
                  Save payment method
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-wednest-brown">Payment History</CardTitle>
          <CardDescription>View your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPaymentHistory.map(payment => (
                <TableRow key={payment.id}>
                  <TableCell>{format(payment.date, 'MMM d, yyyy')}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700">
                      {payment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {mockPaymentHistory.length === 0 && (
            <div className="text-center py-8 text-wednest-brown-light">
              No payment history available.
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PaymentManagement;
