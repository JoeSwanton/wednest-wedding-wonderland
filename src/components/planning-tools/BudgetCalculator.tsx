
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Calculator, Download, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ToolShareCta from "./ToolShareCta";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const BudgetCalculator = () => {
  const { toast } = useToast();
  const [totalBudget, setTotalBudget] = useState<number>(30000);
  const [categories, setCategories] = useState([
    { name: "Venue & Catering", percentage: 40, amount: 12000, editable: true },
    { name: "Photography & Videography", percentage: 12, amount: 3600, editable: true },
    { name: "Attire & Beauty", percentage: 10, amount: 3000, editable: true },
    { name: "Flowers & Decor", percentage: 10, amount: 3000, editable: true },
    { name: "Entertainment", percentage: 8, amount: 2400, editable: true },
    { name: "Stationery", percentage: 3, amount: 900, editable: true },
    { name: "Rings", percentage: 4, amount: 1200, editable: true },
    { name: "Transportation", percentage: 3, amount: 900, editable: true },
    { name: "Gifts & Favors", percentage: 3, amount: 900, editable: true },
    { name: "Miscellaneous", percentage: 7, amount: 2100, editable: true },
  ]);

  // Create a form instance to provide context
  const methods = useForm();

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBudget = parseInt(e.target.value) || 0;
    setTotalBudget(newBudget);
    
    // Recalculate amounts based on percentages
    const updatedCategories = categories.map(category => ({
      ...category,
      amount: Math.round((category.percentage / 100) * newBudget)
    }));
    setCategories(updatedCategories);
  };

  const handleAmountChange = (index: number, newAmount: number) => {
    const updatedCategories = [...categories];
    updatedCategories[index].amount = newAmount;
    
    // Recalculate percentage
    const newPercentage = (newAmount / totalBudget) * 100;
    updatedCategories[index].percentage = parseFloat(newPercentage.toFixed(1));
    
    setCategories(updatedCategories);
  };

  const handlePercentageChange = (index: number, newPercentage: number) => {
    const updatedCategories = [...categories];
    updatedCategories[index].percentage = newPercentage;
    
    // Recalculate amount
    const newAmount = Math.round((newPercentage / 100) * totalBudget);
    updatedCategories[index].amount = newAmount;
    
    setCategories(updatedCategories);
  };

  const totalAllocated = categories.reduce((sum, category) => sum + category.amount, 0);
  const totalPercentage = categories.reduce((sum, category) => sum + category.percentage, 0);
  const remainingBudget = totalBudget - totalAllocated;

  const downloadBudget = () => {
    // Create CSV content
    let csvContent = "Category,Percentage,Amount\n";
    categories.forEach(category => {
      csvContent += `"${category.name}",${category.percentage}%,$${category.amount}\n`;
    });
    csvContent += `\nTotal Budget,${totalPercentage.toFixed(1)}%,$${totalBudget}\n`;
    csvContent += `Allocated,${totalPercentage.toFixed(1)}%,$${totalAllocated}\n`;
    csvContent += `Remaining,${(100 - totalPercentage).toFixed(1)}%,$${remainingBudget}\n`;
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "wedding_budget.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Budget Downloaded",
      description: "Your wedding budget has been downloaded as a CSV file."
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        <Card className="border-theme-beige shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-theme-sage/10 p-3 rounded-full">
                <Calculator className="h-6 w-6 text-theme-sage" />
              </div>
              <div>
                <CardTitle className="text-2xl font-serif text-theme-brown">Wedding Budget Calculator</CardTitle>
                <CardDescription>Plan and allocate your wedding expenses with our free calculator</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center mb-4">
              <Link to="/planning-tools/budget-calculator" className="text-theme-brown hover:text-theme-brown-dark underline text-sm">
                Go to our more detailed budget calculator
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-2">
                  <label className="text-theme-brown font-medium">Total Wedding Budget</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-brown-light">$</span>
                    <Input 
                      type="number" 
                      className="pl-7" 
                      value={totalBudget} 
                      onChange={handleBudgetChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Enter your total budget to get started</p>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="text-center p-4 rounded-md bg-theme-cream/30 flex-1">
                  <p className="text-sm text-theme-brown-light mb-1">Allocated</p>
                  <p className="text-2xl font-medium text-theme-brown">
                    ${totalAllocated}
                  </p>
                  <p className="text-xs text-theme-brown-light mt-1">
                    {totalPercentage.toFixed(1)}% of budget
                  </p>
                </div>
                <div className="text-center p-4 rounded-md bg-theme-cream/30 flex-1">
                  <p className="text-sm text-theme-brown-light mb-1">Remaining</p>
                  <p className={`text-2xl font-medium ${remainingBudget < 0 ? 'text-red-500' : 'text-theme-brown'}`}>
                    ${remainingBudget}
                  </p>
                  <p className="text-xs text-theme-brown-light mt-1">
                    {(100 - totalPercentage).toFixed(1)}% of budget
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-theme-beige overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Category</TableHead>
                    <TableHead className="w-[25%]">Percentage</TableHead>
                    <TableHead className="w-[35%]">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[category.percentage]}
                            min={0}
                            max={50}
                            step={0.5}
                            onValueChange={(values) => handlePercentageChange(index, values[0])}
                            className="w-full max-w-[120px]"
                          />
                          <span className="text-sm text-theme-brown-light">{category.percentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-brown-light text-sm">$</span>
                          <Input 
                            type="number" 
                            className="pl-7 h-8 text-sm" 
                            value={category.amount}
                            onChange={(e) => handleAmountChange(index, parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between pt-4">
              <Button 
                variant="outline" 
                className="border-theme-sage text-theme-sage hover:bg-theme-sage hover:text-white flex items-center gap-2"
                onClick={downloadBudget}
              >
                <Download className="h-4 w-4" />
                Download Budget CSV
              </Button>
              
              <Button 
                variant="outline" 
                className="border-theme-brown text-theme-brown hover:bg-theme-brown hover:text-white flex items-center gap-2"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Wedding Budget Calculator',
                      text: 'Check out this free wedding budget calculator!',
                      url: window.location.href
                    });
                  } else {
                    // Fallback - copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: "Link Copied",
                      description: "Budget calculator link copied to clipboard."
                    });
                  }
                }}
              >
                <Share className="h-4 w-4" />
                Share Calculator
              </Button>
            </div>
          </CardContent>
        </Card>

        <ToolShareCta 
          title="Wedding Budget Calculator" 
          description="This free calculator helps couples plan and allocate their wedding budget across different categories." 
        />
      </div>
    </FormProvider>
  );
};
