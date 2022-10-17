const mongoose = require("mongoose");

const specificationSchema = new mongoose.Schema(
  {
    specification: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("specification", specificationSchema);
