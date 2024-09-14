import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import reviewRoutes from "./routes/review";
import roomRoutes from "./routes/room"
import bookingRoutes from "./routes/my-bookings";
import pendingHotelsRoutes from "./routes/admin";
import notificationsRoutes from "./routes/notification";
import TransactionRoutes from "./routes/transaction";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define allowed origins
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

//app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get('/', (req, res) => {
  res.send('Hello from the root path!'); // Or render a view if you're using templates
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/admin", pendingHotelsRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/transactions", TransactionRoutes);
app.use("/api/notifications", notificationsRoutes);

// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
// });
app.get('/', (req: Request, res: Response) => {
  res.send(./index.html); // Or render a view if you're using templates
});

app.listen(7000, () => {
  console.log("Server is running on localhost:7000");
});
