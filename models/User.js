const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    mobile_Number: {
      type: String,
      required: true,
      unique: true,
    },

    first_Name: {
      type: String,
      required: true,
    },

    last_Name: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      lowercase: true,
      required: true,
      enum: ["male", "female", "Male", "Female"],
    },

    date_of_Birth: { type: Date },

    place_of_Birth: { type: String },

    profile_Images: { type: String },

    Experience: { type: String },

    Skills: [{ type: String }],

    AboutMe: { type: String, trim: true },

    User_Name: { type: String },

    User_Images: [{ type: String }],

    Languages: [{ type: String }],

    ReferCode: { type: String },

    ActiveNotification: { type: Boolean, default: false },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
