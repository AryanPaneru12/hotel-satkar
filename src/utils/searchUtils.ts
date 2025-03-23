
import { bookings } from '@/data/bookings';
import { rooms } from '@/data/rooms';
import { adminUsers, customerUsers } from '@/data/userDatabase';
import { guests } from '@/data/guests';

interface SearchResult {
  id: string;
  type: 'booking' | 'room' | 'guest';
  title: string;
  subtitle: string;
  data?: any; // For the full data object
}

export const searchData = (query: string): SearchResult[] => {
  if (!query || query.trim() === '') return [];
  
  const lowercaseQuery = query.toLowerCase();
  const results: SearchResult[] = [];
  
  // Search bookings
  bookings.forEach(booking => {
    if (
      booking.id.toLowerCase().includes(lowercaseQuery) ||
      (booking.guest?.name && booking.guest.name.toLowerCase().includes(lowercaseQuery)) ||
      (booking.guest?.id && booking.guest.id.toLowerCase().includes(lowercaseQuery)) ||
      (booking.room?.type && booking.room.type.toLowerCase().includes(lowercaseQuery)) ||
      (booking.room?.number && booking.room.number.toLowerCase().includes(lowercaseQuery))
    ) {
      results.push({
        id: booking.id,
        type: 'booking',
        title: `Booking #${booking.id}`,
        subtitle: `${booking.guest?.name || 'Unknown'} - ${booking.room?.type || 'Unknown'} - ${new Date(booking.checkInDate).toLocaleDateString()}`,
        data: booking
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
        subtitle: `${room.type} - ${room.status}`,
        data: room
      });
    }
  });
  
  // Search guests (from guest data)
  guests.forEach(guest => {
    if (
      guest.name.toLowerCase().includes(lowercaseQuery) ||
      (guest.email && guest.email.toLowerCase().includes(lowercaseQuery)) ||
      guest.id.toLowerCase().includes(lowercaseQuery)
    ) {
      results.push({
        id: guest.id,
        type: 'guest',
        title: guest.name,
        subtitle: `ID: ${guest.id} - ${guest.email || 'No email'}`,
        data: guest
      });
    }
  });
  
  // Search users (both admin and customers)
  [...adminUsers, ...customerUsers].forEach(user => {
    if (
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery) ||
      (user.id && user.id.toLowerCase().includes(lowercaseQuery))
    ) {
      // Skip duplicates (if a user is already added from guests data)
      if (!results.some(r => r.type === 'guest' && r.id === user.id)) {
        results.push({
          id: user.id,
          type: 'guest',
          title: user.name,
          subtitle: `ID: ${user.id} - ${user.email}`,
          data: user
        });
      }
    }
  });
  
  return results.slice(0, 15); // Limit results to prevent overwhelming UI but show more than before
};

// Helper function to search specifically for customers
export const searchCustomers = (query: string) => {
  if (!query || query.trim() === '') return [];
  
  const lowercaseQuery = query.toLowerCase();
  
  // First search in guests data which is more complete
  const guestResults = guests.filter(guest => 
    guest.name.toLowerCase().includes(lowercaseQuery) ||
    (guest.email && guest.email.toLowerCase().includes(lowercaseQuery)) ||
    guest.id.toLowerCase().includes(lowercaseQuery)
  );
  
  // Then search in customer users if not found in guests
  const customerResults = customerUsers.filter(user => {
    // Skip if already found in guests
    if (guestResults.some(g => g.id === user.id)) return false;
    
    return user.name.toLowerCase().includes(lowercaseQuery) ||
           user.email.toLowerCase().includes(lowercaseQuery) ||
           (user.id && user.id.toLowerCase().includes(lowercaseQuery));
  });
  
  return [...guestResults, ...customerResults].slice(0, 15);
};
