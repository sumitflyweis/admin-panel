const mongoose = require("mongoose");

const specificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "admin",
      unique: true,
      required: true,
    },
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
