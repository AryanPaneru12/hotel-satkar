
import { z } from 'zod';

// Define form schema for the entire booking process
export const bookingFormSchema = z.object({
  // Guest information
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().min(10, { message: "Invalid phone number format" }),
  idType: z.string(),
  idNumber: z.string().min(1, { message: "ID number is required" }),
  specialRequests: z.string().optional(),
  checkInDate: z.date(),
  checkOutDate: z.date(),
  useExistingCustomer: z.boolean().default(false),
  selectedCustomerId: z.string().optional(),
  
  // Payment information
  paymentMethod: z.string().default('credit'),
  
  // Additional booking data (not directly input by user)
  roomType: z.string().optional(),
  roomPrice: z.number().optional(),
  totalNights: z.number().default(1),
  totalAmount: z.number().default(0)
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
