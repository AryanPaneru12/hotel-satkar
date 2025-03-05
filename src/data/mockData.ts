
import { Room, Guest, Booking, DashboardStats } from '../types';

// Generate 60 rooms with different types and status
export const rooms: Room[] = [
  // Standard Rooms (20 rooms: 101-120)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    number: `${100 + i + 1}`,
    type: 'Standard' as const,
    capacity: 2,
    price: 99,
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
    price: 149,
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
    price: 249,
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
    price: 599,
    status: i % 4 === 0 ? 'Occupied' as const : 'Available' as const,
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub', 'Living Room', 'Kitchen', 'Work Desk', 'Premium View', 'Private Pool', 'Butler Service'],
    images: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2070&auto=format&fit=crop']
  })),
];

export const guests: Guest[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '555-123-4567',
    address: '123 Main St, Mumbai, India',
    nationality: 'India',
    idNumber: 'IND123456',
    checkInDate: '2023-06-15',
    checkOutDate: '2023-06-18',
    roomId: '2'
  },
  {
    id: '2',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '555-234-5678',
    address: '456 Oak Ave, Delhi, India',
    nationality: 'India',
    idNumber: 'IND789012',
    checkInDate: '2023-06-14',
    checkOutDate: '2023-06-19',
    roomId: '4'
  },
  {
    id: '3',
    name: 'Sujata Patel',
    email: 'sujata.patel@example.com',
    phone: '555-345-6789',
    address: '789 Pine Rd, Pune, India',
    nationality: 'India',
    idNumber: 'IND345678',
    checkInDate: '2023-06-16',
    checkOutDate: '2023-06-22',
    roomId: '6'
  },
  {
    id: '4',
    name: 'Pramod Gurung',
    email: 'pramod.gurung@example.com',
    phone: '555-456-7890',
    address: '101 Elm Blvd, Kathmandu, Nepal',
    nationality: 'Nepal',
    idNumber: 'NPL901234',
    checkInDate: '2023-06-17',
    checkOutDate: '2023-06-20',
  },
  {
    id: '5',
    name: 'Deepak Thapa',
    email: 'deepak.thapa@example.com',
    phone: '555-567-8901',
    address: '202 Maple Ln, Pokhara, Nepal',
    nationality: 'Nepal',
    idNumber: 'NPL567890',
    checkInDate: '2023-06-18',
    checkOutDate: '2023-06-25',
  },
  {
    id: '6',
    name: 'Kavita Desai',
    email: 'kavita.desai@example.com',
    phone: '555-678-9012',
    address: '303 Cedar St, Bangalore, India',
    nationality: 'India',
    idNumber: 'IND678901',
    checkInDate: '2023-07-01',
    checkOutDate: '2023-07-05',
  },
  {
    id: '7',
    name: 'Dipendra Khatri',
    email: 'dipendra.khatri@example.com',
    phone: '555-789-0123',
    address: '404 Birch Ave, Lalitpur, Nepal',
    nationality: 'Nepal',
    idNumber: 'NPL123789',
    checkInDate: '2023-07-03',
    checkOutDate: '2023-07-09',
  }
];

export const bookings: Booking[] = [
  {
    id: '1',
    roomId: '2',
    guestId: '1',
    checkInDate: '2023-06-15',
    checkOutDate: '2023-06-18',
    status: 'Checked In',
    totalAmount: 297,
    paymentStatus: 'Paid',
    createdAt: '2023-06-01T10:30:00Z',
    guest: guests.find(g => g.id === '1'),
    room: rooms.find(r => r.id === '2')
  },
  {
    id: '2',
    roomId: '4',
    guestId: '2',
    checkInDate: '2023-06-14',
    checkOutDate: '2023-06-19',
    status: 'Checked In',
    totalAmount: 745,
    paymentStatus: 'Paid',
    createdAt: '2023-06-02T11:45:00Z',
    guest: guests.find(g => g.id === '2'),
    room: rooms.find(r => r.id === '4')
  },
  {
    id: '3',
    roomId: '6',
    guestId: '3',
    checkInDate: '2023-06-16',
    checkOutDate: '2023-06-22',
    status: 'Checked In',
    totalAmount: 1494,
    paymentStatus: 'Paid',
    createdAt: '2023-06-03T09:15:00Z',
    guest: guests.find(g => g.id === '3'),
    room: rooms.find(r => r.id === '6')
  },
  {
    id: '4',
    roomId: '1',
    guestId: '4',
    checkInDate: '2023-06-17',
    checkOutDate: '2023-06-20',
    status: 'Confirmed',
    totalAmount: 297,
    paymentStatus: 'Pending',
    createdAt: '2023-06-05T14:20:00Z',
    guest: guests.find(g => g.id === '4'),
    room: rooms.find(r => r.id === '1')
  },
  {
    id: '5',
    roomId: '3',
    guestId: '5',
    checkInDate: '2023-06-18',
    checkOutDate: '2023-06-25',
    status: 'Confirmed',
    totalAmount: 1043,
    paymentStatus: 'Paid',
    createdAt: '2023-06-06T16:40:00Z',
    guest: guests.find(g => g.id === '5'),
    room: rooms.find(r => r.id === '3')
  },
  {
    id: '6',
    roomId: '42',
    guestId: '6',
    checkInDate: '2023-07-01',
    checkOutDate: '2023-07-05',
    status: 'Confirmed',
    totalAmount: 996,
    paymentStatus: 'Paid',
    createdAt: '2023-06-15T13:20:00Z',
    guest: guests.find(g => g.id === '6'),
    room: rooms.find(r => r.id === '42')
  },
  {
    id: '7',
    roomId: '52',
    guestId: '7',
    checkInDate: '2023-07-03',
    checkOutDate: '2023-07-09',
    status: 'Confirmed',
    totalAmount: 1494,
    paymentStatus: 'Paid',
    createdAt: '2023-06-20T10:15:00Z',
    guest: guests.find(g => g.id === '7'),
    room: rooms.find(r => r.id === '52')
  }
];

export const dashboardStats: DashboardStats = {
  totalBookings: 47,
  availableRooms: 42,
  occupiedRooms: 18,
  todayCheckIns: 8,
  todayCheckOuts: 6,
  revenueToday: 3876,
  occupancyRate: 30
};
