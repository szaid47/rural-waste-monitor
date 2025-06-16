
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recycle, TrendingUp, Users, FileText, Wifi, WifiOff, Plus } from "lucide-react";
import WasteEntryForm from "@/components/WasteEntryForm";
import WasteClassification from "@/components/WasteClassification";
import ReportsSection from "@/components/ReportsSection";
import DashboardStats from "@/components/DashboardStats";

const Index = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Recycle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Digital MRF</h1>
                <p className="text-sm text-gray-600">Smart Waste Tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center space-x-1">
                {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                <span>{isOnline ? "Online" : "Offline"}</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="entry" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Entry</span>
            </TabsTrigger>
            <TabsTrigger value="classify" className="flex items-center space-x-2">
              <Recycle className="h-4 w-4" />
              <span className="hidden sm:inline">Classify</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">MRF Dashboard</h2>
              <p className="text-gray-600 mt-2">Track waste processing in real-time</p>
            </div>
            <DashboardStats />
          </TabsContent>

          {/* Waste Entry Tab */}
          <TabsContent value="entry" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Waste Entry</h2>
              <p className="text-gray-600 mt-2">Record incoming waste materials</p>
            </div>
            <WasteEntryForm />
          </TabsContent>

          {/* Classification Tab */}
          <TabsContent value="classify" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Waste Classification</h2>
              <p className="text-gray-600 mt-2">Sort and categorize processed materials</p>
            </div>
            <WasteClassification />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
              <p className="text-gray-600 mt-2">Generate reports for stakeholders</p>
            </div>
            <ReportsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
