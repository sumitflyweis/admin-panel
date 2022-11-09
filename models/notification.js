const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    UserId: { type: String },

    notification: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "Astrologer", "User"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", notificationSchema);
