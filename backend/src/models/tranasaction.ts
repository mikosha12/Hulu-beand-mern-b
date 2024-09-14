import mongoose, { Schema, Document } from 'mongoose';

export interface TransactionType extends Document {
  bookingId: mongoose.Types.ObjectId; // Reference to the Booking
  transactionId: string; // ID from the payment provider
  userId: string; // User ID associated with the booking
  email:string;
  hotelId: mongoose.Types.ObjectId; // Reference to the Hotel
  amount: number; // Total amount processed
  commissionAmount: number; // 8% for your company
  hotelOwnerAmount: number; // 92% for hotel owner
  transactionType: 'payment' | 'refund'; // New field to indicate transaction type
  createdAt: Date; // Date of transaction
}

const transactionSchema = new Schema<TransactionType>({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  transactionId: { type: String, required: true },
  userId: { type: String, required: true }, // Add userId field
  email: { type: String, required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true }, // Add hotelId field
  amount: { type: Number, required: true },
  commissionAmount: { type: Number, required: true },
  hotelOwnerAmount: { type: Number, required: true },
  transactionType: { 
    type: String, 
    enum: ['payment', 'refund'], // Restrict to 'payment' or 'refund'
    required: true 
  },
  createdAt: { type: Date, default: Date.now, required: true },
});

export const Transaction = mongoose.model<TransactionType>('Transaction', transactionSchema);