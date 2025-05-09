
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-serif text-wednest-brown">Your Wedding Dashboard</h1>
          <Button variant="outline" onClick={signOut}>Sign Out</Button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-wednest-brown">Welcome to your personalized dashboard!</h2>
            <p className="mt-1 text-sm text-wednest-brown-light">
              This is where you'll manage all your wedding planning tasks.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <p className="text-wednest-brown">
              Your dashboard has been customized based on your questionnaire responses. Start exploring the features below!
            </p>
            
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Dashboard cards would go here */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-medium text-wednest-brown">Wedding Timeline</h3>
                <p className="text-sm text-wednest-brown-light mt-2">Track your planning progress and upcoming tasks</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-medium text-wednest-brown">Budget Tracker</h3>
                <p className="text-sm text-wednest-brown-light mt-2">Manage your wedding expenses and stay on budget</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-medium text-wednest-brown">Guest List</h3>
                <p className="text-sm text-wednest-brown-light mt-2">Organize your guest list and track RSVPs</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
