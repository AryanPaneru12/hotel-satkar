
import { bookings } from '@/data/bookings';
import { rooms } from '@/data/rooms';
import { adminUsers, customerUsers } from '@/data/userDatabase';

interface SearchResult {
  id: string;
  type: 'booking' | 'room' | 'guest';
  title: string;
  subtitle: string;
}

export const searchData = (query: string): SearchResult[] => {
  if (!query || query.trim() === '') return [];
  
  const lowercaseQuery = query.toLowerCase();
  const results: SearchResult[] = [];
  
  // Search bookings
  bookings.forEach(booking => {
    if (
      booking.id.toLowerCase().includes(lowercaseQuery) ||
      booking.guest?.name.toLowerCase().includes(lowercaseQuery) ||
      booking.room?.type.toLowerCase().includes(lowercaseQuery) ||
      booking.room?.number.toLowerCase().includes(lowercaseQuery)
    ) {
      results.push({
        id: booking.id,
        type: 'booking',
        title: `Booking #${booking.id}`,
        subtitle: `${booking.guest?.name} - ${booking.room?.type} - ${new Date(booking.checkInDate).toLocaleDateString()}`
      });
    }
  });
  
  // Search rooms
  rooms.forEach(room => {
    if (
      room.number.toLowerCase().includes(lowercaseQuery) ||
      room.type.toLowerCase().includes(lowercaseQuery) ||
      room.description.toLowerCase().includes(lowercaseQuery)
    ) {
      results.push({
        id: room.id,
        type: 'room',
        title: `Room ${room.number}`,
        subtitle: `${room.type} - ${room.status}`
      });
    }
  });
  
  // Search users
  [...adminUsers, ...customerUsers].forEach(user => {
    if (
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery)
    ) {
      results.push({
        id: user.id,
        type: 'guest',
        title: user.name,
        subtitle: user.email
      });
    }
  });
  
  return results.slice(0, 10); // Limit results to prevent overwhelming UI
};
