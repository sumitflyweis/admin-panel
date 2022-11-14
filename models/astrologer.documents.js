const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const adddocuments = new mongoose.Schema(
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

module.exports = mongoose.model("addtime", adddocuments);
