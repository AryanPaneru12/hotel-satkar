
import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import RoomCard from '@/components/rooms/RoomCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { rooms as initialRooms } from '@/data/rooms';
import AddRoomModal from '@/components/rooms/AddRoomModal';
import { Room } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const roomTypes = ['All Types', 'Standard', 'Deluxe', 'Suite', 'Presidential'];
const roomStatuses = ['All Statuses', 'Available', 'Occupied', 'Maintenance', 'Reserved'];

const Rooms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const { toast } = useToast();
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  const filteredRooms = rooms.filter(room => {
    // Filter by search query
    const matchesSearch = room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by type
    const matchesType = selectedType === 'All Types' || room.type === selectedType;
    
    // Filter by status
    const matchesStatus = selectedStatus === 'All Statuses' || room.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddRoom = (newRoom: Partial<Room>) => {
    const roomWithDefaults: Room = {
      ...newRoom,
      id: `${rooms.length + 1}`,
      createdAt: new Date().toISOString(),
      pricePerNight: newRoom.price || 0,
      number: newRoom.number || '',
      type: newRoom.type || 'Standard',
      capacity: newRoom.capacity || 2,
      price: newRoom.price || 4999,
      status: newRoom.status as 'Available' | 'Occupied' | 'Maintenance' | 'Reserved' || 'Available',
      floor: newRoom.floor || 1,
      description: newRoom.description || '',
      amenities: newRoom.amenities || [],
      images: newRoom.images || [],
    };

    setRooms(prevRooms => [...prevRooms, roomWithDefaults]);
    
    toast({
      title: "Room Added",
      description: `Room ${roomWithDefaults.number} has been successfully added`,
    });
  };

  const handleStatusChange = (roomId: string, status: Room['status'], notes: string) => {
    setRooms(prevRooms => prevRooms.map(room => 
      room.id === roomId 
        ? {...room, status, updatedAt: new Date().toISOString()} 
        : room
    ));
    
    toast({
      title: "Room Status Updated",
      description: `Room status has been changed to ${status}`,
    });
  };

  return (
    <PageContainer title="Rooms Management">
      {/* Filters and Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-background w-full"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-40">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-40">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {roomStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {isAdmin && (
            <Button 
              className="flex items-center gap-1"
              onClick={() => setShowAddRoomModal(true)}
            >
              <Plus className="h-4 w-4" />
              <span>Add Room</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room, index) => (
          <RoomCard 
            key={room.id} 
            room={room} 
            delay={100 * index}
            onStatusChange={handleStatusChange}
          />
        ))}
        
        {filteredRooms.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium mb-2">No rooms found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      
      {/* Add Room Modal */}
      <AddRoomModal
        isOpen={showAddRoomModal}
        onClose={() => setShowAddRoomModal(false)}
        onAddRoom={handleAddRoom}
      />
    </PageContainer>
  );
};

export default Rooms;
