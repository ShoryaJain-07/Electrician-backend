import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js";
import { Complaint } from "../models/complaint.model.js";

export const addElectrician = asyncHandler(async (req, res) => {
  try {
    const { name, phone, password } = req.body;
        console.log("h");

    const user = await User.create({
      name,
      phone,
      password,
    });

    if (!user) {
      return res.json(new ApiResponse(400, "Electrician not added"));
    }

    return res.json(
      new ApiResponse(200, user, "Electrician added successfully")
    );
  } catch (error) {
    return res.json(new ApiResponse(500, error, "internal server error"));
  }
});

export const addComplaint = asyncHandler(async (req, res) => {
  try {
    const { category, description, name, address } = req.body;

    const electricians = await User.find({ role: "electrician", status: "free" }).sort({
      counter: 1,
    });
    if (!electricians) {
      return res.json(new ApiResponse(400, "Electrician not available"));
    }

    const complaint = await Complaint.create({
      category,
      description,
      name,
      address,
      electricianId : electricians[0]._id,
    });

    if (!complaint) {
      return res.json(new ApiResponse(400, "Complaint not added"));
    }

    const notif = await Notification.create({
      title: "New Complaint",
      message: `Name : ${name}, Location : ${address}, Issue : ${category}, ${description} `,
      complaintId: complaint._id,
      electricianId: electricians[0]._id,
    })

    if (!notif) {
      return res.json(new ApiResponse(400, "Complaint not added, error in creating notification"));
    }

    const updatedE = await User.findByIdAndUpdate(
      electricians[0]._id,
      { $set: { status: "occupied" }, $inc: { counter: 1 } },
      { new: true }
    );

    if (!updatedE) {
      return res.json(new ApiResponse(400, "Complaint not added, error in incrementing count"));
    }

    return res.json(
      new ApiResponse(200, complaint, "Complaint added successfully")
    );
  } catch (error) {
    return res.json(new ApiResponse(500, error, "internal server error"));
  }
});

export const getSolvedComplaint = asyncHandler(async (req, res) => {
  try {
    const electricianId = req.params;
    const complaints = await Complaint.find({
      electricianId: electricianId,
      status: "closed",
    });

    const complaintCount = complaints.length();

    return res.json(
      new ApiResponse(200, complaintCount, "Count fetched successfully")
    );
  } catch (error) {
    return res.json(new ApiResponse(500, error, "internal server error"));
  }
});

export const getElectricians = asyncHandler(async (req, res) => {
  try {
    const electricians = await User.find({ role: "electrician" });
    if (!electricians) {
      return res.json(new ApiResponse(400, "Electrician not found"));
    }
    return res.json(new ApiResponse(200, electricians, "Electricians fetched successfully"));
  } catch (error) {
    return res.json(new ApiResponse(500, error, "internal server error"));
  }
})

export const getOpenComplaints = asyncHandler(async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: "open" })
    if (!complaints) {
      return res.json(new ApiResponse(400, "Complaint not found"));
    }
    return res.json(new ApiResponse(200, complaints, "Complaints fetched successfully"));
  } catch (error) {
    return res.json(new ApiResponse(500, error, "internal server error"));
  }
})

export const getClosedComplaints = asyncHandler(async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: "closed" })
    if (!complaints) {
      return res.json(new ApiResponse(400, "Complaint not found"));
    }
    return res.json(new ApiResponse(200, complaints, "Complaints fetched successfully"));
  } catch (error) {
    return res.json(new ApiResponse(500, error, "internal server error"));
  }
})

export const deleteElectrician = asyncHandler(async (req, res) => {
  try {
    const {electricianId} = req.query;
    const electrician = await User.findByIdAndDelete(electricianId);
    if (!electrician) {
      return res.json(new ApiResponse(400, "Electrician not found"));
    }
    return res.json(new ApiResponse(200, electrician, "Electrician deleted successfully"));
  } catch (error) {
    return res.json(new ApiResponse(500, error, "internal server error"));
  }
})

export const deleteComplaint = asyncHandler(async (req, res) => {
  try {
    const {complaintId} = req.query;
    const complaint = await Complaint.findByIdAndDelete(complaintId);
    if (!complaint) {
      return res.json(new ApiResponse(400, "Complaint not found"));
    }
    return res.json(new ApiResponse(200, complaint, "Complaint deleted successfully"));
  } catch (error) {
    return res.json(new ApiResponse(500, error, "internal server error"));
  }
})