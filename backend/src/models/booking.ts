import mongoose, { Schema, Document, Model } from "mongoose";
import Room from "./room";
import { BookingType } from "../../shared/types"; // Adjust the import path as needed

// Define a static method interface for the model
interface BookingModel extends Model<BookingType> {
  updateRoomAvailability: (
    roomId: string,
    quantity: number,
    checkIn: Date,
    checkOut: Date
  ) => Promise<void>;
}

// Create the Booking schema
const bookingSchema = new Schema<BookingType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  totalCost: { type: Number, required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: function() {
    return this.isNew; // Only required for new documents
  } },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
  rooms: [
    {
      roomId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  ticketNumber: { type: String, required: function() {
    return this.isNew; // Only required for new documents
  }, unique: true },// Unique ticket number

});

// Static Method for Updating Room Availability
// Static Method for Updating Room Availability
bookingSchema.statics.updateRoomAvailability = async function (
    roomId: string,
    quantity: number,
    checkIn: Date | string,
    checkOut: Date | string
  ): Promise<void> {
    const room = await Room.findOne({ _id: roomId });
    if (!room) {
      throw new Error(`Room with ID ${roomId} not found`);
    }
  
    // Ensure checkIn and checkOut are Date objects
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
  
    // Reduce available rooms
    await Room.findOneAndUpdate(
      { _id: roomId },
      { $inc: { numberOfRooms: -quantity } }
    );
  
    // Schedule automatic room increase after checkout
    const now = new Date();
    const timeUntilCheckout = checkOutDate.getTime() - now.getTime();
    setTimeout(async () => {
      await Room.findOneAndUpdate(
        { _id: roomId },
        { $inc: { numberOfRooms: quantity } }
      );
    }, timeUntilCheckout);
  };

  
// Create and export the Booking model
const Booking = mongoose.model<BookingType, BookingModel>("Booking", bookingSchema);
export default Booking;