import express, { Request, Response } from "express";
import Room from "../models/room"; // Make sure to import your Room model
import { RoomType } from "../../shared/types"; // Import the RoomType if needed
import verifyToken from "../middleware/auth"; // Middleware for token verification
import { body, param, validationResult } from "express-validator";
import Hotel from "../models/hotel";

const router = express.Router();

// POST route to create a new room
router.post(
  "/",
  verifyToken,
  [
    body("roomType").notEmpty().withMessage("Room type is required"),
    body("capacity")
      .notEmpty()
      .isNumeric()
      .withMessage("Capacity is required and must be a number"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
  ],
  async (req: Request, res: Response) => {
    try {
      const newRoom: RoomType = req.body; // Get the room details from the request body
      const room = new Room(newRoom); // Create a new room instance
      await room.save(); // Save the room to the database

      // Optionally, update the hotel to include the new room reference
      await Hotel.findByIdAndUpdate(newRoom.hotelId, {
        $push: { rooms: room._id },
      });

      res.status(201).json(room); // Return the created room
    } catch (e) {
      console.log("Error creating room: ", e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get('/hotels/:hotelId/rooms', async (req, res) => {
  try {
    const hotelId = req.params.hotelId;

    // Find the hotel based on the provided hotelId
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Find all rooms associated with the hotel that are available
    const rooms = await Room.find({ 
      hotelId: hotelId, 
      availability: true, // Only get available rooms
      numberOfRooms: { $gt: 0 }  // Exclude rooms with 0 available rooms
    });

    res.json(rooms);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route to fetch a room by ID
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Room ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const id = req.params.id.toString();
    
    try {
      const room = await Room.findById(id);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }

      res.json(room);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching room" });
    }
  }
);

// PUT route to update a room
router.put("/:id", verifyToken, async (req: Request, res: Response) => {
  const roomId = req.params.id;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, {
      new: true,
    }); // Update the room details
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: "Error updating room" });
  }
});

// DELETE route to delete a room
router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  const roomId = req.params.id;
  try {
    const deletedRoom = await Room.findByIdAndDelete(roomId); // Delete the room
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    
    // Optionally, update the hotel to remove the room reference
    await Hotel.findByIdAndUpdate(deletedRoom.hotelId, {
      $pull: { rooms: roomId },
    });

    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room" });
  }
});
// GET route to fetch all rooms
router.get('/rooms/hotel', async (req, res) => {
  try {
    // Fetch all rooms from the database
    const rooms = await Room.find();

    // Return the list of rooms as JSON
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Error fetching rooms' });
  }
});


export default router;