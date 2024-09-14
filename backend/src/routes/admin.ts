import express, { Request, Response } from 'express';
import Hotel from '../models/hotel';


const router = express.Router();

router.get('/pending-hotels', async (req: Request, res: Response) => {
  try {
    const pendingHotels = await Hotel.find({ status: 'Pending' });
    res.status(200).json(pendingHotels);
  } catch (e) {
    console.error('Error fetching pending hotels:', e);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.put('/approve/:hotelId', async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;

    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { status: 'Approved' },
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json({ message: 'Hotel approved successfully', hotel: updatedHotel });
  } catch (e) {
    console.error('Error approving hotel:', e);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


router.put('/reject/:hotelId', async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;

    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { status: 'Rejected' },
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json({ message: 'Hotel rejected successfully', hotel: updatedHotel });
  } catch (e) {
    console.error('Error rejecting hotel:', e);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


export default router;