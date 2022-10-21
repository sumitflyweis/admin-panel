const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    mrp: {
      type: String,
    },
    stock: {
      type: String,
    },
    variant: {
      type: String,
    },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "manageCategory" }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
