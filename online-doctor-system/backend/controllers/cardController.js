const Card = require("../models/Card");

// POST /api/cards - Add a new card
const addCard = async (req, res) => {
  const { cardNumber, expiry, cvv } = req.body;

  try {
    if (!cardNumber || !expiry || !cvv) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Adding card for user:", req.user._id); // ✅ Debug
    const card = await Card.create({
      user: req.user._id,
      cardNumber,
      expiry,
      cvv,
    });

    console.log("Card added:", card._id); // ✅ Debug
    res.status(201).json({
      message: "Card added, pending approval",
      card,
    });
  } catch (error) {
    console.error("Error in addCard:", error.message); // ✅ Debug
    res.status(500).json({ message: "Failed to add card" });
  }
};

// GET /api/cards (for logged-in user)
const getMyCards = async (req, res) => {
  try {
    const userId = req.user._id;
    const cards = await Card.find({ user: userId });
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/cards/:id/approve - Approve card (Admin only)
const approveCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    card.isApproved = true;
    await card.save();

    res.status(200).json({
      message: "Card approved successfully",
      card,
    });
  } catch (error) {
    console.error("Error in approveCard:", error.message);
    res.status(500).json({ message: "Card approval failed" });
  }
};

module.exports = {
  addCard,
  getMyCards,
  approveCard,
};
