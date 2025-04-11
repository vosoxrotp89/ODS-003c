const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");
const User = require("../models/User");

const getDashboard = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id }).populate("doctor", "name email");
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard", error });
  }
};

const bookAppointment = async (req, res) => {
  const { doctorId, date, time, reason } = req.body;

  try {
    const appointment = new Appointment({
      patient: req.user._id,
      doctor: doctorId,
      date,
      time,
      reason,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id }).populate("doctor", "name email");
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

module.exports = {
  getDashboard,
  bookAppointment,
  getAppointments,
};
