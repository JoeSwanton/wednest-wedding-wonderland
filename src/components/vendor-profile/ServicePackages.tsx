
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

const ServicePackages = () => {
  const servicePackages = [
    {
      name: "Essential Package",
      price: "$1,200",
      duration: "5 hours",
      description: "Perfect for intimate celebrations",
      features: [
        "Professional DJ for 5 hours",
        "Basic sound system",
        "Microphone for speeches",
        "Music consultation",
        "Basic lighting"
      ],
      popular: false
    },
    {
      name: "Premium Package",
      price: "$2,200",
      duration: "7 hours",
      description: "Our most popular package",
      features: [
        "Professional DJ for 7 hours",
        "Premium sound system",
        "Wireless microphones",
        "MC services",
        "Enhanced lighting package",
        "Music consultation & playlist",
        "First dance coordination"
      ],
      popular: true
    },
    {
      name: "Luxury Experience",
      price: "$3,500",
      duration: "8 hours",
      description: "The ultimate entertainment experience",
      features: [
        "Professional DJ for 8 hours",
        "Premium sound & lighting",
        "Multiple wireless microphones",
        "Professional MC services",
        "Dance floor lighting",
        "Photo booth setup",
        "Custom playlist creation",
        "Ceremony sound setup"
      ],
      popular: false
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif text-theme-text-primary">Service packages</h2>
      <div className="grid grid-cols-1 gap-6">
        {servicePackages.map((pkg, index) => (
          <Card key={index} className={`border-2 transition-all hover:shadow-lg ${pkg.popular ? 'border-theme-brown' : 'border-gray-200'}`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-serif font-medium text-theme-text-primary">{pkg.name}</h3>
                    {pkg.popular && (
                      <Badge className="bg-theme-brown text-white">Most Popular</Badge>
                    )}
                  </div>
                  <p className="text-theme-text-secondary mb-4">{pkg.description}</p>
                  <div className="space-y-2">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-theme-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-right ml-8">
                  <div className="text-2xl font-semibold text-theme-text-primary">{pkg.price}</div>
                  <div className="text-sm text-theme-text-secondary">{pkg.duration}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicePackages;
