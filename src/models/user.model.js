import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "electrician",
  },
  status: {
    type: String,
    enum: ["free", "occupied"],
    default: "free"
  },
  counter: {
    type: Number,
    default: 0,
  }
});

export const User = mongoose.model("User", userSchema);
