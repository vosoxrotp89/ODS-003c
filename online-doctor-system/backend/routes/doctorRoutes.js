const express = require("express");
const {
  getDashboard,
  setAvailability,
  getAppointments,
  getDoctorProfile,
} = require("../controllers/doctorController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

// Doctor Dashboard
router.get("/dashboard", auth, role("Doctor"), getDashboard);

// Doctor Profile
router.get("/profile", auth, role("Doctor"), getDoctorProfile);

// Set Availability
router.post("/availability", auth, role("Doctor"), setAvailability);

// Get Appointments
router.get("/appointments", auth, role("Doctor"), getAppointments);

module.exports = router;
