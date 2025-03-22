
import { Guest } from '../types';

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
    roomId: '2',
    credibilityScore: 92,
    bookingHistory: {
      totalBookings: 8,
      cancellations: 0,
      noShows: 0,
      completedStays: 8
    }
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
    roomId: '4',
    credibilityScore: 85,
    bookingHistory: {
      totalBookings: 6,
      cancellations: 1,
      noShows: 0,
      completedStays: 5
    }
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
    roomId: '6',
    credibilityScore: 78,
    bookingHistory: {
      totalBookings: 5,
      cancellations: 1,
      noShows: 0,
      completedStays: 4
    }
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
    credibilityScore: 65,
    bookingHistory: {
      totalBookings: 4,
      cancellations: 1,
      noShows: 1,
      completedStays: 2
    }
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
    credibilityScore: 94,
    bookingHistory: {
      totalBookings: 10,
      cancellations: 0,
      noShows: 0,
      completedStays: 10
    }
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
    credibilityScore: 45,
    bookingHistory: {
      totalBookings: 3,
      cancellations: 2,
      noShows: 0,
      completedStays: 1
    }
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
    credibilityScore: 73,
    bookingHistory: {
      totalBookings: 6,
      cancellations: 1,
      noShows: 1,
      completedStays: 4
    }
  }
];
