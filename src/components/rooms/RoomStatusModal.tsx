
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Room } from '@/types';

interface RoomStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (roomId: string, status: Room['status'], notes: string) => void;
  room: Room | null;
}

const RoomStatusModal = ({ isOpen, onClose, onUpdateStatus, room }: RoomStatusModalProps) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<Room['status']>(room?.status || 'Available');
  const [notes, setNotes] = useState('');

  // Reset form when modal opens with a different room
  React.useEffect(() => {
    if (room) {
      setStatus(room.status);
      setNotes('');
    }
  }, [room]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!room) return;
    
    onUpdateStatus(room.id, status, notes);
    
    toast({
      title: "Status Updated",
      description: `Room ${room.number} status changed to ${status}`,
    });
    
    onClose();
  };

  if (!room) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Room Status</DialogTitle>
          <DialogDescription>
            Change the status for Room {room.number}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as Room['status'])}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Occupied">Occupied</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea 
              id="notes" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="Add notes about this status change..." 
              rows={3} 
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Update Status</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoomStatusModal;
