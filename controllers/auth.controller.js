const User = require("../models/User");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const jwt = require("jsonwebtoken");
const JWTkey = "rubi";
const otp = require("../services/OTP");
const blog = require("../models/blog");
const Wallet = require("../models/wallet");
const Notifications = require("../models/userSetting");
// const { status } = require('express/lib/response');

const generateJwtToken = (id) => {
  return jwt.sign({ id }, JWTkey, {
    expiresIn: "7d",
  });
};

const sendSMS = async (to, otp) => {
  const from = "+19287568632";
  await client.messages
    .create({
      body: otp,
      from: from,
      to: to,
    })
    .then((message) => {
      console.log(message.sid);
      return message;
    });
};

exports.isAuthenticated = (req, res, next) => {
  if (req.headers.authorization) {
    console.log("entered authorization!!!");
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, JWTkey);
    req.user = user.id;
    next();
  } else {
    return res.status(401).json({ message: "Authorization required" });
  }
};

exports.userMiddleware = (req, res, next) => {
  console.log(req.user);
  User.findById(req.user).exec((err, user) => {
    if (user) {
      next();
    }
    if (err) {
      return res.status(400).json({
        message: "User access denied",
      });
    }
  });
};

// Verify
module.exports.verify_Mobile_Number = async (req, res) => {
  const { mobile_Number, otp } = req.body;
  const user = await User.findOne({ mobile_Number });
  if (!user) res.send("User not found");
  if (user && user.otp !== otp)
    res.status(400).json({ message: "Invalid otp" });
  const token = generateJwtToken(user._id);
  res.status(200).json({ token });
};

module.exports.signUpUser = async (req, res) => {
  const { mobile_Number } = req.body;
  let Existing = await User.findOne({ mobile_Number });
  const otpGenerated = Math.floor(100000 + Math.random() * 900000);
  if (Existing) {
    Existing.otp = otpGenerated;
    const existinguser = await Existing.save();
    sendSMS(`+91${mobile_Number}`, otpGenerated);
    if (existinguser) res.status(200).json(existinguser);
    res.status(400).json({ message: "no otp" });
  } else {
    const ReferCode = otp.generateOTP();
    const newUser = await User.create({
      mobile_Number,
      otp: otpGenerated,
      ReferCode,
    });
    // const wallet = await Wallet.create({})
    // const notification = await Notifications.create({})

    sendSMS(`+91${mobile_Number}`, otpGenerated);
    if (!newUser) res.status(400).json({ message: "Unable to sign you up" });
    res.status(200).json(newUser);
  }
};

//patch api
module.exports.updateUserProfile = async (req, res) => {
  const {
    first_Name,
    last_Name,
    gender,
    time_of_Birth,
    place_of_Birth,
    profile_Images,
  } = req.body;
  console.log("req.user", req.user);
  if (
    !(
      first_Name &&
      last_Name &&
      gender &&
      time_of_Birth &&
      place_of_Birth &&
      profile_Images
    )
  )
    res.status(400).json({ message: "Reuired fields" });
  // let u = await User.find({_id:req.user})
  // res.send(u)
  const UpdateUser = await User.findByIdAndUpdate(req.user, {
    first_Name,
    last_Name,
    gender,
    time_of_Birth,
    place_of_Birth,
    profile_Images,
  });
  if (!UpdateUser)
    res.status(400).json({ message: "Enter the correct Id", status: false });
  res.status(200).json({
    message: "Udpate is successfully",
    status: true,
    UpdateUser,
  });
};

// /get api

module.exports.GetUserProfiles = async (req, res, next) => {
  console.log(req.user);
  try {
    const UpdateUser = await User.findById(req.user);
    return res.status(200).json({
      success: true,
      msg: "UpdateUser",
      UpdateUser: UpdateUser,
    });
  } catch (error) {
    next(error);
  }
};

//post for blog user

module.exports.postuserBlogs = async (req, res) => {
  let photo = req.body;
  photo["blog_Images"] = [req.file.originalname];
  let { Date, User_Name, sub_Title, Intro, blog_Images } = photo;

  try {
    if (!(Date && User_Name && sub_Title && Intro && blog_Images)) {
      res
        .status(400)
        .json({ message: "All fields are required", status: false });
    } else {
      const getResponce = await blog.create({
        User_Name,
        Date,
        sub_Title,
        Intro,
        blog_Images,
      });

      if (!getResponce) {
        res
          .status(400)
          .json({ message: "User Blogs  is not created", status: false });
      } else {
        res.status(200).json({
          message: "User Bloges is created successfully",
          data: getResponce,
          status: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//update blog for user

module.exports.UpdateBlogs = async (req, res) => {
  let photo = req.body;
  photo["blog_Images"] = [req.file.originalname];
  let { Date, User_Name, sub_Title, Intro, blog_Images } = req.body;

  try {
    if (!(Date && User_Name && sub_Title && Intro && blog_Images)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const updatedBlogs = await blog.findByIdAndUpdate(
        { _id: req.params.id },
        {
          User_Name,
          Date,
          sub_Title,
          Intro,
          blog_Images,
        }
      );
      if (!updatedBlogs) {
        res.send("Unable to update Blogs");
      }
      res.send(updatedBlogs);
    }
  } catch {}
};

//
