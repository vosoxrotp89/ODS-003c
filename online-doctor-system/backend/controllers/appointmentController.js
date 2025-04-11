const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Card = require("../models/Card");

// POST /api/appointments - Book appointment
const bookAppointment = async (req, res) => {
  const { doctorId, date, time, reason, cardNumber, expiry, cvv } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if an appointment exists at same date & time
    const exists = await Appointment.findOne({
      doctor: doctorId,
      date,
      time,
    });

    if (exists) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // Simulate Payment: Find matching approved card
    const matchedCard = await Card.findOne({
      user: req.user._id,
      cardNumber,
      expiry,
      cvv,
      isApproved: true,
    });

    if (!matchedCard) {
      return res.status(402).json({ message: "Payment failed: Invalid card or not approved" });
    }

    // Proceed with appointment booking
    const appointment = await Appointment.create({
      user: req.user._id,
      doctor: doctorId,
      date,
      time,
      reason,
    });

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error });
  }
};

module.exports = {
  bookAppointment,
};
