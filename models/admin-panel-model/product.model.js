const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    image: {
      data: Buffer,
      contentType: String,
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
    category: { type: mongoose.Schema.Types.ObjectId, ref: "ManageCategory" },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
