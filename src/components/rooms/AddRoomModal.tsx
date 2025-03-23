
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Room } from '@/types';

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRoom: (room: Partial<Room>) => void;
}

const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Presidential'];
const roomStatuses = ['Available', 'Occupied', 'Maintenance', 'Reserved'];

const AddRoomModal = ({ isOpen, onClose, onAddRoom }: AddRoomModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Room>>({
    number: '',
    type: 'Standard',
    capacity: 2,
    price: 4999,
    status: 'Available',
    floor: 1,
    description: '',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning'],
    images: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'price' || name === 'floor' 
        ? Number(value) 
        : value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAmenities = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const amenitiesArray = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      amenities: amenitiesArray
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.number || !formData.type || !formData.price) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Add room
    onAddRoom({
      ...formData,
      id: Date.now().toString(), // Generate temporary ID
      createdAt: new Date().toISOString(),
      pricePerNight: formData.price // Ensure both price fields are set
    });
    
    toast({
      title: "Room Added",
      description: `Room ${formData.number} has been added successfully`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new room to the hotel inventory.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Room Number*</Label>
              <Input 
                id="number" 
                name="number" 
                value={formData.number} 
                onChange={handleChange} 
                placeholder="e.g. 101" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="floor">Floor*</Label>
              <Input 
                id="floor" 
                name="floor" 
                type="number" 
                value={formData.floor} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Room Type*</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status*</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value as 'Available' | 'Occupied' | 'Maintenance' | 'Reserved')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {roomStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity*</Label>
              <Input 
                id="capacity" 
                name="capacity" 
                type="number" 
                value={formData.capacity} 
                onChange={handleChange} 
                min={1}
                max={10}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price per Night (₹)*</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                value={formData.price} 
                onChange={handleChange} 
                min={1000}
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Room description..." 
              rows={3} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities (comma separated)</Label>
            <Textarea 
              id="amenities" 
              name="amenities" 
              value={formData.amenities?.join(', ')} 
              onChange={handleAmenities} 
              placeholder="Wi-Fi, TV, Air Conditioning..." 
              rows={3} 
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Room</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomModal;
