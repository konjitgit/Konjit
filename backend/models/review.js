const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
