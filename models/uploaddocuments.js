const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uploadDocumnetsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "admin",
  },
  uploadDocuments: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

module.exports = mongoose.model("uploaddocumnets", uploadDocumnetsSchema);
