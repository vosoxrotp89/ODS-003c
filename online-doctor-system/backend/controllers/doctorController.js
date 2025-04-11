const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");

const getDashboard = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id }).populate("patient", "name email");
    const availability = await Availability.find({ doctor: req.user._id });

    res.json({ appointments, availability });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard", error });
  }
};

const setAvailability = async (req, res) => {
  const { date, slots } = req.body;

  try {
    const availability = new Availability({
      doctor: req.user._id,
      date,
      slots,
    });

    await availability.save();
    res.status(201).json({ message: "Availability set", availability });
  } catch (error) {
    res.status(500).json({ message: "Error setting availability", error });
  }
};

const getDoctorProfile = (req, res) => {
  res.status(200).json({ msg: "Doctor Profile Route" });
};

module.exports = {
  getDashboard,
  setAvailability,
  getDoctorProfile,
  getAppointments: (req, res) => {
    res.status(200).json({ msg: "Dummy appointment list (to be implemented)" });
  },
};
