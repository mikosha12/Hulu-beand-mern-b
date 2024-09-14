import express, { Request, Response } from "express";
import Notification from "../models/notification";
import verifyToken from "../middleware/auth";

const router = express.Router();

// Fetch all notifications for the admin
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({ adminId: req.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error("Fetch notifications error:", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

// Mark a notification as read
router.post("/:id/read", verifyToken, async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(notification);
  } catch (error) {
    console.error("Mark notification as read error:", error);
    res.status(500).json({ message: "Error marking notification as read" });
  }
});

export default router;
