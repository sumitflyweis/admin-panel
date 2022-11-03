const bookidgen = require("bookidgen");
// const Banner = require('../models/Banner')
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
const Admin = require("../models/Admin");
const blog = require("../models/blog");
const feedback = require("../models/feedback");

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
  const { email_ID, mobile_Number, password, profile } = req.body;

  // Check if user already exist
  try {
    const Existing = await Admin.findOne({ mobile_Number });
    if (Existing) {
      return res.send("Already existing");
    }
    encryptedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await createUser(
      email_ID,
      mobile_Number,
      password,
      profile
    );
    if (!newUser[0]) {
      return res.status(400).send({
        message: "Unable to create new user",
      });
    }
    res.send(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error", error });
  }
};

module.exports.updateUser = async (req, res) => {
  const { email_ID, mobile_Number, password, profile } = req.body;
  const id = req.params.id;
  try {
    const data = await Admin.findByIdAndUpdate(id, {
      email_ID,
      mobile_Number,
      password,
      profile,
    });

    res.status(200).send({ msg: "update successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error", error });
  }
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Admin.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Delete successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error", error });
  }
};

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

const createUser = async (email_ID, mobile_Number, password, profile) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = Math.floor(1000 + Math.random() * 90000);
  const newUser = await Admin.create({
    email_ID,
    mobile_Number,
    password: hashedPassword,
    otp: otpGenerated,
    role: "Astrologer",
    profile,
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
    const { mobile_Number, password } = req.body;

    if (!(mobile_Number && password)) {
      res.status(400).send("All input is required");
    }

    const user = await Admin.findOne({ mobile_Number });

    if (!user)
      res.status(400).json({
        message: "This Number is not registered",
      });

    if (user && (await compare(password, user.password))) {
      jwt.sign(
        { user_id: user._id },
        JWTkey,
        { expiresIn: "24h" },
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
