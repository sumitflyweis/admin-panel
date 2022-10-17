const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  mobile_Number: {type: String,required: true},

  otp: {type: String,required: true},
  
  first_Name: {type: String,required: false},

  last_Name:{type:String},

  gender:{type:String},

  time_of_Birth:{type:String},

  place_of_Birth:{type:String},

  profile_Images:{type:String},

  ReferCode:{type:String},

 
},

  { timestamps: true }
);





module.exports = mongoose.model('User', userSchema);

