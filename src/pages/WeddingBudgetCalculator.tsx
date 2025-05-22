import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
const WeddingBudgetCalculator = () => {
  const [totalBudget, setTotalBudget] = useState<string>("30000");
  const [guestCount, setGuestCount] = useState<string>("100");
  const [activeTab, setActiveTab] = useState<'breakdown' | 'actual'>('breakdown');
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
      
      <div className="container mx-auto px-4 py-6 flex-grow max-w-5xl">
        <div className="mb-8">
          <Link to="/planning-tools" className="text-theme-brown inline-flex items-center text-sm mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tools
          </Link>
          <h1 className="font-serif font-medium text-2xl text-theme-text-primary mb-1">Wedding Budget Calculator</h1>
          <p className="text-theme-text-secondary">Plan, track, and manage your wedding expenses</p>
        </div>
        
        {/* Top Section with Overview and Summary side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Wedding Budget Overview */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4">
            <h2 className="font-medium text-theme-text-primary text-lg mb-3">Wedding Budget Overview</h2>
            <p className="text-theme-text-secondary text-sm mb-4">Set your total budget and track your spending</p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="totalBudget" className="block text-sm text-theme-text-secondary mb-1">Total Wedding Budget (AUD)</label>
                <Input id="totalBudget" value={totalBudget} onChange={e => setTotalBudget(e.target.value)} type="number" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="guestCount" className="block text-sm text-theme-text-secondary mb-1">Number of Guests</label>
                <Input id="guestCount" value={guestCount} onChange={e => setGuestCount(e.target.value)} type="number" className="w-full" />
              </div>
            </div>
          </div>
          
          {/* Budget Summary */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4">
            <h2 className="font-medium text-theme-text-primary text-lg mb-3">Budget Summary</h2>
            <p className="text-theme-text-secondary text-sm mb-4">Track your spending progress</p>
            
            <div className="py-3 px-4 bg-gray-100 rounded-md text-sm mb-3">
              <div className="flex justify-between">
                <span className="text-theme-text-secondary">Budget Used</span>
                <span className="text-theme-text-primary">${totalBudgeted} of ${totalBudget} ({percentUsed}%)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-green-200 p-3 rounded-md">
                <p className="text-xs text-green-700 mb-1">Remaining Budget</p>
                <p className="text-xl font-bold text-green-600 stats-number">${remainingBudget}</p>
              </div>
              <div className="bg-white border border-gray-200 p-3 rounded-md">
                <p className="text-xs text-theme-text-secondary mb-1">Cost Per Guest</p>
                <p className="text-xl font-bold text-theme-text-primary stats-number">${costPerGuest}</p>
              </div>
            </div>
            
            <Button className="w-full bg-theme-brown text-white hover:bg-theme-brown-dark flex items-center justify-center gap-2 font-semibold">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Export Budget
            </Button>
          </div>
        </div>
        
        {/* Tab Buttons */}
        <div className="flex border-b border-gray-300 mb-6">
          <button onClick={() => setActiveTab('breakdown')} className={`py-2 px-4 font-medium text-sm ${activeTab === 'breakdown' ? 'border-b-2 border-theme-brown text-theme-text-primary' : 'text-theme-text-secondary'}`}>
            Budget Breakdown
          </button>
          <button onClick={() => setActiveTab('actual')} className={`py-2 px-4 font-medium text-sm ${activeTab === 'actual' ? 'border-b-2 border-theme-brown text-theme-text-primary' : 'text-theme-text-secondary'}`}>
            Estimated vs. Actual
          </button>
        </div>
            
        {/* Budget Breakdown */}
        <div className="space-y-6">
          {categories.map((category, categoryIndex) => <div key={category.name} className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-medium text-theme-text-primary">{category.name}</h3>
              </div>
              <table className="w-full">
                <tbody>
                  {category.items.map((item, itemIndex) => <tr key={item.id} className="border-t border-gray-100">
                      <td className="p-4 text-theme-text-primary">{item.name}</td>
                      <td className="p-4 text-right">
                        {item.budget}
                      </td>
                      <td className="p-4 text-center">
                        Actual
                      </td>
                      <td className="p-4 w-10 text-center">
                        <button className="text-gray-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>)}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="p-4 border-t">
                      <button onClick={() => handleAddItem(categoryIndex)} className="text-theme-text-primary hover:text-gray-900 text-sm flex items-center">
                        <Plus className="h-4 w-4 mr-1" /> Add Item
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>)}
        </div>
          
        {/* Wedding Budget Tips */}
        <div className="mt-12 mb-8 border border-gray-200 rounded-md p-6 bg-[theme-gray-dark] bg-theme-beige">
          <h2 className="font-medium text-theme-text-primary text-lg mb-4">Wedding Budget Tips</h2>
          <ul className="space-y-2 text-sm text-theme-text-secondary">
            <li className="flex items-start">
              <span className="text-theme-text-primary mr-2">•</span>
              <span>Allocate about 50% of your budget to venue, food, and drinks</span>
            </li>
            <li className="flex items-start">
              <span className="text-theme-text-primary mr-2">•</span>
              <span>Set aside 10-15% for unexpected expenses</span>
            </li>
            <li className="flex items-start">
              <span className="text-theme-text-primary mr-2">•</span>
              <span>Consider off-peak seasons or weekdays for better venue rates</span>
            </li>
            <li className="flex items-start">
              <span className="text-theme-text-primary mr-2">•</span>
              <span>Prioritize what matters most to you and allocate more budget there</span>
            </li>
            <li className="flex items-start">
              <span className="text-theme-text-primary mr-2">•</span>
              <span>Get multiple quotes from vendors to compare prices</span>
            </li>
          </ul>
        </div>
        
        {/* CTA */}
        <div className="text-center bg-[#f8f7f3] border border-gray-300 rounded-md p-6 mb-8">
          <p className="text-theme-text-secondary mb-3">Need help finding vendors that fit your budget? Create a free account to get personalized recommendations.</p>
          <Button className="bg-theme-brown text-white hover:bg-theme-brown-dark font-semibold">
            Create Free Account
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default WeddingBudgetCalculator;