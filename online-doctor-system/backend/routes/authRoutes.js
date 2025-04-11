const express = require("express");
const {
  getDashboard,
  setAvailability,
  getAppointments,
  getDoctorProfile,
} = require("../controllers/doctorController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Routes for Doctor
router.get("/dashboard", auth, role("Doctor"), getDashboard);
router.get("/profile", auth, role("Doctor"), getDoctorProfile);
router.post("/availability", auth, role("Doctor"), setAvailability);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/appointments", auth, role("Doctor"), getAppointments); // comment this if getAppointments isn't defined

module.exports = router;
