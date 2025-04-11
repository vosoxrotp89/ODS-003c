const express = require("express");
const {
  getDashboard,
  getAllUsers,
  deleteUser,
  getAllCards,
  approveCard,
  getUsersByRole,
  toggleBlockUser
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Admin dashboard
router.get("/dashboard", authMiddleware(["admin"]), getDashboard);

// User management
router.get("/users", authMiddleware(["admin"]), getAllUsers);
router.get("/users/:role", authMiddleware(["admin"]), getUsersByRole);
router.delete("/users/:id", authMiddleware(["admin"]), deleteUser);
router.patch("/users/:id/block", authMiddleware(["admin"]), toggleBlockUser); // Toggle block/unblock

// Card management
router.get("/cards", authMiddleware(["admin"]), getAllCards);
router.patch("/cards/:id/approve", authMiddleware(["admin"]), approveCard);

module.exports = router;
