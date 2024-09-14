import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      if (!user.isActive) {
        // Clear any existing cookies or sessions if needed
        res.clearCookie("auth_token");
        return res.status(403).json({ message: "Your account has been deactivated please contact the customer support" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create JWT token including userId and isAdmin
      const token = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin }, // Include isAdmin in token payload
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "2d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 172800000,
      });

      // Send userId and isAdmin status in response
      res.status(200).json({ userId: user._id, isAdmin: user.isAdmin });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
router.post(
  "/login/admin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      if (!user.isActive) {
        // Clear any existing cookies or sessions if needed
        res.clearCookie("auth_token");
        return res.status(403).json({ message: "Your account has been deactivated please contact the customer support" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create JWT token including userId and isAdmin
      const token = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin }, // Include isAdmin in token payload
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "2d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 172800000,
      });

      // Send userId and isAdmin status in response
      res.status(200).json({ userId: user._id, isAdmin: user.isAdmin });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;
