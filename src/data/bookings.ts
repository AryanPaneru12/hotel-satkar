
import { Booking } from '../types';
import { rooms } from './rooms';
import { guests } from './guests';

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
