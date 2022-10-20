const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  user_Name: {
    type: String,
    required: false,
  },
  mobile_Number: {
    type: String,
    required: true,
    unique: true,
  },
  created: {
    type: String,
    default: new Date().toISOString(),
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: false,
  },
  email_ID: {
    type: String,
    required: false,
    unique: true,
  },
});

module.exports = mongoose.model("admin", AdminSchema);
