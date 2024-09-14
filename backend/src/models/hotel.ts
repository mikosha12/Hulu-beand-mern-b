import mongoose from "mongoose";
import { BookingType, HotelType, ReviewType } from "../../shared/types";

// Booking Schema
const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  totalCost: { type: Number, required: true },
});

// Location Schema
const locationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

// Review Schema
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

// Hotel Schema
const hotelSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  facilities: [{ type: String, required: true }],
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  bookings: [bookingSchema],
  reviews: [reviewSchema],
  location: { type: locationSchema, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
});

// Middleware to update `lastUpdated` on document update
hotelSchema.pre('save', function (next) {
  this.lastUpdated = new Date();
  next();
});

// Virtual field for calculating the average rating
hotelSchema.virtual('averageRating').get(function () {
  if (this.reviews.length === 0) return 0;

  const categoryAverages = {
    staffRating: 0,
    facilitiesRating: 0,
    cleanlinessRating: 0,
    comfortRating: 0,
    valueForMoneyRating: 0,
    locationRating: 0,
    freeWifiRating: 0,
  };

  // Calculate the sum of ratings for each category
  this.reviews.forEach(review => {
    categoryAverages.staffRating += review.staffRating;
    categoryAverages.facilitiesRating += review.facilitiesRating;
    categoryAverages.cleanlinessRating += review.cleanlinessRating;
    categoryAverages.comfortRating += review.comfortRating;
    categoryAverages.valueForMoneyRating += review.valueForMoneyRating;
    categoryAverages.locationRating += review.locationRating;
    categoryAverages.freeWifiRating += review.freeWifiRating;
  });

  // Calculate the average for each category
  (Object.keys(categoryAverages) as Array<keyof typeof categoryAverages>).forEach(key => {
    categoryAverages[key] /= this.reviews.length;
  });

  // Calculate the overall average rating
  const overallRating =
    (categoryAverages.staffRating +
      categoryAverages.facilitiesRating +
      categoryAverages.cleanlinessRating +
      categoryAverages.comfortRating +
      categoryAverages.valueForMoneyRating +
      categoryAverages.locationRating +
      categoryAverages.freeWifiRating) /
    7;

  return overallRating;
});

// Ensure virtuals are included when converting to JSON or Object
hotelSchema.set('toJSON', { virtuals: true });
hotelSchema.set('toObject', { virtuals: true });

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;
