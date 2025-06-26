
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Truck, Scale, MapPin, Calendar, Save } from "lucide-react";

const WasteEntryForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    source: "",
    wasteType: "",
    weight: "",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    notes: "",
  });

  const wasteTypes = [
    "Mixed Household Waste",
    "Plastic Bottles",
    "Paper & Cardboard",
    "Metal Cans",
    "Glass Bottles",
    "Electronic Waste",
    "Organic Waste",
    "Construction Debris",
  ];

  const sources = [
    "Ward 1 - Residential",
    "Ward 2 - Residential", 
    "Ward 3 - Residential",
    "Commercial Area",
    "Market Complex",
    "School Campus",
    "Hospital",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate offline storage
    const entries = JSON.parse(localStorage.getItem('wasteEntries') || '[]');
    const newEntry = {
      ...formData,
      id: Date.now(),
      status: 'pending_sync',
      timestamp: new Date().toISOString(),
    };
    
    entries.push(newEntry);
    localStorage.setItem('wasteEntries', JSON.stringify(entries));
    
    toast({
      title: "Entry Recorded",
      description: "Waste entry saved successfully. Will sync when online.",
    });

    // Reset form
    setFormData({
      vehicleNumber: "",
      source: "",
      wasteType: "",
      weight: "",
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      notes: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-blue-600" />
            <span>New Waste Entry</span>
          </CardTitle>
          <CardDescription>
            Record incoming waste materials for processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle and Source Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleNumber" className="flex items-center space-x-1">
                  <Truck className="h-4 w-4" />
                  <span>Vehicle Number</span>
                </Label>
                <Input
                  id="vehicleNumber"
                  placeholder="e.g., UP 32 AB 1234"
                  value={formData.vehicleNumber}
                  onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source" className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>Source Location</span>
                </Label>
                <Select value={formData.source} onValueChange={(value) => handleInputChange('source', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Date</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Waste Type and Weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wasteType">Waste Type</Label>
                <Select value={formData.wasteType} onValueChange={(value) => handleInputChange('wasteType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    {wasteTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center space-x-1">
                  <Scale className="h-4 w-4" />
                  <span>Weight (kg)</span>
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional observations or remarks..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Entry
            </Button>
          </form>

          {/* Status Badge */}
          <div className="mt-4 flex justify-center">
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              Offline Mode - Data will sync when connected
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WasteEntryForm;
