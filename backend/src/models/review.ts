import { BookingType, HotelType, ReviewType } from "../../shared/types";
import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema<ReviewType>({
    hotelId: { type: String, required: true },
    userId: { type: String, required: true },
    bookingId: { type: String, required: true },
    staffRating: { type: Number, required: true, min: 1, max: 10 },
    facilitiesRating: { type: Number, required: true, min: 1, max: 10 },
    cleanlinessRating: { type: Number, required: true, min: 1, max: 10 },
    comfortRating: { type: Number, required: true, min: 1, max: 10 },
    valueForMoneyRating: { type: Number, required: true, min: 1, max: 10 },
    locationRating: { type: Number, required: true, min: 1, max: 10 },
    freeWifiRating: { type: Number, required: true, min: 1, max: 10 },
    comment: { type: String, required: true },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true }
  });
  
  // Middleware to update `updatedAt` on document update
  reviewSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
  });
  
const Review = mongoose.model<ReviewType>("Review", reviewSchema);
export default Review;