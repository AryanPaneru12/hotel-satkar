
import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { guests, bookings } from '@/data/mockData';
import { Plus, Search, MoreHorizontal, User, Phone, Mail, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

const Guests = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Get guest status by checking if they are currently checked in
  const getGuestStatus = (guestId: string) => {
    const activeBooking = bookings.find(
      booking => 
        booking.guestId === guestId && 
        (booking.status === 'Checked In' || booking.status === 'Confirmed')
    );
    
    return activeBooking 
      ? activeBooking.status === 'Checked In' 
        ? 'Checked In' 
        : 'Has Upcoming Booking'
      : 'Not Active';
  };

  // Filter guests based on search query
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = 
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.phone.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const getStatusBadgeClasses = (status: string) => {
    switch(status) {
      case 'Checked In':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Has Upcoming Booking':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGuestInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <PageContainer title="Guests">
      {/* Search and Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search guests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-background w-full"
          />
        </div>
        
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>New Guest</span>
        </Button>
      </div>
      
      {/* Guests Table */}
      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact Information</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Room</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => {
                const status = getGuestStatus(guest.id);
                
                return (
                  <TableRow key={guest.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={guest.image} alt={guest.name} />
                          <AvatarFallback>{getGuestInitials(guest.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{guest.name}</div>
                          <div className="text-xs text-muted-foreground">ID: {guest.idNumber}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" />
                          <span>{guest.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-3 w-3 mr-1" />
                          <span>{guest.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("border", getStatusBadgeClasses(status))}>
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell>{guest.nationality || '-'}</TableCell>
                    <TableCell>
                      {guest.checkInDate 
                        ? new Date(guest.checkInDate).toLocaleDateString() 
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {guest.checkOutDate 
                        ? new Date(guest.checkOutDate).toLocaleDateString() 
                        : '-'}
                    </TableCell>
                    <TableCell>{guest.roomId ? `Room ${guest.roomId}` : '-'}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            <span>View Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Plus className="mr-2 h-4 w-4" />
                            <span>New Booking</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {filteredGuests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">No guests found</h3>
                    <p className="text-muted-foreground">Try adjusting your search</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageContainer>
  );
};

export default Guests;
