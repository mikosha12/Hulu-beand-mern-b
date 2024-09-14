import mongoose from "mongoose";
 import { RoomType } from "../../shared/types";

const roomSchema = new mongoose.Schema({
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }, // Reference to the hotel
    roomType: { type: String, required: true }, // e.g., "King Suite", "Double Room"
    numberOfRooms: {type: Number, required: true},
    capacity: { type: Number, required: true }, // Number of guests
    pricePerNight: { type: Number, required: true }, // Price per night
    amenities: [{ type: String }], // Array of amenities
    availability: { type: Boolean, default: true }, // True if available, False if booked
    imageUrl: { type: String }, // Optional image URL for the room
  });
  

const Room = mongoose.model<RoomType>("Room", roomSchema);
export default Room;