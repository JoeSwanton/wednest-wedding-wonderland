
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import VendorLayout from "@/components/vendor/VendorLayout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Image, DollarSign, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VendorPackages = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Basic Wedding Package",
      description: "Our standard coverage including 6 hours of photography",
      price: "$1,200",
      duration: "6 hours",
      category: "Photography",
      popular: true
    },
    {
      id: 2,
      name: "Premium Wedding Package",
      description: "Full day coverage with two photographers and photo album",
      price: "$2,500",
      duration: "10 hours",
      category: "Photography",
      popular: false
    }
  ]);

  const handleAddPackage = () => {
    toast({
      title: "Coming Soon",
      description: "Package creation will be available soon!"
    });
  };

  const handleEditPackage = (id: number) => {
    toast({
      title: "Coming Soon",
      description: `Edit functionality for package #${id} will be available soon!`
    });
  };

  const handleDeletePackage = (id: number) => {
    toast({
      title: "Coming Soon",
      description: `Delete functionality for package #${id} will be available soon!`
    });
  };

  return (
    <VendorLayout title="Packages & Pricing">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif text-wednest-brown">Manage Your Service Packages</h2>
            <p className="text-wednest-brown-light">Create and customize your service offerings for couples</p>
          </div>
          <Button onClick={handleAddPackage} className="bg-wednest-sage hover:bg-wednest-sage-dark">
            <Plus className="mr-2 h-4 w-4" /> New Package
          </Button>
        </div>

        {packages.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="pt-6 text-center">
              <p className="text-wednest-brown-light mb-4">You haven't created any packages yet</p>
              <Button onClick={handleAddPackage} className="bg-wednest-sage hover:bg-wednest-sage-dark">
                <Plus className="mr-2 h-4 w-4" /> Create Your First Package
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {packages.map(pkg => (
              <Card key={pkg.id} className={pkg.popular ? "border-wednest-gold" : ""}>
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-wednest-gold text-white text-xs font-medium px-2 py-1 rounded-bl-md rounded-tr-md">
                    Most Booked
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{pkg.name}</CardTitle>
                      <CardDescription className="mt-1">{pkg.category}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-wednest-brown">{pkg.price}</p>
                      <div className="flex items-center text-xs text-wednest-brown-light">
                        <Clock className="h-3 w-3 mr-1" /> {pkg.duration}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-wednest-brown-light mb-4">{pkg.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditPackage(pkg.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toast({
                        title: "Coming Soon",
                        description: "Media upload will be available soon!"
                      })}
                    >
                      <Image className="h-4 w-4 mr-1" /> Add Media
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-destructive hover:text-destructive" 
                      onClick={() => handleDeletePackage(pkg.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="bg-wednest-brown/5 border-wednest-brown/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-wednest-gold" />
              Optimize Your Pricing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-wednest-brown-light">
              Looking to make sure your pricing is competitive? Our AI-powered pricing recommendations can help you optimize based on your location, services, and market demand.
            </p>
            <Button className="mt-4 bg-wednest-gold hover:bg-wednest-gold/90 text-white">
              Get Pricing Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorPackages;
