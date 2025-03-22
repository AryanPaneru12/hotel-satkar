
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { UserRound, Settings, CalendarDays, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CredibilityScore from '@/components/credibility/CredibilityScore';

const Profile = () => {
  const { user, customerId, credibilityScore, canPayWithCash } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate('/landing');
    return null;
  }
  
  return (
    <PageContainer title="Profile">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Info Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-xl bg-primary/10 text-primary">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            <div className="mt-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.role === 'customer' && (
                <>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Customer ID</p>
                    <p className="font-mono">{customerId}</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Credibility Score</p>
                    {/* Update from 'value' to 'score' prop */}
                    <CredibilityScore score={credibilityScore || 0} />
                    <p className="text-xs text-muted-foreground mt-1">
                      {canPayWithCash 
                        ? "✅ Eligible for cash payments" 
                        : "❌ Cash payments restricted"}
                    </p>
                  </div>
                  <Separator />
                </>
              )}
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                <p>{new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
              <Separator />
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* User Activity */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserRound className="h-5 w-5 mr-2" />
                Account Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                    <p className="text-lg font-medium mt-1">
                      {user.role === 'superadmin' ? 'Super Admin' : 
                        user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <div className="mt-1">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">Last Login</p>
                    <p className="text-lg font-medium mt-1">Today</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="flex items-center text-sm font-medium">
                    <Settings className="h-4 w-4 mr-2" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button variant="outline" onClick={() => navigate('/settings')}>
                      Account Settings
                    </Button>
                    {user.role === 'customer' && (
                      <Button variant="outline" onClick={() => navigate('/bookings')}>
                        My Bookings
                      </Button>
                    )}
                    {(user.role === 'admin' || user.role === 'superadmin') && (
                      <Button variant="outline" onClick={() => navigate('/bookings')}>
                        Manage Bookings
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {user.role === 'customer' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">You haven't had any recent activity.</p>
                    <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate('/bookings')}>
                      View all bookings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {(user.role === 'admin' || user.role === 'superadmin') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Admin Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button variant="outline" onClick={() => navigate('/rooms')}>
                      Manage Rooms
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/guests')}>
                      Manage Guests
                    </Button>
                    {user.role === 'superadmin' && (
                      <>
                        <Button variant="outline">User Management</Button>
                        <Button variant="outline">System Settings</Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;
