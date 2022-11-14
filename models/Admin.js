const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
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
      required: false,
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
  },
<<<<<<< HEAD
  { timestamps: true }
);
=======
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
>>>>>>> 4dc54ce16a8aa0a2273f2ae592d785a3b13e179d

module.exports = mongoose.model("admin", AdminSchema);
