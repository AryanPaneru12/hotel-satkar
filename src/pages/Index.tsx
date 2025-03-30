
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import StatsCard from '@/components/dashboard/StatsCard';
import DashboardCard from '@/components/dashboard/DashboardCard';
import RecentBookings from '@/components/dashboard/RecentBookings';
import PaymentMethodsCard from '@/components/admin/PaymentMethodsCard';
import { UserRound, Hotel, CalendarDays, IndianRupee } from 'lucide-react';
import { bookings } from '@/data/bookings';

const Index = () => {
  return (
    <PageContainer title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatsCard 
          title="Total Guests"
          value="284"
          trend="up"
          percentage="12"
          description="vs. last month"
          icon={UserRound}
          delay={100}
        />
        <StatsCard 
          title="Available Rooms"
          value="32"
          trend="down"
          percentage="8"
          description="vs. last month"
          icon={Hotel}
          delay={200}
        />
        <StatsCard 
          title="New Bookings"
          value="68"
          trend="up"
          percentage="19"
          description="vs. last month"
          icon={CalendarDays}
          delay={300}
        />
        <StatsCard 
          title="Revenue"
          value="₹5.2L"
          trend="up"
          percentage="7"
          description="vs. last month"
          icon={IndianRupee}
          delay={400}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentBookings bookings={bookings} />
        </div>
        <div>
          <PaymentMethodsCard />
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
