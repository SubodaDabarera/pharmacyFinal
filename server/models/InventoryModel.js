const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
  },
  item_code: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  exp_date: {
    type: Date,
    require: true,
  },
  batchid: {
    type: Number,
  },
  description: {
    type: String,
  },
  stockimage: {
    type: String,
  },
  numReviews: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("Inventories", inventorySchema);
