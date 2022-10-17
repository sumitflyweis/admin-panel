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
});

module.exports = mongoose.model("Discount", discountschema);
