const mongoose = require("mongoose");

const discountschema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "admin",
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Discount", discountschema);
