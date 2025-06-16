
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Download, FileText, Send, Calendar, Users, Building } from "lucide-react";

const ReportsSection = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [selectedStakeholder, setSelectedStakeholder] = useState("");

  const weeklyTrends = [
    { period: "Week 1", intake: 18.5, processed: 16.2, recovery: 14.8 },
    { period: "Week 2", intake: 22.1, processed: 19.8, recovery: 17.9 },
    { period: "Week 3", intake: 19.7, processed: 17.5, recovery: 15.2 },
    { period: "Week 4", intake: 24.3, processed: 21.8, recovery: 19.6 },
  ];

  const monthlyBreakdown = [
    { category: "Plastic", weight: 450, percentage: 32 },
    { category: "Paper", weight: 380, percentage: 27 },
    { category: "Metal", weight: 180, percentage: 13 },
    { category: "Glass", weight: 150, percentage: 11 },
    { category: "Organic", weight: 240, percentage: 17 },
  ];

  const stakeholders = [
    { id: "shg", name: "Self Help Groups (SHGs)", icon: Users },
    { id: "pdo", name: "Panchayat Development Officer", icon: Building },
    { id: "gp", name: "Gram Panchayat", icon: Building },
  ];

  const reports = [
    {
      id: 1,
      title: "Weekly Processing Report",
      description: "Comprehensive overview of waste processing activities",
      period: "Week of Jan 8-14, 2024",
      stakeholder: "All Stakeholders",
      status: "Ready",
      size: "2.4 MB",
    },
    {
      id: 2,
      title: "Monthly Recovery Analysis",
      description: "Material recovery rates and efficiency metrics",
      period: "December 2023",
      stakeholder: "PDO Report",
      status: "Generated",
      size: "1.8 MB",
    },
    {
      id: 3,
      title: "SHG Performance Summary",
      description: "Community participation and impact assessment",
      period: "Q4 2023",
      stakeholder: "SHG Coordinators",
      status: "Scheduled",
      size: "3.1 MB",
    },
  ];

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Report has been prepared for download and distribution.",
    });
  };

  const handleShareReport = (reportId: number) => {
    toast({
      title: "Report Shared",
      description: "Report has been sent to selected stakeholders.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Report Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Generate New Report</span>
          </CardTitle>
          <CardDescription>Create customized reports for different stakeholders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Stakeholder</label>
              <Select value={selectedStakeholder} onValueChange={setSelectedStakeholder}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stakeholder" />
                </SelectTrigger>
                <SelectContent>
                  {stakeholders.map((stakeholder) => (
                    <SelectItem key={stakeholder.id} value={stakeholder.id}>
                      {stakeholder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleGenerateReport} className="w-full bg-blue-600 hover:bg-blue-700">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </CardContent>
      </Card>

      {/* Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Processing Trends</CardTitle>
            <CardDescription>Weekly intake, processing, and recovery (tons)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="intake" stroke="#3b82f6" strokeWidth={2} name="Intake" />
                <Line type="monotone" dataKey="processed" stroke="#22c55e" strokeWidth={2} name="Processed" />
                <Line type="monotone" dataKey="recovery" stroke="#f59e0b" strokeWidth={2} name="Recovery" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Material Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Material Recovery Breakdown</CardTitle>
            <CardDescription>Monthly recovery by material type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="weight" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Generated and scheduled reports for stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h4 className="font-medium">{report.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {report.period}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {report.stakeholder}
                    </Badge>
                    <Badge 
                      variant={report.status === "Ready" ? "default" : report.status === "Generated" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {report.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShareReport(report.id)}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key indicators for the current period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">24.3 tons</div>
              <div className="text-xs text-blue-700">Weekly Intake</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">89%</div>
              <div className="text-xs text-green-700">Processing Rate</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-lg font-bold text-yellow-600">76%</div>
              <div className="text-xs text-yellow-700">Recovery Rate</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">12</div>
              <div className="text-xs text-purple-700">Active SHGs</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
