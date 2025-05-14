
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import VendorLayout from "@/components/vendor/VendorLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  DollarSign, 
  Check, 
  X, 
  Shield, 
  Eye, 
  Sparkles, 
  LineChart, 
  AlertCircle,
  TrendingUp,
  Download
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const VendorSubscription = () => {
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState("premium");
  
  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$0",
      period: "per month",
      description: "Basic listing for new vendors",
      features: [
        "Basic vendor profile",
        "Limited inquiries (max 5/month)",
        "Standard search placement",
        "No commission on bookings",
      ],
      disabledFeatures: [
        "Featured placement",
        "Advanced analytics",
        "Priority support",
        "Promotional tools",
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: "$29",
      period: "per month",
      description: "For established wedding vendors",
      features: [
        "Enhanced vendor profile",
        "Unlimited inquiries",
        "Higher search placement",
        "Advanced analytics",
        "Priority email support",
        "Promotional tools",
      ],
      disabledFeatures: [
        "Featured placement in homepage",
      ],
      popular: true
    },
    {
      id: "elite",
      name: "Elite",
      price: "$49",
      period: "per month",
      description: "Maximum visibility for top vendors",
      features: [
        "Premium vendor profile",
        "Unlimited inquiries",
        "Top search placement",
        "Featured in homepage rotation",
        "Comprehensive analytics",
        "Priority phone & email support",
        "Promotional tools",
        "Dedicated account manager",
      ],
      disabledFeatures: []
    }
  ];
  
  const handleChangePlan = (planId: string) => {
    toast({
      title: "Change Plan",
      description: `You'll be redirected to update your subscription to the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan.`,
    });
  };
  
  const handleCancelPlan = () => {
    toast({
      title: "Cancel Subscription",
      description: "You'll be redirected to cancel your subscription.",
      variant: "destructive"
    });
  };
  
  const getCurrentPlan = () => {
    return plans.find(plan => plan.id === currentPlan);
  };

  return (
    <VendorLayout title="Subscription & Billing">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif text-wednest-brown">Your Subscription</h2>
          <p className="text-wednest-brown-light">Manage your vendor plan and billing details</p>
        </div>
        
        {/* Current Plan */}
        <Card className="border-wednest-gold">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <Badge className="bg-wednest-gold mb-2">Current Plan</Badge>
                <CardTitle className="text-2xl">{getCurrentPlan()?.name} Plan</CardTitle>
                <CardDescription className="mt-1">{getCurrentPlan()?.description}</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{getCurrentPlan()?.price}</p>
                <p className="text-sm text-wednest-brown-light">{getCurrentPlan()?.period}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm mb-4">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-green-700">Your subscription renews on June 15, 2025</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Button className="bg-wednest-sage hover:bg-wednest-sage-dark">
                Manage Payment Methods
              </Button>
              <Button variant="outline" className="text-destructive hover:text-destructive" onClick={handleCancelPlan}>
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Available Plans */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif text-wednest-brown">Available Plans</h3>
          <p className="text-wednest-brown-light">Choose the plan that best fits your business needs</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`${plan.popular ? 'border-wednest-sage shadow-md' : ''} ${currentPlan === plan.id ? 'bg-gray-50' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-wednest-sage text-white text-xs font-medium px-2 py-1 rounded-bl-md rounded-tr-md">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex items-baseline mt-2">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="text-sm text-wednest-brown-light ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-4 w-4 mr-2 text-green-600 mt-1" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.disabledFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start opacity-60">
                        <X className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  {currentPlan === plan.id ? (
                    <Button className="w-full" disabled>Current Plan</Button>
                  ) : (
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-wednest-sage hover:bg-wednest-sage-dark' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => handleChangePlan(plan.id)}
                    >
                      {currentPlan === 'starter' && plan.id !== 'starter' ? 'Upgrade' : 'Select Plan'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>View and download your previous invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3 px-4 font-medium">Date</th>
                    <th className="py-3 px-4 font-medium">Description</th>
                    <th className="py-3 px-4 font-medium text-right">Amount</th>
                    <th className="py-3 px-4 font-medium text-center">Status</th>
                    <th className="py-3 px-4 font-medium text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">May 15, 2025</td>
                    <td className="py-3 px-4">Premium Plan - Monthly</td>
                    <td className="py-3 px-4 text-right">$29.00</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-green-100 text-green-800 text-xs px-2 py-1">
                          Paid
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">Apr 15, 2025</td>
                    <td className="py-3 px-4">Premium Plan - Monthly</td>
                    <td className="py-3 px-4 text-right">$29.00</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-green-100 text-green-800 text-xs px-2 py-1">
                          Paid
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">Mar 15, 2025</td>
                    <td className="py-3 px-4">Premium Plan - Monthly</td>
                    <td className="py-3 px-4 text-right">$29.00</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <span className="inline-block rounded-full bg-green-100 text-green-800 text-xs px-2 py-1">
                          Paid
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Promotional Tools */}
        <Card className="bg-wednest-brown/5 border-wednest-brown/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-wednest-gold" />
              Promotional Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-start gap-4">
                  <div className="bg-wednest-gold/10 p-3 rounded-full">
                    <Eye className="h-6 w-6 text-wednest-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Featured Vendor Spotlight</h3>
                    <p className="text-sm text-wednest-brown-light mt-1 mb-3">
                      Get featured on our homepage and increase your visibility by up to 5x for a week.
                    </p>
                    <Button variant="outline" className="border-wednest-gold text-wednest-gold hover:bg-wednest-gold/10">
                      $49 for 7 days
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-start gap-4">
                  <div className="bg-wednest-sage/10 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-wednest-sage" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Search Results Boost</h3>
                    <p className="text-sm text-wednest-brown-light mt-1 mb-3">
                      Appear higher in search results for your category for a limited time.
                    </p>
                    <Button variant="outline" className="border-wednest-sage text-wednest-sage hover:bg-wednest-sage/10">
                      $29 for 14 days
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Extra Info */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-amber-800">
              <AlertCircle className="h-5 w-5" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-800">
              If you have any questions about your subscription or need assistance with billing, please contact our support team.
            </p>
            <Button variant="link" className="text-amber-800 p-0 h-auto mt-2">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorSubscription;
