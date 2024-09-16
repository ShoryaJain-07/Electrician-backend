import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Complaint } from "../models/complaint.model.js";
import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js";

export const closeComplaint = asyncHandler(async (req, res) => {
  try {
    const { complaintId, summary, electricianId } = req.body;

    const complaint =await Complaint.findByIdAndUpdate(
      complaintId,
      {$set:{ "status": "closed", "summary":summary }},
      { new: true }
    );    

    if (!complaint) {
      return res.json(new ApiResponse(400, "Complaint not closed"));
    }

    const electrician =await User.findByIdAndUpdate(
      electricianId,
      {$set:{ "status": "free" }},
      { new: true }
    );

    if (!electrician) {
      return res.json(new ApiResponse(400, "Electrician not found"));
    }

    const notif =await Notification.findOneAndDelete({
      electricianId: electricianId,
      complaintId: complaintId,
    });

    if (!notif) {
      return res.json(new ApiResponse(400, "Notification not found"));
    }

    return res.json(
      new ApiResponse(200, complaint, "Complaint closed successfully")
    );
  } catch (error) {
    return res.json(new ApiResponse(500, error, "internal server error"));
  }
});

export const getComplaints = asyncHandler(async (req, res) => {
  try {
    const { electricianId } = req.query;
    const Complaints = await Complaint.find({ electricianId: electricianId });

    if (!Complaints) {
      return res.json(new ApiResponse(400, error, "Complaints not found"));
    }
    
    const openComplaints = Complaints.filter((comp) => comp.status == "open");
    const closedComplaints = Complaints.filter(
      (comp) => comp.status == "closed"
    );

    const resp = {
      openComplaints: openComplaints,
      closedComplaints: closedComplaints,
    };
    
    if (!resp) {
      return res.json(new ApiResponse(400, error, "Complaints not found"));
    }
    
    
    return res.json(
      new ApiResponse(200, resp, "Complaints fetched successfully")
    );
  } catch (error) {
    return res.json(new ApiResponse(500, error, "internal server error"));
  }
});
