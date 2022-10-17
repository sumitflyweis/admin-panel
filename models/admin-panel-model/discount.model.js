const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: String,
      required: true,
    },
    couponCode: {
      type: String,
      required: true,
    },
    startingDate: {
      type: String,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Discount2 = mongoose.model("discount2", discountSchema);
module.exports = Discount2;
