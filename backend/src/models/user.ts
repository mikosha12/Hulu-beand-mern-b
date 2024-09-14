import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "../../shared/types";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: [
    {
      type: String,
    },
  ],
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  nationality: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  passportDetails: {
    firstName: { type: String },
    lastName: { type: String },
    issuingCountry: { type: String },
    number: { type: String },
    expiryDate: { type: Date },
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default value for regular users
  },
  isActive: {
    type: Boolean,
    default: true, // Default value for regular users
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
