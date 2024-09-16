import { Router } from "express";
import { closeComplaint, getComplaints } from "../controllers/electrician.controller.js";

const router = Router();

router.route("/close-complaint").post(closeComplaint);
router.route("/get-complaints").get(getComplaints);

export default router;
