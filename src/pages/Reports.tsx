
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Download, PieChart, BarChart4, LineChart, FileText, Calendar } from 'lucide-react';
import { bookings } from '@/data/bookings';
import { rooms } from '@/data/rooms';
import { formatCurrency } from '@/lib/formatters';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  LineChart as RechartsLine,
  Line
} from 'recharts';

const Reports = () => {
  const [reportType, setReportType] = useState('financial');
  const [timeRange, setTimeRange] = useState('month');
  const [date, setDate] = useState({
    from: new Date(new Date().setDate(1)),
    to: new Date()
  });
  
  // Calculate revenue and occupancy statistics
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const paidRevenue = bookings
    .filter(booking => booking.paymentStatus.toLowerCase() === 'paid')
    .reduce((sum, booking) => sum + booking.totalAmount, 0);
  
  const occupiedRooms = rooms.filter(room => room.status === 'Occupied').length;
  const occupancyRate = (occupiedRooms / rooms.length) * 100;
  
  // Monthly revenue data
  const monthlyRevenueData = [
    { name: 'Jan', revenue: 124500 },
    { name: 'Feb', revenue: 138000 },
    { name: 'Mar', revenue: 156700 },
    { name: 'Apr', revenue: 167300 },
    { name: 'May', revenue: 189500 },
    { name: 'Jun', revenue: 212000 },
    { name: 'Jul', revenue: 234600 },
    { name: 'Aug', revenue: 246800 },
    { name: 'Sep', revenue: 219400 },
    { name: 'Oct', revenue: 198700 },
    { name: 'Nov', revenue: 167900 },
    { name: 'Dec', revenue: 189300 },
  ];
  
  // Room type distribution
  const roomTypeData = [
    { name: 'Standard', value: rooms.filter(room => room.type === 'Standard').length },
    { name: 'Deluxe', value: rooms.filter(room => room.type === 'Deluxe').length },
    { name: 'Suite', value: rooms.filter(room => room.type === 'Suite').length },
    { name: 'Presidential', value: rooms.filter(room => room.type === 'Presidential').length },
  ];
  
  // Occupancy trend
  const occupancyTrendData = [
    { day: 'Mon', occupancy: 65 },
    { day: 'Tue', occupancy: 59 },
    { day: 'Wed', occupancy: 80 },
    { day: 'Thu', occupancy: 81 },
    { day: 'Fri', occupancy: 90 },
    { day: 'Sat', occupancy: 95 },
    { day: 'Sun', occupancy: 88 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Booking source distribution
  const bookingSourceData = [
    { name: 'Direct', value: 40 },
    { name: 'Website', value: 30 },
    { name: 'OTA', value: 20 },
    { name: 'Corporate', value: 10 },
  ];

  return (
    <PageContainer title="Reports & Analytics">
      <div className="space-y-6">
        {/* Report Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <Tabs defaultValue="financial" value={reportType} onValueChange={setReportType} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
              <TabsTrigger value="guest">Guest</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-wrap gap-3">
            <Select defaultValue="month" value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            {timeRange === 'custom' && (
              <DatePickerWithRange date={date} setDate={setDate} />
            )}
            
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Calendar className="h-4 w-4" />
            </Button>
            
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
        
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
              <p className="text-xs text-muted-foreground mt-1">+12.5% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Occupancy Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{occupancyRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground mt-1">+5.2% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Daily Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(6500)}</div>
              <p className="text-xs text-muted-foreground mt-1">+3.8% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">RevPAR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(5850)}</div>
              <p className="text-xs text-muted-foreground mt-1">+8.3% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyRevenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Room Type Distribution</CardTitle>
              <CardDescription>Distribution of room types in inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={roomTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {roomTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Trend</CardTitle>
              <CardDescription>Daily occupancy rate in percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLine
                    data={occupancyTrendData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Occupancy']} />
                    <Legend />
                    <Line type="monotone" dataKey="occupancy" stroke="#10B981" strokeWidth={2} />
                  </RechartsLine>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Report Export Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex items-center justify-center gap-2 h-auto py-6">
            <FileText className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Financial Report</div>
              <div className="text-xs text-muted-foreground">Download detailed financial report</div>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center justify-center gap-2 h-auto py-6">
            <BarChart4 className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Occupancy Report</div>
              <div className="text-xs text-muted-foreground">Download occupancy analytics</div>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center justify-center gap-2 h-auto py-6">
            <LineChart className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Revenue Forecast</div>
              <div className="text-xs text-muted-foreground">Download revenue forecasts</div>
            </div>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Reports;
