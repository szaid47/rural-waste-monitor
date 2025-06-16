
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Recycle, Truck, Target } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    { title: "Today's Intake", value: "2.4 tons", change: "+12%", icon: Truck, color: "text-blue-600" },
    { title: "Processing Rate", value: "89%", change: "+5%", icon: Target, color: "text-green-600" },
    { title: "Recovery Rate", value: "76%", change: "+8%", icon: Recycle, color: "text-emerald-600" },
    { title: "Weekly Total", value: "16.8 tons", change: "+15%", icon: TrendingUp, color: "text-purple-600" },
  ];

  const weeklyData = [
    { day: "Mon", intake: 2.1, processed: 1.9 },
    { day: "Tue", intake: 2.4, processed: 2.1 },
    { day: "Wed", intake: 1.8, processed: 1.6 },
    { day: "Thu", intake: 2.7, processed: 2.4 },
    { day: "Fri", intake: 2.2, processed: 2.0 },
    { day: "Sat", intake: 3.1, processed: 2.8 },
    { day: "Sun", intake: 2.5, processed: 2.3 },
  ];

  const wasteComposition = [
    { name: "Plastic", value: 35, color: "#ef4444" },
    { name: "Paper", value: 28, color: "#22c55e" },
    { name: "Metal", value: 15, color: "#3b82f6" },
    { name: "Glass", value: 12, color: "#f59e0b" },
    { name: "Organic", value: 10, color: "#84cc16" },
  ];

  return (
    <div className="space-y-6">
      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 font-medium">{stat.change} from yesterday</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Processing Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Processing Overview</CardTitle>
            <CardDescription>Waste intake vs processing (tons)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="intake" fill="#3b82f6" name="Intake" />
                <Bar dataKey="processed" fill="#22c55e" name="Processed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Waste Composition Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Waste Composition</CardTitle>
            <CardDescription>Current week breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteComposition}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wasteComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {wasteComposition.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Processing Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Processing Status</CardTitle>
          <CardDescription>Real-time facility operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sorting Progress</span>
              <span>78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Quality Control</span>
              <span>92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Packaging & Dispatch</span>
              <span>65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
