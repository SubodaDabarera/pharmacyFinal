const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    images: Object,
    description: String,
    numReviews: Number,
    rating: Number,
    category: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchema);
