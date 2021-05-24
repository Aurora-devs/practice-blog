import mongoose from "mongoose";
import UserInt from "../interfaces/userInterface";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: "Email is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    isAdmin: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<UserInt>("User", userSchema);
export default User;
