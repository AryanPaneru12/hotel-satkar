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
import { guests } from '@/data/guests';
import { bookings } from '@/data/bookings';
import { rooms } from '@/data/rooms';
import { Plus, Search, MoreHorizontal, User, Phone, Mail, Edit, UserPlus, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const Guests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    idType: 'passport',
    idNumber: '',
    nationality: 'Indian',
    roomId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Get available rooms for selection
  const availableRooms = rooms.filter(room => room.status === 'Available');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewGuest(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setNewGuest(prev => ({ ...prev, [field]: value }));
  };

  const handleAddGuest = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Guest Added",
        description: `${newGuest.name} has been added successfully. Customer ID: CUS-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      
      setIsSubmitting(false);
      setIsAddGuestOpen(false);
      // Reset form
      setNewGuest({
        name: '',
        email: '',
        phone: '',
        idType: 'passport',
        idNumber: '',
        nationality: 'Indian',
        roomId: ''
      });
    }, 1000);
  };

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

  // Get room details by ID
  const getRoomDetails = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    return room ? `Room ${room.number} (${room.type})` : roomId;
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
        
        <Button className="flex items-center gap-1" onClick={() => setIsAddGuestOpen(true)}>
          <UserPlus className="h-4 w-4" />
          <span>New Customer Profile</span>
        </Button>
      </div>
      
      {/* Customer Profiles Table */}
      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-lg font-medium">Customer Profiles</h3>
            <p className="text-sm text-muted-foreground">Manage all customers and their booking history</p>
          </div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Hotel Satkar - Established 2025</span>
          </div>
        </div>
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
                          <div className="text-xs text-muted-foreground">Customer ID: {guest.id}</div>
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
                    <TableCell>{guest.roomId ? getRoomDetails(guest.roomId) : '-'}</TableCell>
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
                    <h3 className="text-lg font-medium mb-2">No customers found</h3>
                    <p className="text-muted-foreground">Try adjusting your search</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Guest Dialog */}
      <Dialog open={isAddGuestOpen} onOpenChange={setIsAddGuestOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-white z-10 pb-4">
            <DialogTitle>Add New Customer Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-y-auto">
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newGuest.name}
                  onChange={handleInputChange}
                  placeholder="John Smith"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newGuest.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newGuest.phone}
                  onChange={handleInputChange}
                  placeholder="+91 9012345678"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="idType">ID Type</Label>
                  <Select 
                    value={newGuest.idType} 
                    onValueChange={(value) => handleSelectChange('idType', value)}
                  >
                    <SelectTrigger id="idType">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="aadhar">Aadhar Card</SelectItem>
                      <SelectItem value="driving">Driving License</SelectItem>
                      <SelectItem value="voter">Voter ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    value={newGuest.idNumber}
                    onChange={handleInputChange}
                    placeholder="123456789"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Select 
                  value={newGuest.nationality} 
                  onValueChange={(value) => handleSelectChange('nationality', value)}
                >
                  <SelectTrigger id="nationality">
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Indian">Indian</SelectItem>
                    <SelectItem value="American">American</SelectItem>
                    <SelectItem value="British">British</SelectItem>
                    <SelectItem value="Australian">Australian</SelectItem>
                    <SelectItem value="Canadian">Canadian</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* New Room Selection Field */}
              <div className="space-y-2">
                <Label htmlFor="roomId">Assign Room (Optional)</Label>
                <Select 
                  value={newGuest.roomId} 
                  onValueChange={(value) => handleSelectChange('roomId', value)}
                >
                  <SelectTrigger id="roomId">
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {availableRooms.map(room => (
                      <SelectItem key={room.id} value={room.id}>
                        Room {room.number} - {room.type} (${room.price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-white z-10 pt-4">
            <Button variant="outline" onClick={() => setIsAddGuestOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGuest} disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Customer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Guests;
