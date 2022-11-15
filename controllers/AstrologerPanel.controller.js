const bookidgen = require("bookidgen");
const Notification = require("../models/notification");
const expressAsyncHandler = require("express-async-handler");
// const Banner = require('../models/Banner')
const crypto = require("crypto");
const moment = require("moment");
// const product = require('../models/product')
const { encrypt, compare } = require("../services/crypto");
const User = require("../models/User");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const jwt = require("jsonwebtoken");
const JWTkey = "rubi";
const bcrypt = require("bcrypt");
const Admin = require("../models/astrologerSchema");
const blog = require("../models/blog");
const feedback = require("../models/feedback");
const nodemailer = require("nodemailer");
const Token = require("../models/token.model");

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

//SignUP
module.exports.signUpUser = async (req, res) => {
  const { email_ID, mobile_Number, password } = req.body;

  // Check if user already exist
  const Existing = await Admin.findOne({ mobile_Number });
  if (Existing) {
    return res.send("Already existing");
  }
  encryptedPassword = await bcrypt.hash(password, 10);

  // create new user
  const newUser = await createUser(email_ID, mobile_Number, password);
  if (!newUser[0]) {
    return res.status(400).send({
      message: "Unable to create new user",
    });
  }
  res.send(newUser);
};

module.exports.getUserDetails = async (req, res) => {};

module.exports.getAllUsersDetails = async (req, res) => {
  try {
    const data = await Admin.find();
    res
      .status(200)
      .json({ message: "See All userDetails", data: data, status: true });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (email_ID, mobile_Number, password) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = Math.floor(1000 + Math.random() * 90000);
  const newUser = await Admin.create({
    email_ID,
    mobile_Number,
    password: hashedPassword,
    otp: otpGenerated,
  });
  if (!newUser) {
    return [false, "Unable to sign you up"];
  }
  try {
    // sendSMS(`+91${mobile_Number}`, otpGenerated)

    return [true, newUser];
  } catch (error) {
    return [false, "Unable to sign up, Please try again later", error];
  }
};

//login ------
module.exports.login = async (req, res) => {
  try {
    const { email_ID, password } = req.body;

    if (!(email_ID && password)) {
      res.status(400).send("All input is required");
    }

    const user = await Admin.findOne({ email_ID });

    if (!user)
      res.status(400).json({
        message: "This Number is not registered",
      });

    if (user && (await compare(password, user.password))) {
      jwt.sign(
        { user_id: user._id },
        JWTkey,
        { expiresIn: "3h" },
        (err, token) => {
          if (err) res.status(400).send("Invalid Credentials");
          res.send({ user, token });
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

//blog post api

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

//get api

module.exports.ViewDataBlogs = async (req, res) => {
  try {
    const getBlogs = await blog.findById(req.params.id);
    if (!getBlogs) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res.status(200).json({
        message: "User Bolgs is Created successfully",
        data: getBlogs,
        status: true,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//upadte

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

//delete
module.exports.RemovedBlogs = async (req, res) => {
  try {
    const deleteBlogs = await blog.findOneAndDelete({ id: req.params.id });
    if (!deleteBlogs) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res
        .status(200)
        .json({ message: " Blogs is deleted successfully", status: true });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};

// Feedback-----
module.exports.UserFeedback = async (req, res) => {
  let { UserId, Feedback } = req.body;

  try {
    if (!(UserId && Feedback)) {
      res
        .status(400)
        .json({ message: "All fields are required", status: false });
    } else {
      const NewUserFeedback = await feedback.create({ UserId, Feedback });
      if (NewUserFeedback)
        res.status(200).json({
          message: "UserFeedback Send",
          data: NewUserFeedback,
          status: true,
        });
      res
        .status(400)
        .json({ message: "UserFeedback  not send", status: false });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//get all feedback

module.exports.ViewAllFeedback = async (req, res) => {
  try {
    const SendFeedback = await feedback.find();
    res.status(200).json({
      message: "See All Feedback",
      Feedback: SendFeedback,
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await Admin.find(keyword);
  res.send(users);
};

var OTP = Math.random();
OTP = OTP * 1000000;
OTP = parseInt(OTP);
console.log(OTP);
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  service: "Gmail",
  port: 465,
  auth: {
    user: "node3@flyweis.technology",
    pass: "node3@901#",
  },
});
// testing success
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
    console.log(success);
  }
});
var otpToken;
var userId;
module.exports.resetPassword = async (req, res) => {
  let email_ID = req.body.email_ID;
  if (!email_ID) {
    res.send("fill email");
  }
  const user = await Admin.findOne({ email_ID });
  let token = await Token.findOne({ userId: user._id });
  if (!token) {
    token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
  }
  console.log(token.token);

  otpToken = token.token;
  userId = user._id;
  if (!user) {
    res.status(500).send("User not exist");
  }
  try {
    var mailOptions = {
      to: email_ID,
      subject: "OTP for verification is: ",
      html:
        "<h3>OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        OTP +
        "<h3>userId </h3>" +
        "<br></br>" +
        user._id +
        "<br></br>" +
        "<h3>token </h3>" +
        token.token +
        "</h1>", // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });

    res.status(200).send("OTP send successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "ERROR", error });
  }
};

module.exports.verifyOTP = expressAsyncHandler(async (req, res) => {
  // if (!OTPs) {
  //   res.send("OTP required");
  // }

  var token = otpToken;
  const userID = userId;
  if (!req.body.OTP) {
    res.send("OTP required");
  }

  if (req.body.OTP == OTP) {
    res.status(200).send({
      msg: "You has been successfully verified OTP ",
      token: token,
      userId: userID,
    });
  } else {
    res.status(500).send({ msg: "OTP is incorrect" });
  }
});

module.exports.changePassword = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const { password, confirmPassword } = req.body;
  if (!(password && confirmPassword)) {
    res.send("filleds required");
  }

  const user = await Admin.findById(id);

  if (!user) return res.status(400).send("invalid link or expired");
  try {
    if (password != confirmPassword) {
      res.send("Password should be same");
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.send("Invalid link or expired");

    user.password = req.body.password;
    await user.save();
    await token.delete();

    res.status(200).send({ msg: "password reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "ERROR", error });
  }
});

module.exports.addNotification = expressAsyncHandler(async (req, res) => {
  const { UserId, notification } = req.body;

  if (!notification) {
    res.send("fill the require filleds");
  }
  const ad = await AdminPanel.findOne({ UserId });
  console.log(ad);
  try {
    const data = new Notification({
      notification,
      userId: ad,
      role: "Admin",
    });

    const result = await data.save();
    res
      .status(200)
      .json({ message: "notification sent ", data: result, userId: ad });
  } catch (error) {
    res.status(400).send({ msg: "ERROR", error });
  }
});

module.exports.getNotification = expressAsyncHandler(async (req, res) => {
  try {
    const data = await Notification.find();
    res
      .status(200)
      .json({ message: "See All notifications", data: data, status: true });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "ERROR", error });
  }
});
