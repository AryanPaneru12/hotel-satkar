
import { Room } from '../types';

// Generate 60 rooms with different types and status
export const rooms: Room[] = [
  // Standard Rooms (20 rooms: 101-120)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    number: `${100 + i + 1}`,
    type: 'Standard' as const,
    capacity: 2,
    pricePerNight: 4999,
    price: 4999, // Added for compatibility
    status: i % 4 === 0 ? 'Occupied' as const : 
           i % 5 === 0 ? 'Maintenance' as const :
           i % 7 === 0 ? 'Reserved' as const : 'Available' as const,
    floor: 1,
    description: 'Standard room with basic amenities',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Fridge'],
    images: ['/lovable-uploads/65411b44-d58a-4ca3-b6e0-524c1dc50484.png'],
    createdAt: new Date().toISOString()
  })),
  
  // Deluxe Rooms (20 rooms: 201-220)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 21}`,
    number: `${200 + i + 1}`,
    type: 'Deluxe' as const,
    capacity: 3,
    pricePerNight: 10999,
    price: 10999, // Added for compatibility
    status: i % 4 === 0 ? 'Occupied' as const : 
           i % 5 === 0 ? 'Maintenance' as const :
           i % 7 === 0 ? 'Reserved' as const : 'Available' as const,
    floor: 2,
    description: 'Deluxe room with premium amenities',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub'],
    images: ['/lovable-uploads/31cf91b6-22a8-4382-9199-d680609bd325.png'],
    createdAt: new Date().toISOString()
  })),
  
  // Suite Rooms (15 rooms: 301-315)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 41}`,
    number: `${300 + i + 1}`,
    type: 'Suite' as const,
    capacity: 4,
    pricePerNight: 20999,
    price: 20999, // Added for compatibility
    status: i % 4 === 0 ? 'Occupied' as const : 
           i % 5 === 0 ? 'Maintenance' as const :
           i % 7 === 0 ? 'Reserved' as const : 'Available' as const,
    floor: 3,
    description: 'Luxury suite with spacious living area',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub', 'Living Room', 'Kitchen'],
    images: ['/lovable-uploads/a1f17f98-5fbc-49ce-93d7-77dae3cc0241.png'],
    createdAt: new Date().toISOString()
  })),
  
  // Presidential Suites (5 rooms: 401-405)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 56}`,
    number: `${400 + i + 1}`,
    type: 'Presidential' as const,
    capacity: 5,
    pricePerNight: 30999,
    price: 30999, // Added for compatibility
    status: i % 4 === 0 ? 'Occupied' as const : 'Available' as const,
    floor: 4,
    description: 'The most luxurious accommodation with all premium amenities',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub', 'Living Room', 'Kitchen', 'Work Desk', 'Premium View', 'Private Pool', 'Butler Service'],
    images: ['/lovable-uploads/c4d1d1b1-b6f7-4bc8-8d3e-ce3e4af224f1.png'],
    createdAt: new Date().toISOString()
  })),
];
