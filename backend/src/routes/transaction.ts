import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";
import cloudinary from "cloudinary";
import multer from "multer";
import { Transaction } from "../models/tranasaction"; // Import Transaction model

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// ... (rest of your user routes)

// Admin transaction routes

// GET /api/transactions (Get all transactions)
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("bookingId hotelId");
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
});
// GET /api/transactions/:transactionId (Get a specific transaction)
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve transactions' });
  }
});

router.get(
  "/transactions/:transactionId",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      // Check if the user is an admin
      const user = await User.findById(req.userId);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const transaction = await Transaction.findById(
        req.params.transactionId
      ).populate("bookingId hotelId"); // Populate related models
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.json(transaction);
    } catch (error) {
      console.error("Error fetching transaction:", error);
      res.status(500).json({ message: "Error fetching transaction" });
    }
  }
);

// ... (rest of your user routes)

export default router;
