const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const addTimeSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("addtime", addTimeSchema);
