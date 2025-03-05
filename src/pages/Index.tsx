
import PageContainer from '@/components/layout/PageContainer';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentBookings from '@/components/dashboard/RecentBookings';
import { bookings, dashboardStats } from '@/data/mockData';
import { Bed, DollarSign, Users, Calendar, Percent } from 'lucide-react';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard">
      {/* Hero Banner */}
      <div className="relative h-48 md:h-64 lg:h-80 mb-8 rounded-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80" 
          alt="Scenic view of Pokhara and snow mountains" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-hotel-900/70 to-hotel-700/50"></div>
        <div className="absolute inset-0 flex items-center p-8">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to Satkar</h1>
            <p className="text-lg md:text-xl">Redefining Luxury</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Available Rooms"
          value={dashboardStats.availableRooms}
          icon={Bed}
          description="Out of 47 total rooms"
          iconColor="text-hotel-600"
          delay={100}
        />
        
        <StatsCard
          title="Today's Revenue"
          value={`$${dashboardStats.revenueToday}`}
          icon={DollarSign}
          trend="up"
          trendValue="+12.5%"
          iconColor="text-emerald-600"
          delay={200}
        />
        
        <StatsCard
          title="Today's Check-ins"
          value={dashboardStats.todayCheckIns}
          icon={Users}
          iconColor="text-blue-600"
          delay={300}
        />
        
        <StatsCard
          title="Occupancy Rate"
          value={`${dashboardStats.occupancyRate}%`}
          icon={Percent}
          trend="up"
          trendValue="+5.2%"
          iconColor="text-purple-600"
          delay={400}
        />
      </div>
      
      {/* Bookings Table */}
      <DashboardCard
        title="Recent Bookings"
        className="mb-6"
        delay={500}
      >
        <RecentBookings bookings={bookings} />
      </DashboardCard>
      
      {/* Additional Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard
          title="Upcoming Check-ins"
          delay={600}
        >
          <div className="space-y-4">
            {bookings
              .filter(booking => booking.status === 'Confirmed')
              .map(booking => (
                <div key={booking.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{booking.guest?.name}</div>
                    <div className="text-sm text-muted-foreground">Room {booking.room?.number}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                        weekday: 'short'
                      })}
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </DashboardCard>
        
        <DashboardCard
          title="Today's Activities"
          delay={700}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3 border-l-2 border-hotel-500 pl-3">
              <Calendar className="h-5 w-5 text-hotel-500" />
              <div>
                <div className="font-medium">8 Check-ins expected</div>
                <div className="text-sm text-muted-foreground">First arrival at 11:00 AM</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 border-l-2 border-red-500 pl-3">
              <Calendar className="h-5 w-5 text-red-500" />
              <div>
                <div className="font-medium">6 Check-outs today</div>
                <div className="text-sm text-muted-foreground">Latest at 12:00 PM</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 border-l-2 border-emerald-500 pl-3">
              <DollarSign className="h-5 w-5 text-emerald-500" />
              <div>
                <div className="font-medium">12 Payments processed</div>
                <div className="text-sm text-muted-foreground">$6,234 total revenue</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 border-l-2 border-purple-500 pl-3">
              <Bed className="h-5 w-5 text-purple-500" />
              <div>
                <div className="font-medium">3 Room service requests</div>
                <div className="text-sm text-muted-foreground">2 pending, 1 completed</div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
