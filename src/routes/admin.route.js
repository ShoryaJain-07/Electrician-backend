import { Router } from "express"
import { addComplaint, addElectrician, deleteComplaint, deleteElectrician, getClosedComplaints, getElectricianById, getElectricians, getOpenComplaints, getSolvedComplaint, loginElectrician } from "../controllers/admin.controller.js"

const router = Router()

router.route("/add-electrician").post(addElectrician)
router.route("/add-complaint").post(addComplaint)
router.route("/get-solved-complaints").get(getSolvedComplaint)
router.route("/get-electricians").get(getElectricians)
router.route("/get-open-complaints").get(getOpenComplaints)
router.route("/get-closed-complaints").get(getClosedComplaints)
router.route("/delete-electrician").delete(deleteElectrician)
router.route("/delete-complaint").delete(deleteComplaint)
router.route("/login-electrician").delete(loginElectrician)
router.route("/get-electrician-by-id").delete(getElectricianById)

export default router