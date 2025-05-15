import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface ServicePackagesStepProps {
  onNext: () => void;
  onBack: () => void;
  formData: VendorOnboardingData;
  updateFormData: (data: Partial<VendorOnboardingData>) => void;
}

interface ServicePackage {
  id: string;
  name: string;
  priceRange: string;
  description: string;
  features: string[];
}

const ServicePackagesStep = ({ onNext, onBack, formData, updateFormData }: ServicePackagesStepProps) => {
  const { toast } = useToast();
  const [localFormData, setLocalFormData] = useState({
    servicePackages: formData.servicePackages || []
  });
  
  const [newPackage, setNewPackage] = useState<ServicePackage>({
    id: '',
    name: '',
    priceRange: '',
    description: '',
    features: []
  });
  
  const [newFeature, setNewFeature] = useState('');
  
  const handlePackageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPackage(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    
    if (newPackage.features.includes(newFeature.trim())) {
      toast({
        title: "Duplicate feature",
        description: "This feature has already been added.",
        variant: "destructive"
      });
      return;
    }
    
    setNewPackage(prev => ({
      ...prev,
      features: [...prev.features, newFeature.trim()]
    }));
    setNewFeature('');
  };
  
  const handleRemoveFeature = (feature: string) => {
    setNewPackage(prev => ({
      ...prev,
      features: prev.features.filter(item => item !== feature)
    }));
  };
  
  const handleAddPackage = () => {
    // Validate
    if (!newPackage.name || !newPackage.priceRange) {
      toast({
        title: "Required fields missing",
        description: "Please fill in the package name and price range.",
        variant: "destructive"
      });
      return;
    }
    
    // Create new package with unique ID
    const packageToAdd = {
      ...newPackage,
      id: Date.now().toString()
    };
    
    // Add to form data
    setLocalFormData(prev => ({
      ...prev,
      servicePackages: [...prev.servicePackages, packageToAdd]
    }));
    
    // Reset form
    setNewPackage({
      id: '',
      name: '',
      priceRange: '',
      description: '',
      features: []
    });
    
    toast({
      title: "Package added",
      description: "Service package has been added successfully."
    });
  };
  
  const handleDeletePackage = (id: string) => {
    setLocalFormData(prev => ({
      ...prev,
      servicePackages: prev.servicePackages.filter(pkg => pkg.id !== id)
    }));
    
    toast({
      title: "Package removed",
      description: "Service package has been removed."
    });
  };
  
  const handleSubmit = () => {
    // No validation needed, packages are optional
    updateFormData(localFormData);
    onNext();
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif text-wednest-brown">Service Packages</h2>
        <p className="text-wednest-brown-light">
          Create service packages to showcase your offerings to potential clients.
        </p>
      </div>
      
      <div className="space-y-5">
        {/* Existing packages */}
        {localFormData.servicePackages.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-wednest-brown">Your Service Packages</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localFormData.servicePackages.map((pkg) => (
                <Card key={pkg.id} className="border-wednest-beige">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-wednest-brown">{pkg.name}</CardTitle>
                        <CardDescription className="font-medium text-wednest-sage mt-1">
                          {pkg.priceRange}
                        </CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 -mt-1 -mr-2"
                        onClick={() => handleDeletePackage(pkg.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {pkg.description && <p className="text-wednest-brown-light mb-3">{pkg.description}</p>}
                    
                    {pkg.features.length > 0 && (
                      <ul className="space-y-1 list-disc list-inside text-sm">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="text-wednest-brown">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Add new package form */}
        <div className="border rounded-md p-4 bg-white">
          <h3 className="text-lg font-medium text-wednest-brown mb-4">Add New Package</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Package Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newPackage.name}
                  onChange={handlePackageChange}
                  placeholder="E.g. Basic Package"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceRange">
                  Price Range <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="priceRange"
                  name="priceRange"
                  value={newPackage.priceRange}
                  onChange={handlePackageChange}
                  placeholder="E.g. $1,000 - $1,500 or From $999"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newPackage.description}
                onChange={handlePackageChange}
                placeholder="Describe what this package includes..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="features">Package Features</Label>
              <div className="flex gap-2">
                <Input
                  id="features"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="E.g. 6 hours of coverage"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={handleAddFeature}
                >
                  Add
                </Button>
              </div>
              
              {newPackage.features.length > 0 && (
                <div className="mt-3">
                  <ul className="space-y-2">
                    {newPackage.features.map((feature, index) => (
                      <li 
                        key={index} 
                        className="flex items-center gap-2 text-sm bg-wednest-beige/20 p-2 rounded"
                      >
                        <span className="flex-1">{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(feature)}
                          className="text-wednest-brown-light hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <Button
              type="button"
              onClick={handleAddPackage}
              className="w-full flex items-center justify-center gap-1"
            >
              <Plus size={18} />
              Add This Package
            </Button>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="button" 
          onClick={handleSubmit}
          className="bg-wednest-sage hover:bg-wednest-sage-dark"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ServicePackagesStep;
