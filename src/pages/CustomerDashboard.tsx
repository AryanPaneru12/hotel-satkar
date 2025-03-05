
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Landmark, QrCode, StripeIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePayment = () => {
    toast({
      title: "Redirecting to Stripe",
      description: "You will be redirected to Stripe payment gateway in a moment.",
    });
    
    // Simulate redirect delay
    setTimeout(() => {
      toast({
        title: "Database Connection Error",
        description: "Cannot connect to payment gateway. Please try again later.",
        variant: "destructive",
      });
    }, 2000);
  };

  return (
    <PageContainer title="Customer Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="My Bookings" delay={100}>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">You have 2 upcoming bookings</p>
            <div className="space-y-2">
              <div className="p-3 border rounded-md">
                <p className="font-medium">Deluxe Room</p>
                <p className="text-sm text-muted-foreground">Check-in: Aug 15, 2024</p>
                <p className="text-sm text-muted-foreground">Check-out: Aug 18, 2024</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="font-medium">Executive Suite</p>
                <p className="text-sm text-muted-foreground">Check-in: Oct 5, 2024</p>
                <p className="text-sm text-muted-foreground">Check-out: Oct 8, 2024</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/bookings')}
            >
              View All Bookings
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard title="Quick Book" delay={200}>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Room Type</label>
                <Select defaultValue="deluxe">
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Room</SelectItem>
                    <SelectItem value="deluxe">Deluxe Room</SelectItem>
                    <SelectItem value="executive">Executive Suite</SelectItem>
                    <SelectItem value="presidential">Presidential Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check-in</label>
                  <input type="date" className="w-full rounded-md border p-2 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check-out</label>
                  <input type="date" className="w-full rounded-md border p-2 text-sm" />
                </div>
              </div>
            </div>
            
            <Button className="w-full" onClick={handlePayment}>
              Book and Pay Now
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard title="Payment Options" delay={300}>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">All payments are processed securely via Stripe</p>
            
            <div className="p-3 border rounded-md flex items-center">
              <StripeIcon className="h-7 w-7 mr-3 text-blue-600" />
              <div>
                <p className="font-medium">Stripe Payment</p>
                <p className="text-xs text-muted-foreground">Fast, secure online payment</p>
              </div>
            </div>
            
            <Button className="w-full" onClick={handlePayment}>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay Now
            </Button>
          </div>
        </DashboardCard>
      </div>
    </PageContainer>
  );
};

export default CustomerDashboard;
