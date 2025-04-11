const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// No protection needed
router.post("/register", registerUser);
router.post("/login", loginUser);
// Get all users - Admin only
router.get("/all", protect, authorizeRoles("Admin"), getAllUsers);


module.exports = router;
