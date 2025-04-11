const express = require("express");
const { getDashboard,
    getAllUsers,
    deleteUser,
    getAllCards,
    approveCard,
    getUsersByRole } = require("../controllers/adminController");
const protect = require("../middleware/protect");
const adminOnly = require("../middleware/adminOnly");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", protect, adminOnly, getDashboard);
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);

// Admin-only route
router.get("/cards", authMiddleware("Admin"), getAllCards);
router.patch("/cards/:id/approve", authMiddleware("Admin"), approveCard);


module.exports = router;
