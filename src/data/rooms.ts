
import { Room } from '../types';

// Generate 60 rooms with different types and status
export const rooms: Room[] = [
  // Standard Rooms (20 rooms: 101-120)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    number: `${100 + i + 1}`,
    type: 'Standard' as const,
    capacity: 2,
    price: 4999,
    status: i % 4 === 0 ? 'Occupied' as const : 
           i % 5 === 0 ? 'Maintenance' as const :
           i % 7 === 0 ? 'Reserved' as const : 'Available' as const,
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Fridge'],
    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop']
  })),
  
  // Deluxe Rooms (20 rooms: 201-220)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 21}`,
    number: `${200 + i + 1}`,
    type: 'Deluxe' as const,
    capacity: 3,
    price: 10999,
    status: i % 4 === 0 ? 'Occupied' as const : 
           i % 5 === 0 ? 'Maintenance' as const :
           i % 7 === 0 ? 'Reserved' as const : 'Available' as const,
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub'],
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop']
  })),
  
  // Suite Rooms (15 rooms: 301-315)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 41}`,
    number: `${300 + i + 1}`,
    type: 'Suite' as const,
    capacity: 4,
    price: 20999,
    status: i % 4 === 0 ? 'Occupied' as const : 
           i % 5 === 0 ? 'Maintenance' as const :
           i % 7 === 0 ? 'Reserved' as const : 'Available' as const,
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub', 'Living Room', 'Kitchen'],
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070&auto=format&fit=crop']
  })),
  
  // Presidential Suites (5 rooms: 401-405)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 56}`,
    number: `${400 + i + 1}`,
    type: 'Presidential' as const,
    capacity: 5,
    price: 30999,
    status: i % 4 === 0 ? 'Occupied' as const : 'Available' as const,
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub', 'Living Room', 'Kitchen', 'Work Desk', 'Premium View', 'Private Pool', 'Butler Service'],
    images: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2070&auto=format&fit=crop']
  })),
];
