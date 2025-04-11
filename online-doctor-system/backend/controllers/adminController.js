const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Card = require("../models/Card");

exports.getDashboard = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const appointments = await Appointment.find().populate("doctor patient", "name email");

    res.json({ users, appointments });
  } catch (error) {
    res.status(500).json({ message: "Failed to load admin dashboard", error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// GET /api/admin/cards — list all submitted cards
exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().populate("user", "name email role");
    res.json(cards);
  } catch (error) {
    console.error("Error getting cards:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/admin/cards/:id/approve
exports.approveCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    card.isApproved = true;
    await card.save();

    res.json({ message: "Card approved successfully", card });
  } catch (error) {
    console.error("Card approval error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/users/:role — filter users by role (Doctor/Patient)
exports.getUsersByRole = async (req, res) => {
  try {
    const role = req.params.role;
    if (!["Doctor", "Patient"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const users = await User.find({ role }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users by role", error });
  }
};
