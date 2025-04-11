const express = require("express");
const {
  getDashboard,
  setAvailability,
  getAppointments,
  getDoctorProfile,
} = require("../controllers/doctorController");

const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Doctor Dashboard
router.get("/dashboard", authMiddleware(["doctor"]), getDashboard);

// Doctor Profile
router.get("/profile", authMiddleware(["doctor"]), getDoctorProfile);

// Set Availability
router.post("/availability", authMiddleware(["doctor"]), setAvailability);

// Get Appointments
router.get("/appointments", authMiddleware(["doctor"]), getAppointments);

module.exports = router;
