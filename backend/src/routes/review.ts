import express from "express";
import mongoose from "mongoose";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import Review from "../models/review";

const router = express.Router();

const checkOwnership = async (reviewId: string, userId: string) => {
  const review = await Review.findById(reviewId);
  return review && review.userId === userId;
};

router.post("/:hotelId/:bookingId", verifyToken, async (req, res) => {
  const { hotelId, bookingId } = req.params;
  const {
    staffRating,
    facilitiesRating,
    cleanlinessRating,
    comfortRating,
    valueForMoneyRating,
    locationRating,
    freeWifiRating,
    comment,
    images,
  } = req.body;

  try {
    // Find the hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Find the booking
    const booking = hotel.bookings.find((b) => b._id.toString() === bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if checkout date has passed
    const currentDate = new Date();
    if (currentDate <= booking.checkOut) {
      return res
        .status(400)
        .json({
          message: "You can only review after the checkout date has passed",
        });
    }

    // Check if a review already exists for this booking
    const existingReview = hotel.reviews.find(
      (review) => review.bookingId === bookingId
    );
    if (existingReview) {
      return res
        .status(400)
        .json({
          message: "You have already submitted a review for this booking",
        });
    }

    const userId = booking.userId;

    // Create a new review
    const newReview = {
      _id: new mongoose.Types.ObjectId().toString(),
      hotelId: req.params.hotelId,
      userId,
      bookingId: req.params.bookingId,
      staffRating,
      facilitiesRating,
      cleanlinessRating,
      comfortRating,
      valueForMoneyRating,
      locationRating,
      freeWifiRating,
      comment,
      images,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const review = new Review(newReview);
    await review.save();

    // Add the new review to the hotel's reviews array
    hotel.reviews.push(newReview);

    // Save the updated hotel document with the new review
    await hotel.save();

    res
      .status(201)
      .json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:hotelId/:reviewId", verifyToken, async (req, res) => {
  const { hotelId, reviewId } = req.params;

  try {
    // Ensure req.userId is defined and is a string
    if (typeof req.userId !== "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Check if the review is owned by the user
    const hasOwnership = await checkOwnership(reviewId, req.userId);
    if (!hasOwnership) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this review" });
    }

    // Find and delete the review from the Review collection
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found in Review collection" });
    }

    // Remove the review from the hotel's reviews array
    const reviewIndex = hotel.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res
        .status(404)
        .json({ message: "Review not found in hotel reviews" });
    }
    hotel.reviews.splice(reviewIndex, 1);

    // Save the updated hotel document
    await hotel.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:hotelId/reviews", async (req, res) => {
  const { hotelId } = req.params;

  try {
    const hotel = await Hotel.findById(hotelId).populate("reviews");
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
