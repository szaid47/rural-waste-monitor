
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Clock, AlertCircle, Package, Recycle } from "lucide-react";

const WasteClassification = () => {
  const { toast } = useToast();
  const [processingBatches, setProcessingBatches] = useState([
    {
      id: 1,
      batchNumber: "BATCH-001",
      source: "Ward 1 - Residential",
      totalWeight: 450,
      status: "sorting",
      progress: 65,
      classifications: {
        plastic: 140,
        paper: 120,
        metal: 45,
        glass: 35,
        organic: 85,
        residue: 25,
      },
      timestamp: "2024-01-15T09:30:00",
    },
    {
      id: 2,
      batchNumber: "BATCH-002", 
      source: "Market Complex",
      totalWeight: 680,
      status: "pending",
      progress: 0,
      classifications: {},
      timestamp: "2024-01-15T11:45:00",
    },
    {
      id: 3,
      batchNumber: "BATCH-003",
      source: "Ward 2 - Residential",
      totalWeight: 320,
      status: "completed",
      progress: 100,
      classifications: {
        plastic: 95,
        paper: 85,
        metal: 30,
        glass: 25,
        organic: 70,
        residue: 15,
      },
      timestamp: "2024-01-15T08:15:00",
    },
  ]);

  const wasteCategories = [
    { key: "plastic", name: "Plastic", color: "bg-red-100 text-red-800", icon: "🔴" },
    { key: "paper", name: "Paper", color: "bg-green-100 text-green-800", icon: "📄" },
    { key: "metal", name: "Metal", color: "bg-blue-100 text-blue-800", icon: "🔩" },
    { key: "glass", name: "Glass", color: "bg-yellow-100 text-yellow-800", icon: "🍃" },
    { key: "organic", name: "Organic", color: "bg-emerald-100 text-emerald-800", icon: "🌱" },
    { key: "residue", name: "Residue", color: "bg-gray-100 text-gray-800", icon: "♻️" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "sorting": return <Package className="h-4 w-4 text-blue-600" />;
      case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "sorting": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleStartSorting = (batchId: number) => {
    setProcessingBatches(prev => 
      prev.map(batch => 
        batch.id === batchId 
          ? { ...batch, status: "sorting", progress: 15 }
          : batch
      )
    );
    
    toast({
      title: "Sorting Started",
      description: "Batch processing has begun.",
    });
  };

  const handleCompleteBatch = (batchId: number) => {
    setProcessingBatches(prev => 
      prev.map(batch => 
        batch.id === batchId 
          ? { ...batch, status: "completed", progress: 100 }
          : batch
      )
    );
    
    toast({
      title: "Batch Completed",
      description: "Classification completed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Processing Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Recycle className="h-5 w-5 text-green-600" />
            <span>Processing Overview</span>
          </CardTitle>
          <CardDescription>Current waste sorting and classification status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {processingBatches.filter(b => b.status === "pending").length}
              </div>
              <div className="text-sm text-yellow-700">Pending</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {processingBatches.filter(b => b.status === "sorting").length}
              </div>
              <div className="text-sm text-blue-700">In Progress</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {processingBatches.filter(b => b.status === "completed").length}
              </div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batch Processing Cards */}
      <div className="space-y-4">
        {processingBatches.map((batch) => (
          <Card key={batch.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{batch.batchNumber}</CardTitle>
                  <CardDescription className="flex items-center space-x-2 mt-1">
                    <span>{batch.source}</span>
                    <Badge variant="outline">{batch.totalWeight} kg</Badge>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(batch.status)}
                  <Badge className={getStatusColor(batch.status)}>
                    {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing Progress</span>
                  <span>{batch.progress}%</span>
                </div>
                <Progress value={batch.progress} className="h-2" />
              </div>

              {/* Classification Breakdown */}
              {Object.keys(batch.classifications).length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Classification Breakdown</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {wasteCategories.map((category) => {
                      const weight = batch.classifications[category.key] || 0;
                      return (
                        <div key={category.key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <span>{category.icon}</span>
                            <span className="text-sm">{category.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {weight} kg
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                {batch.status === "pending" && (
                  <Button 
                    onClick={() => handleStartSorting(batch.id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Start Sorting
                  </Button>
                )}
                {batch.status === "sorting" && (
                  <Button 
                    onClick={() => handleCompleteBatch(batch.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Complete Batch
                  </Button>
                )}
                {batch.status === "completed" && (
                  <Button variant="outline" disabled>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WasteClassification;
