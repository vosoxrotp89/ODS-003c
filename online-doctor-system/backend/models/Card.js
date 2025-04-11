const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
