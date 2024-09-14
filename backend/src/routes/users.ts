import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";
import cloudinary from "cloudinary";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    // Fetch users with only the required fields
    const users = await User.find(
      {},
      "firstName lastName email profilePicture nationality"
    );

    // Check if any users are found
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    // Respond with the list of users
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// admins update api call 
router.put('/users/:email', async (req, res) => {
  try {
    const { email } = req.params; 
    const updatedUser = req.body; // Get the updated user data from the request body

    // Find the user to update and update it
    const userToUpdate = await User.findOneAndUpdate(
      { email: email }, // Find the user by email
      updatedUser, // Update the user with the data from the request body
      { new: true } // Return the updated document
    );

    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userToUpdate); // Send the updated user back in the response
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// admin api call for delete 
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params; 

    // Delete the user from the database using the _id
    const deletedUser = await User.findByIdAndDelete(userId); 

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
    check("isAdmin", "Invalid value for isAdmin").optional().isBoolean() // Validate isAdmin if provided
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User({
        ...req.body,
        isAdmin: req.body.isAdmin || false // Default to false if not provided
      });

      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "2d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 172800000,
      });

      return res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.put(
  "/me/personal-details",
  upload.single("profilePicture"),
  verifyToken,
  [
    // Validation rules for each field (adjust based on your specific requirements)
    check("firstName", "First name is required")
      .isString()
      .optional({ nullable: true }),
    check("lastName", "Last name is required")
      .isString()
      .optional({ nullable: true }),
    check("email", "Email is invalid").isEmail().optional({ nullable: true }),
    check("phoneNumber", "Phone number is invalid").optional({
      nullable: true,
    }),
    check("dateOfBirth", "Date of birth is invalid").optional({
      nullable: true,
    }),
    check("nationality", "Nationality is invalid").optional({ nullable: true }),
    check("gender", "Gender is invalid").optional({ nullable: true }),
    // Address validation (adjust based on your address schema)
    check("address.street", "Street is required")
      .isString()
      .optional({ nullable: true }),
    check("address.city", "City is required")
      .isString()
      .optional({ nullable: true }),
    check("address.state", "State is invalid").optional({ nullable: true }),
    check("address.postalCode", "Postal code is invalid").optional({
      nullable: true,
    }),
    check("address.country", "Country is required")
      .isString()
      .optional({ nullable: true }),
    // Passport details validation (adjust based on your schema)
    check("passportDetails.firstName", "First name is required")
      .isString()
      .optional({ nullable: true }),
    check("passportDetails.lastName", "Last name is required")
      .isString()
      .optional({ nullable: true }),
    check("passportDetails.issuingCountry", "Issuing country is required")
      .isString()
      .optional({ nullable: true }),
    check("passportDetails.number", "Passport number is required")
      .isString()
      .optional({ nullable: true }),
    check("passportDetails.expiryDate", "Expiry date is invalid").optional({
      nullable: true,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const userId = req.userId;

    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user details based on request body
      // Note: Use spread operator to update only the specified fields
      //       and avoid overwriting other user data
      const updatedUserDetails = {
        ...req.body,
        // Optionally update nested fields:
        address: { ...user.address, ...req.body.address },
        passportDetails: {
          ...user.passportDetails,
          ...req.body.passportDetails,
        },
      };

      // Upload the profile picture if available
      if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        const cloudinaryUploadResult = await cloudinary.v2.uploader.upload(
          dataURI
        );
        updatedUserDetails.profilePicture = cloudinaryUploadResult.url; // Update profilePicture
      }

      await user.updateOne(updatedUserDetails);
      res.status(200).json({ message: "User details updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// fetchbyid 
router.get(
  '/:id',
  //[param('id').notEmpty().withMessage('User ID is required')], // Validation middleware
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();
    try {
      const user = await User.findById(id).exec(); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user); 
    } catch (error) {
      console.error('Get user by ID error:', error);
      res.status(500).json({ message: 'Error fetching user' });
    }
  }
);
router.post(
  "/register/admin",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
    check("isAdmin", "Invalid value for isAdmin").optional().isBoolean() // Validate isAdmin if provided
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User({
        ...req.body,
        isAdmin: req.body.isAdmin || false // Default to false if not provided
      });

      await user.save();
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "2d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 172800000,
      });

      return res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

// put
// Deactivate Account Route
router.put('/deactivate', verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;  // Assuming you store userId in the token

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is already deactivated
    if (!user.isActive) {
      return res.status(400).json({ message: "User is already deactivated" });
    }

    // Set isActive to false to deactivate the account
    user.isActive = false;
    await user.save();
      // Clear the authentication cookie
      res.clearCookie("auth_token");

    res.status(200).json({ message: "Account deactivated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


export default router;
