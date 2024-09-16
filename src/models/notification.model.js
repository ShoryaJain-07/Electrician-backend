import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  complaintId: {
    type: Schema.Types.ObjectId,
    ref: "complaint",
  },
  electricianId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export const Notification = mongoose.model("Notification", notificationSchema);
