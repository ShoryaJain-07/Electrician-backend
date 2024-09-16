import mongoose, { Schema } from "mongoose";

const complaintSchema = new Schema({
  category: {
    type: String,
    enum: ["short circuit", "wiring", "appliance", "others"],
  },
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  electricianId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  },
  summary: {
    type: String,
    default:"",
  },
});

export const Complaint = mongoose.model("Complaint", complaintSchema);
