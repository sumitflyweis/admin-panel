const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  user_Name: {
    type: String,
    required: false,
  },
  mobile_Number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  email_ID: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Astrologer", "User"],
  },
},{});

module.exports = mongoose.model("admin", AdminSchema);
