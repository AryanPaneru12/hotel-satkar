
import { Room, Guest, Booking, DashboardStats } from '../types';

export const rooms: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'Standard',
    capacity: 2,
    price: 99,
    status: 'Available',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Fridge'],
    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop']
  },
  {
    id: '2',
    number: '102',
    type: 'Standard',
    capacity: 2,
    price: 99,
    status: 'Occupied',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Fridge'],
    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop']
  },
  {
    id: '3',
    number: '201',
    type: 'Deluxe',
    capacity: 3,
    price: 149,
    status: 'Available',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub'],
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop']
  },
  {
    id: '4',
    number: '202',
    type: 'Deluxe',
    capacity: 3,
    price: 149,
    status: 'Reserved',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub'],
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop']
  },
  {
    id: '5',
    number: '301',
    type: 'Suite',
    capacity: 4,
    price: 249,
    status: 'Available',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub', 'Living Room', 'Kitchen'],
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070&auto=format&fit=crop']
  },
  {
    id: '6',
    number: '302',
    type: 'Suite',
    capacity: 4,
    price: 249,
    status: 'Maintenance',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub', 'Living Room', 'Kitchen'],
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070&auto=format&fit=crop']
  },
  {
    id: '7',
    number: '401',
    type: 'Executive',
    capacity: 2,
    price: 299,
    status: 'Available',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub', 'Living Room', 'Kitchen', 'Work Desk', 'Premium View'],
    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop']
  },
  {
    id: '8',
    number: '501',
    type: 'Presidential',
    capacity: 6,
    price: 599,
    status: 'Available',
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Bathtub', 'Living Room', 'Kitchen', 'Work Desk', 'Premium View', 'Private Pool', 'Butler Service'],
    images: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2070&auto=format&fit=crop']
  }
];

export const guests: Guest[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, CA',
    nationality: 'USA',
    idNumber: 'US123456',
    checkInDate: '2023-06-15',
    checkOutDate: '2023-06-18',
    roomId: '2'
  },
  {
    id: '2',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    phone: '555-234-5678',
    address: '456 Oak Ave, Somewhere, NY',
    nationality: 'UK',
    idNumber: 'UK789012',
    checkInDate: '2023-06-14',
    checkOutDate: '2023-06-19',
    roomId: '4'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '555-345-6789',
    address: '789 Pine Rd, Nowhere, TX',
    nationality: 'China',
    idNumber: 'CN345678',
    checkInDate: '2023-06-16',
    checkOutDate: '2023-06-22',
    roomId: '6'
  },
  {
    id: '4',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    phone: '555-456-7890',
    address: '101 Elm Blvd, Anywhere, FL',
    nationality: 'France',
    idNumber: 'FR901234',
    checkInDate: '2023-06-17',
    checkOutDate: '2023-06-20',
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@example.com',
    phone: '555-567-8901',
    address: '202 Maple Ln, Everywhere, WA',
    nationality: 'South Korea',
    idNumber: 'KR567890',
    checkInDate: '2023-06-18',
    checkOutDate: '2023-06-25',
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
  }
];

export const dashboardStats: DashboardStats = {
  totalBookings: 47,
  availableRooms: 15,
  occupiedRooms: 32,
  todayCheckIns: 8,
  todayCheckOuts: 6,
  revenueToday: 3876,
  occupancyRate: 68
};
