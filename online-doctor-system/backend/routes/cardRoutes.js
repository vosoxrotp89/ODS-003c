const express = require("express");
const router = express.Router();
const {
  addCard,
  getMyCards,
  approveCard,
} = require("../controllers/cardController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware(), addCard);
router.get("/", authMiddleware(), getMyCards); 
router.put("/:id/approve", authMiddleware, adminMiddleware, approveCard);

module.exports = router;
