import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { BookingType, HotelSearchResponse } from "../../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";
import Notification from "../models/notification";
import User from "../models/user";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

// Search Hotels
router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Hotel.countDocuments(query);

    const response: HotelSearchResponse = {
      data: hotels.map((hotel) => ({
        ...hotel.toObject(),
        averageRating: hotel.averageRating,
      })),
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get All Hotels
router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort("-lastUpdated");
    res.json(hotels);
  } catch (error) {
    console.error("Fetch all hotels error:", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get('/count', async (req: Request, res: Response)=> {
  try {
    // Get the total number of hotels
    const count = await Hotel.countDocuments();
    // Send the count as a response
    res.json({ totalHotels: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the hotel count.' });
  }
});

// Admin Routes
// Get All Hotels with Basic Info
router.get("/hotels", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({}, "name country city starRating _id");

    if (!hotels.length) {
      return res.status(404).json({ message: "No hotels found" });
    }

    res.json(hotels);
  } catch (error) {
    console.error("Admin fetch hotels error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Delete Hotel
router.delete("/:_id", async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const deletedHotel = await Hotel.findByIdAndDelete(_id);

    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Delete hotel error:", error);
    res.status(500).json({ message: "Failed to delete hotel" });
  }
});

// Get Hotel by ID
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id.toString();
    try {
      const hotel = await Hotel.findById(id).populate("reviews").exec();
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      res.json(hotel);
    } catch (error) {
      console.error("Get hotel by ID error:", error);
      res.status(500).json({ message: "Error fetching hotel" });
    }
  }
);

// Create Payment Intent
router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User ID is missing" });
    }

    try {
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        return res.status(400).json({ message: "Hotel not found" });
      }

      const totalCost = hotel.pricePerNight * numberOfNights;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost * 100,
        currency: "ETB",
        metadata: {
          hotelId,
          userId,
        },
      });

      if (!paymentIntent.client_secret) {
        return res
          .status(500)
          .json({ message: "Error creating payment intent" });
      }

      const response = {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        totalCost,
      };

      res.send(response);
    } catch (error) {
      console.error("Payment Intent creation error:", error);
      res.status(500).json({ message: "Error creating payment intent" });
    }
  }
);

// Confirm Booking
router.post(
  "/:hotelId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    const paymentIntentId = req.body.paymentIntentId;
    const hotelId = req.params.hotelId;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User ID is missing" });
    }

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId as string
      );

      if (!paymentIntent) {
        return res.status(400).json({ message: "Payment intent not found" });
      }

      if (
        paymentIntent.metadata.hotelId !== hotelId ||
        paymentIntent.metadata.userId !== userId
      ) {
        return res.status(400).json({ message: "Payment intent mismatch" });
      }

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          message: `Payment intent not succeeded. Status: ${paymentIntent.status}`,
        });
      }

      const newBooking: BookingType = {
        ...req.body,
        userId,
      };

      const hotel = await Hotel.findOneAndUpdate(
        { _id: hotelId },
        { $push: { bookings: newBooking } },
        { new: true }
      );

      if (!hotel) {
        return res.status(400).json({ message: "Hotel not found" });
      }

      await hotel.save();
      res.status(200).send();
    } catch (error) {
      console.error("Booking confirmation error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice),
    };
  }

  return constructedQuery;
};
router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const newHotel = new Hotel({
      ...req.body,
      status: 'Pending', // Set the initial status to Pending
    });
    await newHotel.save();

    // Fetch all admin users
    const admins = await User.find({ isAdmin: true });

    // Create notifications for all admins
    const notifications = admins.map(admin => new Notification({
      type: "New Hotel Pending Approval",
      message: `A new hotel has been added and is waiting for approval: ${newHotel.name}`,
      hotelId: newHotel._id,
      adminId: admin._id.toString(), // Store admin ID
    }));

    await Notification.insertMany(notifications);

    res.status(201).json(newHotel);
  } catch (error) {
    console.error("Add hotel error:", error);
    res.status(500).json({ message: "Error adding hotel" });
  }
});

export default router;
