const express = require("express");
const {
  getDashboard,
  bookAppointment,
  getAppointments,
} = require("../controllers/patientController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/dashboard", auth, role("Patient"), getDashboard);
router.post("/book", auth, role("Patient"), bookAppointment);
router.get("/appointments", auth, role("Patient"), getAppointments);

module.exports = router;
