import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
const WeddingBudgetCalculator = () => {
  const [totalBudget, setTotalBudget] = useState<string>("30000");
  const [guestCount, setGuestCount] = useState<string>("100");
  const [categories, setCategories] = useState([{
    name: "Venue & Catering",
    items: [{
      name: "Ceremony Venue",
      budget: 3000,
      actual: "",
      id: "cv-1"
    }, {
      name: "Reception Venue",
      budget: 8000,
      actual: "",
      id: "rv-1"
    }, {
      name: "Catering (per person)",
      budget: 12000,
      actual: "",
      id: "ca-1"
    }, {
      name: "Drinks & Alcohol",
      budget: 2400,
      actual: "",
      id: "da-1"
    }, {
      name: "Wedding Cake",
      budget: 800,
      actual: "",
      id: "wc-1"
    }]
  }, {
    name: "Attire & Beauty",
    items: [{
      name: "Wedding Dress",
      budget: 2400,
      actual: "",
      id: "wd-1"
    }, {
      name: "Suit/Tuxedo",
      budget: 1200,
      actual: "",
      id: "st-1"
    }, {
      name: "Accessories",
      budget: 500,
      actual: "",
      id: "ac-1"
    }, {
      name: "Hair & Makeup",
      budget: 600,
      actual: "",
      id: "hm-1"
    }]
  }, {
    name: "Vendors & Services",
    items: [{
      name: "Photography",
      budget: 3000,
      actual: "",
      id: "ph-1"
    }, {
      name: "Videography",
      budget: 2400,
      actual: "",
      id: "vi-1"
    }, {
      name: "Flowers & Decor",
      budget: 2000,
      actual: "",
      id: "fd-1"
    }, {
      name: "Music/DJ",
      budget: 1500,
      actual: "",
      id: "md-1"
    }, {
      name: "Celebrant/Officiant",
      budget: 800,
      actual: "",
      id: "co-1"
    }]
  }, {
    name: "Other Expenses",
    items: [{
      name: "Invitations & Stationery",
      budget: 500,
      actual: "",
      id: "is-1"
    }, {
      name: "Wedding Favors",
      budget: 400,
      actual: "",
      id: "wf-1"
    }, {
      name: "Transportation",
      budget: 800,
      actual: "",
      id: "tr-1"
    }, {
      name: "Wedding Rings",
      budget: 2000,
      actual: "",
      id: "wr-1"
    }, {
      name: "Miscellaneous",
      budget: 1500,
      actual: "",
      id: "mi-1"
    }]
  }]);
  const getTotalBudgeted = () => {
    return categories.reduce((total, category) => {
      return total + category.items.reduce((catTotal, item) => catTotal + item.budget, 0);
    }, 0);
  };
  const totalBudgeted = getTotalBudgeted();
  const remainingBudget = Number(totalBudget) - totalBudgeted;
  const costPerGuest = Number(guestCount) > 0 ? Math.round(Number(totalBudget) / Number(guestCount)) : 0;
  const percentUsed = Math.round(totalBudgeted / Number(totalBudget) * 100);
  const handleAddItem = (categoryIndex: number) => {
    const newCategories = [...categories];
    const newItem = {
      name: "New Item",
      budget: 0,
      actual: "",
      id: `new-${Date.now()}`
    };
    newCategories[categoryIndex].items.push(newItem);
    setCategories(newCategories);
  };
  const handleDeleteItem = (categoryIndex: number, itemIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items.splice(itemIndex, 1);
    setCategories(newCategories);
  };
  const handleItemBudgetChange = (categoryIndex: number, itemIndex: number, value: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items[itemIndex].budget = value;
    setCategories(newCategories);
  };
  const handleItemActualChange = (categoryIndex: number, itemIndex: number, value: string) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items[itemIndex].actual = value;
    setCategories(newCategories);
  };
  const handleItemNameChange = (categoryIndex: number, itemIndex: number, value: string) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items[itemIndex].name = value;
    setCategories(newCategories);
  };
  return <div className="min-h-screen flex flex-col bg-[#f8f7f3]">
      <Navbar />
      <Separator className="bg-theme-brown h-[1px] w-full" />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="mb-8">
          <Link to="/planning-tools" className="text-theme-brown inline-flex items-center text-sm mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tools
          </Link>
          <h1 className="font-serif text-2xl text-theme-brown mb-1">Wedding Budget Calculator</h1>
          <p className="text-theme-brown-light">Plan, track, and manage your wedding expenses</p>
        </div>
        
        {/* CTA Card */}
        <div className="bg-[#f8f7f3] border border-gray-300 p-5 mb-8 rounded-sm">
          <div className="flex flex-col">
            <h3 className="font-medium text-base mb-1">Want to save your budget?</h3>
            <p className="text-sm text-gray-600 mb-3">Create a free account to save your budget, access it from any device, and get personalized vendor recommendations based on your budget.</p>
            <div>
              <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark text-xs px-4 py-2 h-auto">
                Create Free Account
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4">
              <h2 className="font-medium text-gray-800 text-lg mb-3">Wedding Budget Overview</h2>
              <p className="text-gray-600 text-sm mb-4">Set your total budget and track your spending</p>
              
              <div className="space-y-4 mb-4">
                <div>
                  <label htmlFor="totalBudget" className="block text-sm text-gray-600 mb-1">Total Wedding Budget (AUD)</label>
                  <Input id="totalBudget" value={totalBudget} onChange={e => setTotalBudget(e.target.value)} type="number" className="max-w-[200px]" />
                </div>
                
                <div>
                  <label htmlFor="guestCount" className="block text-sm text-gray-600 mb-1">Number of Guests</label>
                  <Input id="guestCount" value={guestCount} onChange={e => setGuestCount(e.target.value)} type="number" className="max-w-[200px]" />
                </div>
              </div>
            </div>
            
            {/* Budget Breakdown */}
            <div className="space-y-6">
              <h2 className="font-medium text-center text-gray-800 text-lg">Budget Breakdown</h2>
              
              <div className="grid grid-cols-2 text-sm text-center mb-0 bg-[#f5efe6] rounded-md p-2">
                <div>Estimated</div>
                <div>vs Actual</div>
              </div>

              {categories.map((category, categoryIndex) => <Card key={category.name} className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 border-b bg-gray-50">
                      <h3 className="font-medium text-gray-800">{category.name}</h3>
                    </div>
                    <table className="w-full">
                      <tbody>
                        {category.items.map((item, itemIndex) => <tr key={item.id} className="border-t border-gray-100">
                            <td className="p-4 text-gray-800">{item.name}</td>
                            <td className="p-4">
                              <Input type="number" value={item.budget} onChange={e => handleItemBudgetChange(categoryIndex, itemIndex, Number(e.target.value))} className="w-full text-right" />
                            </td>
                            <td className="p-4">
                              <Input type="text" value={item.actual} onChange={e => handleItemActualChange(categoryIndex, itemIndex, e.target.value)} className="w-full text-right" placeholder="Actual" />
                            </td>
                            <td className="p-4 text-center">
                              <button onClick={() => handleDeleteItem(categoryIndex, itemIndex)} className="text-gray-400 hover:text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>)}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={4} className="p-4 border-t">
                            <button onClick={() => handleAddItem(categoryIndex)} className="text-gray-800 hover:text-gray-900 text-sm flex items-center">
                              <Plus className="h-4 w-4 mr-1" /> Add Item
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </CardContent>
                </Card>)}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4">
              <h2 className="font-medium text-gray-800 text-lg mb-3">Budget Summary</h2>
              <p className="text-gray-600 text-sm mb-4">Track your spending progress</p>
              
              <div className="py-3 px-4 bg-gray-100 rounded-md text-sm mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget Used</span>
                  <span className="text-gray-800">${totalBudgeted} of ${totalBudget} ({percentUsed}%)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white border border-green-200 p-3 rounded-md">
                  <p className="text-xs text-green-700 mb-1">Remaining Budget</p>
                  <p className="text-xl font-semibold text-green-600">${remainingBudget}</p>
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-md">
                  <p className="text-xs text-gray-600 mb-1">Cost Per Guest</p>
                  <p className="text-xl font-semibold text-gray-800">${costPerGuest}</p>
                </div>
              </div>
              
              <Button className="w-full bg-theme-brown text-white hover:bg-theme-brown-dark flex items-center justify-center gap-2">
                Export Budget
              </Button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-md p-4">
              <h2 className="font-medium text-gray-800 text-lg mb-3">Wedding Budget Tips</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-gray-800 mr-2">•</span>
                  <span>Allocate about 50% of your budget to venue, food, and drinks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-800 mr-2">•</span>
                  <span>Set aside 10-15% for unexpected expenses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-800 mr-2">•</span>
                  <span>Consider off-peak seasons or weekdays for better venue rates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-800 mr-2">•</span>
                  <span>Prioritize what matters most to you and allocate more budget there</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-800 mr-2">•</span>
                  <span>Get multiple quotes from vendors to compare prices</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center bg-[#f8f7f3] border border-gray-300 rounded-md p-4">
              <p className="text-gray-600 text-sm mb-3">Need help finding vendors that fit your budget? Create a free account to get personalized recommendations.</p>
              <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark">
                Create Free Account
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default WeddingBudgetCalculator;