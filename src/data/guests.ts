
import { Guest } from '../types';

export const guests: Guest[] = [
  {
    id: '1',
    name: 'Aryan Paneru',
    email: 'aryanpaneru@example.com',
    phone: '555-123-4567',
    address: '123 Main St, Mumbai, India',
    nationality: 'India',
    idNumber: 'IND123456',
    checkInDate: '2025-06-15',
    checkOutDate: '2025-06-18',
    roomId: '2',
    credibilityScore: 92,
    bookingHistory: {
      totalBookings: 8,
      cancellations: 0,
      noShows: 0,
      completedStays: 8
    },
    role: 'customer',
    createdAt: '2025-01-01T00:00:00Z',
    image: '/lovable-uploads/a1f17f98-5fbc-49ce-93d7-77dae3cc0241.png'
  },
  {
    id: '2',
    name: 'Nikit Ban',
    email: 'nikitban@example.com',
    phone: '555-234-5678',
    address: '456 Oak Ave, Delhi, India',
    nationality: 'India',
    idNumber: 'IND789012',
    checkInDate: '2025-06-14',
    checkOutDate: '2025-06-19',
    roomId: '4',
    credibilityScore: 85,
    bookingHistory: {
      totalBookings: 6,
      cancellations: 1,
      noShows: 0,
      completedStays: 5
    },
    role: 'customer',
    createdAt: '2025-01-05T00:00:00Z',
    image: '/lovable-uploads/7f333ea6-b0d6-44ca-90c8-ec02f7f9902a.png'
  },
  {
    id: '3',
    name: 'Rohan Lekhak',
    email: 'rohanlekhak@example.com',
    phone: '555-345-6789',
    address: '789 Pine Rd, Pune, India',
    nationality: 'India',
    idNumber: 'IND345678',
    checkInDate: '2025-06-16',
    checkOutDate: '2025-06-22',
    roomId: '6',
    credibilityScore: 78,
    bookingHistory: {
      totalBookings: 5,
      cancellations: 1,
      noShows: 0,
      completedStays: 4
    },
    role: 'customer',
    createdAt: '2025-01-10T00:00:00Z',
    image: '/lovable-uploads/31cf91b6-22a8-4382-9199-d680609bd325.png'
  },
  {
    id: '4',
    name: 'Yubraj Panjiyar',
    email: 'yubrajpanjiyar@example.com',
    phone: '555-456-7890',
    address: '101 Elm Blvd, Kathmandu, Nepal',
    nationality: 'Nepal',
    idNumber: 'NPL901234',
    checkInDate: '2025-06-17',
    checkOutDate: '2025-06-20',
    credibilityScore: 65,
    bookingHistory: {
      totalBookings: 4,
      cancellations: 1,
      noShows: 1,
      completedStays: 2
    },
    role: 'customer',
    createdAt: '2025-01-15T00:00:00Z',
    image: '/lovable-uploads/127a805a-a683-4d65-8411-a8640d5f839c.png'
  },
  {
    id: '5',
    name: 'Deepak Thapa',
    email: 'deepak.thapa@example.com',
    phone: '555-567-8901',
    address: '202 Maple Ln, Pokhara, Nepal',
    nationality: 'Nepal',
    idNumber: 'NPL567890',
    checkInDate: '2025-06-18',
    checkOutDate: '2025-06-25',
    credibilityScore: 94,
    bookingHistory: {
      totalBookings: 10,
      cancellations: 0,
      noShows: 0,
      completedStays: 10
    },
    role: 'customer',
    createdAt: '2025-01-20T00:00:00Z',
    image: '/lovable-uploads/7f6ee3f4-9ad1-4dfd-907c-5b2a6b33460b.png'
  },
  {
    id: '6',
    name: 'Kavita Desai',
    email: 'kavita.desai@example.com',
    phone: '555-678-9012',
    address: '303 Cedar St, Bangalore, India',
    nationality: 'India',
    idNumber: 'IND678901',
    checkInDate: '2025-07-01',
    checkOutDate: '2025-07-05',
    credibilityScore: 45,
    bookingHistory: {
      totalBookings: 3,
      cancellations: 2,
      noShows: 0,
      completedStays: 1
    },
    role: 'customer',
    createdAt: '2025-01-25T00:00:00Z',
    image: '/lovable-uploads/3334a0b3-058e-403f-9f56-23fd144ae856.png'
  },
  {
    id: '7',
    name: 'Dipendra Khatri',
    email: 'dipendra.khatri@example.com',
    phone: '555-789-0123',
    address: '404 Birch Ave, Lalitpur, Nepal',
    nationality: 'Nepal',
    idNumber: 'NPL123789',
    checkInDate: '2025-07-03',
    checkOutDate: '2025-07-09',
    credibilityScore: 73,
    bookingHistory: {
      totalBookings: 6,
      cancellations: 1,
      noShows: 1,
      completedStays: 4
    },
    role: 'customer',
    createdAt: '2025-01-30T00:00:00Z',
    image: '/lovable-uploads/65411b44-d58a-4ca3-b6e0-524c1dc50484.png'
  }
];
